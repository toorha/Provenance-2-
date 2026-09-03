"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import {
  normalize,
  validate,
  type FieldErrors,
  type RequestAccessFields,
} from "@/lib/request-access/schema";

/* The submission path.

   A server action rather than a route handler: the form is the only caller,
   there is no public API worth exposing, and this way the service role key
   has no chance of reaching a client bundle. "use server" at the top of the
   file is what guarantees that; nothing here is ever sent to the browser.

   THE DATABASE IS THE SOURCE OF TRUTH. If the insert succeeds and the email
   fails, the visitor is told it worked, because it did. The row exists and it
   is the thing that matters. Failing them over a notification would lose a
   real lead to protect nothing. */

export type SubmitResult =
  | { ok: true }
  | { ok: false; fieldErrors: FieldErrors }
  | { ok: false; formError: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

type Payload = RequestAccessFields & {
  /* honeypot. Real people never see this field, so anything in it is a bot. */
  website?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export async function submitRequestAccess(
  payload: Payload,
): Promise<SubmitResult> {
  /* Silent success. Telling a bot it was caught only teaches whoever wrote it
     to try again differently, so this looks exactly like a real submission
     and simply stores nothing. */
  if (payload.website && payload.website.trim() !== "") {
    return { ok: true };
  }

  const fields = normalize(payload);
  const fieldErrors = validate(fields);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    /* the visitor never learns which variable is missing */
    console.error(
      "[request-access] Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
    return { ok: false, formError: GENERIC_ERROR };
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const row = {
    name: fields.name,
    work_email: fields.workEmail,
    company: fields.company,
    role: fields.role,
    portfolio_size: fields.portfolioSize || null,
    message: fields.message,
    source: "website",
    utm_source: payload.utmSource?.slice(0, 200) || null,
    utm_medium: payload.utmMedium?.slice(0, 200) || null,
    utm_campaign: payload.utmCampaign?.slice(0, 200) || null,
  };

  const { data, error } = await supabase
    .from("request_access")
    .insert(row)
    .select("id, created_at")
    .single();

  if (error || !data) {
    console.error("[request-access] insert failed:", error);
    return { ok: false, formError: GENERIC_ERROR };
  }

  /* Past this point the request has been received. Nothing below may change
     what the visitor is told. */
  await notify({ ...fields, id: data.id, createdAt: data.created_at });

  return { ok: true };
}

async function notify(
  req: RequestAccessFields & { id: string; createdAt: string },
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.REQUEST_ACCESS_NOTIFICATION_EMAIL;
  const from = process.env.REQUEST_ACCESS_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      "[request-access] notification skipped: Resend is not fully configured. The submission was still stored.",
    );
    return;
  }

  const submitted = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Toronto",
  }).format(new Date(req.createdAt));

  const lines = [
    ["Name", req.name],
    ["Work email", req.workEmail],
    ["Company", req.company],
    ["Role", req.role],
    ["Portfolio", req.portfolioSize || "Not provided"],
  ];

  const text = [
    "New Provenance access request",
    "",
    ...lines.map(([k, v]) => `${k}\n${v}\n`),
    "What they want help with",
    req.message,
    "",
    `Submitted\n${submitted} ET`,
    "",
    `Request ID: ${req.id}`,
  ].join("\n");

  const html = `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:14px;line-height:1.55;color:#1e2422">
  <p style="font-size:16px;font-weight:600;margin:0 0 20px">New Provenance access request</p>
  ${lines
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 14px"><span style="color:#56636a">${k}</span><br>${escapeHtml(v)}</p>`,
    )
    .join("")}
  <p style="margin:0 0 14px"><span style="color:#56636a">What they want help with</span><br>${escapeHtml(
    req.message,
  ).replace(/\n/g, "<br>")}</p>
  <p style="margin:0 0 20px"><span style="color:#56636a">Submitted</span><br>${submitted} ET</p>
  <p style="margin:0;color:#7e8a88;font-size:12px">Request ID: ${req.id}</p>
</div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: req.workEmail,
      subject: `New Provenance access request: ${req.company}`,
      text,
      html,
    });
    if (error) {
      console.error(
        "[request-access] notification failed, submission was stored:",
        error,
      );
    }
  } catch (err) {
    console.error(
      "[request-access] notification threw, submission was stored:",
      err,
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
