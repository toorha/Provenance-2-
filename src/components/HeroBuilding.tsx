"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BuildingIllustration, type BuildingZone } from "./BuildingIllustration";

const EASE = [0.22, 1, 0.36, 1] as const;

type Shot = {
  id: string;
  zone: BuildingZone | null;
  develop?: boolean;
  /** the point the camera settles on, as % of the frame */
  origin: { x: number; y: number };
  scale: number;
  title: string;
  kicker: string;
  events: { year: string; text: string }[];
};

const SHOTS: Shot[] = [
  {
    id: "rtu",
    zone: "rooftop",
    origin: { x: 57, y: 37 },
    scale: 1.85,
    title: "RTU-4",
    kicker: "Rooftop mechanical",
    events: [
      { year: "2020", text: "Installed and commissioned" },
      { year: "2024", text: "Compressor replaced under warranty" },
      { year: "2029", text: "Manufacturer warranty expires" },
    ],
  },
  {
    id: "parking",
    zone: "ground",
    origin: { x: 26, y: 48 },
    scale: 1.6,
    title: "Parking lot",
    kicker: "Surface lot · 180 stalls",
    events: [
      { year: "2021", text: "Full resurface and restripe" },
      { year: "2024", text: "Drainage issue flagged, open" },
    ],
  },
  {
    id: "underground",
    zone: "underground",
    origin: { x: 38, y: 60 },
    scale: 1.75,
    title: "Buried services",
    kicker: "Storm and sanitary trunk",
    events: [
      { year: "2019", text: "CCTV inspection completed" },
      { year: "2024", text: "Servicing capacity under review" },
      { year: "Now", text: "Consultant plan overdue" },
    ],
  },
  {
    id: "tenant",
    zone: "retail",
    origin: { x: 54, y: 45 },
    scale: 1.75,
    title: "Tenant Bay 3",
    kicker: "Retail · 4,200 sf",
    events: [
      { year: "2019", text: "Combined with the adjoining unit" },
      { year: "2019", text: "Lease amendment recorded" },
    ],
  },
  {
    id: "landscape",
    zone: null,
    origin: { x: 37, y: 52 },
    scale: 1.7,
    title: "Landscaping",
    kicker: "Site · islands and frontage",
    events: [
      { year: "2022", text: "Replaced under the site upgrade" },
      { year: "Now", text: "Maintenance contract active" },
    ],
  },
  {
    id: "parcel",
    zone: "parcel",
    develop: true,
    origin: { x: 64, y: 70 },
    scale: 1.5,
    title: "North parcel",
    kicker: "Development opportunity",
    events: [
      { year: "2024", text: "Redevelopment concept studied" },
      { year: "2024", text: "Pre-application zoning review on file" },
      { year: "Now", text: "Feasibility under review" },
    ],
  },
];

/* timeline: full view, then each shot zooms in, holds, zooms back out */
const OPEN_MS = 1500;
const IN_MS = 1000;
const HOLD_MS = 2800;
const OUT_MS = 800;
const GAP_MS = 450;
const LOOP_PAUSE_MS = 2000;

export function HeroBuilding() {
  const reduced = useReducedMotion();
  const [i, setI] = useState<number>(-1); // -1 = full view
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (reduced) return;
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

    const run = () => {
      let t = OPEN_MS;
      SHOTS.forEach((_, idx) => {
        at(t, () => setI(idx));
        t += IN_MS + HOLD_MS;
        at(t, () => setI(-1));
        t += OUT_MS + GAP_MS;
      });
      at(t + LOOP_PAUSE_MS, () => {
        setI(-1);
        run();
      });
    };
    setI(-1);
    run();

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [reduced]);

  const shot = i >= 0 ? SHOTS[i] : null;
  const origin = shot ? `${shot.origin.x}% ${shot.origin.y}%` : "50% 50%";
  const scale = shot ? shot.scale : 1;

  return (
    <div className="mx-auto w-full max-w-[600px] lg:max-w-none">
      <div
        className="relative w-full overflow-hidden rounded-[2px] border border-bone/[0.09] bg-charcoal-deep/40"
        style={{ aspectRatio: "704 / 512" }}
      >
        {/* the camera — inset a touch so it reads as a viewport, not a bleed */}
        <div
          className="absolute inset-[1.6%]"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: origin,
            transition: `transform ${shot ? IN_MS : OUT_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          <BuildingIllustration
            dark
            activeZone={shot?.zone ?? null}
            development={shot?.develop ?? false}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {/* a faint vignette so captions read against the corners */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 92% at 50% 42%, transparent 52%, rgba(12,13,12,0.6) 100%)",
          }}
        />

        {/* corner ticks — a quiet viewfinder */}
        {(["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "left-2 bottom-2 border-l border-b", "right-2 bottom-2 border-r border-b"] as const).map(
          (c) => (
            <span key={c} className={`pointer-events-none absolute h-3 w-3 border-bone/25 ${c}`} />
          )
        )}

        {/* caption */}
        {shot && (
          <motion.div
            key={shot.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
            className="absolute bottom-4 left-4 w-[222px] border border-bone/12 bg-charcoal-deep/88 backdrop-blur-[2px]"
          >
            <div className="flex items-baseline justify-between border-b border-bone/10 px-3 py-2">
              <span className="text-[12.5px] font-semibold text-bone">{shot.title}</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-bone/40">
                {i + 1} / {SHOTS.length}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-bone/40">
                {shot.kicker}
              </p>
              <ul className="mt-2 space-y-1.5">
                {shot.events.map((e) => (
                  <li key={e.year + e.text} className="flex gap-2.5">
                    <span className="w-7 shrink-0 font-mono text-[9.5px] tabular-nums text-bone/45">
                      {e.year}
                    </span>
                    <span className="text-[10.5px] leading-[1.35] text-bone/80">{e.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/35">
        Westmount Centre &nbsp;·&nbsp; one property, many systems
      </p>
    </div>
  );
}
