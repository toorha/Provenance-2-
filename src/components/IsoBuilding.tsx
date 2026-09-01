"use client";

import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Westmount Centre as massing rather than a plan. Isometric: x runs
 * along the frontage, y toward the viewer, z is height. Each volume
 * gets a top, a right face and a front face so it reads as built.
 * ------------------------------------------------------------------ */

const U = 3.15;
const K = 0.866;
const OX = 196;
const OY = 46;

type V = [number, number, number];
type Vol = { x0: number; x1: number; y0: number; y1: number; z: number; bays?: number };

function project(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * K * U, OY + (x + y) * 0.5 * U - z * U];
}
const pts = (v: V[]) => v.map(([x, y, z]) => project(x, y, z).join(",")).join(" ");
function seg(a: V, b: V) {
  const [x1, y1] = project(...a);
  const [x2, y2] = project(...b);
  return { x1, y1, x2, y2 };
}

/* the centre: grocery anchor, tenant strip, an outparcel, and the lot */
const VOLUMES: Vol[] = [
  { x0: 6, x1: 28, y0: 8, y1: 28, z: 13 },
  { x0: 29, x1: 73, y0: 11, y1: 26, z: 8.5, bays: 7 },
  { x0: 79, x1: 94, y0: 40, y1: 53, z: 7 },
];
const RTUS = [34, 44, 54, 64];
const LOTS = [
  { y0: 33, y1: 42 },
  { y0: 45, y1: 54 },
];

export function IsoBuilding({ className }: { className?: string }) {
  const stroke = "hsl(var(--foreground))";
  const accent = "hsl(var(--accent))";

  return (
    <svg
      viewBox="0 0 470 330"
      className={className}
      role="img"
      aria-label="Isometric massing of Westmount Centre"
    >
      {/* the ground it sits on */}
      <polygon
        points={pts([
          [-2, 2, 0],
          [100, 2, 0],
          [100, 60, 0],
          [-2, 60, 0],
        ])}
        fill={stroke}
        fillOpacity={0.028}
        stroke={stroke}
        strokeOpacity={0.16}
        strokeWidth={1}
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
      />

      {/* parking */}
      {LOTS.map((l) => (
        <Lot key={l.y0} {...l} stroke={stroke} />
      ))}
      <line
        {...seg([4, 30.5, 0], [96, 30.5, 0])}
        stroke={stroke}
        strokeOpacity={0.14}
        strokeWidth={1}
        strokeDasharray="4 4"
        vectorEffect="non-scaling-stroke"
      />

      {/* a landscaped island, the one spot of green */}
      <polygon
        points={pts([
          [40, 44, 0],
          [44, 44, 0],
          [44, 54, 0],
          [40, 54, 0],
        ])}
        fill={accent}
        fillOpacity={0.14}
        stroke={accent}
        strokeOpacity={0.28}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />

      {/* the buildings, back to front */}
      {VOLUMES.map((v, i) => (
        <Massing key={i} v={v} stroke={stroke} />
      ))}

      {/* rooftop units on the strip */}
      {RTUS.map((x) => (
        <Massing
          key={`rtu-${x}`}
          v={{ x0: x, x1: x + 5, y0: 16, y1: 21, z: 10 }}
          base={8.5}
          stroke={stroke}
        />
      ))}
    </svg>
  );
}

/* a volume: front and right faces in shadow, a lighter roof on top */
function Massing({ v, base = 0, stroke }: { v: Vol; base?: number; stroke: string }) {
  const { x0, x1, y0, y1, z, bays } = v;

  const bayLines: ReactNode[] = [];
  if (bays) {
    for (let i = 1; i < bays; i++) {
      const bx = x0 + ((x1 - x0) * i) / bays;
      bayLines.push(
        <line
          key={i}
          {...seg([bx, y1, base], [bx, y1, z])}
          stroke={stroke}
          strokeOpacity={0.2}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      );
    }
  }

  return (
    <g>
      {/* right face */}
      <polygon
        points={pts([
          [x1, y0, base],
          [x1, y1, base],
          [x1, y1, z],
          [x1, y0, z],
        ])}
        fill={stroke}
        fillOpacity={0.16}
        stroke={stroke}
        strokeOpacity={0.42}
        strokeWidth={1.1}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* front face */}
      <polygon
        points={pts([
          [x1, y1, base],
          [x0, y1, base],
          [x0, y1, z],
          [x1, y1, z],
        ])}
        fill={stroke}
        fillOpacity={0.1}
        stroke={stroke}
        strokeOpacity={0.42}
        strokeWidth={1.1}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* roof */}
      <polygon
        points={pts([
          [x0, y0, z],
          [x1, y0, z],
          [x1, y1, z],
          [x0, y1, z],
        ])}
        fill={stroke}
        fillOpacity={0.045}
        stroke={stroke}
        strokeOpacity={0.42}
        strokeWidth={1.1}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {bayLines}
    </g>
  );
}

function Lot({ y0, y1, stroke }: { y0: number; y1: number; stroke: string }) {
  const ticks: ReactNode[] = [];
  const stalls = 14;
  for (let i = 0; i <= stalls; i++) {
    const x = 6 + (68 * i) / stalls;
    ticks.push(
      <line
        key={i}
        {...seg([x, y0, 0], [x, y1, 0])}
        stroke={stroke}
        strokeOpacity={0.13}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    );
  }
  return (
    <>
      <polygon
        points={pts([
          [6, y0, 0],
          [74, y0, 0],
          [74, y1, 0],
          [6, y1, 0],
        ])}
        fill="none"
        stroke={stroke}
        strokeOpacity={0.16}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      {ticks}
    </>
  );
}
