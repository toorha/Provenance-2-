import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/* HOMEPAGE.md §5, Section 2. Layout A, one column, typography only.

   The questions ARE the content. No supporting column, no source labels, no
   context lists, no cards, no diagrams, no fake documents.

   FOUR LEVELS, AND ONLY ONE OF THEM IS LOUD.

     1  section label      20px / 600            the system component
     2  headline           56px / 600  paper     the anchor, and the only one
     3  supporting line    20px / 430  muted     what the problem actually is
     4  questions          24px / 430  paper 90  examples, not co-headlines
     5  takeaway           20px / 430  muted     the conclusion (17px sm)

   THE COMPOSITION IS THE GRID, NOT A SECOND COLUMN. Everything used to sit
   inside eight columns hard against the left edge, which left half of a very
   wide dark canvas doing nothing. Each level now takes the width it actually
   needs: the headline nine columns, the supporting line six, the questions
   nine or ten, the takeaway eight. Wider measures also mean fewer wrapped
   lines, so using more of the canvas made the section shorter rather than
   taller.

   The three questions go progressively deeper: now, then across teams, then
   back through the property's own history. The quiet labels carry that arc. */

const QUESTIONS = [
  {
    label: "What's happening now",
    ask: "What is still blocking the South Pad from moving forward?",
  },
  {
    label: "Across teams",
    ask: "Are we actually ready to hand Unit 12 over on Monday?",
  },
  {
    label: "From the property's history",
    ask: "Why was the main water line replaced, who did the work, and what warranty still applies?",
  },
];

/* All three share one measure and one left edge. An earlier pass inset the
   middle question by a column for rhythm, and the staggered rules and labels
   read as a misalignment rather than as a composition. */
const RHYTHM = [
  "lg:col-span-10 lg:col-start-1",
  "lg:col-span-10 lg:col-start-1",
  "lg:col-span-10 lg:col-start-1",
];

export function ProblemSection() {
  return (
    /* One tonal step up from the canvas, deeper into the same environment and
       never a different theme (DESIGN.md §6.3). */
    <section className="bg-canvas py-[104px] md:py-[128px]">
      <div className="track">
        {/* ── LEVEL 1 and 2: the statement, then what it means ─────────── */}
        <div className="grid12">
          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <SectionLabel>The problem</SectionLabel>
          </Reveal>
        </div>

        <div className="grid12 mt-5">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-9">
            <h2 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.016em] text-paper sm:text-[2.5rem] lg:text-display-2">
              Simple questions should not require a scavenger hunt.
            </h2>
          </Reveal>
        </div>

        <div className="grid12 mt-6">
          <Reveal delay={60} className="col-span-12 md:col-span-6 lg:col-span-6">
            {/* the line that names the problem before the examples show it */}
            <p className="text-lead text-paper-muted">
              Property context lives across files, emails, systems, and people.
              Teams spend hours piecing it together just to answer simple
              questions.
            </p>
          </Reveal>
        </div>

        {/* ── LEVEL 3: the examples ─────────────────────────────────────── */}
        <div className="grid12 mt-16 md:mt-20">
          {QUESTIONS.map((q, i) => (
            <Reveal
              key={q.label}
              className={clsx("col-span-12 md:col-span-6", RHYTHM[i])}
            >
              <hr className="rule-full" />
              <div className="py-8 md:py-9">
                {/* a category label, not small text: mono, caps, tracked, and
                    far enough from the question to read as a heading for it
                    rather than a first line of it */}
                <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
                  {q.label}
                </p>
                {/* no character cap: the column is the measure now, which
                    takes the longest question from three lines to two */}
                <p className="mt-4 text-[1.25rem] leading-[1.4] tracking-[-0.006em] text-paper/90 sm:text-[1.375rem] lg:text-[1.5rem]">
                  &ldquo;{q.ask}&rdquo;
                </p>
              </div>
              {/* the group closes with a rule only on the last item, so the
                  takeaway below is outside the list, not a fourth row */}
              {i === QUESTIONS.length - 1 && <hr className="rule-full" />}
            </Reveal>
          ))}
        </div>

        {/* ── LEVEL 4: the conclusion ─────────────────────────────────────
            Quieter than the questions in size, weight and colour, and set off
            by roughly twice the space that separates one question from the
            next. Only the first clause carries any emphasis, which is what
            makes it land as a conclusion instead of a fourth example. */}
        <div className="grid12 mt-14 md:mt-16">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-8">
            {/* The top of the section is about fragmentation today. This is a
                different problem: the same reconstruction happening again and
                again as people move on. Saying "scattered" twice made them
                read as one point stated twice.

                The term is named only after the visitor has felt it, and the
                sentence that follows is the definition, so it needs no badge,
                no glossary and no icon. */}
            {/* Two blocks, because they are two different points and one
                paragraph made them read as a single run-on. The first is what
                accumulates; the second is what happens to it when the people
                change. Emphasis is on exactly two phrases, so it still lands
                as prose rather than as a definition card. */}
            <p className="text-body text-paper-muted md:text-lead">
              <span className="font-medium text-paper">
                Properties accumulate years of emails, reports, drawings,
                decisions, and handoffs.
              </span>{" "}
              The answers are usually still there, but the context connecting
              them gets harder to recover.
            </p>
            <p className="mt-6 text-body text-paper-muted md:text-lead">
              As teams change, that context gets lost and rebuilt. That is{" "}
              <span className="font-medium text-paper">corporate amnesia</span>:
              the files remain, but the reasoning behind them disappears.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
