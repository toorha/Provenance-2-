"use client";

import { clsx } from "clsx";
import {
  ASK_EXAMPLES,
  ASK_SUGGESTIONS,
  MEMORY_UPDATE,
  type AskExample,
} from "@/lib/ask-data";

/* Ask Vera — a property intelligence surface, not a chat window.

   Two behaviours through ONE input: ask the property, or tell it what changed.

   PRESENTATION RULE: delete before adding. An earlier pass carried a "Vera's
   read" heading, a "Built from 6 property records" line, a list of source
   categories, and a "View 6 sources" control — three statements of the same
   idea plus a label nobody needed. All of it is gone. The answer now opens on
   the answer.

   One second of looking should give: the direct answer, then the findings,
   then the action. Everything else is footer. */

export type AskPhase =
  | "idle"
  | "typing"
  | "thinking"
  | "answer"
  | "updated"
  | "sources";

export type AskState = {
  /* the mode opens blank with only the Vera annotation on screen, then the
     interface fades in under it. Same pattern as Proactive Insights. */
  introducing: boolean;
  phase: AskPhase;
  typed: string;
  example: AskExample;
  isUpdate: boolean;
  focus: "answer" | "rows" | "close" | null;
};

export function AskVera({
  state,
  onPick,
  onRole,
  onToggleSources,
}: {
  state: AskState;
  onPick: (kind: "ask" | "update", exampleId: string | null) => void;
  onRole: (id: string) => void;
  onToggleSources: () => void;
}) {
  const { phase, typed, example, isUpdate, focus, introducing } = state;
  const answered = phase === "answer" || phase === "sources";

  /* Rows and sources occupy the same block, sized to whichever is taller, so
     swapping between them never moves anything below. */
  const rowH = example.format === "timeline" ? 30 : 46;
  /* the left column carries an index, a year, or a short phrase, and each
     needs a different width. A 96px column truncated "2024 decision". */
  const tagCol =
    example.format === "blockers"
      ? "28px"
      : example.format === "timeline"
        ? "56px"
        : "132px";
  /* Sized to this example, and to whichever of its two states is taller, so
     swapping records for sources never moves anything. A flat constant across
     all roles was reserving the five row timeline's height for every answer.
     The panel's own min-height still holds the frame steady between roles. */
  const bodyH = Math.max(
    example.rows.length * rowH,
    Math.ceil(example.sources.length / 2) * 30,
  );

  const dim = (b: "answer" | "rows" | "close") =>
    focus === null || focus === b ? "opacity-100" : "opacity-45";

  return (
    <div className="flex min-h-[372px] flex-col px-5 py-4 lg:min-h-[534px]">
      <div
        className={clsx(
          "flex min-h-0 flex-1 flex-col transition-opacity duration-considered ease-state",
          introducing ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-hidden={introducing}
      >
      {/* role navigation: a restrained segmented control, not filter chips */}
      <div
        role="tablist"
        aria-label="Ask Vera roles"
        /* one line at every width, scrolled rather than wrapped or shrunk, so
           no label is ever clipped and the block never changes height */
        className="-mx-1 flex flex-wrap gap-1 px-1 lg:flex-nowrap lg:overflow-x-auto"
      >
        {ASK_EXAMPLES.map((ex) => {
          const on =
            !isUpdate &&
            ex.id === example.id &&
            (phase !== "idle" || typed.length > 0);
          return (
            <button
              key={ex.id}
              type="button"
              data-role={ex.id}
              onClick={() => onRole(ex.id)}
              role="tab"
              aria-selected={on}
              className={clsx(
                /* LEVEL 2 affordance: the same grammar as the mode switcher,
                   one step quieter. Filled surface, no 2px rule, 13px not 14.
                   Clickable on its own, never mistaken for the modes above. */
                "flex min-h-[40px] flex-none cursor-pointer items-center",
                "rounded-control px-3 text-[13px]",
                "transition-[background-color,color] duration-base ease-state",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-mineral-0",
                on
                  ? "bg-mineral-100 font-semibold text-ink"
                  : "text-slate hover:bg-mineral-50 hover:text-ink",
              )}
            >
              {ex.role}
            </button>
          );
        })}
      </div>

      {/* the input. One field, both behaviours, no explanatory copy — the
          placeholder already says what it takes. */}
      <div
        data-narrator-avoid
        className="mt-4 flex items-center gap-3 rounded-panel border border-mineral-300 bg-mineral-0 px-4 py-3"
      >
        <span
          data-ask-input
          className={clsx(
            "min-w-0 flex-1 truncate text-[15px]",
            typed ? "text-ink" : "text-mineral-500",
          )}
        >
          {typed || "Ask about any property, or tell Vera what changed…"}
          {phase === "typing" && (
            <span className="ml-px inline-block h-[15px] w-px translate-y-[2px] bg-ink" />
          )}
        </span>
      </div>

      {/* ── IDLE ─────────────────────────────────────────────────────────── */}
      {phase === "idle" && (
        <ul className="mt-4">
          {ASK_SUGGESTIONS.map((s) => (
            <li key={s.label}>
              <button
                type="button"
                data-suggestion={s.kind}
                onClick={() => onPick(s.kind, s.exampleId)}
                className="flex w-full cursor-pointer items-start border-b border-mineral-200 py-3 text-left text-[14px] leading-[1.45] text-slate transition-colors duration-base last:border-b-0 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600"
              >
                <span>{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ── WORKING ──────────────────────────────────────────────────────
          The beat between the question and the answer. Vera says what is
          happening, once, and the rule underneath carries the duration. */}
      {phase === "thinking" && (
        <div className="mt-6">
          <p className="text-[13.5px] font-medium text-vera-700">
            Vera is working
          </p>
          <div className="mt-2.5 h-px w-full overflow-hidden bg-mineral-200">
            <div className="h-px w-full origin-left animate-[vera-fill_900ms_cubic-bezier(.4,0,.2,1)_forwards] bg-vera-600" />
          </div>
        </div>
      )}

      {/* ── ANSWER ───────────────────────────────────────────────────────── */}
      {answered && (
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
          {/* It opens on the verdict, then does the reasoning. The briefing
              is what stops this reading as three database fields under a
              headline: full sentences, in Vera's own voice, connecting the
              evidence rather than announcing it. Measure is capped so the
              lines stay readable and the right column stays clear. */}
          <div
            className={clsx(
              "transition-opacity duration-considered ease-state",
              dim("answer"),
            )}
          >
            <p className="text-[21px] font-semibold leading-[1.3] tracking-[-0.014em] text-ink">
              {example.answer}
            </p>
            {example.briefing.map((para, i) => (
              <p
                key={para.slice(0, 24)}
                className={clsx(
                  "text-[15px] leading-[1.5] text-graphite",
                  i === 0 ? "mt-2" : "mt-1.5",
                )}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4">
            <hr className="flex-1 border-0 border-t border-mineral-200" />
            <button
              type="button"
              data-sources-toggle
              onClick={onToggleSources}
              className="-my-3 inline-flex min-h-[44px] shrink-0 cursor-pointer items-center text-[12px] text-slate underline decoration-mineral-400 underline-offset-[3px] transition-colors duration-instant hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600 lg:my-0 lg:min-h-0"
            >
              {phase === "sources"
                ? "Back to answer"
                : `View ${example.sources.length} sources`}
            </button>
          </div>

          <div
            className={clsx(
              "mt-3.5 transition-opacity duration-considered ease-state",
              dim("rows"),
            )}
            style={{ height: bodyH }}
          >
            {phase === "sources" ? (
              <ul className="grid grid-cols-2 gap-x-8">
                {example.sources.map((s) => (
                  <li
                    key={s.title}
                    className="flex h-[30px] items-center gap-3 border-b border-mineral-200"
                  >
                    <span className="truncate text-[13px] text-ink">
                      {s.title}
                    </span>
                    <span className="ml-auto shrink-0 text-[11px] uppercase tabular-nums tracking-[0.06em] text-slate">
                      {s.meta}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {example.rows.map((r) => (
                  <li
                    key={r.tag}
                    className={clsx(
                      "grid gap-x-4",
                      example.format === "timeline"
                        ? "h-[30px] items-center"
                        : "h-[46px] items-baseline pt-0.5",
                    )}
                    style={{ gridTemplateColumns: `${tagCol} minmax(0,1fr)` }}
                  >
                    {/* the left column is the proof: an index, a year, or a
                        state. Mono only where it is genuinely a date. */}
                    <span
                      className={clsx(
                        "truncate",
                        example.format === "blockers"
                          ? "text-[13px] font-semibold text-mineral-500"
                          : "text-[12px] font-medium uppercase tabular-nums tracking-[0.04em] text-slate",
                      )}
                    >
                      {r.tag}
                    </span>
                    <span className="min-w-0">
                      {r.title && (
                        <span className="block truncate text-[14px] font-semibold leading-tight text-ink">
                          {r.title}
                        </span>
                      )}
                      {r.body && (
                        <span
                          className={clsx(
                            "block truncate leading-snug",
                            r.title
                              ? "mt-0.5 text-[13px] text-slate"
                              : "text-[14px] text-ink",
                          )}
                        >
                          {r.body}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {example.close && phase !== "sources" && (
            <div
              className={clsx(
                "mt-3 border-t border-mineral-200 pt-3.5 transition-opacity duration-considered ease-state",
                dim("close"),
              )}
            >
              <div className="border-l-2 border-ink pl-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-slate">
                  {example.close.label}
                </p>
                <p className="mt-1 text-[15px] font-semibold leading-[1.36] text-ink">
                  {example.close.body}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── MEMORY UPDATED ───────────────────────────────────────────────── */}
      {phase === "updated" && (
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
          <p className="text-[21px] font-semibold leading-[1.3] tracking-[-0.014em] text-ink">
            Property memory updated.
          </p>
          <ul className="mt-4">
            {MEMORY_UPDATE.captured.map((c) => (
              <li
                key={c.tag}
                className="grid h-[34px] grid-cols-[96px_minmax(0,1fr)] items-center gap-x-4"
              >
                <span className="text-[11px] uppercase tracking-[0.06em] text-slate">
                  {c.tag}
                </span>
                <span className="truncate text-[14px] text-ink">{c.body}</span>
              </li>
            ))}
          </ul>
          <p className="mt-auto pt-4 text-[12px] text-mineral-500">
            {MEMORY_UPDATE.summary}
          </p>
        </div>
      )}
      </div>
    </div>
  );
}
