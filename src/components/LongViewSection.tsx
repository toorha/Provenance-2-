export function LongViewSection() {
  return (
    <section
      id="request-access"
      className="tex tex-film edge-top relative overflow-hidden bg-charcoal-deep py-28 text-bone lg:py-36"
    >
      <div className="glow-pool pointer-events-none absolute inset-0 z-0" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="label-mono text-bone/35">The long view</p>
        <h2 className="mt-8 max-w-[18ch] font-display text-[2.6rem] leading-[1.0] tracking-[-0.03em] text-bone text-balance sm:text-[3.4rem] lg:text-[4rem]">
          Buildings outlive the people who work on them.
          <span className="text-bone/40"> Their context should too.</span>
        </h2>
        <p className="mt-8 max-w-[42rem] text-[17px] leading-[1.6] text-bone/55 lg:text-[18px]">
          Provenance is building the memory layer for commercial real estate.
        </p>

        <div className="mt-10 border-t border-bone/12 pt-10">
          <a
            href="#request-access"
            className="inline-flex w-fit items-center justify-center rounded-[2px] bg-bone px-7 py-[13px] text-[13.5px] font-medium tracking-[0.01em] text-charcoal-deep transition-colors duration-300 hover:bg-white"
          >
            Request early access
          </a>
        </div>
      </div>
    </section>
  );
}
