"use client";

import { clsx } from "clsx";
import {
  STORIES,
  type Evidence,
  type EvidenceKind,
  type VeraStory,
} from "@/lib/vera-stories";
import { VeraMark } from "./VeraMark";

/* One mode, one screen, one connection.

   Nothing here is clickable and nothing has to be. The visitor sees the
   property, the three records Vera used, what Vera made of them, and the one
   thing to do next. That is the whole surface.

   THE EVIDENCE IS THE POINT. An earlier pass reduced each mode to two plain
   sentences and a conclusion, which was instantly readable and read as a
   marketing claim: no working shown, nothing to believe. Three structured
   records with a type, a date, a real title and the line that matters make
   the same conclusion look earned instead of asserted.

   ASK INVERTS THE ORDER. Track and Insights build up to Vera's conclusion,
   because in those modes the information arrived first. Ask answers
   immediately and shows its working underneath, because somebody asked a
   question and a question deserves an answer before a bibliography. That
   inversion is what stops the three modes reading as one screen. */

export function VeraShowcase({
  story,
  revealed,
}: {
  story: VeraStory;
  /** how many steps are showing. Below zero is the intro, which says what the
      mode is for before it does it. Infinity when a visitor picked this mode
      themselves and should simply see the whole thing. */
  revealed: number;
}) {
  const shown = (i: number) => i < revealed;
  const n = story.evidence.length;

  /* step order: 0 header, 1..n evidence, n+1 conclusion, n+2 next.
     Ask puts the conclusion first, so it reveals with the header. */
  const conclusionStep = story.answerFirst ? 0 : n + 1;
  const evidenceStart = story.answerFirst ? 1 : 1;

  const Conclusion = (
    <div
      className={clsx(
        "border-l-[3px] border-vera-700 bg-vera-200 py-3 pl-4 pr-4",
        "transition-opacity duration-considered ease-state",
        shown(conclusionStep) ? "opacity-100" : "opacity-0",
      )}
    >
      <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-vera-700">
        <VeraMark size={14} />
        {story.conclusionLabel}
      </p>
      <p className="mt-1.5 text-[15px] font-medium leading-[1.42] text-ink lg:text-[16px]">
        {story.conclusion}
      </p>
    </div>
  );

  return (
    <div className="relative">
      <div className="flex min-h-[372px] flex-col px-5 py-5 font-product lg:min-h-[562px] lg:px-7 lg:py-6">
        {/* the property this is all about, stated once and quietly */}
        <div
        className={clsx(
          "transition-opacity duration-considered ease-state",
          shown(0) ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <p className="text-[14px] font-semibold tracking-[-0.008em] text-ink">
            {story.property.name}
          </p>
          <p className="text-[13px] text-slate">{story.property.project}</p>
        </div>

        {story.question ? (
          <>
            <p className="mt-3 text-[11px] uppercase tracking-[0.06em] text-slate">
              {story.framing}
            </p>
            <p className="mt-1.5 rounded-panel border border-mineral-300 bg-mineral-0 px-4 py-3 text-[16px] leading-[1.35] text-ink lg:text-[17px]">
              {story.question}
            </p>
          </>
        ) : (
          <p className="mt-2 text-[13px] text-slate">{story.framing}</p>
        )}

        {story.headline && (
          <p className="mt-2.5 text-[19px] font-semibold leading-[1.26] tracking-[-0.012em] text-ink lg:text-[21px]">
            {story.headline}
          </p>
        )}
      </div>

      {/* Ask answers before it shows its working */}
      {story.answerFirst && <div className="mt-4">{Conclusion}</div>}

      {/* the records, compact and ruled rather than boxed */}
      <ul className="mt-4 border-t border-mineral-200">
        {story.evidence.map((e, i) => (
          <li
            key={e.title + e.date}
            className={clsx(
              "border-b border-mineral-200 py-2.5",
              "transition-opacity duration-considered ease-state",
              shown(evidenceStart + i) ? "opacity-100" : "opacity-0",
            )}
          >
            <EvidenceRow evidence={e} />
          </li>
        ))}
      </ul>

      {!story.answerFirst && <div className="mt-4">{Conclusion}</div>}

      {/* the one thing to do, and the quietest possible nod to sources */}
      <div
        className={clsx(
          "mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-2 pt-5",
          "transition-opacity duration-considered ease-state",
          shown(n + 2) ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.06em] text-slate">
            Next
          </p>
          <p className="mt-1 text-[14px] font-semibold leading-[1.4] text-ink lg:text-[15px]">
            {story.next}
          </p>
        </div>
        <p className="shrink-0 text-[12px] text-mineral-500">{story.sources}</p>
        </div>
      </div>

      {/* The mode explains itself before it demonstrates itself, then gets out
          of the way. It is a LAYER rather than a branch so it can dissolve:
          swapping the panel outright made the sentence vanish mid-read, which
          is worse than never showing it. Opaque, because the story underneath
          is already fading in behind it. */}
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 bg-mineral-0",
          "transition-opacity duration-deliberate ease-state",
          revealed < 0 ? "opacity-100" : "opacity-0",
        )}
      >
        <Intro story={story} />
      </div>
    </div>
  );
}

/* SOURCE TYPE            DATE
   Source title
   The one line that matters

   Ruled, not boxed. Three cards here would take the eye to the containers
   rather than to what they hold. */
function EvidenceRow({ evidence }: { evidence: Evidence }) {
  return (
    <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-x-3">
      <span className="mt-[3px] text-mineral-500">
        <SourceIcon kind={evidence.kind} />
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.06em] text-slate">
            {evidence.label}
          </span>
          <span className="shrink-0 text-[11px] uppercase tracking-[0.06em] tabular-nums text-mineral-500">
            {evidence.date}
          </span>
        </div>
        <p className="mt-0.5 text-[14px] font-semibold leading-[1.3] text-ink">
          {evidence.title}
        </p>
        <p className="mt-0.5 text-[13px] leading-[1.4] text-slate">
          {evidence.excerpt}
        </p>
      </div>
    </div>
  );
}

/* 1.5px strokes, square caps, structural rather than decorative (§14). Four
   shapes only, because the value is telling record types apart at a glance,
   not decorating the row. */
function SourceIcon({ kind }: { kind: EvidenceKind }) {
  const common = {
    width: 13,
    height: 13,
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    "aria-hidden": true,
  };
  if (kind === "meeting")
    return (
      <svg {...common}>
        <rect x="1.5" y="2.5" width="11" height="10" />
        <path d="M1.5 5.5h11M4.5 1v2.5M9.5 1v2.5" />
      </svg>
    );
  if (kind === "drawing")
    return (
      <svg {...common}>
        <path d="M2 1.5h6l4 4v7H2z" />
        <path d="M4.5 7.5h5M4.5 10h3" />
      </svg>
    );
  if (kind === "rules")
    return (
      <svg {...common}>
        <path d="M2 1.5h10v11H2z" />
        <path d="M4.5 5h5M4.5 8h5M4.5 10.5h2.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M2 1.5h10v11H2z" />
      <path d="M4.5 4.5h5M4.5 7h5" />
      <path d="M4.5 10h3.5" />
    </svg>
  );
}

/* header, each record, conclusion, next */
export const stepsFor = (id: VeraStory["id"]) =>
  STORIES[id].evidence.length + 3;

/* THE BLANK PANEL.

   Deliberately almost empty. Anything else here competes with the sentence,
   and the sentence is the only reason this beat exists. The mark and the mode
   name identify the speaker; the line says what the next few seconds are for.

   Same container and same min-height as the story, so the frame does not move
   a pixel when the intro gives way to the evidence. */
function Intro({ story }: { story: VeraStory }) {
  return (
    <div className="flex h-full min-h-[372px] flex-col justify-center px-5 py-5 font-product lg:min-h-[562px] lg:px-7 lg:py-6">
      <div className="hero-intro-in max-w-[38ch]">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-vera-700">
          <VeraMark size={14} />
          {MODE_TITLE[story.id]}
        </p>
        <p className="mt-3.5 text-[19px] font-medium leading-[1.38] tracking-[-0.008em] text-ink lg:text-[22px]">
          {story.intro}
        </p>
      </div>
    </div>
  );
}

const MODE_TITLE: Record<VeraStory["id"], string> = {
  track: "Track the work",
  ask: "Ask Vera",
  insights: "Proactive Insights",
};
