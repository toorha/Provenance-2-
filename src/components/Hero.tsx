import { HeroBuilding } from "./HeroBuilding";

export function Hero() {
  return (
    <section className="tex tex-film relative flex min-h-screen items-center overflow-hidden bg-charcoal-deep pt-28 pb-16 text-bone lg:pt-24">
      {/* light falls from the upper right, where the object sits */}
      <div className="glow-pool pointer-events-none absolute inset-0 z-0" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] lg:gap-14">
          <div className="max-w-xl">
            <h1 className="font-display text-[2.6rem] leading-[0.99] tracking-[-0.03em] text-bone sm:text-[3.2rem] lg:text-[3.6rem] xl:text-[4.1rem]">
              Buildings outlive the people who work on&nbsp;them. Their context
              should&nbsp;too.
            </h1>
            <p className="mt-8 max-w-[32rem] text-[16.5px] leading-[1.6] text-bone/60 lg:text-[17.5px]">
              Every property accumulates years of decisions, repairs, leases, approvals
              and change. Provenance keeps that context attached to the asset.
            </p>
            <div className="mt-10 flex flex-col gap-x-7 gap-y-4 sm:flex-row sm:items-center">
              <a
                href="#request-access"
                className="group inline-flex items-center justify-center rounded-[2px] bg-bone px-7 py-[13px] text-[13.5px] font-medium tracking-[0.01em] text-charcoal-deep transition-colors duration-300 hover:bg-white"
              >
                Request early access
              </a>
              <a
                href="#how-it-works"
                className="label-mono text-bone/45 transition-colors duration-300 hover:text-bone"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="lg:pl-4">
            <HeroBuilding />
          </div>
        </div>
      </div>
    </section>
  );
}
