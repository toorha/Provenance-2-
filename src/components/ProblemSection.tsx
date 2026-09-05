import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/* HOMEPAGE.md §5, Section 2. Layout A, one column, typography only.

   THE PROBLEM IS NOT THAT SEARCH IS SLOW. An earlier version led with
   "simple questions should not require a scavenger hunt" and three worked
   questions, which framed Provenance as document search and made the product
   look like a faster way to find a file. Meet Vera already proves the
   question answering, and proves it far better than a static list ever could.

   The real problem is structural and it compounds. A property runs for
   decades, records pile up across people and systems, some are buried, some
   are gone, and the reasoning that connected them was never written down.
   Then the people who held that reasoning leave.

   IT SAID THAT THREE TIMES. There was a row of three questions — why, what
   changed, what matters now — sitting between a line about reasoning not
   surviving and a closing line about losing why decisions were made, what
   changed and what still matters. Three statements of one idea, and the row
   was the weakest of them, because a question a visitor cannot answer is not
   an argument, it is a prompt with nowhere to go.

   What is left is four moves and about seventy words: what piles up, what
   goes missing, the turn, and what it costs. Long enough to be true, short
   enough to land before anybody scrolls past it.

   No cards, no boxes. Rules and space. */

export function ProblemSection() {
  return (
    <section id="problem" className="section anchor-offset bg-canvas">
      <div className="track">
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
              Drawings, reports, approvals, emails, leases and decisions end up
              spread across people and systems. Some are buried. Some are gone.
            </p>
            {/* The turn, and the only line in the section set in full paper:
                everything above it is the setup and everything below it is the
                cost. Two short sentences because it is the point. */}
            <p className="mt-6 text-lead text-paper">
              The files usually survive. The reasoning that connected them does
              not.
            </p>
          </Reveal>
        </div>

        <div className="grid12 mt-12 md:mt-14">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-8">
            {/* the term is named and defined in the same breath, so it never
                stands alone as a slogan */}
            <p className="text-body text-paper-muted md:text-lead">
              So every time the team changes, part of the property is relearned
              from scratch. That is{" "}
              <span className="font-medium text-vera-400">
                corporate amnesia
              </span>
              : the records remain, the thinking behind them is gone.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
