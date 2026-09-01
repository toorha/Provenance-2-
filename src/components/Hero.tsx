import { HERO } from "@/lib/demo-data";

export function Hero() {
  return (
    <section className="tex tex-paper tex-draft relative flex min-h-[86vh] items-center overflow-hidden bg-background pt-32 pb-24 lg:min-h-screen lg:pt-28">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="max-w-[54rem]">
          <p className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.16em] text-muted-foreground sm:text-[10.5px]">
            {HERO.eyebrow}
          </p>

          <h1 className="mt-8 max-w-[19ch] font-display text-[2.3rem] leading-[1.04] tracking-[-0.028em] text-foreground sm:text-[2.9rem] lg:text-[3.3rem]">
            {HERO.headline}
          </h1>

          <p className="mt-8 max-w-[58ch] text-[17px] leading-[1.62] text-graphite lg:text-[18px]">
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

          <p className="mt-14 border-t border-foreground/10 pt-5 text-[13px] leading-[1.5] text-muted-foreground">
            {HERO.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
