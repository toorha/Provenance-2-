"use client";

import { clsx } from "clsx";
import { TRACK_ITEMS, type WorkItem } from "@/lib/vera-data";
import { ContextPanel, type Beat } from "./ContextPanel";

/* How the list is emphasised while the demo runs.

   "idle"     nothing is being narrated — every row at full weight, which is
              what a real reader gets the moment they click anything
   "showcase" the two flagships bright, the five ordinary rows receded, so a
              viewer sees immediately which two are worth opening
   "focus"    the walkthrough is running: one row active, the other flagship
              still readable but quieter, the rest receded

   The emphasis is contrast and opacity only. No green, no cards, no badges. */
export type ListPhase = "idle" | "showcase" | "focus";

/* Track the work — "What is happening?" (HOMEPAGE.md §2.2)

   DESIGN.md §10.2: 52px rows, 0 16px padding, bottom hairline only, ui 14px,
   maximum 7 visible rows. §10.4: the department column is the argument — one
   property, many functions, shared context, carried by the data rather than by
   a sentence.

   Tracked rows all have an OWNER. That is the structural difference from
   Proactive Insights, whose signals have derivations instead (§10.7), and it
   is what makes the two modes legible without reading their labels. */

export function TrackTheWork({
  activeId,
  onSelect,
  rowRefs,
  sourcesOpen = false,
  onToggleSources,
  beat = null,
  phase = "idle",
  focusId = null,
}: {
  activeId: string | null;
  onSelect: (id: string | null) => void;
  rowRefs?: React.MutableRefObject<Record<string, HTMLElement | null>>;
  sourcesOpen?: boolean;
  onToggleSources?: () => void;
  beat?: Beat;
  phase?: ListPhase;
  focusId?: string | null;
}) {
  const active = TRACK_ITEMS.find((i) => i.id === activeId) ?? null;
  const open = Boolean(active?.detail);

  const emphasisOf = (item: WorkItem) => {
    if (phase === "idle") return "opacity-100";
    if (!item.flagship) return "opacity-[0.42]";
    if (phase === "showcase") return "opacity-100";
    return item.id === focusId ? "opacity-100" : "opacity-[0.62]";
  };

  return (
    <div className="flex min-h-[372px] flex-col lg:min-h-[491px] lg:flex-row">
      <div className={clsx("min-w-0 flex-1", open && "hidden lg:block")}>
        {/* column header — mono as taxonomy (§4.5) */}
        {/* When the panel opens the list compresses to type + item. Real
            master-detail software does this, it frees the width the panel
            needs, and it removes competing information at the exact moment the
            viewer should be reading the panel. */}
        <div
          className={clsx(
            "hidden items-center gap-4 border-b border-mineral-200 px-4 py-2 text-[11px] uppercase tracking-[0.06em] text-slate lg:grid",
            open
              ? "lg:grid-cols-[104px_minmax(0,1fr)]"
              : "lg:grid-cols-[104px_minmax(0,1fr)_168px_140px_92px]",
          )}
        >
          <span>Type</span>
          <span>Item</span>
          {!open && (
            <>
              <span>Function</span>
              <span>Owner</span>
              <span className="text-right">When</span>
            </>
          )}
        </div>

        <ul>
          {TRACK_ITEMS.map((item) => (
            <Row
              key={item.id}
              item={item}
              selected={item.id === activeId}
              onSelect={onSelect}
              compact={open}
              emphasis={emphasisOf(item)}
              refCb={(el) => {
                if (rowRefs) rowRefs.current[item.id] = el;
              }}
            />
          ))}
        </ul>
      </div>

      {active?.detail && (
        <ContextPanel
          item={active}
          onClose={() => onSelect(null)}
          beat={beat}
          sourcesOpen={sourcesOpen}
          onToggleSources={onToggleSources ?? (() => {})}
        />
      )}
    </div>
  );
}

function Row({
  item,
  selected,
  onSelect,
  compact,
  emphasis,
  refCb,
}: {
  item: WorkItem;
  selected: boolean;
  onSelect: (id: string | null) => void;
  compact: boolean;
  emphasis: string;
  refCb: (el: HTMLElement | null) => void;
}) {
  const interactive = Boolean(item.detail);

  return (
    <li
      ref={refCb}
      className={clsx(
        // flex, so the li forms no line box of its own — the button is 52px
        // and the row should be 52px plus its rule, not 52 plus a strut
        "group relative flex border-b border-mineral-200 last:border-b-0",
        "transition-opacity duration-considered ease-state",
        emphasis,
        // selection is a neutral lift, not a green wash — the list stays
        // white / charcoal / grey and earns hierarchy from contrast alone
        selected && "bg-mineral-100",
      )}
    >
      {/* the selection indicator is ink, not green. No lift, no shadow, no scale. */}
      <span
        className={clsx(
          "absolute inset-y-0 left-0 transition-all duration-instant",
          selected
            ? "w-[3px] bg-ink opacity-100"
            : "w-0.5 bg-slate opacity-0 group-hover:opacity-100",
        )}
      />
      <button
        type="button"
        disabled={!interactive}
        onClick={() => onSelect(selected ? null : item.id)}
        className={clsx(
          "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 px-4 py-3 text-left",
          "transition-colors duration-instant lg:h-[52px] lg:py-0",
          compact
            ? "lg:grid-cols-[104px_minmax(0,1fr)]"
            : "lg:grid-cols-[104px_minmax(0,1fr)_168px_140px_92px]",
          !selected && "hover:bg-mineral-50",
          interactive ? "cursor-pointer" : "cursor-default",
        )}
      >
        <span className="order-1 text-[11px] uppercase tracking-[0.06em] text-slate lg:order-none">
          {item.type}
        </span>

        <span className="order-3 col-span-2 flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-0.5 lg:order-none lg:col-span-1 lg:flex-nowrap">
          <span
            className={clsx(
              "truncate text-[14px] text-ink",
              item.flagship ? "font-semibold" : "font-medium",
            )}
          >
            {item.title}
          </span>
          {/* teaches that this row is interactive. Still no badge, pill,
              border or animation — but an underline is the honest signal for
              "clickable", and slate carries enough weight to be noticed. */}
          {item.hint && (
            <span className="shrink-0 text-[12px] font-medium text-slate underline decoration-mineral-400 decoration-1 underline-offset-[3px]">
              {item.hint}
            </span>
          )}
        </span>

        <span
          className={clsx(
            "order-4 truncate text-[13px] text-slate lg:order-none",
            compact && "lg:hidden",
          )}
        >
          {item.department}
        </span>

        <span
          className={clsx(
            "order-5 hidden truncate text-[13px] text-slate lg:order-none",
            compact ? "lg:hidden" : "lg:block",
          )}
        >
          {item.owner}
        </span>

        {/* mono: dates align across rows because Geist has no tabular figures
            in this weight set, and the era/date column is scanned vertically */}
        <span
          className={clsx(
            "order-2 whitespace-nowrap text-right text-[11px] font-medium uppercase tabular-nums tracking-[0.06em] text-slate lg:order-none",
            compact && "lg:hidden",
          )}
        >
          {item.when}
        </span>
      </button>
    </li>
  );
}
