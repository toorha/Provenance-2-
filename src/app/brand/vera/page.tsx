import type { Metadata } from "next";
import { clsx } from "clsx";

/* The Vera brand lab. Private, unlinked, for evaluation only.

   Not in the homepage navigation, not in any sitemap, noindex. Nothing here
   is installed in the live product: the marks are candidates and the
   selection has not been made. See VERA_BRAND.md. */

export const metadata: Metadata = {
  title: "Vera brand lab",
  robots: { index: false, follow: false },
};

/* ── the four candidate marks ───────────────────────────────────────────
   32 unit grid, 6 unit module, 3 unit stroke, square caps. currentColor
   throughout so every mark inherits the surface it sits on and monochrome
   is the default rather than an export. */

function MarkConvergence({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Vera convergence mark"
    >
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="square">
        <path d="M4 7 L15 16" />
        <path d="M4 16 L15 16" />
        <path d="M4 25 L15 16" />
        <path d="M17 16 L28 16" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
    </svg>
  );
}

function MarkConnection({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Vera connection mark"
    >
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
      >
        <path d="M11 5 H5 V14 H11" />
        <path d="M21 18 H27 V27 H21" />
        <path d="M10.5 21.5 L21.5 10.5" />
      </g>
    </svg>
  );
}

function MarkMemory({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Vera memory signal mark"
    >
      <circle cx="5" cy="27" r="1.8" fill="currentColor" opacity="0.45" />
      <circle cx="12" cy="21" r="2.3" fill="currentColor" opacity="0.7" />
      <circle cx="19" cy="15" r="2.8" fill="currentColor" />
      <path
        d="M23 11 L28 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <path
        d="M28 6 V12 M28 6 H22"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

function MarkDatum({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-label="Vera datum mark"
    >
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="square">
        <path d="M4 9 H23" />
        <path d="M12 16 H23" />
        <path d="M8 23 H23" />
        <path d="M23 3 V29" />
      </g>
      <circle cx="23" cy="16" r="2.6" fill="currentColor" />
    </svg>
  );
}

type Concept = {
  id: string;
  n: string;
  name: string;
  idea: string;
  rationale: string;
  Mark: ({ size }: { size?: number }) => React.ReactElement;
  file: string;
};

const CONCEPTS: Concept[] = [
  {
    id: "convergence",
    n: "01",
    name: "Convergence",
    idea: "Three separate signals enter, meet at one node, and leave as a single resolved path.",
    rationale:
      "The most literal statement of the brand idea, and the only one whose meaning survives being explained in four words: many sources, one understanding. The V lives in the negative space between the incoming strokes and is never drawn. Risk: converging lines are common in enterprise software, so the mark earns its distinction from the asymmetry (three in, one out) rather than from novelty.",
    Mark: MarkConvergence,
    file: "vera-convergence.svg",
  },
  {
    id: "connection",
    n: "02",
    name: "Connection",
    idea: "Two records that were never related, joined by one precise intervention.",
    rationale:
      "The two brackets are deliberately open and facing away from each other: these are separate things that were not looking for each other. The single diagonal is Vera. It reads as a relationship rather than a link, which is the distinction between memory and search. Risk: brackets plus a diagonal is the most technical of the three and needs the most care not to read as a developer tool.",
    Mark: MarkConnection,
    file: "vera-connection.svg",
  },
  {
    id: "memory",
    n: "03",
    name: "Memory signal",
    idea: "Historical points recede in scale and resolve into one present direction.",
    rationale:
      "The only mark that carries time, which is the half of the story the other two leave to Provenance. The points sit on a diagonal so it reads as ascent rather than as a row of dates, and the terminal is an arrow head rather than a clock. Risk: four components is one more than the others, and the opacity steps are the first thing to fail at small sizes.",
    Mark: MarkMemory,
    file: "vera-memory.svg",
  },
  {
    id: "datum",
    n: "04",
    name: "Datum",
    idea: "Three records of different length and origin, held true against one reference.",
    rationale:
      "The only concept that is about a reference frame rather than about a meeting point. The left ends are deliberately ragged, because that is how context actually arrives: different sources, different eras, different lengths. The right ends land exactly on one datum, which is what Vera provides. A datum line is a drawing convention rather than a building, so it survives the move to infrastructure and energy. Risk: at a glance it can read as a bar chart or an align-right control, which is the one thing to test on real people before committing.",
    Mark: MarkDatum,
    file: "vera-datum.svg",
  },
];

const CRITERIA = [
  "Connection without being literal",
  "Intelligent without AI clichés",
  "At home beside Provenance",
  "Recognisable at 16px",
  "Works in one colour",
  "Simple enough to remember",
  "Not a checkmark",
  "Not a fintech logo",
  "Not a cybersecurity logo",
  "Survives beyond buildings",
];

/* Scored against VERA_BRAND.md §12. The score is an input, not the decision. */
const SCORES: Record<string, number[]> = {
  convergence: [5, 5, 5, 5, 5, 5, 4, 4, 4, 5],
  connection: [5, 4, 4, 3, 5, 4, 5, 4, 3, 5],
  memory: [4, 4, 4, 3, 3, 3, 5, 4, 4, 4],
  datum: [4, 5, 5, 5, 5, 4, 5, 4, 5, 5],
};

const total = (id: string) => SCORES[id].reduce((a, b) => a + b, 0);

export default function VeraBrandLab() {
  return (
    <main className="min-h-screen bg-canvas pb-32 pt-20 text-paper">
      <div className="track">
        {/* ── masthead ─────────────────────────────────────────────── */}
        <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
          Private. Direction 01 is selected and installed. The rest is archive.
        </p>

        <div className="mt-10 flex items-center gap-5">
          <span className="text-vera-400">
            <MarkConvergence size={44} />
          </span>
          <div>
            <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.018em] text-paper">
              Vera
            </h1>
            <p className="mt-1 text-lead text-paper-muted">
              Vera connects what matters.
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-[62ch] text-body text-paper-muted">
          Four candidate symbols for the intelligence inside Provenance. The
          mark beside the wordmark above is concept 01 standing in, not a
          selection. Full system in{" "}
          <span className="text-[13px] text-paper">VERA_BRAND.md</span>
          .
        </p>

        {/* ── the three concepts ───────────────────────────────────── */}
        {CONCEPTS.map(({ id, n, name, idea, rationale, Mark, file }) => (
          <section key={id} className="mt-24">
            <hr className="rule-full" />

            <div className="grid12 mt-10">
              <div className="col-span-12 lg:col-span-4">
                <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
                  Direction {n}
                </p>
                <h2 className="mt-3 text-[1.875rem] font-semibold leading-[1.14] tracking-[-0.014em] text-paper">
                  {name}
                </h2>
                <p className="mt-4 max-w-[40ch] text-body text-paper-muted">
                  {idea}
                </p>
                <p className="mt-4 max-w-[44ch] text-body-sm text-paper-subtle">
                  {rationale}
                </p>
                <p className="mt-5 text-[12px] text-paper-subtle">
                  /public/brand/vera/{file}
                </p>
              </div>

              <div className="col-span-12 mt-10 lg:col-span-8 lg:mt-0">
                {/* lockup */}
                <div className="flex items-center gap-4 border border-canvas-4 bg-canvas-2 px-7 py-6">
                  <span className="text-vera-400">
                    <Mark size={40} />
                  </span>
                  <span className="text-[1.75rem] font-semibold tracking-[-0.014em] text-paper">
                    Vera
                  </span>
                  <span className="ml-auto text-right text-[11px] uppercase leading-relaxed tracking-[0.06em] text-paper-subtle">
                    Vera
                    <br />
                    by Provenance
                  </span>
                </div>

                {/* scale */}
                <div className="mt-4 flex flex-wrap items-end gap-8 border border-canvas-4 bg-canvas-2 px-7 py-6">
                  {[64, 32, 16].map((px) => (
                    <div key={px} className="flex flex-col items-center gap-3">
                      <span className="flex h-16 items-end text-vera-400">
                        <Mark size={px} />
                      </span>
                      <span className="text-[11px] text-paper-subtle">
                        {px}px
                      </span>
                    </div>
                  ))}
                  <p className="max-w-[26ch] text-body-sm text-paper-subtle">
                    16px is the honest test. Anything that needs the 64px
                    rendering to make sense has failed.
                  </p>
                </div>

                {/* colourways */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Swatch label="Green on black" className="bg-canvas">
                    <span className="text-vera-400">
                      <Mark size={32} />
                    </span>
                  </Swatch>
                  <Swatch label="Black on off-white" className="bg-mineral-50">
                    <span className="text-ink">
                      <Mark size={32} />
                    </span>
                  </Swatch>
                  <Swatch label="White on Vera Green" className="bg-vera-600">
                    <span className="text-white">
                      <Mark size={32} />
                    </span>
                  </Swatch>
                </div>

                {/* in-product previews, deliberately tiny */}
                <div className="mt-4 space-y-3 border border-canvas-4 bg-canvas-2 px-7 py-6">
                  <p className="text-[11px] uppercase tracking-[0.06em] text-paper-subtle">
                    In product
                  </p>

                  <div className="flex items-center gap-3 rounded-panel border border-mineral-300 bg-mineral-0 px-4 py-2.5 font-product">
                    <span className="text-vera-700">
                      <Mark size={17} />
                    </span>
                    <span className="text-[14px] text-mineral-500">
                      Ask about this property, or tell Vera what changed
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-control bg-vera-600 px-3.5 py-2 font-product text-[13px] font-medium text-white">
                    <Mark size={15} />
                    Vera noticed the connection.
                  </div>

                  <div className="font-product">
                    <div className="flex items-center gap-2">
                      <span className="text-vera-700">
                        <Mark size={14} />
                      </span>
                      <span className="text-[12px] font-semibold text-vera-700">
                        What Vera connected
                      </span>
                    </div>
                    <div className="mt-1.5 border-l-[3px] border-vera-700 bg-vera-200 py-2 pl-3.5">
                      <p className="text-[11px] uppercase tracking-[0.06em] text-ink">
                        2019 · Agreement
                      </p>
                      <p className="mt-0.5 text-[13.5px] text-ink">
                        Access corridor must remain unobstructed.
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 border-b-2 border-ink bg-mineral-100 px-4 py-2.5 font-product text-[14px] font-semibold text-ink">
                    <span className="text-vera-700">
                      <Mark size={15} />
                    </span>
                    Proactive Insights
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── scorecard ────────────────────────────────────────────── */}
        <section className="mt-24">
          <hr className="rule-full" />
          <h2 className="mt-10 text-[1.875rem] font-semibold tracking-[-0.014em] text-paper">
            Scorecard
          </h2>
          <p className="mt-3 max-w-[56ch] text-body text-paper-muted">
            Each criterion out of 5, from VERA_BRAND.md §12. The total is an
            input to the decision, never the decision itself.
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="border-b border-canvas-4">
                  <th className="py-3 pr-4 text-[11px] font-medium uppercase tracking-[0.06em] text-paper-subtle">
                    Criterion
                  </th>
                  {CONCEPTS.map((c) => (
                    <th
                      key={c.id}
                      className="py-3 pl-4 text-right text-[11px] font-medium uppercase tracking-[0.06em] text-paper-subtle"
                    >
                      {c.n} {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRITERIA.map((label, i) => (
                  <tr key={label} className="border-b border-canvas-3">
                    <td className="py-2.5 pr-4 text-body-sm text-paper-muted">
                      {label}
                    </td>
                    {CONCEPTS.map((c) => (
                      <td
                        key={c.id}
                        className={clsx(
                          "py-2.5 pl-4 text-right text-[13px]",
                          SCORES[c.id][i] >= 5
                            ? "text-vera-400"
                            : SCORES[c.id][i] <= 3
                              ? "text-paper-subtle"
                              : "text-paper",
                        )}
                      >
                        {SCORES[c.id][i]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-3 pr-4 text-ui font-medium text-paper">
                    Total
                  </td>
                  {CONCEPTS.map((c) => (
                    <td
                      key={c.id}
                      className="py-3 pl-4 text-right text-[15px] font-semibold text-paper"
                    >
                      {total(c.id)} / 50
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── recommendation ───────────────────────────────────────── */}
        <section className="mt-20">
          <hr className="rule-full" />
          <div className="grid12 mt-10">
            <div className="col-span-12 lg:col-span-8">
              <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
                Recommendation
              </p>
              <h2 className="mt-3 text-[1.875rem] font-semibold tracking-[-0.014em] text-paper">
                Selected: Direction 01, Convergence.
              </h2>
              <p className="mt-5 max-w-[62ch] text-body text-paper-muted">
                It is the only one of the three that states the brand idea
                without a caption. Three signals in, one out, and the meaning is
                available before anyone explains it. It is also the only mark
                that holds its meaning at 16px, because the asymmetry between
                the incoming strokes and the single outgoing one survives even
                when the node has collapsed to a dot.
              </p>
              <p className="mt-4 max-w-[62ch] text-body text-paper-muted">
                Direction 02 is the more interesting idea and the weaker mark.
                Separateness resolved by one intervention is closer to what Vera
                actually does than convergence is, but two brackets and a
                diagonal need roughly 24px before the brackets read as brackets,
                and below that it becomes an ambiguous glyph.
              </p>
              <p className="mt-4 max-w-[62ch] text-body text-paper-muted">
                Direction 03 carries time, which the other two leave to
                Provenance, and that is a real argument for it. It is also the
                most fragile: the opacity steps that make the recession legible
                are the first thing to disappear at small sizes and the first
                thing to break in one-colour print.
              </p>
              <p className="mt-4 max-w-[62ch] text-body text-paper-muted">
                Direction 04 ties 01 on the scorecard and is the better idea of
                the two. Alignment to a common reference is a truer description
                of what Vera does than convergence is, and the ragged left edges
                carry the whole argument about how context actually arrives. It
                is held back by one real risk: at a glance, and particularly out
                of context, it can read as a bar chart or an align-right
                control. That is a question for real people, not for a
                scorecard.
              </p>
              <p className="mt-6 max-w-[62ch] text-body-sm text-paper-subtle">
                If the priority is a mark that will still be right when
                Provenance covers infrastructure and energy, 01 is the safest,
                04 is the most interesting, and 03 is the most distinctive.
                Nothing here is installed. The live product still uses the
                existing neutral Vera glyph.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Swatch({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className={clsx(
          "flex h-24 items-center justify-center border border-canvas-4",
          className,
        )}
      >
        {children}
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-[0.06em] text-paper-subtle">
        {label}
      </p>
    </div>
  );
}
