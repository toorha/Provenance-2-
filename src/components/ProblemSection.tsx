import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/* HOMEPAGE.md §5, Section 2. Layout A, one column, typography only.

   THE PROBLEM IS NOT THAT SEARCH IS SLOW. An earlier version led with
   "simple questions should not require a scavenger hunt" and three worked
   questions, which framed Provenance as document search and made the product
   look like a faster way to find a file. Meet Vera already proves the
   question answering, and proves it far better than a static list of
   questions ever could.

   The real problem is structural and it compounds. A property runs for
   decades, records pile up across people and systems, some are duplicated,
   some are buried, some are gone, and the reasoning that connected them was
   never written down anywhere. Then the people who held that reasoning leave.

   So the three items here are not questions a visitor could go and answer.
   They are the three things that are genuinely hard to reconstruct, and the
   difficulty is not finding one document: it is rebuilding the story running
   through many of them, across years and across people.

   No cards, no boxes. Rules and space. */

const LOST = [
  { label: "Why", ask: "Why was this decision made?" },
  { label: "What changed", ask: "What happened after it?" },
  {
    label: "What matters now",
    ask: "Does that history change what we should do today?",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="section anchor-offset bg-canvas">
      <div className="track">
        {/* ── the statement ────────────────────────────────────────────── */}
        <div className="grid12">
          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <SectionLabel>The problem</SectionLabel>
          </Reveal>
        </div>

        <div className="grid12 mt-5">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-9">
            <h2 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] text-paper sm:text-[2.125rem] lg:text-[3rem] lg:leading-[1.06] lg:tracking-[-0.018em]">
              Every property accumulates years of history. Almost none have a
              complete memory.
            </h2>
          </Reveal>
        </div>

        <div className="grid12 mt-7">
          <Reveal delay={60} className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="text-lead text-paper-muted">
              Drawings, reports, approvals, emails, repairs, leases, and
              decisions end up scattered across different people and systems.
              Some are buried. Some disappear entirely.
            </p>
            {/* the second half of the problem, and the harder half. Kept as
                its own block because it is a different point, not a
                continuation of the list above it. */}
            <p className="mt-5 text-lead text-paper">
              And even when the files survive, the reasoning connecting them
              usually does not.
            </p>
          </Reveal>
        </div>

        {/* ── what is actually hard to reconstruct ─────────────────────── */}
        <div className="grid12 mt-14 md:mt-16">
          {LOST.map((l, i) => (
            <Reveal
              key={l.label}
              delay={i * 60}
              className="col-span-12 md:col-span-3 lg:col-span-4"
            >
              <hr className="rule-full" />
              <div className="py-6 md:py-7">
                <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
                  {l.label}
                </p>
                <p className="mt-3 max-w-[24ch] text-[1.125rem] leading-[1.4] tracking-[-0.006em] text-paper/90 sm:text-[1.25rem]">
                  {l.ask}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── the consequence, in two blocks ───────────────────────────── */}
        <div className="grid12 mt-12 md:mt-14">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-8">
            <p className="text-body text-paper md:text-lead">
              Properties keep accumulating records while the people who
              understand them keep changing.
            </p>
            {/* the term is named and defined in the same breath, so it never
                stands alone as a slogan */}
            <p className="mt-5 text-body text-paper-muted md:text-lead">
              Over time, that creates{" "}
              <span className="font-medium text-vera-400">corporate amnesia</span>:
              the organization keeps the files, but loses why decisions were
              made, what changed, and what still matters.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
