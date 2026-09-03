"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { submitRequestAccess } from "./actions";
import {
  MESSAGE_MAX,
  PORTFOLIO_SIZES,
  ROLES,
  normalize,
  validate,
  type FieldErrors,
  type RequestAccessFields,
} from "@/lib/request-access/schema";

/* The form.

   Inputs sit on canvas-2 with a hairline rather than on a white card: a
   bright panel here would look like an embedded third-party form, which is
   the one thing an institutional request page cannot look like.

   Errors appear only after a field has been submitted once or blurred after
   an attempt, so the form never scolds you for a field you have not finished
   typing. Each message is tied to its input with aria-describedby and the
   input carries aria-invalid, so the error is not conveyed by colour alone.

   The honeypot is a real field with a real label, hidden from sight and from
   the accessibility tree, and marked tabIndex -1 so keyboard users skip it.
   Only something filling the DOM blindly will touch it. */

const EMPTY: RequestAccessFields = {
  name: "",
  workEmail: "",
  company: "",
  role: "",
  portfolioSize: "",
  message: "",
};

export function RequestAccessForm() {
  const [values, setValues] = useState<RequestAccessFields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const website = useRef<HTMLInputElement | null>(null);
  const successRef = useRef<HTMLHeadingElement | null>(null);

  /* attribution, read from the URL rather than asked for */
  const utm = useRef<{ s?: string; m?: string; c?: string }>({});
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    utm.current = {
      s: p.get("utm_source") ?? undefined,
      m: p.get("utm_medium") ?? undefined,
      c: p.get("utm_campaign") ?? undefined,
    };
  }, []);

  /* focus moves to the confirmation so a screen reader lands on the outcome
     rather than staying on a button that no longer exists */
  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const set = (k: keyof RequestAccessFields) => (v: string) => {
    setValues((s) => {
      const next = { ...s, [k]: v };
      if (showErrors) setErrors(validate(normalize(next)));
      return next;
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;

    const fields = normalize(values);
    const found = validate(fields);
    setErrors(found);
    setShowErrors(true);
    setFormError(null);

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setPending(true);
    try {
      const res = await submitRequestAccess({
        ...fields,
        website: website.current?.value ?? "",
        utmSource: utm.current.s,
        utmMedium: utm.current.m,
        utmCampaign: utm.current.c,
      });
      if (res.ok) {
        setDone(true);
      } else if ("fieldErrors" in res) {
        setErrors(res.fieldErrors);
        const first = Object.keys(res.fieldErrors)[0];
        document.getElementById(first)?.focus();
      } else {
        setFormError(res.formError);
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-[46ch]">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-paper outline-none sm:text-[2.125rem]"
        >
          Thanks. We&rsquo;ll be in touch.
        </h2>
        <p className="mt-5 text-body text-paper-muted">
          We received your request and will follow up at the work email you
          provided.
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
      {/* announced only when it appears, and never on every keystroke */}
      <div aria-live="polite" className="sr-only">
        {pending ? "Submitting your request" : ""}
      </div>

      <Field
        id="name"
        label="Name"
        value={values.name}
        onChange={set("name")}
        error={showErrors ? errors.name : undefined}
        autoComplete="name"
      />
      <Field
        id="workEmail"
        label="Work email"
        type="email"
        value={values.workEmail}
        onChange={set("workEmail")}
        error={showErrors ? errors.workEmail : undefined}
        autoComplete="email"
      />
      <Field
        id="company"
        label="Company"
        value={values.company}
        onChange={set("company")}
        error={showErrors ? errors.company : undefined}
        autoComplete="organization"
      />

      <Select
        id="role"
        label="Role"
        value={values.role}
        onChange={set("role")}
        error={showErrors ? errors.role : undefined}
        placeholder="Select a role"
        options={ROLES}
      />
      <Select
        id="portfolioSize"
        label="Portfolio size"
        optional
        value={values.portfolioSize}
        onChange={set("portfolioSize")}
        error={showErrors ? errors.portfolioSize : undefined}
        placeholder="Select a range"
        options={PORTFOLIO_SIZES}
      />

      <div className="mt-6">
        <Label htmlFor="message">
          What would you want Provenance to help with?
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
          placeholder="Tell us about the problem, workflow, or property context your team struggles to keep track of."
          className={control(showErrors && !!errors.message, "min-h-[132px] py-3")}
        />
        <ErrorText id="message-error" message={showErrors ? errors.message : undefined} />
      </div>

      {/* honeypot: hidden from sight, from assistive tech, and from tab order */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input
          ref={website}
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-7 border-l-2 border-[#E0655A] pl-3 text-body-sm text-paper"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className={clsx(
          "mt-9 inline-flex h-11 min-w-[168px] cursor-pointer items-center justify-center rounded-control px-5 text-button",
          "transition-colors duration-instant",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          pending
            ? "cursor-not-allowed bg-paper-muted text-canvas"
            : "bg-paper text-canvas hover:bg-white",
        )}
      >
        {pending ? "Submitting…" : "Request access"}
      </button>

      <p className="mt-6 max-w-[52ch] text-[13px] leading-[1.5] text-paper-subtle">
        By submitting, you agree that Provenance may contact you about your
        request.
      </p>
    </form>
  );
}

/* ── the pieces ────────────────────────────────────────────────────────── */

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
      {optional && (
        <span className="ml-2 text-paper-subtle">(optional)</span>
      )}
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
  id: keyof RequestAccessFields & string;
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

function Select({
  id,
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
  optional,
}: {
  id: keyof RequestAccessFields & string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: readonly string[];
  placeholder: string;
  optional?: boolean;
}) {
  return (
    <div className="mt-6">
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(control(!!error), "cursor-pointer appearance-none")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='none'><path d='M2 4l3 3 3-3' stroke='%23A9B0AA' stroke-width='1.5'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-canvas-2 text-paper">
            {o}
          </option>
        ))}
      </select>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}
