"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import {
  FORMSPREE_ENDPOINT,
  MESSAGE_MAX,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact";

/* Contact, posted straight to Formspree from the browser.

   WHY THERE IS NO FORMSPREE SDK HERE. Formspree's React package wraps one
   fetch in a hook and brings its own error and validation model with it.
   This repo already validates by hand and says why in the access form's
   schema, and two forms on one site behaving differently because one of them
   imported a library is worse than the twenty lines below. The wire format is
   exactly what the AJAX guide describes: JSON in, Accept: application/json,
   200 on success, an `errors` array on failure.

   NO SERVER ACTION EITHER. The access form has one because it writes to
   Supabase with a service-role key that must never reach the browser.
   Nothing here is secret: the endpoint id is public by design, so a round
   trip through our own server would add a hop and hide nothing. */

const EMPTY: ContactFields = { name: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const successRef = useRef<HTMLHeadingElement | null>(null);
  /* Formspree's own honeypot field name. Bots fill every input they find; a
     real person never sees this one. */
  const gotcha = useRef<HTMLInputElement | null>(null);

  /* Move focus to the confirmation once it is actually on the page. A frame
     callback fired from the submit handler runs before React has committed
     the success render, so the ref is still empty and focus stays on body,
     which leaves a screen reader in a form that is no longer there. */
  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const set = (k: keyof ContactFields) => (v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (showErrors) setErrors(validateContact(next));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setShowErrors(true);
    if (Object.keys(found).length > 0) {
      /* send focus to the first thing that is wrong, rather than leaving the
         visitor to hunt for red text */
      const first = document.getElementById(Object.keys(found)[0]);
      first?.focus();
      return;
    }

    setPending(true);
    setFailed(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          /* Formspree reads `email` as the reply-to address */
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: `Provenance contact — ${values.name.trim()}`,
          _gotcha: gotcha.current?.value ?? "",
        }),
      });

      if (res.ok) {
        setSent(true);
        return;
      }

      /* Formspree answers a rejection with { errors: [{ field, message }] }.
         Field-level ones go back on the field; anything else is ours to
         explain rather than swallow. */
      const body = await res.json().catch(() => null);
      const list: { field?: string; message?: string }[] = body?.errors ?? [];
      const mapped: ContactErrors = {};
      let general = "";
      for (const item of list) {
        const f = item.field as keyof ContactFields | undefined;
        if (f && f in EMPTY) mapped[f] = item.message ?? "This is not valid.";
        else general = item.message ?? general;
      }
      if (Object.keys(mapped).length) setErrors(mapped);
      setFailed(
        general ||
          (Object.keys(mapped).length
            ? "Please check the fields above."
            : "That did not send. Please try again, or email us directly."),
      );
    } catch {
      setFailed(
        "That did not send, which usually means the connection dropped. Please try again.",
      );
    } finally {
      setPending(false);
    }
  };

  if (sent) {
    return (
      <div className="max-w-[620px]">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-paper outline-none sm:text-[2.125rem]"
        >
          Thanks. We&rsquo;ll be in touch.
        </h2>
        <p className="mt-5 text-body text-paper-muted">
          Your message is with us and we will reply to{" "}
          <span className="text-paper">{values.email.trim()}</span>.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center text-ui text-paper underline decoration-[rgba(243,244,240,0.3)] underline-offset-[5px] transition-colors duration-instant hover:decoration-paper"
        >
          Return to Provenance
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[620px]">
      <div aria-live="polite" className="sr-only">
        {pending ? "Sending your message" : ""}
      </div>

      {/* never shown, never focusable, never announced */}
      <input
        ref={gotcha}
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <Field
        id="name"
        label="Name"
        value={values.name}
        onChange={set("name")}
        error={showErrors ? errors.name : undefined}
        autoComplete="name"
      />
      <Field
        id="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={set("email")}
        error={showErrors ? errors.email : undefined}
        autoComplete="email"
      />

      <div className="mt-6">
        <Label htmlFor="message" optional>
          What would you like to talk about?
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          aria-invalid={showErrors && !!errors.message}
          aria-describedby={
            showErrors && errors.message ? "message-error" : undefined
          }
          className={control(showErrors && !!errors.message, "py-3 min-h-[132px]")}
        />
        <ErrorText
          id="message-error"
          message={showErrors ? errors.message : undefined}
        />
      </div>

      {failed && (
        <p
          role="alert"
          className="mt-6 rounded-control border border-[#E0655A] px-3.5 py-3 text-[14px] text-[#F0A79E]"
        >
          {failed}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={clsx(
          "mt-9 inline-flex min-h-[48px] items-center justify-center rounded-control px-6 text-ui font-semibold",
          "bg-paper text-canvas transition-opacity duration-instant",
          "focus:outline-none focus:ring-2 focus:ring-vera-400 focus:ring-offset-2 focus:ring-offset-canvas",
          pending ? "opacity-60" : "hover:opacity-90",
        )}
      >
        {pending ? "Sending" : "Send message"}
      </button>

      <p className="mt-6 max-w-[52ch] text-[13px] leading-[1.55] text-paper-subtle">
        We will only use your email to reply to this message.
      </p>
    </form>
  );
}

/* ── the pieces, matching the access form so the two read as one site ───── */

const control = (invalid: boolean, extra = "") =>
  clsx(
    "mt-2 block w-full rounded-control border bg-canvas-2 px-3.5 text-[16px] text-paper",
    "placeholder:text-paper-subtle",
    "transition-colors duration-instant",
    "focus:outline-none focus:ring-2 focus:ring-vera-400 focus:ring-offset-2 focus:ring-offset-canvas",
    invalid
      ? "border-[#E0655A]"
      : "border-[rgba(243,244,240,0.16)] hover:border-[rgba(243,244,240,0.3)]",
    extra || "h-12",
  );

function Label({
  htmlFor,
  optional,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-ui text-paper">
      {children}
      {optional && <span className="ml-2 text-paper-subtle">(optional)</span>}
    </label>
  );
}

/* the message is text, never colour alone */
function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-[13px] text-[#F0A79E]">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: keyof ContactFields & string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="mt-6 first:mt-0">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={control(!!error)}
      />
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}
