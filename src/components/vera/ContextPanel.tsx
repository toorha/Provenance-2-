"use client";

import { clsx } from "clsx";
import type { WorkItem } from "@/lib/vera-data";

/* The context panel: three beats, nothing else.

     1. VERA'S READ          what Vera understood
     2. WHAT VERA CONNECTED  the evidence Vera drew it from
     3. NEXT                 what the team has to do

   NOTHING IN THOSE THREE MAY EVER BE TRUNCATED. An earlier pass ran the
   evidence as a three column table (era, type, body) inside a 452px panel,
   which clipped the exact sentences that carry the proof: "Access corridor
   must remain unobs...", "Rev. 07 places loading within the co...". A panel
   that hides its reasoning to stay compact has traded away the only thing it
   was built to show. Records are stacked now (meta line, then a complete
   sentence) and the panel took the width it needed to hold them.

   Secondary metadata may compress. Core reasoning may not.

   ATTENTION IS THE OTHER DESIGN PROBLEM. One beat is active at a time and
   carries a pale vera wash, a 3px forest edge and a full contrast label; the
   others sit at 45%. The difference has to be obvious from across the room,
   without reading a word, and it has to land in about 200ms so the viewer
   registers that focus moved rather than watching it dissolve.

   NO SCROLLING, EVER. Sources replace the records in the same reserved space
   rather than extending the panel, which is what keeps the height fixed. */

export type Beat = "read" | "connected" | "next" | null;

export function ContextPanel({
  item,
  onClose,
  beat,
  sourcesOpen,
  onToggleSources,
}: {
  item: WorkItem;
  onClose: () => void;
  beat: Beat;
  sourcesOpen: boolean;
  onToggleSources: () => void;
}) {
  const d = item.detail!;
  /* Records are two line blocks, sources are single line rows. The block is
     reserved at whichever is taller so the swap never moves the Next beat. */
  const rowsH = Math.max(d.connected.length * 52, d.sources.length * 34);

  // null beat = nothing is being narrated, so everything sits at full weight
  const emph = (b: Exclude<Beat, null>) =>
    beat === null || beat === b ? "opacity-100" : "opacity-[0.45]";

  /* the active treatment, in one place so all three beats agree */
  const focus = (b: Exclude<Beat, null>) =>
    beat === b
      ? "border-vera-700 bg-vera-200"
      : "border-mineral-300 bg-transparent";

  return (
    <aside
      data-context-panel
      /* 680px of a 1176px frame, a little under 60%. The viewer already chose
         the issue, so the reasoning gets the room and the list compresses. */
      className="flex w-full flex-none flex-col overflow-hidden border-t border-mineral-200 bg-mineral-50 font-product lg:w-[680px] lg:border-l lg:border-t-0"
    >
      <div className="flex items-center gap-2 border-b border-mineral-200 px-6 py-2.5">
        <button
          type="button"
          onClick={onClose}
          className="-my-2 flex min-h-[44px] cursor-pointer items-center gap-1.5 pr-3 text-[13px] font-medium text-slate transition-colors duration-instant hover:text-ink lg:hidden"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
            <path
              d="M8 2L3.5 6.5L8 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
          Back
        </button>
        <span className="text-[11px] uppercase tracking-[0.06em] text-slate">
          {item.type}
        </span>
        <button
          type="button"
          data-panel-close
          onClick={onClose}
          aria-label="Close"
          className="ml-auto hidden h-6 w-6 place-items-center rounded-control text-slate transition-colors duration-instant hover:text-ink lg:grid"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path
              d="M3 3l7 7M10 3l-7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>

      <div className="px-6 py-4">
        {/* title, then its metadata on its own line. Compressing status, due,
            owner and role into one trailing mono run made the title harder to
            read and saved nothing worth saving. */}
        <p className="text-[16px] font-semibold leading-[1.25] tracking-[-0.011em] text-ink">
          {item.title}
        </p>
        <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-slate">
          {d.status} · Due {d.due}
        </p>

        {/* ── BEAT 1 ─────────────────────────────────────────────────────── */}
        <section
          className={clsx(
            "mt-4 transition-opacity duration-base ease-state",
            emph("read"),
          )}
        >
          <BeatLabel active={beat === "read"}>Vera&rsquo;s read</BeatLabel>
          {/* the focal statement of the whole panel */}
          <p
            className={clsx(
              "mt-1.5 border-l-[3px] py-1.5 pl-3.5 text-[17px] font-medium leading-[1.38] tracking-[-0.012em] text-ink",
              "transition-colors duration-base ease-state",
              focus("read"),
            )}
          >
            {d.read}
          </p>
        </section>

        {/* ── BEAT 2 ─────────────────────────────────────────────────────── */}
        <section
          className={clsx(
            "mt-4 transition-opacity duration-base ease-state",
            emph("connected"),
          )}
        >
          <div className="flex items-baseline gap-3">
            <BeatLabel active={beat === "connected"}>
              {sourcesOpen ? "Sources" : "What Vera connected"}
            </BeatLabel>
            {/* the count is secondary. The value is the connection. */}
            <span className="ml-auto shrink-0 text-[11px] uppercase tracking-[0.06em] text-slate">
              {sourcesOpen
                ? `${d.sources.length} sources`
                : `${d.connected.length} records`}
              <span className="mx-1.5 text-mineral-400">·</span>
              <button
                type="button"
                data-sources-toggle
                onClick={onToggleSources}
                className="-my-3 inline-flex min-h-[44px] cursor-pointer items-center uppercase tracking-[0.06em] underline decoration-mineral-400 underline-offset-[3px] transition-colors duration-instant hover:text-ink lg:my-0 lg:min-h-0"
              >
                {sourcesOpen ? "Back to records" : "View sources"}
              </button>
            </span>
          </div>

          <div
            className={clsx(
              "mt-2 border-l-[3px] pl-3.5 transition-colors duration-base ease-state",
              beat === "connected"
                ? "border-vera-700 bg-vera-200"
                : "border-mineral-300 bg-transparent",
            )}
            style={{ height: rowsH }}
          >
            {sourcesOpen ? (
              <ul className="py-1">
                {d.sources.map((s) => (
                  <li
                    key={s.title}
                    className="flex h-[34px] items-center gap-3"
                  >
                    <span className="text-[13.5px] font-medium text-ink">
                      {s.title}
                    </span>
                    <span className="ml-auto shrink-0 text-[11px] uppercase tabular-nums tracking-[0.06em] text-slate">
                      {s.meta}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="py-1">
                {d.connected.map((c) => (
                  /* stacked evidence: the era and kind on one line, then the
                     whole sentence on the next. Nothing is clipped and no
                     sentence has to survive a 200px column. */
                  <li key={c.tag} className="flex h-[52px] flex-col justify-center">
                    <p className="text-[11px] uppercase tracking-[0.06em] text-slate">
                      <span className="font-semibold text-ink">{c.tag}</span>
                      <span className="mx-1.5 text-mineral-400">·</span>
                      <span className="text-vera-600">{c.kind}</span>
                    </p>
                    <p className="mt-0.5 text-[13.5px] leading-[1.35] text-ink">
                      {c.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* ── BEAT 3 ─────────────────────────────────────────────────────── */}
        <section
          className={clsx(
            "mt-4 transition-opacity duration-base ease-state",
            emph("next"),
          )}
        >
          <BeatLabel active={beat === "next"}>Next</BeatLabel>
          <div
            className={clsx(
              "mt-1.5 border-l-[3px] py-1.5 pl-3.5 transition-colors duration-base ease-state",
              focus("next"),
            )}
          >
            {/* the action, and nothing else. The owner and the deadline used
                to sit under it in mono caps and were pure repetition: the row
                already carries the owner and the due date. */}
            <p className="text-[15px] font-semibold leading-[1.38] tracking-[-0.009em] text-ink">
              {d.next.action}
            </p>
          </div>
        </section>
      </div>
    </aside>
  );
}

/* Beat labels are small and semibold rather than another tracked mono caption.
   Making them all identical uppercase metadata was the reason nothing in the
   old panel read as more important than anything else. */
function BeatLabel({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <p
      className={clsx(
        "text-[12px] font-semibold tracking-[-0.002em] transition-colors duration-base ease-state",
        active ? "text-vera-700" : "text-slate",
      )}
    >
      {children}
    </p>
  );
}
