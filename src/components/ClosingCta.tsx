import { CTA } from "@/lib/demo-data";

/* The closing block, shared by the homepage and the Thesis page.

   This is the Thesis page's treatment, which was the better of the two: a
   large light-weight headline, one line beneath it, then a rule and a plain
   linked action rather than a filled button. The rule does the work the
   filled button was doing, and the page ends on type instead of on a control.

   There is no second implementation any more. The homepage used to close with
   a variant of its own, which meant two closings drifting apart and a site
   that read as two sites at the bottom.

   The dead classes this used to carry (tex, tex-film, edge-top, glow-pool,
   bg-accent-deep, bg-surface, text-accent-deep) were all from the retired
   light-first system and resolved to nothing, so the block was already
   rendering transparent on the canvas with an unstyled link. They are gone
   rather than left to quietly do nothing, and the rule now uses a real
   hairline instead of Tailwind's default grey. */

export function ClosingCta() {
  return (
    <section id="access" className="section-major anchor-offset bg-canvas">
      <div className="track">
        <h2 className="max-w-[16ch] text-[2.4rem] leading-[1.02] tracking-[-0.032em] text-paper sm:text-[3.1rem] lg:text-[3.5rem]">
          {CTA.headline}
        </h2>
        <p className="mt-7 max-w-[40rem] text-[18px] leading-[1.6] text-paper-muted lg:text-[19px]">
          {CTA.body}
        </p>

        <div className="mt-10 border-t border-[rgba(243,244,240,0.16)] pt-10">
          <a
            href={CTA.callUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-fit items-center gap-2.5 text-[15px] font-semibold text-paper transition-colors duration-instant hover:text-white"
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
