import { PortfolioField } from "./PortfolioField";
import { HERO } from "@/lib/demo-data";

export function Hero() {
  return (
    <section className="tex tex-paper relative flex min-h-screen items-center overflow-hidden bg-background pt-28 pb-20 lg:pt-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
          <div className="max-w-xl">
            <h1 className="font-display text-[2.5rem] leading-[1.0] tracking-[-0.03em] text-foreground sm:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem]">
              {HERO.headline[0]}
              <br />
              <span className="text-graphite">{HERO.headline[1]}</span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-[16.5px] leading-[1.62] text-graphite lg:text-[17.5px]">
              {HERO.body}
            </p>
            <div className="mt-10 flex flex-col gap-x-7 gap-y-4 sm:flex-row sm:items-center">
              <a
                href="#request-access"
                className="inline-flex items-center justify-center rounded-[2px] bg-accent px-7 py-[13px] text-[13.5px] font-medium tracking-[0.01em] text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
              >
                {HERO.primary}
              </a>
              <a
                href="#how-it-works"
                className="text-[13.5px] font-medium text-graphite transition-colors duration-300 hover:text-foreground"
              >
                {HERO.secondary}
              </a>
            </div>
          </div>

          <div className="lg:pl-2">
            <PortfolioField />
          </div>
        </div>
      </div>
    </section>
  );
}
