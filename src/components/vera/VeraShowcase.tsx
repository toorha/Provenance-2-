"use client";

import { clsx } from "clsx";
import { STORIES, type VeraStory } from "@/lib/vera-stories";
import { VeraMark } from "./VeraMark";

/* One mode, one screen, one story.

   This replaced three simulated product surfaces: a master detail list, a
   question input with a role picker and a typing animation, and a set of
   expandable insight rows. All three needed the visitor to operate them
   before they said anything, which is the wrong job for a landing page. A
   landing page explains; onboarding operates.

   So each mode is now a finished example. Nothing to click, nothing to
   expand, nothing to wait for. The blocks fade up in order when the section
   plays itself, and appear all at once when somebody picks a mode by hand,
   because a person who just clicked a tab wants the answer and not a
   performance.

   ONE GREEN THING PER SCREEN. Vera's conclusion carries the mark and the
   wash. The context around it stays neutral, so the eye lands on the
   conclusion first and the green still means what it means everywhere else
   on the site. */

export function VeraShowcase({
  story,
  revealed,
}: {
  story: VeraStory;
  /** how many blocks are showing. Infinity when a visitor picked this mode
      themselves and should simply see the whole thing. */
  revealed: number;
}) {
  const shown = (i: number) => i < revealed;

  return (
    <div className="flex min-h-[372px] flex-col px-6 py-6 font-product lg:min-h-[430px] lg:px-8 lg:py-7">
      {/* the framing line, and the question where there is one */}
      <div
        className={clsx(
          "transition-opacity duration-considered ease-state",
          shown(0) ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="text-[13px] text-slate">{story.framing}</p>

        {story.question && (
          <p className="mt-3 rounded-panel border border-mineral-300 bg-mineral-0 px-4 py-3 text-[17px] leading-[1.35] text-ink">
            {story.question}
          </p>
        )}

        {story.headline && (
          <p className="mt-3 text-[20px] font-semibold leading-[1.28] tracking-[-0.012em] text-ink lg:text-[22px]">
            {story.headline}
          </p>
        )}
      </div>

      {/* the two or three pieces of context, and the conclusion among them */}
      <ul className="mt-5 space-y-4">
        {story.blocks.map((b, i) => (
          <li
            key={b.label}
            className={clsx(
              "transition-opacity duration-considered ease-state",
              shown(i + 1) ? "opacity-100" : "opacity-0",
            )}
          >
            {b.isConclusion ? (
              <div className="border-l-[3px] border-vera-700 bg-vera-200 py-3 pl-4 pr-4">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-vera-700">
                  <VeraMark size={14} />
                  {b.label}
                </p>
                <p className="mt-1.5 text-[16px] font-medium leading-[1.42] text-ink lg:text-[17px]">
                  {b.body}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 pl-4 lg:grid-cols-[132px_minmax(0,1fr)]">
                <p className="text-[12px] uppercase tracking-[0.06em] text-slate">
                  {b.label}
                </p>
                <p className="text-[15px] leading-[1.45] text-ink">{b.body}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* the one thing to do, and the quietest possible nod to sources */}
      <div
        className={clsx(
          "mt-auto pt-6 transition-opacity duration-considered ease-state",
          shown(story.blocks.length + 1) ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="border-t border-mineral-200 pt-4">
          <p className="text-[12px] uppercase tracking-[0.06em] text-slate">
            Next
          </p>
          <p className="mt-1.5 text-[15px] font-semibold leading-[1.4] text-ink lg:text-[16px]">
            {story.next}
          </p>
          {story.sources && (
            <p className="mt-3 text-[12px] text-mineral-500">{story.sources}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* how many reveal steps a story has: framing, each block, then the action */
export const stepsFor = (id: VeraStory["id"]) =>
  STORIES[id].blocks.length + 2;
