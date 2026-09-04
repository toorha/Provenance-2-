import { CALL_URL } from "@/lib/contact";

/* The other way through, shared by Contact and Request access.

   ONE IMPLEMENTATION. It appeared on two pages within a day of being written,
   which is exactly how a site ends up with two calendar links that drift
   apart in wording and then in destination. The closing CTA already learned
   this lesson the hard way.

   It is never the page's primary action. On both pages the form is what the
   page is for, so this sits after it behind a rule: an alternative for
   somebody who would rather talk, not a competing button above the thing
   they came to do. */

export function BookACall({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="text-heading-3 text-paper">Would rather talk?</h2>
      <p className="mt-4 max-w-[38ch] text-body text-paper-muted">
        Book a call and we will walk through what your team is dealing with
        today.
      </p>
      <a
        href={CALL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-2.5 text-[15px] font-semibold text-paper transition-colors duration-instant hover:text-white"
      >
        Book a call
        <svg
          viewBox="0 0 14 14"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" />
        </svg>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
