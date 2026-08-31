import { CTA } from "@/lib/demo-data";

export function LongViewSection() {
  return (
    <section
      id="request-access"
      className="tex tex-film edge-top relative overflow-hidden bg-charcoal-deep py-28 text-bone lg:py-36"
    >
      <div className="glow-pool pointer-events-none absolute inset-0 z-0" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="max-w-[16ch] font-display text-[2.4rem] leading-[1.02] tracking-[-0.03em] text-bone sm:text-[3.2rem] lg:text-[3.6rem]">
          {CTA.headline}
        </h2>
        <p className="mt-7 max-w-[40rem] text-[17px] leading-[1.6] text-bone/55">
          {CTA.body}
        </p>

        <div className="mt-10 border-t border-bone/12 pt-10">
          <a
            href="#request-access"
            className="inline-flex w-fit items-center justify-center rounded-[2px] bg-bone px-7 py-[13px] text-[13.5px] font-medium tracking-[0.01em] text-charcoal-deep transition-colors duration-300 hover:bg-white"
          >
            {CTA.action}
          </a>
        </div>
      </div>
    </section>
  );
}
