"use client";

import { useState } from "react";
import { BuildingIllustration, type BuildingZone } from "./BuildingIllustration";
import { cn } from "@/lib/utils";

const GREEN = "#63C6A0";
const AMBER = "#D98A5B";

type Hotspot = {
  id: string;
  zone?: BuildingZone;
  /** anchor point as a percentage of the illustration box */
  at: { left: string; top: string };
  side: "left" | "right";
  title: string;
  kicker: string;
  status: { label: string; tone: "open" | "ok" };
  events: { year: string; text: string }[];
  note: string;
  /** hovering this one brings a new building up on the parcel */
  develop?: boolean;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "roof",
    zone: "roof",
    at: { left: "45%", top: "27%" },
    side: "right",
    title: "Roof",
    kicker: "Membrane · 24,000 sf",
    status: { label: "Deficiency open", tone: "open" },
    events: [
      { year: "2018", text: "Eastern section replaced, phase 1" },
      { year: "2024", text: "Deficiency noted at annual inspection" },
      { year: "2029", text: "Manufacturer warranty expires" },
    ],
    note: "Why the work was phased, and the evidence, stay on the record.",
  },
  {
    id: "rtu",
    zone: "rooftop",
    at: { left: "57.5%", top: "36%" },
    side: "right",
    title: "RTU-4",
    kicker: "Rooftop mechanical",
    status: { label: "In service", tone: "ok" },
    events: [
      { year: "2020", text: "Installed and commissioned" },
      { year: "2023", text: "Compressor serviced under warranty" },
      { year: "2028", text: "Replacement in the capital plan" },
    ],
    note: "Service history and warranties kept per unit.",
  },
  {
    id: "parking",
    zone: "ground",
    at: { left: "24%", top: "52%" },
    side: "left",
    title: "Parking lot",
    kicker: "Surface lot · 180 stalls",
    status: { label: "Issue flagged", tone: "open" },
    events: [
      { year: "2021", text: "Full resurface and restripe" },
      { year: "2024", text: "Drainage issue flagged, unresolved" },
    ],
    note: "The open item is tracked against the asset, not a folder.",
  },
  {
    id: "parcel",
    zone: "parcel",
    at: { left: "66%", top: "79%" },
    side: "left",
    title: "North parcel",
    kicker: "Vacant outparcel",
    status: { label: "In review", tone: "ok" },
    events: [
      { year: "2024", text: "Redevelopment concept studied" },
      { year: "2024", text: "Pre-application zoning review on file" },
      { year: "Now", text: "Feasibility under review" },
    ],
    note: "The concept and the constraints that shaped it stay together.",
    develop: true,
  },
];

export function HeroBuilding() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = HOTSPOTS.find((h) => h.id === openId) ?? null;
  const activeZone = open?.zone ?? null;
  const development = open?.develop ?? false;

  return (
    <div className="mx-auto w-full max-w-[560px] lg:max-w-none">
      <div className="relative w-full" style={{ aspectRatio: "706 / 456" }}>
        <BuildingIllustration
          dark
          activeZone={development ? "parcel" : activeZone}
          development={development}
          className="absolute inset-0 h-full w-full"
        />

        <div className="pointer-events-none absolute inset-0">
          {HOTSPOTS.map((h) => {
            const isOpen = openId === h.id;
            const leftPct = parseFloat(h.at.left);
            const side = leftPct < 40 ? "right" : leftPct > 66 ? "left" : h.side;
            return (
              <button
                key={h.id}
                type="button"
                aria-label={h.title}
                onMouseEnter={() => setOpenId(h.id)}
                onMouseLeave={() => setOpenId((c) => (c === h.id ? null : c))}
                onFocus={() => setOpenId(h.id)}
                onBlur={() => setOpenId((c) => (c === h.id ? null : c))}
                onClick={() => setOpenId((c) => (c === h.id ? null : h.id))}
                className={cn(
                  "pointer-events-auto absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                  isOpen && "z-10"
                )}
                style={{ left: h.at.left, top: h.at.top }}
              >
                <span
                  className={cn(
                    "rounded-full transition-all duration-200",
                    isOpen ? "h-2 w-2" : "h-[6px] w-[6px]"
                  )}
                  style={{
                    background: isOpen ? GREEN : "rgba(99,198,160,0.6)",
                    boxShadow: isOpen ? `0 0 0 5px ${GREEN}20` : `0 0 0 3px ${GREEN}10`,
                  }}
                />

                {isOpen && <Card h={h} side={side} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({ h, side }: { h: Hotspot; side: "left" | "right" }) {
  return (
    <span
      className={cn(
        "absolute top-1/2 block w-[214px] -translate-y-1/2 border border-warm-white/15 text-left",
        side === "left" ? "right-4" : "left-4"
      )}
      style={{ background: "rgba(19,18,16,0.96)" }}
    >
      <span className="flex items-center justify-between border-b border-warm-white/10 px-3 py-2">
        <span className="text-[12px] font-semibold text-warm-white">{h.title}</span>
        <span
          className="text-[9px] font-bold uppercase tracking-[0.06em]"
          style={{ color: h.status.tone === "open" ? AMBER : GREEN }}
        >
          {h.status.label}
        </span>
      </span>

      <span className="block px-3 py-2.5">
        <span className="block text-[9.5px] uppercase tracking-[0.08em] text-warm-white/40">
          {h.kicker}
        </span>
        <span className="mt-2 block space-y-1.5">
          {h.events.map((e) => (
            <span key={e.year + e.text} className="flex gap-2.5">
              <span className="w-8 shrink-0 text-[10px] font-medium tabular-nums text-warm-white/45">
                {e.year}
              </span>
              <span className="text-[10.5px] leading-[1.35] text-warm-white/80">{e.text}</span>
            </span>
          ))}
        </span>
        <span className="mt-2.5 block border-t border-warm-white/10 pt-2 text-[9.5px] leading-[1.4] text-warm-white/40">
          {h.note}
        </span>
      </span>
    </span>
  );
}
