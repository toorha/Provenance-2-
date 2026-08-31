export function LongViewSection() {
  return (
    <section className="tex tex-film edge-top relative overflow-hidden bg-charcoal-deep py-28 text-bone lg:py-40">
      <div className="glow-pool pointer-events-none absolute inset-0 z-0" />

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <p className="label-mono text-bone/35">The long view</p>
        <h2 className="mt-8 max-w-[18ch] font-display text-[2.6rem] leading-[1.0] tracking-[-0.03em] text-bone text-balance sm:text-[3.4rem] lg:text-[4rem]">
          Buildings outlive the people who work on them.
          <span className="text-bone/40"> Their context should too.</span>
        </h2>
        <p className="mt-10 max-w-[46rem] text-[17px] leading-[1.6] text-bone/55 lg:text-[18px]">
          Provenance keeps track of what&rsquo;s happening to a property now,
          preserves why decisions were made, and carries that context forward
          through employees, teams, projects and eventually ownership.
        </p>

        <div className="mt-12 flex flex-col gap-6 border-t border-bone/12 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#request-access"
            className="inline-flex w-fit items-center justify-center rounded-[2px] bg-bone px-7 py-[13px] text-[13.5px] font-medium tracking-[0.01em] text-charcoal-deep transition-colors duration-300 hover:bg-white"
          >
            Request early access
          </a>
          <p className="font-display text-[19px] tracking-[-0.015em] text-bone/70 lg:text-[22px]">
            Keep track of what&rsquo;s happening now. Never lose why it happened.
          </p>
        </div>
      </div>
    </section>
  );
}
