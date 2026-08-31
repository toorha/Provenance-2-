"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MEMORY_LAYER } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const IN = MEMORY_LAYER.inputs;
const OUT = MEMORY_LAYER.outputs;
const N_IN = IN.length;
const N_OUT = OUT.length;

/* 1 the memory sits there · 2..8 each record feeds in · 9..12 the
   outputs emerge · 13 the finished system */
const FIRST_IN = 2;
const FIRST_OUT = FIRST_IN + N_IN;
const STEPS = FIRST_OUT + N_OUT;

/* ---- geometry, in the drawing's own coordinates ---- */
const W = 1000;
const H = 496;
const CX = 500;
const CY = 240;
/* where a connector meets the centre card */
const HUB_X = 152;
const HUB_Y = 104;

const IN_X = 62;
const IN_TOP = 42;
const IN_GAP = 68;
const OUT_X = 938;
const OUT_TOP = 108;
const OUT_GAP = 92;

const inAt = (i: number) => ({ x: IN_X, y: IN_TOP + i * IN_GAP });
const outAt = (i: number) => ({ x: OUT_X, y: OUT_TOP + i * OUT_GAP });

/** a bezier that leaves the tile horizontally and arrives at the card
 *  horizontally, so every line curves rather than pointing */
function curve(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = (to.x - from.x) * 0.55;
  return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
}

function pathIn(i: number) {
  const s = inAt(i);
  return curve({ x: s.x + 30, y: s.y }, { x: CX - HUB_X, y: CY });
}
function pathOut(i: number) {
  const e = outAt(i);
  return curve({ x: CX + HUB_X, y: CY }, { x: e.x - 30, y: e.y });
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * Math.min(1, Math.max(0, t)));
}

export function MemoryFlow() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(STEPS, {
    beatMs: 950,
    startMs: 400,
    loop: true,
    loopPauseMs: 5200,
  });
  const step = reduced ? STEPS : raw;

  const activeIn = step >= FIRST_IN && step < FIRST_OUT ? step - FIRST_IN : -1;
  const fed = Math.max(0, Math.min(N_IN, step - FIRST_IN + 1));
  const outShown = Math.max(0, Math.min(N_OUT, step - FIRST_OUT + 1));
  const t = fed / N_IN;

  const st = MEMORY_LAYER.state;
  const events = lerp(st.from.events, st.to.events, t);
  const linked = lerp(st.from.sources, st.to.sources, t);

  type Row = { kind: string; title: string; meta: string };
  const rows: Row[] = IN.slice(0, fed).flatMap((i) =>
    "adds" in i && i.adds ? [i.adds as Row] : []
  );
  const reading = activeIn >= 0 ? IN[activeIn] : null;

  return (
    <div ref={ref}>
      {/* ---------------- the field ---------------- */}
      <div
        className="relative mx-auto hidden lg:block"
        style={{ width: W, height: H, maxWidth: "100%" }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          {/* records converging on the memory */}
          {IN.map((item, i) => {
            const d = pathIn(i);
            const on = activeIn === i;
            const done = fed > i;
            return (
              <g key={item.id}>
                <path
                  d={d}
                  className={on ? "stroke-accent" : "stroke-border-dark"}
                  strokeWidth={on ? 1.6 : 1}
                  strokeLinecap="round"
                  opacity={on ? 0.95 : done ? 0.4 : 0.3}
                  style={{ transition: "opacity 600ms" }}
                />
                {(on || done) && (
                  <circle r={on ? 3.4 : 2} className={on ? "fill-accent" : "fill-border-dark"}>
                    <animateMotion
                      dur={`${on ? 1.5 : 3.4}s`}
                      repeatCount="indefinite"
                      begin={`-${i * 0.35}s`}
                      path={d}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* and the work coming back out of it */}
          {OUT.map((o, i) => {
            const d = pathOut(i);
            const on = outShown > i;
            return (
              <g key={o.id}>
                <path
                  d={d}
                  className={on ? "stroke-accent" : "stroke-border-dark"}
                  strokeWidth={on ? 1.4 : 1}
                  strokeLinecap="round"
                  opacity={on ? 0.7 : 0.16}
                  style={{ transition: "opacity 700ms" }}
                />
                {on && (
                  <circle r={2.8} className="fill-accent">
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      begin={`-${i * 0.5}s`}
                      path={d}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* incoming records */}
        {IN.map((item, i) => {
          const p = inAt(i);
          return (
            <div
              key={item.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <Tile
                glyph={item.glyph}
                label={item.label}
                active={activeIn === i}
                done={fed > i}
              />
            </div>
          );
        })}

        {/* the memory, holding the middle */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: CX, top: CY, width: 300 }}
        >
          <Memory rows={rows} reading={reading} events={events} linked={linked} />
        </div>

        {/* what the memory gives back */}
        {OUT.map((o, i) => {
          const p = outAt(i);
          return (
            <div
              key={o.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <Tile
                glyph={OUT_GLYPH[o.variant] ?? "ask"}
                label={o.kind}
                active={outShown === i + 1}
                done={outShown > i + 1}
                accent
              />
            </div>
          );
        })}
      </div>

      {/* ---------------- stacked, small screens ---------------- */}
      <div className="space-y-6 lg:hidden">
        <div className="grid grid-cols-4 gap-3">
          {IN.map((item, i) => (
            <Tile
              key={item.id}
              glyph={item.glyph}
              label={item.label}
              active={activeIn === i}
              done={fed > i}
            />
          ))}
        </div>
        <Arrow />
        <Memory rows={rows} reading={reading} events={events} linked={linked} />
        <Arrow />
        <div className="grid grid-cols-4 gap-3">
          {OUT.map((o, i) => (
            <Tile
              key={o.id}
              glyph={OUT_GLYPH[o.variant] ?? "ask"}
              label={o.kind}
              active={outShown === i + 1}
              done={outShown > i + 1}
              accent
            />
          ))}
        </div>
      </div>

      <p className="mt-10 font-display text-[1.4rem] leading-[1.16] tracking-[-0.022em] text-foreground sm:text-[1.7rem] lg:mt-6">
        {MEMORY_LAYER.payoff.map((line, i) => (
          <span key={line} className={cn("block", i > 0 && "text-graphite")}>
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Arrow() {
  return (
    <p className="text-center text-[15px] text-border-dark" aria-hidden="true">
      &darr;
    </p>
  );
}

/** a record or an output: a glyph tile with its name underneath */
function Tile({
  glyph,
  label,
  active,
  done,
  accent,
}: {
  glyph: string;
  label: string;
  active: boolean;
  done: boolean;
  accent?: boolean;
}) {
  const lit = active || (accent && done);
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : done ? (accent ? 0.95 : 0.55) : accent ? 0.28 : 0.8,
        scale: active ? 1.05 : 1,
      }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex w-[108px] flex-col items-center gap-2 text-center"
    >
      <span
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-[10px] border transition-colors duration-300",
          lit
            ? "border-accent/70 bg-accent/[0.06] shadow-[0_8px_22px_-8px_rgba(30,80,58,0.5)]"
            : "border-foreground/12 bg-warm-white shadow-[0_1px_2px_rgba(19,20,19,0.05)]"
        )}
      >
        <Glyph name={glyph} className={lit ? "text-accent" : "text-graphite"} />
      </span>
      <span
        className={cn(
          "text-[11.5px] leading-tight",
          lit ? "font-medium text-foreground" : "text-graphite"
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

/** the property memory — the one object that gets containment */
function Memory({
  rows,
  reading,
  events,
  linked,
}: {
  rows: { kind: string; title: string; meta: string }[];
  reading: (typeof IN)[number] | null;
  events: number;
  linked: number;
}) {
  return (
    <div className="rounded-[6px] border border-foreground/[0.09] bg-warm-white shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_2px_6px_rgba(19,20,19,0.05),0_28px_56px_-26px_rgba(19,20,19,0.4)]">
      {/* identity */}
      <div className="flex items-center justify-between gap-3 border-b border-foreground/[0.07] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-[17px] w-[17px] items-center justify-center border-[1.5px] border-accent">
            <span className="h-1 w-1 bg-accent" />
          </span>
          <span className="text-[13px] font-semibold tracking-[-0.01em] text-foreground">
            Provenance memory layer
          </span>
        </div>
        <motion.span
          key={events}
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 rounded-full bg-foreground/[0.06] px-2 py-[3px] text-[10px] font-medium tabular-nums text-graphite"
        >
          {events} events
        </motion.span>
      </div>

      {/* what it now holds */}
      <div className="min-h-[150px] px-4 py-3">
        {reading && (
          <motion.div
            key={reading.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mb-2.5 flex items-start gap-2.5 border-b border-foreground/[0.06] pb-2.5"
          >
            <Glyph name={reading.glyph} className="mt-[3px] shrink-0 text-accent" small />
            <span className="min-w-0 flex-1">
              <span className="block font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent">
                {reading.steps[Math.min(1, reading.steps.length - 1)].kind}
              </span>
              <span className="block truncate text-[12px] leading-tight text-foreground">
                {reading.steps[Math.min(1, reading.steps.length - 1)].value}
              </span>
            </span>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          </motion.div>
        )}

        {rows.map((r) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-baseline gap-2.5 py-[5px]"
          >
            <span className="w-[70px] shrink-0 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted-foreground">
              {r.kind}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12px] leading-tight text-foreground">
                {r.title}
              </span>
              <span className="block text-[10px] text-muted-foreground">{r.meta}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* growth */}
      <p className="border-t border-foreground/[0.07] px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-accent">
        <motion.span
          key={linked}
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="tabular-nums"
        >
          {linked}
        </motion.span>{" "}
        linked sources
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const OUT_GLYPH: Record<string, string> = {
  ask: "ask",
  task: "task",
  shared: "shared",
  prep: "meeting",
};

const GLYPHS: Record<string, ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  meeting: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M8 3.5v3.5M16 3.5v3.5" />
    </>
  ),
  report: (
    <>
      <path d="M6 3.5h8l4 4v13H6z" />
      <path d="M14 3.5v4h4M9 12h6M9 15.5h6" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6z" />
      <path d="M9.5 8h5M9.5 11.5h5" />
    </>
  ),
  drawing: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="1" />
      <path d="M3.5 9h17M9 4v16" />
      <circle cx="14.5" cy="14.5" r="2.2" />
    </>
  ),
  lease: (
    <>
      <path d="M6 3.5h12v17H6z" />
      <path d="M9 8h6M9 11.5h6M9 15.5c1-1.2 2-1.2 3 0s2 1.2 3 0" />
    </>
  ),
  letter: (
    <>
      <path d="M5 4h9l4 4v12H5z" />
      <path d="M14 4v4h4M8.5 12h7M8.5 15.5h7" />
    </>
  ),
  ask: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 4.5 4.5" />
      <path d="M8.8 8.6a1.8 1.8 0 1 1 1.9 2.1v1" />
    </>
  ),
  task: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="m7.5 12 2.6 2.5L16.5 8" />
    </>
  ),
  shared: (
    <>
      <circle cx="8.5" cy="9" r="2.8" />
      <circle cx="16" cy="10" r="2.2" />
      <path d="M3.5 19c.7-2.8 2.6-4.3 5-4.3s4.3 1.5 5 4.3M15 14.8c2 .2 3.4 1.6 4 4.2" />
    </>
  ),
};

function Glyph({
  name,
  className,
  small,
}: {
  name: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(small ? "h-[13px] w-[13px]" : "h-[22px] w-[22px]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={small ? 1.6 : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}
