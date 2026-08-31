import { CONTEXT_DECAY } from "@/lib/demo-data";

export function ProblemSection() {
  const d = CONTEXT_DECAY;

  return (
    <section id="problem" className="tex tex-paper bg-bone py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>

        <h2 className="mt-7 max-w-[20ch] font-display text-[2.2rem] leading-[1.03] tracking-[-0.026em] text-foreground sm:text-[2.9rem] lg:text-[3.5rem]">
          {d.headline}
        </h2>

        <p className="mt-8 max-w-[56ch] text-[17px] leading-[1.65] text-graphite lg:text-[18px]">
          {d.body}
        </p>

        {/* the property brief */}
        <div className="mt-16 lg:mt-20">
          <div className="flex items-start gap-3">
            <span className="mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full bg-accent" />
            <p className="font-display text-[1.55rem] leading-[1.2] tracking-[-0.02em] text-foreground sm:text-[1.9rem]">
              {d.brief.question}
            </p>
          </div>

          <div className="mt-8 border-l-2 border-accent pl-6 lg:pl-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Provenance &nbsp;·&nbsp; property brief
            </p>

            <dl className="mt-6 space-y-6">
              {d.brief.fields.map((f) => (
                <div key={f.label} className="grid gap-1.5 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                  <dt className="text-[13px] font-semibold text-graphite">{f.label}</dt>
                  <dd className="max-w-[54ch] text-[15.5px] leading-[1.55] text-foreground">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-t border-border pt-5">
              <div className="grid gap-1.5 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                <p className="text-[13px] font-semibold text-graphite">Where this came from</p>
                <div>
                  <p className="text-[14px] leading-[1.6] text-foreground">
                    {d.brief.sources.join("  ·  ")}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {d.brief.sources.length} linked sources
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5 sm:pl-[calc(10rem+2rem)]">
                {d.brief.actions.map((a, i) => (
                  <button
                    key={a}
                    type="button"
                    className={
                      i === 0
                        ? "rounded-[2px] bg-accent px-4 py-[7px] text-[12px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
                        : "rounded-[2px] border border-border px-4 py-[7px] text-[12px] font-medium text-graphite transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
                    }
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* the time dimension */}
        <div className="mt-20 border-t border-foreground/15 pt-14 lg:mt-28">
          <h3 className="max-w-[24ch] font-display text-[1.7rem] leading-[1.12] tracking-[-0.022em] text-foreground sm:text-[2.1rem]">
            {d.time.headline}
          </h3>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-graphite">
            {d.time.body}
          </p>

          <div className="mt-10 grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Today
              </p>
              <p className="mt-2 text-[15px] leading-[1.5] text-foreground">{d.time.today}</p>
            </div>
            <span className="hidden text-border-dark sm:block" aria-hidden="true">
              &rarr;
            </span>
            <div className="border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Later
              </p>
              <p className="mt-2 text-[15px] leading-[1.5] text-foreground">{d.time.later}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
