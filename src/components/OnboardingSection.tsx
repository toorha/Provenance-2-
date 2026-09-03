import { VeraMark } from "./Logo";
import { ONBOARDING } from "@/lib/demo-data";

/* ------------------------------------------------------------------ *
 * ONBOARDING — the most concrete thing Vera does for a new person.
 * One ask, one brief, no chrome around it beyond what the brief needs
 * to read as a document rather than another card.
 * ------------------------------------------------------------------ */
export function OnboardingSection() {
  const d = ONBOARDING;
  const b = d.brief;

  return (
    <section
      id="onboarding"
      className="tex tex-paper relative bg-stone py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>

        <div className="mt-6 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-20">
          <div>
            <h2 className="max-w-[16ch] font-display text-[2.25rem] leading-[1.06] tracking-[-0.028em] text-foreground sm:text-[2.6rem] lg:text-[2.9rem]">
              {d.headline}
            </h2>

            <p className="mt-7 max-w-[54ch] text-[18px] leading-[1.6] text-graphite lg:text-[19px]">
              {d.body}
            </p>

            {/* what someone actually types */}
            <div className="mt-10 border-l-2 border-accent pl-5">
              <p className="text-[10px] uppercase tracking-[0.07em] text-steel">
                Ask Vera
              </p>
              <p className="mt-2 max-w-[46ch] text-[17px] leading-[1.5] text-foreground">
                {d.ask}
              </p>
            </div>

            <p className="mt-10 max-w-[52ch] text-[16px] leading-[1.6] text-steel">
              {d.payoff}
            </p>
          </div>

          {/* what comes back */}
          <div className="rounded-md border border-border bg-surface shadow-[0_1px_2px_rgba(18,26,30,0.05),0_24px_48px_-32px_rgba(18,26,30,0.35)]">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
              <VeraMark className="h-[15px] w-auto shrink-0 text-foreground" />
              <span className="text-[9.5px] uppercase tracking-[0.07em] text-steel">
                {b.property}
              </span>
            </div>

            <div className="px-5 py-5">
              <p className="text-[16px] font-semibold tracking-[-0.012em] text-foreground">
                {b.title}
              </p>

              <dl className="mt-5 space-y-4">
                {b.sections.map((sec) => (
                  <div key={sec.label}>
                    <dt className="text-[9.5px] uppercase tracking-[0.07em] text-accent">
                      {sec.label}
                    </dt>
                    <dd className="mt-1.5 space-y-1">
                      {sec.lines.map((line) => (
                        <p
                          key={line}
                          className="text-[14px] leading-[1.5] text-foreground"
                        >
                          {line}
                        </p>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <span className="text-[10px] uppercase tracking-[0.06em] text-muted-light">
                  {b.sources}
                </span>
                <span className="rounded border border-accent-deep bg-accent px-3.5 py-[7px] text-[12.5px] font-semibold text-accent-foreground">
                  {b.action}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
