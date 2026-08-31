import { OVER_TIME } from "@/lib/demo-data";

export function OverTimeSection() {
  const d = OVER_TIME;
  return (
    <section id="vision" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>
        <h2 className="mt-7 max-w-[18ch] font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {d.headline}
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {d.body}
        </p>

        {/* the same work, deepening */}
        <ol className="mt-14 grid border-t border-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
          {d.stages.map((s, i) => (
            <li
              key={s.year}
              className="border-b border-foreground/10 py-6 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 lg:py-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                {s.year}
              </span>
              <p className="mt-3 text-[15px] font-medium text-foreground">{s.title}</p>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-graphite">{s.detail}</p>
              {/* the record thickens */}
              <span
                aria-hidden="true"
                className="mt-5 block bg-accent/70"
                style={{ height: 1 + i * 2 }}
              />
            </li>
          ))}
        </ol>

        {/* today / over time */}
        <div className="mt-16 grid gap-8 border-t border-foreground/15 pt-10 sm:grid-cols-2 sm:gap-16">
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

        <p className="mt-14 max-w-[26ch] border-l-2 border-accent pl-6 font-display text-[1.5rem] leading-[1.2] tracking-[-0.022em] text-foreground sm:text-[1.85rem]">
          {d.payoff}
        </p>
      </div>
    </section>
  );
}
