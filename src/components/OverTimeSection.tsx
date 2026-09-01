import { OVER_TIME } from "@/lib/demo-data";
import { SitePlan } from "./SitePlan";

const HOME = { name: "Westmount Centre", plan: "anchored" };

export function OverTimeSection() {
  const d = OVER_TIME;
  return (
    <section id="vision" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>

        <div className="mt-7 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <h2 className="font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
              {d.headline[0]}
              <br />
              {d.headline[1]}
              <br />
              <span className="text-graphite">{d.headline[2]}</span>
            </h2>
            <p className="mt-7 max-w-[50ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
              {d.body}
            </p>

            <div className="mt-12 grid gap-8 border-t border-foreground/15 pt-8 sm:grid-cols-2 sm:gap-12">
              {[d.today, d.later].map((col) => (
                <div key={col.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {col.label}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {col.items.map((item) => (
                      <li key={item} className="text-[14.5px] text-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* the property stays put; the people around it turn over */}
          <div className="lg:pt-2">
            <div className="relative">
              <SitePlan plan={HOME.plan} hero />
              <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground">
                {HOME.name} &nbsp;·&nbsp; 2012 &ndash; present
              </p>
            </div>

            <ul className="mt-7 space-y-2.5 border-t border-foreground/15 pt-6">
              {[
                { yr: "2012", who: "Acquisitions team", note: "since moved on" },
                { yr: "2018", who: "Second asset manager", note: "since moved on" },
                { yr: "2024", who: "Current development team", note: "in place" },
              ].map((r) => (
                <li key={r.yr} className="flex items-baseline gap-4 text-[13.5px]">
                  <span className="w-9 shrink-0 font-mono text-[11px] tabular-nums text-graphite">
                    {r.yr}
                  </span>
                  <span className="flex-1 text-foreground">{r.who}</span>
                  <span className="text-[12px] text-muted-foreground">{r.note}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-l-2 border-accent pl-5 font-display text-[1.3rem] leading-[1.2] tracking-[-0.02em] text-foreground">
              {d.payoff}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
