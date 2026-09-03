"use client";

import { clsx } from "clsx";
import { INSIGHTS, type Insight } from "@/lib/insight-data";
import { VeraMark } from "./VeraMark";

/* Proactive Insights: the mode Vera starts.

   Track the work answers "what is happening". Ask Vera answers "what do I
   need to know", and the visitor opens that conversation. This one is the
   only mode where nothing was asked at all, so the single job of the design
   is to make the visitor think "I did not ask for this, Vera noticed it".

   DELIBERATELY SMALLER THAN THE OTHER TWO. Track and Ask carry the
   interaction weight. Three insights, no cursor sequence, no autoplay, no
   typing. The visitor clicks or does not.

   NOT AN ALERT CENTRE. No severity, no counts, no unread state, no bell, no
   traffic lights, no confidence figures, no "AI insight" badge. Those are the
   vocabulary of a notifications feed, and a notifications feed is precisely
   what this mode must not be mistaken for. The kind label says what sort of
   noticing happened, never how urgent it is.

   READING ORDER, ENFORCED BY TYPE: what Vera noticed, why it matters, what it
   was drawn from, what you can do. Provenance never carries the weight of the
   observation.

   NO SCROLLING. Selecting an insight expands its reasoning and collapses the
   other two to their statements, so the block trades height rather than
   adding it. Sources replace the reasoning in the same reserved space. */

export type InsightState = {
  openId: string | null;
  sourcesOpen: boolean;
  /* the mode opens blank with only the Vera annotation on screen, then the
     insights fade in under it. Nothing was asked for, so the first thing the
     visitor sees should be Vera saying so, not a list they have to decode. */
  introducing: boolean;
};

/* the expanded region is reserved at the tallest case so opening the longest
   insight, or swapping it for sources, never moves the frame */
/* and the panel is pinned to the tallest state, so opening or closing an
   insight never resizes the frame */
const DETAIL_H = 264;

export function ProactiveInsights({
  state,
  onSelect,
  onToggleSources,
  onAsk,
}: {
  state: InsightState;
  onSelect: (id: string | null) => void;
  onToggleSources: () => void;
  /* hands the question to Ask Vera. The insight is where Vera notices; this
     is where the visitor gets to do something about it. */
  onAsk: (role: string, question: string) => void;
}) {
  const { openId, sourcesOpen, introducing } = state;

  return (
    <div className="flex min-h-[372px] flex-col px-5 py-4 lg:min-h-[577px]">
      {/* Held blank while the annotation speaks, then faded in together. The
          height is reserved throughout, so nothing moves when it arrives. */}
      <div
        className={clsx(
          "flex min-h-0 flex-1 flex-col transition-opacity duration-considered ease-state",
          introducing ? "pointer-events-none opacity-0" : "opacity-100",
        )}
        aria-hidden={introducing}
      >
        <ul className="flex min-h-0 flex-1 flex-col">
        {INSIGHTS.map((insight) => (
          <InsightRow
            key={insight.id}
            insight={insight}
            open={insight.id === openId}
            dimmed={openId !== null && insight.id !== openId}
            sourcesOpen={sourcesOpen}
            onSelect={onSelect}
            onToggleSources={onToggleSources}
            onAsk={onAsk}
          />
          ))}
        </ul>
      </div>
    </div>
  );
}

function InsightRow({
  insight,
  open,
  dimmed,
  sourcesOpen,
  onSelect,
  onToggleSources,
  onAsk,
}: {
  insight: Insight;
  open: boolean;
  dimmed: boolean;
  sourcesOpen: boolean;
  onSelect: (id: string | null) => void;
  onToggleSources: () => void;
  onAsk: (role: string, question: string) => void;
}) {
  return (
    <li
      className={clsx(
        "border-b border-mineral-200 last:border-b-0",
        "transition-opacity duration-base ease-state",
        dimmed ? "opacity-[0.45]" : "opacity-100",
      )}
    >
      <button
        type="button"
        data-insight={insight.id}
        aria-expanded={open}
        onClick={() => onSelect(open ? null : insight.id)}
        className={clsx(
          "block w-full cursor-pointer rounded-control px-3 py-3.5 text-left",
          "transition-colors duration-base ease-state",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600",
          "focus-visible:ring-offset-2 focus-visible:ring-offset-mineral-0",
          open ? "bg-mineral-100" : "hover:bg-mineral-50",
        )}
      >
        {/* 1. what kind of noticing. Quiet, and never a severity. */}
        <span className="block text-[11px] uppercase tracking-[0.06em] text-vera-600">
          {insight.kind}
        </span>

        {/* 2. what Vera noticed. The first thing read. */}
        <span className="mt-1 block text-[17px] font-semibold leading-[1.32] tracking-[-0.012em] text-ink">
          {insight.statement}
        </span>

        {/* 3. why it matters. Collapses away when another insight is open, so
               the three together never outgrow the frame. */}
        {!dimmed && (
          <span className="mt-1.5 block text-[13.5px] leading-[1.45] text-slate">
            {insight.support}
          </span>
        )}

        {/* 4. what it was drawn from, then the one thing you can do */}
        {!open && !dimmed && (
          <span className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[11px] uppercase tracking-[0.06em] text-slate">
              {insight.provenance.join(" · ")}
            </span>
            <span className="ml-auto shrink-0 text-[13px] font-medium text-ink underline decoration-mineral-400 underline-offset-[3px]">
              {insight.action}
            </span>
          </span>
        )}
      </button>

      {/* the expanded reasoning. Concise by rule: this is not a memo. */}
      {open && (
        <div className="px-3 pb-3.5 lg:h-[264px]">
          <div className="flex items-baseline gap-3">
            {/* one mark per opened insight, on the reasoning header. Never
                 on the rows themselves. */}
            <p className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[-0.002em] text-vera-700">
              <VeraMark size={14} className="shrink-0" />
              {sourcesOpen ? "Sources" : "Why Vera surfaced this"}
            </p>
            <span className="ml-auto shrink-0 text-[11px] uppercase tracking-[0.06em] text-slate">
              <button
                type="button"
                data-insight-sources
                onClick={onToggleSources}
                className="-my-3 inline-flex min-h-[44px] cursor-pointer items-center uppercase tracking-[0.06em] underline decoration-mineral-400 underline-offset-[3px] transition-colors duration-instant hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600 lg:my-0 lg:min-h-0"
              >
                {sourcesOpen ? "Back to reasoning" : "View sources"}
              </button>
            </span>
          </div>

          <div className="mt-2 border-l-[3px] border-vera-700 bg-vera-200 pl-3.5">
            {sourcesOpen ? (
              <ul className="py-1">
                {insight.sources.map((s) => (
                  <li key={s.title} className="flex h-[34px] items-center gap-3">
                    <span className="text-[13.5px] font-medium text-ink">
                      {s.title}
                    </span>
                    <span className="ml-auto shrink-0 pr-3 text-[11px] uppercase tracking-[0.06em] text-slate">
                      {s.meta}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="py-1">
                {insight.reasoning.map((r) => (
                  <li key={r.label} className="py-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ink">
                      {r.label}
                    </p>
                    <p className="mt-0.5 pr-3 text-[13.5px] leading-[1.4] text-ink">
                      {r.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!sourcesOpen && (
            <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.06em] text-slate">
                  What changed
                </p>
                <p className="mt-1 text-[13.5px] leading-[1.4] text-ink">
                  {insight.changed}
                </p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.06em] text-slate">
                  Next
                </p>
                <p className="mt-1 text-[13.5px] font-semibold leading-[1.4] text-ink">
                  {insight.next}
                </p>

                {/* the same treatment on all three: the mark, the label, and
                    the question Vera is ready to take. Green because this is
                    Vera acting, and restrained because it is a next step
                    inside the product rather than a call to action. */}
                <button
                  type="button"
                  data-insight-ask={insight.id}
                  onClick={() => onAsk(insight.ask.role, insight.ask.question)}
                  className="group mt-3 flex w-full cursor-pointer items-start gap-2 rounded-control py-2 text-left transition-colors duration-base ease-state hover:bg-vera-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600 focus-visible:ring-offset-2 focus-visible:ring-offset-mineral-0"
                >
                  <span className="mt-[3px] shrink-0 text-vera-700">
                    <VeraMark size={14} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.06em] text-vera-700">
                      Ask Vera
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-[1.4] text-vera-700 underline decoration-vera-300 underline-offset-[3px] group-hover:decoration-vera-600">
                      {insight.ask.question}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
