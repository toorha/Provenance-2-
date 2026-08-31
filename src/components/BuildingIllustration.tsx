"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

export type BuildingZone = "roof" | "retail" | "rooftop" | "ground" | "parcel";

export interface BuildingMarker {
  zone: BuildingZone;
  year: string;
  label?: string;
  active?: boolean;
}

interface BuildingIllustrationProps {
  activeZone?: BuildingZone | null;
  markers?: BuildingMarker[];
  /** true = drawn on a dark surface (hero) */
  dark?: boolean;
  showGhostMassing?: boolean;
  /** a new building comes up on the outparcel */
  development?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ *
 * Isometric projection.  x = length (long axis), y = depth toward the
 * viewer, z = height.  Westmount Centre is a large suburban shopping
 * centre: two anchors, a retail strip, a mixed-use office block, a big
 * parking field, and a vacant outparcel.
 * ------------------------------------------------------------------ */
const U = 19;
const OX = 432;
const OY = 198;
const K = 0.866;

type V = [number, number, number];
type Quad = [V, V, V, V];
type Box = { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number };

function project(x: number, y: number, z: number): [number, number] {
  return [OX + (x - y) * K * U, OY + (x + y) * 0.5 * U - z * U];
}
function facePoints(verts: V[]): string {
  return verts.map(([x, y, z]) => project(x, y, z).join(",")).join(" ");
}
function seg(a: V, b: V) {
  const [x1, y1] = project(...a);
  const [x2, y2] = project(...b);
  return { x1, y1, x2, y2 };
}
function lerp3(p: V, q: V, t: number): V {
  return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
}

/* ------------------------------------------------------------------ *
 * Massing
 * ------------------------------------------------------------------ */
const STRIP: Box = { x0: 3.6, x1: 15.4, y0: 5.2, y1: 8.0, z0: 0, z1: 3.0 };
const GROCERY: Box = { x0: -0.2, x1: 4.2, y0: 3.2, y1: 8.4, z0: 0, z1: 4.8 };
const JUNIOR: Box = { x0: 14.8, x1: 18.4, y0: 3.9, y1: 8.2, z0: 0, z1: 3.9 };
const OFFICE: Box = { x0: 7.4, x1: 11.2, y0: 4.2, y1: 7.4, z0: 0, z1: 6.6 };
const OFFICE_CROWN: Box = { x0: 7.4, x1: 11.2, y0: 4.2, y1: 7.4, z0: 6.6, z1: 7.0 };
const RTU_XS = [6.0, 7.9, 12.0, 13.6];
const PARCEL = { x0: 16.4, x1: 19.4, y0: 8.8, y1: 12.6 };
const PARCEL_GHOST: Box = { x0: 16.7, x1: 19.1, y0: 9.1, y1: 12.3, z0: 0, z1: 2.6 };
const DEV_BUILDING: Box = { x0: 16.75, x1: 19.05, y0: 9.2, y1: 12.2, z0: 0, z1: 3.7 };
const DEV_RTU_XS = [17.15, 18.35];
const SIDEWALK = { y0: 8.0, y1: 8.7 };
const PARK = { x0: -1.4, x1: 17.4, y0: 8.7, y1: 15.2 };
const PARK_ROWS = [9.6, 11.5, 13.4];
const ISLANDS = [1.6, 6.4, 11.2];
const TREES_ROAD = [-0.4, 3.6, 7.6, 11.6, 15.6];
const LIGHTS: V[] = [
  [1.0, 10.6, 0],
  [8.0, 10.6, 0],
  [14.5, 10.6, 0],
  [4.5, 13.2, 0],
  [11.5, 13.2, 0],
];

const ANCHOR: Record<BuildingZone, V> = {
  roof: [5.6, 6.6, 3.0],
  retail: [10.2, 8.0, 3.0],
  rooftop: [10.0, 6.0, 3.5],
  ground: [3.0, 12.6, 0],
  parcel: [17.9, 10.7, 0],
};

function diamond([cx, cy]: [number, number], r: number) {
  return `M${cx},${cy - r} L${cx + r},${cy} L${cx},${cy + r} L${cx - r},${cy} Z`;
}

/* ------------------------------------------------------------------ */

export function BuildingIllustration({
  activeZone = null,
  markers = [],
  dark = false,
  showGhostMassing = false,
  development = false,
  className,
}: BuildingIllustrationProps) {
  const reduced = useReducedMotion();

  const stroke = dark ? "#DAD7CD" : "#2C2B27";
  const hair = dark ? "rgba(218,215,205,0.32)" : "rgba(44,43,39,0.30)";
  const fillTop = dark ? "rgba(218,215,205,0.06)" : "rgba(44,43,39,0.04)";
  const fillSide = dark ? "rgba(218,215,205,0.035)" : "rgba(44,43,39,0.055)";
  const glass = dark ? "rgba(99,198,160,0.05)" : "rgba(47,111,82,0.05)";
  const accent = dark ? "#63C6A0" : "#2F6F52";
  const accentSoft = dark ? "rgba(99,198,160,0.16)" : "rgba(47,111,82,0.13)";
  const labelStrong = dark ? "#F2F0E9" : "#171612";
  const labelMuted = dark ? "rgba(242,240,233,0.7)" : "rgba(23,22,18,0.62)";

  const fadeClass = reduced ? undefined : "bld-fade";

  return (
    <svg
      viewBox="94 120 706 456"
      className={className}
      role="img"
      aria-label="Isometric architectural model of Westmount Centre shopping centre"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ground shadow */}
      <ellipse
        cx={project(8, 8, 0)[0]}
        cy={project(8, 8, 0)[1] + 6}
        rx={330}
        ry={78}
        fill={dark ? "rgba(0,0,0,0.3)" : "rgba(44,43,39,0.045)"}
      />

      {/* site + setback */}
      <polygon
        points={facePoints([
          [-3, 1.5, 0],
          [21, 1.5, 0],
          [21, 16.5, 0],
          [-3, 16.5, 0],
        ])}
        fill={dark ? "rgba(218,215,205,0.02)" : "rgba(44,43,39,0.02)"}
      />
      <polygon
        points={facePoints([
          [-2.3, 2.2, 0],
          [20.3, 2.2, 0],
          [20.3, 15.8, 0],
          [-2.3, 15.8, 0],
        ])}
        fill="none"
        stroke={hair}
        strokeWidth={1}
        strokeDasharray="1 6"
      />

      {/* ---- parking field ---- */}
      <GroundGrid
        rect={{ x0: PARK.x0, x1: PARK.x1, y0: PARK.y0, y1: PARK.y1 }}
        cols={0}
        rows={0}
        stroke={hair}
        active={activeZone === "ground"}
        accent={accent}
      />
      {PARK_ROWS.map((y) => (
        <ParkingRow key={y} y={y} x0={0} x1={16.2} stroke={hair} />
      ))}
      {/* drive aisle centre-lines */}
      {[10.55, 12.45].map((y) => (
        <line
          key={`aisle-${y}`}
          {...seg([-0.6, y, 0], [16.6, y, 0])}
          stroke={hair}
          strokeWidth={1}
          strokeDasharray="4 5"
        />
      ))}
      {/* crosswalk to the entrance */}
      {[0, 1, 2, 3].map((i) => {
        const x = 8.7 + i * 0.28;
        return (
          <line
            key={`cw-${i}`}
            {...seg([x, 8.7, 0], [x - 0.5, 9.5, 0])}
            stroke={hair}
            strokeWidth={1}
          />
        );
      })}
      {/* landscape islands */}
      {ISLANDS.map((x) => (
        <polygon
          key={`isl-${x}`}
          points={facePoints([
            [x - 0.5, 10.5, 0],
            [x + 0.5, 10.5, 0],
            [x + 0.5, 12.5, 0],
            [x - 0.5, 12.5, 0],
          ])}
          fill={dark ? "rgba(99,198,160,0.06)" : "rgba(47,111,82,0.06)"}
          stroke={hair}
          strokeWidth={1}
        />
      ))}
      {/* light standards */}
      {LIGHTS.map(([x, y], i) => {
        const b = project(x, y, 0);
        const t = project(x, y, 1.6);
        return (
          <g key={`lt-${i}`}>
            <line x1={b[0]} y1={b[1]} x2={t[0]} y2={t[1]} stroke={hair} strokeWidth={1} />
            <line x1={t[0] - 5} y1={t[1]} x2={t[0] + 5} y2={t[1]} stroke={hair} strokeWidth={1} />
          </g>
        );
      })}

      {/* sidewalk along the storefronts */}
      <polygon
        points={facePoints([
          [GROCERY.x0, SIDEWALK.y0, 0],
          [JUNIOR.x1, SIDEWALK.y0, 0],
          [JUNIOR.x1, SIDEWALK.y1, 0],
          [GROCERY.x0, SIDEWALK.y1, 0],
        ])}
        fill={fillTop}
        stroke={hair}
        strokeWidth={1}
      />

      {/* north outparcel */}
      <SurveyParcel
        rect={PARCEL}
        stroke={activeZone === "parcel" ? accent : hair}
        sw={activeZone === "parcel" ? 1.7 : 1}
      />
      {(showGhostMassing || activeZone === "parcel") && !development && (
        <BoxOutline box={PARCEL_GHOST} stroke={accent} dash="4 4" />
      )}

      {/* a new building comes up on the outparcel */}
      {development && (
        <g key="dev" className={reduced ? undefined : "bld-fade"}>
          <BoxSolid
            box={DEV_BUILDING}
            stroke={accent}
            fillTop={dark ? "rgba(99,198,160,0.16)" : "rgba(47,111,82,0.14)"}
            fillSide={dark ? "rgba(99,198,160,0.08)" : "rgba(47,111,82,0.08)"}
            hair={dark ? "rgba(99,198,160,0.32)" : "rgba(47,111,82,0.32)"}
            colsX={4}
            colsY={3}
            rows={4}
          />
          <line
            {...seg(
              [DEV_BUILDING.x0, DEV_BUILDING.y0, DEV_BUILDING.z1 + 0.14],
              [DEV_BUILDING.x1, DEV_BUILDING.y0, DEV_BUILDING.z1 + 0.14]
            )}
            stroke={accent}
            strokeWidth={1.4}
          />
          {DEV_RTU_XS.map((x) => (
            <BoxSolid
              key={`dev-rtu-${x}`}
              box={{ x0: x, x1: x + 0.6, y0: 9.9, y1: 10.6, z0: DEV_BUILDING.z1, z1: DEV_BUILDING.z1 + 0.4 }}
              stroke={accent}
              fillTop={accentSoft}
              fillSide={glass}
              hair={hair}
            />
          ))}
        </g>
      )}
      {TREES_ROAD.map((x) => {
        const base = project(x, 15.4, 0);
        const top = project(x, 15.4, 1.0);
        return (
          <g key={`tr-${x}`}>
            <line x1={base[0]} y1={base[1]} x2={top[0]} y2={top[1]} stroke={hair} strokeWidth={1} />
            <circle cx={top[0]} cy={top[1] - 3} r={5} fill="none" stroke={hair} strokeWidth={1} />
          </g>
        );
      })}

      {/* ---- grocery anchor ---- */}
      <BoxSolid box={GROCERY} stroke={stroke} fillTop={fillTop} fillSide={fillSide} hair={hair} rows={2} />
      {/* parapet cap */}
      <line {...seg([GROCERY.x1, GROCERY.y0, GROCERY.z1 + 0.18], [GROCERY.x1, GROCERY.y1, GROCERY.z1 + 0.18])} stroke={stroke} strokeWidth={1.2} />
      {/* entrance */}
      <polygon
        points={facePoints([
          [1.4, GROCERY.y1, 0],
          [2.8, GROCERY.y1, 0],
          [2.8, GROCERY.y1, 2.4],
          [1.4, GROCERY.y1, 2.4],
        ])}
        fill={glass}
        stroke={stroke}
        strokeWidth={1.1}
      />

      {/* ---- retail strip ---- */}
      <BoxSolid box={STRIP} stroke={stroke} fillTop={fillTop} fillSide={fillSide} hair={hair} />
      {/* storefront bays on the front face */}
      <StorefrontGrid
        y={STRIP.y1}
        x0={STRIP.x0}
        x1={STRIP.x1}
        z1={STRIP.z1}
        bays={13}
        stroke={hair}
        accent={accent}
        highlight={activeZone === "retail" ? [8] : []}
      />
      {/* bulkhead + transom bands */}
      <line {...seg([STRIP.x0, STRIP.y1, 0.5], [STRIP.x1, STRIP.y1, 0.5])} stroke={hair} strokeWidth={1} />
      <line {...seg([STRIP.x0, STRIP.y1, 2.4], [STRIP.x1, STRIP.y1, 2.4])} stroke={stroke} strokeWidth={1.1} />

      {/* ---- junior anchor ---- */}
      <BoxSolid box={JUNIOR} stroke={stroke} fillTop={fillTop} fillSide={fillSide} hair={hair} rows={2} colsX={4} />

      {/* ---- office / mixed-use block ---- */}
      <BoxSolid
        box={OFFICE}
        stroke={stroke}
        fillTop={fillTop}
        fillSide={glass}
        hair={hair}
        colsX={6}
        colsY={4}
        rows={6}
      />
      <BoxSolid box={OFFICE_CROWN} stroke={stroke} fillTop={fillTop} fillSide={fillSide} hair={hair} />
      {/* lobby band at grade */}
      <line {...seg([OFFICE.x1, OFFICE.y1, 1.1], [OFFICE.x0, OFFICE.y1, 1.1])} stroke={stroke} strokeWidth={1.3} />
      <line {...seg([OFFICE.x1, OFFICE.y0, 1.1], [OFFICE.x1, OFFICE.y1, 1.1])} stroke={stroke} strokeWidth={1.3} />

      {/* continuous canopy along the strip */}
      <polygon
        points={facePoints([
          [STRIP.x0, STRIP.y1, 2.45],
          [STRIP.x1, STRIP.y1, 2.45],
          [STRIP.x1, STRIP.y1 + 0.7, 2.45],
          [STRIP.x0, STRIP.y1 + 0.7, 2.45],
        ])}
        fill={fillTop}
        stroke={stroke}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      {[4.5, 7.0, 12.0, 14.5].map((x) => (
        <line
          key={`post-${x}`}
          {...seg([x, STRIP.y1 + 0.6, 2.4], [x, STRIP.y1 + 0.6, 0])}
          stroke={hair}
          strokeWidth={1}
        />
      ))}

      {/* rooftop mechanical */}
      {RTU_XS.map((x) => (
        <BoxSolid
          key={`rtu-${x}`}
          box={{ x0: x, x1: x + 1.1, y0: 5.9, y1: 6.9, z0: 3.0, z1: 3.55 }}
          stroke={stroke}
          fillTop={fillTop}
          fillSide={fillSide}
          hair={hair}
        />
      ))}
      <polygon
        points={facePoints([
          [5.4, 5.6, 3.0],
          [15.0, 5.6, 3.0],
          [15.0, 7.2, 3.0],
          [5.4, 7.2, 3.0],
        ])}
        fill="none"
        stroke={hair}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* pylon sign */}
      {(() => {
        const b = project(18.6, 13.6, 0);
        const t = project(18.6, 13.6, 3.4);
        return (
          <g>
            <line x1={b[0]} y1={b[1]} x2={t[0]} y2={t[1]} stroke={stroke} strokeWidth={1.4} />
            <polygon
              points={facePoints([
                [18.2, 13.6, 3.4],
                [19.0, 13.6, 3.4],
                [19.0, 13.6, 4.6],
                [18.2, 13.6, 4.6],
              ])}
              fill={fillSide}
              stroke={stroke}
              strokeWidth={1.2}
            />
          </g>
        );
      })()}

      {/* ---- zone highlight ---- */}
      {activeZone && activeZone !== "ground" && activeZone !== "retail" && (
        <g key={`hl-${activeZone}`} className={fadeClass}>
          <ZoneHighlight zone={activeZone} accent={accent} accentSoft={accentSoft} />
        </g>
      )}

      {/* ---- markers ---- */}
      {markers.map((m) => {
        const [ax, ay, az] = ANCHOR[m.zone];
        const base = project(ax, ay, az);
        const tip = project(ax, ay, az + (m.active ? 1.9 : 0.7));
        return (
          <g key={`mk-${m.zone}-${m.year}`} className={fadeClass}>
            {m.active ? (
              <>
                <line x1={base[0]} y1={base[1]} x2={tip[0]} y2={tip[1]} stroke={accent} strokeWidth={1.4} />
                <circle cx={base[0]} cy={base[1]} r={2.4} fill={accent} />
                <path d={diamond(tip, 5)} fill={accent} />
                <text
                  x={tip[0] + 10}
                  y={tip[1] - 3}
                  fontSize={15}
                  fontWeight={600}
                  fill={labelStrong}
                  letterSpacing="0.01em"
                >
                  {m.year}
                </text>
                {m.label && (
                  <text
                    x={tip[0] + 10}
                    y={tip[1] + 12}
                    fontSize={11}
                    fontWeight={600}
                    fill={labelMuted}
                    letterSpacing="0.07em"
                  >
                    {m.label.toUpperCase()}
                  </text>
                )}
              </>
            ) : (
              <>
                <line x1={base[0]} y1={base[1]} x2={tip[0]} y2={tip[1]} stroke={accent} strokeWidth={1} opacity={0.75} />
                <circle cx={tip[0]} cy={tip[1]} r={3.4} fill={accent} />
                <text
                  x={tip[0] + 8}
                  y={tip[1] + 4}
                  fontSize={12.5}
                  fontWeight={600}
                  fill={labelStrong}
                  opacity={0.8}
                >
                  {m.year}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Drawing helpers
 * ------------------------------------------------------------------ */

function Face({
  quad,
  cols = 0,
  rows = 0,
  fill,
  stroke,
  sw = 1.5,
  hair,
}: {
  quad: Quad;
  cols?: number;
  rows?: number;
  fill?: string;
  stroke: string;
  sw?: number;
  hair?: string;
}) {
  const [a, b, c, d] = quad;
  const grid: ReactNode[] = [];
  const gc = hair ?? stroke;
  for (let i = 1; i < cols; i++) {
    const t = i / cols;
    grid.push(
      <line key={`c${i}`} {...seg(lerp3(a, b, t), lerp3(d, c, t))} stroke={gc} strokeWidth={1} />
    );
  }
  for (let i = 1; i < rows; i++) {
    const t = i / rows;
    grid.push(
      <line key={`r${i}`} {...seg(lerp3(a, d, t), lerp3(b, c, t))} stroke={gc} strokeWidth={1} />
    );
  }
  return (
    <>
      <polygon
        points={facePoints([a, b, c, d])}
        fill={fill ?? "none"}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {grid}
    </>
  );
}

function boxQuads(b: Box): { right: Quad; front: Quad; top: Quad } {
  const { x0, x1, y0, y1, z0, z1 } = b;
  return {
    right: [
      [x1, y0, z0],
      [x1, y1, z0],
      [x1, y1, z1],
      [x1, y0, z1],
    ],
    front: [
      [x1, y1, z0],
      [x0, y1, z0],
      [x0, y1, z1],
      [x1, y1, z1],
    ],
    top: [
      [x0, y0, z1],
      [x1, y0, z1],
      [x1, y1, z1],
      [x0, y1, z1],
    ],
  };
}

function BoxSolid({
  box,
  stroke,
  fillTop,
  fillSide,
  hair,
  colsX = 0,
  colsY = 0,
  rows = 0,
}: {
  box: Box;
  stroke: string;
  fillTop: string;
  fillSide: string;
  hair: string;
  colsX?: number;
  colsY?: number;
  rows?: number;
}) {
  const { right, front, top } = boxQuads(box);
  return (
    <>
      <Face quad={right} cols={colsY} rows={rows} fill={fillSide} stroke={stroke} hair={hair} />
      <Face quad={front} cols={colsX} rows={rows} fill={fillSide} stroke={stroke} hair={hair} />
      <Face quad={top} fill={fillTop} stroke={stroke} hair={hair} />
    </>
  );
}

function BoxOutline({ box, stroke, dash }: { box: Box; stroke: string; dash?: string }) {
  const { right, front, top } = boxQuads(box);
  return (
    <g opacity={0.8}>
      {[right, front, top].map((q, i) => (
        <polygon
          key={i}
          points={facePoints(q)}
          fill="none"
          stroke={stroke}
          strokeWidth={1.1}
          strokeDasharray={dash}
        />
      ))}
    </g>
  );
}

function StorefrontGrid({
  y,
  x0,
  x1,
  z1,
  bays,
  stroke,
  accent,
  highlight,
}: {
  y: number;
  x0: number;
  x1: number;
  z1: number;
  bays: number;
  stroke: string;
  accent: string;
  highlight: number[];
}) {
  const lines: ReactNode[] = [];
  for (let i = 0; i <= bays; i++) {
    const x = x0 + ((x1 - x0) * i) / bays;
    lines.push(
      <line key={`sf-${i}`} {...seg([x, y, 0], [x, y, z1])} stroke={stroke} strokeWidth={1} />
    );
  }
  return (
    <>
      {highlight.map((h) => {
        const xa = x0 + ((x1 - x0) * h) / bays;
        const xb = x0 + ((x1 - x0) * (h + 1)) / bays;
        return (
          <polygon
            key={`hl-${h}`}
            points={facePoints([
              [xa, y, 0],
              [xb, y, 0],
              [xb, y, z1],
              [xa, y, z1],
            ])}
            fill={accent}
            fillOpacity={0.14}
            stroke={accent}
            strokeWidth={1.6}
          />
        );
      })}
      {lines}
    </>
  );
}

function ParkingRow({
  y,
  x0,
  x1,
  stroke,
}: {
  y: number;
  x0: number;
  x1: number;
  stroke: string;
}) {
  const stalls = Math.round((x1 - x0) / 0.62);
  const ticks: ReactNode[] = [];
  for (let i = 0; i <= stalls; i++) {
    const x = x0 + ((x1 - x0) * i) / stalls;
    ticks.push(
      <line key={i} {...seg([x, y - 0.42, 0], [x, y + 0.42, 0])} stroke={stroke} strokeWidth={1} />
    );
  }
  return (
    <>
      <line {...seg([x0, y - 0.42, 0], [x1, y - 0.42, 0])} stroke={stroke} strokeWidth={1} />
      <line {...seg([x0, y + 0.42, 0], [x1, y + 0.42, 0])} stroke={stroke} strokeWidth={1} />
      {ticks}
    </>
  );
}

function GroundGrid({
  rect,
  stroke,
  active,
  accent,
}: {
  rect: { x0: number; x1: number; y0: number; y1: number };
  cols: number;
  rows: number;
  stroke: string;
  active?: boolean;
  accent: string;
}) {
  const { x0, y0, x1, y1 } = rect;
  return (
    <polygon
      points={facePoints([
        [x0, y0, 0],
        [x1, y0, 0],
        [x1, y1, 0],
        [x0, y1, 0],
      ])}
      fill={active ? accent : "none"}
      fillOpacity={active ? 0.1 : 0}
      stroke={active ? accent : stroke}
      strokeWidth={active ? 1.6 : 1}
    />
  );
}

function SurveyParcel({
  rect,
  stroke,
  sw,
}: {
  rect: { x0: number; x1: number; y0: number; y1: number };
  stroke: string;
  sw: number;
}) {
  const { x0, y0, x1, y1 } = rect;
  const corners: V[] = [
    [x0, y0, 0],
    [x1, y0, 0],
    [x1, y1, 0],
    [x0, y1, 0],
  ];
  return (
    <>
      <polygon
        points={facePoints(corners)}
        fill="none"
        stroke={stroke}
        strokeWidth={sw}
        strokeDasharray="5 4"
      />
      {corners.map(([cx, cy, cz], i) => {
        const p = project(cx, cy, cz);
        return <circle key={i} cx={p[0]} cy={p[1]} r={1.8} fill={stroke} />;
      })}
    </>
  );
}

function ZoneHighlight({
  zone,
  accent,
  accentSoft,
}: {
  zone: BuildingZone;
  accent: string;
  accentSoft: string;
}) {
  if (zone === "roof") {
    return (
      <polygon
        points={facePoints([
          [STRIP.x0, STRIP.y0, STRIP.z1],
          [7.2, STRIP.y0, STRIP.z1],
          [7.2, STRIP.y1, STRIP.z1],
          [STRIP.x0, STRIP.y1, STRIP.z1],
        ])}
        fill={accentSoft}
        stroke={accent}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    );
  }
  if (zone === "rooftop") {
    return (
      <>
        {RTU_XS.map((x, i) => {
          const { top } = boxQuads({
            x0: x,
            x1: x + 1.1,
            y0: 5.9,
            y1: 6.9,
            z0: 3.0,
            z1: 3.55,
          });
          return (
            <polygon
              key={i}
              points={facePoints(top)}
              fill={accentSoft}
              stroke={accent}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          );
        })}
      </>
    );
  }
  // parcel
  return (
    <polygon
      points={facePoints([
        [PARCEL.x0, PARCEL.y0, 0],
        [PARCEL.x1, PARCEL.y0, 0],
        [PARCEL.x1, PARCEL.y1, 0],
        [PARCEL.x0, PARCEL.y1, 0],
      ])}
      fill={accentSoft}
      stroke={accent}
      strokeWidth={1.7}
      strokeDasharray="4 4"
    />
  );
}
