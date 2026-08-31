import { TEAMS } from "@/lib/demo-data";

export function TeamsSection() {
  return (
    <section className="tex tex-paper bg-secondary py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{TEAMS.label}</p>

        <h2 className="mt-7 max-w-[16ch] font-display text-display-sm leading-[1.04] text-foreground sm:text-[2.7rem]">
          {TEAMS.headline}
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-3">
          {TEAMS.chain.map((team, i) => (
            <span key={team} className="flex items-center gap-2.5">
              <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-graphite">
                {team}
              </span>
              {i < TEAMS.chain.length - 1 && (
                <span className="text-border-dark" aria-hidden="true">
                  &rarr;
                </span>
              )}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-[44ch] border-l-2 border-accent pl-6 font-display text-[20px] leading-[1.22] tracking-[-0.02em] text-foreground lg:text-[24px]">
          {TEAMS.line}
        </p>
      </div>
    </section>
  );
}
