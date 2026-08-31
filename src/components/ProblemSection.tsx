import { CONTEXT_DECAY } from "@/lib/demo-data";

export function ProblemSection() {
  const d = CONTEXT_DECAY;
  const ex = d.example;

  return (
    <section id="problem" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>

        <h2 className="mt-7 max-w-[24ch] font-display text-[2.1rem] leading-[1.04] tracking-[-0.025em] text-foreground sm:text-[2.7rem] lg:text-[3.1rem]">
          {d.headline}
        </h2>

        <p className="mt-8 max-w-[58ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {d.body}
        </p>

        {/* one concrete example — static */}
        <div className="mt-14 border-t border-foreground/15 pt-10 lg:mt-16">
          <div className="flex items-start gap-3">
            <span className="mt-[3px] font-mono text-[11px] font-medium tracking-[0.1em] text-accent">
              Q
            </span>
            <p className="font-display text-[19px] leading-[1.25] tracking-[-0.015em] text-foreground lg:text-[22px]">
              {ex.question}
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-16">
            <div>
              <p className="label-mono text-muted-foreground">Without Provenance</p>
              <p className="mt-3 text-[14.5px] leading-[1.55] text-graphite">{ex.without}</p>
            </div>

            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <p className="label-mono !text-accent">With Provenance</p>
              <dl className="mt-3 space-y-3">
                {ex.withParts.map((p) => (
                  <div key={p.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.13em] text-muted-foreground">
                      {p.label}
                    </dt>
                    <dd className="mt-1 text-[14.5px] leading-[1.5] text-foreground">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
