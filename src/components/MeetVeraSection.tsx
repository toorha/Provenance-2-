import { VERA } from "@/lib/demo-data";

/* ------------------------------------------------------------------ *
 * MEET VERA — the today section.
 *
 * This one answers "what would I use this for tomorrow", so it stays
 * on the teammate and the three jobs. The memory argument comes later,
 * once the immediate use is obvious.
 * ------------------------------------------------------------------ */
export function MeetVeraSection() {
  return (
    <section
      id="vera"
      className="tex tex-paper relative bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{VERA.label}</p>

        <h2 className="mt-6 max-w-[19ch] font-display text-[2.25rem] leading-[1.06] tracking-[-0.028em] text-foreground sm:text-[2.6rem] lg:text-[3rem]">
          {VERA.headline}
        </h2>

        <p className="mt-7 max-w-[64ch] text-[18px] leading-[1.6] text-graphite lg:text-[19px]">
          {VERA.body}
        </p>

        {/* the three jobs, named once before the product frame shows them */}
        <ol className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3 lg:mt-16">
          {VERA.jobs.map((job, i) => (
            <li key={job.id} className="bg-surface p-6 lg:p-7">
              <p className="text-[10.5px] uppercase tracking-[0.07em] text-steel">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-foreground">
                {job.name}
              </p>
              <p className="mt-2 text-[14.5px] leading-[1.55] text-graphite">
                {job.line}
              </p>
            </li>
          ))}
        </ol>

        {/* the bridge to the second half of the page */}
        <div className="mt-14 border-t border-border pt-10 lg:mt-16">
          <p className="max-w-[24ch] font-display text-[1.6rem] leading-[1.16] tracking-[-0.026em] text-foreground sm:text-[2rem]">
            {VERA.bridge.line}
          </p>

          <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2 sm:gap-10">
            <p className="border-l-2 border-accent pl-5 text-[15.5px] leading-[1.55] text-foreground">
              {VERA.bridge.today}
            </p>
            <p className="border-l-2 border-steel/40 pl-5 text-[15.5px] leading-[1.55] text-graphite">
              {VERA.bridge.later}
            </p>
          </div>

          <p className="mt-9 text-[15px] font-medium text-steel">
            {VERA.bridge.payoff.join(" ")}
          </p>
        </div>
      </div>
    </section>
  );
}
