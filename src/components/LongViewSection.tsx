import { CTA } from "@/lib/demo-data";

export function LongViewSection() {
  return (
    <section
      id="book-a-call"
      className="tex tex-film edge-top relative overflow-hidden bg-accent-deep py-28 text-paper lg:py-36"
    >
      <div className="glow-pool pointer-events-none absolute inset-0 z-0" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="max-w-[16ch] font-display text-[2.4rem] leading-[1.02] tracking-[-0.032em] text-paper sm:text-[3.1rem] lg:text-[3.5rem]">
          {CTA.headline}
        </h2>
        <p className="mt-7 max-w-[40rem] text-[18px] leading-[1.6] text-paper-muted lg:text-[19px]">
          {CTA.body}
        </p>

        <div className="mt-10 border-t border-surface/15 pt-10">
          <a
            href={CTA.callUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2.5 rounded bg-surface px-7 py-[13px] text-[15px] font-semibold text-accent-deep shadow-[0_1px_0_rgba(0,0,0,0.18)] transition-all duration-150 hover:bg-white active:translate-y-px active:shadow-none"
          >
            {CTA.call}
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
          </a>
        </div>
      </div>
    </section>
  );
}
