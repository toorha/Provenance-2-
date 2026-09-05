import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/* HOMEPAGE.md §5, Section 2. Layout A, one column, typography only.

   THE PROBLEM IS NOT THAT SEARCH IS SLOW. An earlier version led with
   "simple questions should not require a scavenger hunt" and three worked
   questions, which framed Provenance as document search and made the product
   look like a faster way to find a file. Meet Vera already proves the
   question answering, and proves it far better than a static list ever could.

   THE HEADLINE NAMES THE PAIN RATHER THAN THE CONDITION. It used to read
   "Every property accumulates years of history. Almost none have a complete
   memory", which is accurate and abstract: a visitor had to do the work of
   turning "no complete memory" into something that happens to them.

   THREE LEVELS, AND NOTHING ELSE. Headline, support, conclusion.

   It used to run headline, paragraph, a bold standalone line, a large gap,
   another paragraph, and a highlighted phrase: six beats in four typographic
   treatments, which reads as a stack of separate copy blocks rather than as
   one argument. The standalone line about reasoning not surviving was the
   worst of it, because it was a whole beat spent on a clause, and the clause
   now sits inside the support paragraph where it belongs.

   The three levels are separated by colour and measure, never by size:
   support is muted at the full measure, the conclusion is paper at a shorter
   one. Making the conclusion bigger would have given the section a second
   headline and split the argument in half again.

   One rhythm throughout: 36px under the label, 44px between every beat after
   it. No cards, no boxes, no rules. */

export function ProblemSection() {
  return (
    <section id="problem" className="section anchor-offset bg-canvas">
      <div className="track">
        <div className="grid12">
          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <SectionLabel>The problem</SectionLabel>
          </Reveal>
        </div>

        {/* one column, three beats: the argument runs straight down it */}
        <div className="grid12 mt-9">
          <div className="col-span-12 md:col-span-6 lg:col-span-9">
            <Reveal delay={40}>
              <h2 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] text-paper sm:text-[2.125rem] lg:text-[3rem] lg:leading-[1.06] lg:tracking-[-0.018em]">
                Property history gets scattered.{" "}
                {/* the break lands on the sentence, not wherever the measure
                    happens to run out, which is the same arrangement the hero
                    headline uses */}
                <span className="lg:block">The context gets lost.</span>
              </h2>
            </Reveal>

            <Reveal delay={80} className="mt-11">
              <p className="max-w-[860px] text-lead text-paper-muted">
                Drawings, reports, approvals, emails, leases and decisions end
                up spread across people and systems. Some are buried. Some are
                gone. Even when the files survive, the reasoning that connected
                them often does not.
              </p>
            </Reveal>

            {/* Paper rather than muted, and a shorter measure. Stronger than
                the support without becoming a second headline: the term is
                named and defined in the same breath so it never stands alone
                as a slogan. */}
            <Reveal delay={120} className="mt-11">
              <p className="max-w-[720px] text-lead text-paper">
                Every time the team changes, part of the property is relearned
                from scratch. That is{" "}
                <span className="font-medium text-vera-400">
                  corporate amnesia
                </span>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
