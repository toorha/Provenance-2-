import { CurrentWorkDemo } from "./CurrentWorkDemo";
import { CONTEXT_DECAY } from "@/lib/demo-data";

export function ProblemSection() {
  const d = CONTEXT_DECAY;
  return (
    <section id="problem" className="tex tex-paper bg-bone py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>

        <h2 className="mt-7 max-w-[20ch] font-display text-[2.2rem] leading-[1.02] tracking-[-0.026em] text-foreground sm:text-[2.9rem] lg:text-[3.4rem]">
          {d.headline}
        </h2>

        <p className="mt-9 max-w-[54ch] text-[17.5px] font-normal leading-[1.6] text-graphite lg:text-[18.5px]">
          {d.body}
        </p>

        <p className="mt-10 max-w-[24ch] border-l-2 border-accent pl-6 font-display text-[22px] leading-[1.2] tracking-[-0.022em] text-foreground lg:text-[27px]">
          {d.payoff}
        </p>

        {/* current value, shown */}
        <div className="mt-20 lg:mt-24">
          <p className="label-mono text-muted-foreground">Current value</p>
          <p className="mt-3 max-w-[50ch] text-[16px] leading-[1.55] text-graphite">
            Provenance sits on the day-to-day work and turns it into a record as it happens.
          </p>
          <div className="mt-7">
            <CurrentWorkDemo />
          </div>
        </div>

        {/* the cost — structural, no boxes */}
        <div className="mt-20 border-t border-foreground/20 pt-12 lg:mt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,23rem)_1fr] lg:gap-20">
            <div>
              <p className="label-mono text-muted-foreground">What that costs</p>
              <p className="mt-5 font-display text-[22px] leading-[1.18] tracking-[-0.022em] text-foreground lg:text-[26px]">
                {d.consequence}
              </p>
            </div>

            <ol className="grid border-t border-border sm:grid-cols-3 sm:border-t-0">
              {d.consequencePoints.map((point, i) => (
                <li
                  key={point}
                  className="border-b border-border py-6 sm:border-b-0 sm:border-l sm:px-7 sm:py-0 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="font-mono text-[11px] font-medium tabular-nums tracking-[0.1em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-[15px] leading-[1.5] text-graphite lg:text-[15.5px]">
                    {point}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
