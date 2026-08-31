"use client";

import { useState } from "react";
import { BuildingIllustration, type BuildingZone } from "./BuildingIllustration";
import {
  DEMO_PROPERTY,
  MEMORY_QUERY,
  PROPERTY_CURRENT,
  PROPERTY_TIMELINE,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

function markersUpTo(index: number) {
  return PROPERTY_TIMELINE.slice(0, index + 1)
    .filter((s) => s.zone)
    .map((s) => ({
      zone: s.zone as BuildingZone,
      year: s.year,
      label: s.phase,
      active: s === PROPERTY_TIMELINE[index] && s.zone != null,
    }));
}

export function PropertyMemoryScroll() {
  const [open, setOpen] = useState(1);

  const active = open >= 0 ? PROPERTY_TIMELINE[open] : null;
  const buildingIndex = open >= 0 ? open : PROPERTY_TIMELINE.length - 1;
  const markers = markersUpTo(buildingIndex);

  return (
    <section
      id="memory"
      className="tex tex-paper tex-draft relative bg-secondary py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">Property memory</p>
        <h2 className="mt-7 max-w-2xl font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          One record. What&rsquo;s open now, and everything before.
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17.5px] leading-[1.6] text-graphite lg:text-[18.5px]">
          The property record for {DEMO_PROPERTY.name} is continuously updated. It
          tracks what is happening today and what needs attention, and it keeps the
          reasoning behind every decision going back to {PROPERTY_TIMELINE[0].year}.
        </p>

        {/* current state — live, not history */}
        <div className="mt-12 border-t-2 border-foreground/15 pt-8">
          <p className="label-caps !text-accent">Current state</p>
          <div className="mt-5 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <CurrentGroup label="Happening now" items={PROPERTY_CURRENT.happeningNow} />
            <CurrentGroup label="Open" items={PROPERTY_CURRENT.open} />
            <CurrentGroup label="Needs attention" items={PROPERTY_CURRENT.needsAttention} attention />
            <CurrentGroup label="Changed recently" items={PROPERTY_CURRENT.changedRecently} />
          </div>
        </div>

        <div className="mt-14 lg:mt-16">
          <p className="label-caps !text-foreground/55">History</p>
          <p className="mt-3 text-[15px] text-slate leading-[1.55] max-w-[46ch]">
            What happened before, why each decision was made, and what was resolved or
            deferred. Open any event.
          </p>
        </div>

        <div className="mt-8 lg:mt-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-16 lg:items-start">
          {/* building */}
          <div className="lg:sticky lg:top-24">
            <BuildingIllustration
              activeZone={(active?.zone ?? null) as BuildingZone | null}
              markers={markers}
              className="w-full max-w-[560px] mx-auto lg:mx-0 h-auto"
            />
            <p className="mt-2 text-center label-mono text-muted-foreground">
              {active
                ? `${active.year} · ${active.phase}`
                : `${DEMO_PROPERTY.years} years attached to the asset`}
            </p>
          </div>

          {/* accordion timeline */}
          <ol className="border-t border-border">
            {PROPERTY_TIMELINE.map((ev, i) => {
              const isOpen = open === i;
              return (
                <li key={ev.year} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group w-full flex items-baseline gap-4 py-4 text-left"
                  >
                    <span className="font-display text-[21px] text-foreground tabular-nums w-14 shrink-0">
                      {ev.year}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block label-mono text-accent">
                        {ev.fn}
                      </span>
                      <span className="block text-[16px] lg:text-[17px] text-foreground mt-0.5">
                        {ev.phase}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "text-[18px] text-muted-foreground transition-transform duration-300 group-hover:text-foreground",
                        isOpen && "rotate-45"
                      )}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 sm:pl-[4.5rem] space-y-4">
                        <Detail label="What happened" value={ev.what} />
                        <Detail label="Why" value={ev.why} tone="slate" />
                        <div>
                          <p className="label-mono text-muted-foreground">
                            Evidence
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {ev.evidence.map((e) => (
                              <span
                                key={e}
                                className="text-[12px] font-medium text-slate border border-border rounded-sm px-2 py-1"
                              >
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* still usable */}
        <div className="mt-16 lg:mt-24 border-t border-border pt-12 lg:pt-16 max-w-3xl">
          <p className="label-caps">Ask the record, anytime</p>
          <p className="mt-4 font-display text-[24px] lg:text-[30px] text-foreground tracking-[-0.015em] leading-[1.2]">
            &ldquo;{MEMORY_QUERY.question}&rdquo;
          </p>
          <div className="mt-6 border-l-2 border-accent pl-6">
            <p className="label-mono text-accent">
              Provenance
            </p>
            <p className="mt-2 text-[17px] lg:text-[19px] text-foreground leading-[1.55]">
              {MEMORY_QUERY.answer}
            </p>
            <p className="mt-3 label-mono text-muted-foreground">
              {MEMORY_QUERY.sourceCount} sources attached
            </p>
          </div>
          <p className="mt-10 font-display text-[22px] lg:text-[26px] text-foreground tracking-[-0.02em] leading-[1.2]">
            {MEMORY_QUERY.aside}
          </p>
        </div>
      </div>
    </section>
  );
}

function CurrentGroup({
  label,
  items,
  attention,
}: {
  label: string;
  items: readonly string[];
  attention?: boolean;
}) {
  return (
    <div className="lg:border-l lg:border-border lg:pl-5 lg:first:border-l-0 lg:first:pl-0">
      <p className="label-mono flex items-center gap-2 text-muted-foreground">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            attention ? "bg-[#B4482C]" : "bg-accent"
          )}
        />
        {label}
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="text-[13.5px] leading-[1.45] text-foreground">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "slate";
}) {
  return (
    <div>
      <p className="label-mono text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-[15px] lg:text-[16px] leading-[1.55]",
          tone === "slate" ? "text-slate" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}
