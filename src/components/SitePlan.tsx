"use client";

import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Site plans. Each property is drawn as a simplified architectural
 * site plan: buildings sit on the site with a little extrusion so they
 * read as massing, parking is ruled out in stalls, and the property
 * line is dashed. Local coordinates are 100 wide.
 * ------------------------------------------------------------------ */

const STROKE = "hsl(var(--foreground))";
const ACCENT = "hsl(var(--accent))";

type Block = { x: number; y: number; w: number; h: number; bays?: number; tall?: boolean };
type Lot = { x: number; y: number; w: number; h: number; rows: number };
type Plan = {
  h: number;
  blocks: Block[];
  lots?: Lot[];
  drives?: [number, number, number, number][];
  green?: { x: number; y: number; w: number; h: number }[];
  pad?: { x: number; y: number; w: number; h: number };
  ghost?: boolean;
};

export const PLANS: Record<string, Plan> = {
  /* grocery-anchored centre: anchor + tenant strip, big lot, one pad */
  anchored: {
    h: 66,
    blocks: [
      { x: 6, y: 8, w: 22, h: 20 },
      { x: 29, y: 11, w: 44, h: 15, bays: 7 },
    ],
    lots: [
      { x: 6, y: 33, w: 68, h: 9, rows: 16 },
      { x: 6, y: 45, w: 68, h: 9, rows: 16 },
    ],
    drives: [[4, 30, 90, 30]],
    green: [{ x: 34, y: 44, w: 3, h: 11 }],
    pad: { x: 79, y: 40, w: 15, h: 13 },
  },

  /* larger plaza: L-shaped, deeper parking field */
  plaza: {
    h: 62,
    blocks: [
      { x: 6, y: 7, w: 52, h: 14, bays: 8 },
      { x: 6, y: 21, w: 15, h: 20 },
    ],
    lots: [
      { x: 25, y: 28, w: 66, h: 9, rows: 15 },
      { x: 25, y: 40, w: 66, h: 9, rows: 15 },
    ],
    drives: [[4, 25, 94, 25]],
    green: [{ x: 62, y: 8, w: 4, h: 12 }],
  },

  /* standalone retail pad with a small lot */
  pad: {
    h: 58,
    blocks: [{ x: 22, y: 10, w: 40, h: 18 }],
    lots: [{ x: 14, y: 34, w: 60, h: 9, rows: 13 }],
    drives: [[10, 31, 84, 31]],
  },

  /* urban mixed-use: two taller blocks, almost no surface parking */
  mixed: {
    h: 60,
    blocks: [
      { x: 10, y: 6, w: 30, h: 26, tall: true },
      { x: 44, y: 12, w: 20, h: 20, tall: true },
      { x: 10, y: 36, w: 54, h: 10, bays: 5 },
    ],
    drives: [[8, 50, 80, 50]],
    green: [{ x: 68, y: 8, w: 8, h: 24 }],
  },

  /* compact urban block */
  urban: {
    h: 56,
    blocks: [{ x: 16, y: 10, w: 44, h: 28, tall: true }],
    drives: [[12, 44, 70, 44]],
  },

  /* long suburban strip with two outparcels */
  strip: {
    h: 60,
    blocks: [{ x: 6, y: 8, w: 62, h: 13, bays: 9 }],
    lots: [
      { x: 6, y: 27, w: 62, h: 9, rows: 14 },
      { x: 6, y: 39, w: 62, h: 9, rows: 14 },
    ],
    drives: [[4, 24, 92, 24]],
    pad: { x: 74, y: 30, w: 16, h: 12 },
  },

  /* redevelopment site: existing form outlined, proposal dashed */
  redev: {
    h: 58,
    blocks: [{ x: 8, y: 10, w: 26, h: 16 }],
    lots: [{ x: 8, y: 32, w: 40, h: 9, rows: 9 }],
    drives: [[6, 29, 88, 29]],
    ghost: true,
  },
};

export function SitePlan({
  plan,
  hero = false,
  dim = 1,
}: {
  plan: string;
  hero?: boolean;
  dim?: number;
}) {
  const p = PLANS[plan] ?? PLANS.pad;
  const line = hero ? 0.6 : 0.36;
  const roof = hero ? 0.12 : 0.085;

  return (
    <svg
      viewBox={`0 0 100 ${p.h}`}
      className="block h-auto w-full overflow-visible"
      fill="none"
      aria-hidden="true"
      style={{ opacity: dim }}
    >
      {/* property line */}
      <rect
        x={1}
        y={1}
        width={98}
        height={p.h - 2}
        stroke={STROKE}
        strokeOpacity={0.16}
        strokeWidth={0.6}
        strokeDasharray="2 2.4"
        vectorEffect="non-scaling-stroke"
      />

      {/* site ground */}
      <rect x={1} y={1} width={98} height={p.h - 2} fill={STROKE} fillOpacity={0.022} />

      {/* drive aisles */}
      {p.drives?.map(([x1, y1, x2, y2], i) => (
        <line
          key={`d${i}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={STROKE}
          strokeOpacity={0.14}
          strokeWidth={0.6}
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* parking */}
      {p.lots?.map((l, i) => (
        <Parking key={`l${i}`} {...l} />
      ))}

      {/* landscaping */}
      {p.green?.map((g, i) => (
        <rect
          key={`g${i}`}
          x={g.x}
          y={g.y}
          width={g.w}
          height={g.h}
          fill={ACCENT}
          fillOpacity={0.13}
          stroke={ACCENT}
          strokeOpacity={0.22}
          strokeWidth={0.5}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* buildings */}
      {p.blocks.map((b, i) => (
        <Massing key={`b${i}`} {...b} line={line} roof={roof} />
      ))}

      {/* an outparcel building */}
      {p.pad && <Massing {...p.pad} line={line} roof={roof} />}

      {/* a redevelopment proposal, not yet built */}
      {p.ghost && (
        <rect
          x={52}
          y={8}
          width={38}
          height={20}
          stroke={ACCENT}
          strokeOpacity={0.6}
          strokeWidth={0.7}
          strokeDasharray="2.5 2"
          fill={ACCENT}
          fillOpacity={0.05}
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

/* a building: a soft shadow, then the roof plate, so it reads as mass */
function Massing({
  x,
  y,
  w,
  h,
  bays,
  tall,
  line,
  roof,
}: Block & { line: number; roof: number }) {
  const d = tall ? 2.6 : 1.5;
  const bayLines: ReactNode[] = [];
  if (bays) {
    for (let i = 1; i < bays; i++) {
      const bx = x + (w * i) / bays;
      bayLines.push(
        <line
          key={i}
          x1={bx}
          y1={y}
          x2={bx}
          y2={y + h}
          stroke={STROKE}
          strokeOpacity={0.22}
          strokeWidth={0.45}
          vectorEffect="non-scaling-stroke"
        />
      );
    }
  }
  return (
    <>
      <rect x={x + d} y={y + d} width={w} height={h} fill={STROKE} fillOpacity={0.21} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={STROKE}
        fillOpacity={roof}
        stroke={STROKE}
        strokeOpacity={line}
        strokeWidth={0.75}
        vectorEffect="non-scaling-stroke"
      />
      {bayLines}
    </>
  );
}

/* a parking field, ruled into stalls */
function Parking({ x, y, w, h, rows }: Lot) {
  const ticks: ReactNode[] = [];
  for (let i = 0; i <= rows; i++) {
    const tx = x + (w * i) / rows;
    ticks.push(
      <line
        key={i}
        x1={tx}
        y1={y}
        x2={tx}
        y2={y + h}
        stroke={STROKE}
        strokeOpacity={0.13}
        strokeWidth={0.45}
        vectorEffect="non-scaling-stroke"
      />
    );
  }
  return (
    <>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        stroke={STROKE}
        strokeOpacity={0.16}
        strokeWidth={0.5}
        vectorEffect="non-scaling-stroke"
      />
      {ticks}
    </>
  );
}
