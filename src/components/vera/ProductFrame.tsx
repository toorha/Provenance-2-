"use client";

import { clsx } from "clsx";
import { MODES, PROPERTY, type ModeId } from "@/lib/vera-data";
import { VeraMark } from "./VeraMark";

/* DESIGN.md §10.1 — the product frame.

   mineral-000, 1px mineral-300, 14px radius, lift-2. No macOS traffic lights,
   no browser chrome, no OS furniture: the frame is Provenance's own chrome.

   This shell is the visual system Ask Vera and Proactive Insights inherit, so
   everything structural lives here and only the body changes.

   DEVIATION from §10.1, noted deliberately: the spec describes one 44px title
   bar holding breadcrumb, mode switcher and metadata. Three tabs plus a
   breadcrumb plus metadata in 44px is too tight to read as real software, and
   the selected tab's 2px bottom rule would collide with the bar's own border.
   So the chrome is two bars — identity above, navigation below — which is what
   actual enterprise software does. Everything else follows §10.1 exactly. */

export function ProductFrame({
  mode,
  onModeChange,
  children,
  frameRef,
  promote,
}: {
  mode: ModeId;
  onModeChange: (m: ModeId) => void;
  children: React.ReactNode;
  frameRef?: React.RefObject<HTMLDivElement | null>;
  /* the mode Vera is pointing at, once the walkthrough has finished. Green
     because green means Vera, and this is Vera prompting rather than the
     interface decorating itself. */
  promote?: ModeId | null;
}) {
  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden rounded-frame border border-mineral-300 bg-mineral-0 font-product shadow-lift-2"
    >
      {/* identity bar — window controls, breadcrumb, mono metadata right */}
      <div className="flex h-11 items-center gap-2.5 border-b border-mineral-200 px-4">
        {/* Three small dots, and nothing else. Enough to say "this is desktop
            software being used", far short of a fake macOS toolbar. */}
        <span aria-hidden className="mr-1.5 hidden items-center gap-[6px] sm:flex">
          <span className="h-[10px] w-[10px] rounded-full bg-[#E0655A]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#E0AC4A]" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#57A65A]" />
        </span>
        <span className="text-[14px] font-medium text-ink">{PROPERTY.name}</span>
      </div>

      {/* mode switcher — a real tablist, arrow-key navigable (§10.5) */}
      <div
        role="tablist"
        aria-label="Vera modes"
        data-narrator-avoid
        /* below 1024px the switcher becomes a horizontally scrollable strip
           (§17.2) — three labels do not fit a phone width */
        className="flex flex-wrap border-b border-mineral-200 px-2 lg:flex-nowrap"
        onKeyDown={(e) => {
          const i = MODES.findIndex((m) => m.id === mode);
          if (e.key === "ArrowRight") {
            e.preventDefault();
            onModeChange(MODES[(i + 1) % MODES.length].id);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            onModeChange(MODES[(i - 1 + MODES.length) % MODES.length].id);
          }
        }}
      >
        {MODES.map((m: (typeof MODES)[number] & { hint?: string }) => {
          const selected = m.id === mode;
          const pointed = !selected && promote === m.id;
          return (
            <button
              key={m.id}
              role="tab"
              type="button"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => onModeChange(m.id)}
              className={clsx(
                /* LEVEL 1 affordance. A 46px target, a pointer, a surface that
                   responds on hover, and a filled tab plus a 2px rule when
                   selected. The underline alone read as website navigation. */
                "relative -mb-px flex min-h-[46px] cursor-pointer items-center",
                "whitespace-nowrap rounded-t-control px-4 text-[14px] sm:px-5",
                "transition-[background-color,color] duration-base ease-state",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-600",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-mineral-0",
                selected
                  ? "bg-mineral-100 font-semibold text-ink"
                  : pointed
                    ? "bg-vera-200 font-semibold text-vera-700 hover:bg-vera-200"
                    : "font-medium text-slate hover:bg-mineral-50 hover:text-ink",
              )}
            >
              {/* the mark identifies the one mode that is Vera by name.
                   Small, and only here: the other two tabs stay bare. */}
              {m.id === "ask" && (
                <VeraMark
                  size={15}
                  className={clsx(
                    "mr-2 transition-colors duration-base",
                    selected ? "text-vera-700" : "text-vera-600",
                  )}
                />
              )}
              {m.label}
              {/* Ask Vera never autoplays, so it needs a cue that it is
                  interactive. Grey, subordinate, no badge, no pulse. */}
              {m.hint && !selected && (
                <span
                  className={clsx(
                    "ml-2 hidden text-[12px] font-medium underline decoration-1 underline-offset-[3px] transition-colors duration-base lg:inline",
                    pointed
                      ? "text-vera-700 decoration-vera-600"
                      : "text-slate decoration-mineral-400",
                  )}
                >
                  {m.hint}
                </span>
              )}
              {/* selected = 2px ink bottom rule (§10.5) */}
              <span
                className={clsx(
                  "absolute inset-x-0 bottom-0 h-0.5 transition-opacity duration-base ease-state",
                  selected
                    ? "bg-ink opacity-100"
                    : pointed
                      ? "bg-vera-700 opacity-100"
                      : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </div>

      {children}
    </div>
  );
}
