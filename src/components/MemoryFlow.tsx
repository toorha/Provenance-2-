"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MEMORY_LAYER } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const IN = MEMORY_LAYER.inputs;
const OUT = MEMORY_LAYER.outputs;

/*
 * Everything is on screen from the start. The animation only moves
 * emphasis, the way you would light one layer of a drawing at a time.
 *
 * 1  the work already happening
 * 2  Provenance, holding it
 * 3  what the team gets back
 * 4  the whole system
 */
const STEPS = 4;

/* ---- geometry ----
 * Everything is placed from an explicit left edge so nothing can run
 * past W. The whole field has to fit the container at the lg
 * breakpoint, which is narrower than the max-width suggests. */
const W = 920;
const H = 460;
const CARD_W = 300;
const CX = 460;
const CY = 232;
const HUB_X = CARD_W / 2; // the connectors meet the card's own edges

const IN_LEFT = 18;
const IN_ANCHOR = 188; // where an input's connector leaves
const IN_TOP = 34;
const IN_GAP = 62;

const OUT_LEFT = 716;
const OUT_W = 182;
const OUT_TOP = 58;
const OUT_GAP = 92;

const inAt = (i: number) => ({ x: IN_LEFT, y: IN_TOP + i * IN_GAP });
const outAt = (i: number) => ({ x: OUT_LEFT, y: OUT_TOP + i * OUT_GAP });

function curve(from: { x: number; y: number }, to: { x: number; y: number }) {
  const dx = (to.x - from.x) * 0.55;
  return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
}
const pathIn = (i: number) =>
  curve({ x: IN_ANCHOR, y: inAt(i).y }, { x: CX - HUB_X, y: CY });
const pathOut = (i: number) =>
  curve({ x: CX + HUB_X, y: CY }, { x: outAt(i).x - 10, y: outAt(i).y });

export function MemoryFlow() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(STEPS, {
    beatMs: 2000,
    startMs: 500,
    loop: true,
    loopPauseMs: 3500,
  });
  const s = reduced ? STEPS : raw;

  /* emphasis, not movement */
  const inLit = s === 1 || s >= 4;
  const hubLit = s === 2 || s >= 4;
  const outLit = s === 3 || s >= 4;
  const dim = (lit: boolean) => (s === 0 ? 0.82 : lit ? 1 : 0.4);

  return (
    <div ref={ref}>
      {/* ---------------- the system, all at once ---------------- */}
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
          {IN.map((item, i) => (
            <path
              key={item.id}
              d={pathIn(i)}
              className={inLit || hubLit ? "stroke-accent" : "stroke-border-dark"}
              strokeWidth={inLit ? 1.4 : 1}
              strokeLinecap="round"
              opacity={inLit ? 0.75 : hubLit ? 0.4 : 0.22}
              style={{ transition: "opacity 700ms, stroke-width 700ms" }}
            />
          ))}
          {OUT.map((o, i) => (
            <path
              key={o.id}
              d={pathOut(i)}
              className={outLit || hubLit ? "stroke-accent" : "stroke-border-dark"}
              strokeWidth={outLit ? 1.4 : 1}
              strokeLinecap="round"
              opacity={outLit ? 0.75 : hubLit ? 0.35 : 0.22}
              style={{ transition: "opacity 700ms, stroke-width 700ms" }}
            />
          ))}
        </svg>

        {/* work in */}
        <Phase label={MEMORY_LAYER.phases[0]} x={IN_LEFT} y={10} lit={inLit} />
        <motion.div
          initial={false}
          animate={{ opacity: dim(inLit), scale: inLit ? 1 : 0.985 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: "left center" }}
        >
          {IN.map((item, i) => {
            const p = inAt(i);
            return (
              <div
                key={item.id}
                className="absolute -translate-y-1/2"
                style={{ left: p.x, top: p.y }}
              >
                <Row glyph={item.glyph} label={item.label} lit={inLit} />
              </div>
            );
          })}
        </motion.div>

        {/* the memory */}
        <Phase
          label={MEMORY_LAYER.phases[1]}
          x={CX - CARD_W / 2}
          y={10}
          w={CARD_W}
          lit={hubLit}
        />
        <motion.div
          initial={false}
          animate={{ opacity: dim(hubLit), scale: hubLit ? 1 : 0.985 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: CX, top: CY, width: CARD_W }}
        >
          <Memory lit={hubLit} />
        </motion.div>

        {/* work out */}
        <Phase label={MEMORY_LAYER.phases[2]} x={OUT_LEFT} y={10} lit={outLit} />
        <motion.div
          initial={false}
          animate={{ opacity: dim(outLit), scale: outLit ? 1 : 0.985 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ transformOrigin: "right center" }}
        >
          {OUT.map((o, i) => {
            const p = outAt(i);
            return (
              <div
                key={o.id}
                className="absolute -translate-y-1/2"
                style={{ left: p.x, top: p.y, width: OUT_W }}
              >
                <Output o={o} lit={outLit} />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ---------------- stacked, small screens ---------------- */}
      <div className="space-y-5 lg:hidden">
        <div>
          <Cap lit={inLit}>{MEMORY_LAYER.phases[0]}</Cap>
          <div className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1.5">
            {IN.map((item) => (
              <Row key={item.id} glyph={item.glyph} label={item.label} lit={inLit} />
            ))}
          </div>
        </div>
        <Memory lit={hubLit} />
        <div>
          <Cap lit={outLit}>{MEMORY_LAYER.phases[2]}</Cap>
          <div className="mt-2 space-y-2.5">
            {OUT.map((o) => (
              <Output key={o.id} o={o} lit={outLit} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 font-display text-[1.4rem] leading-[1.16] tracking-[-0.022em] text-foreground sm:text-[1.7rem] lg:mt-8">
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

function Phase({
  label,
  x,
  y,
  w,
  lit,
}: {
  label: string;
  x: number;
  y: number;
  w?: number;
  lit: boolean;
}) {
  return (
    <p
      className={cn(
        "absolute font-mono text-[9px] uppercase tracking-[0.16em] transition-colors duration-700",
        w && "text-center",
        lit ? "text-accent" : "text-muted-foreground/70"
      )}
      style={{ left: x, top: y, width: w }}
    >
      {label}
    </p>
  );
}

function Cap({ children, lit }: { children: ReactNode; lit: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors duration-700",
        lit ? "text-accent" : "text-muted-foreground"
      )}
    >
      {children}
    </p>
  );
}

/** one kind of work arriving — a line, not a card */
function Row({ glyph, label, lit }: { glyph: string; label: string; lit: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Glyph
        name={glyph}
        className={cn("transition-colors duration-500", lit ? "text-accent" : "text-graphite")}
      />
      <span className="whitespace-nowrap text-[12.5px] text-foreground">{label}</span>
    </div>
  );
}

/** the property memory */
function Memory({ lit }: { lit: boolean }) {
  const st = MEMORY_LAYER.state.to;
  return (
    <div
      className={cn(
        "rounded-[6px] border bg-warm-white transition-shadow duration-700",
        lit
          ? "border-accent/40 shadow-[0_2px_8px_rgba(19,20,19,0.06),0_30px_60px_-26px_rgba(19,20,19,0.45)]"
          : "border-foreground/[0.09] shadow-[0_1px_3px_rgba(19,20,19,0.05)]"
      )}
    >
      <div className="flex items-center gap-2 border-b border-foreground/[0.07] px-4 py-3">
        <span className="flex h-[17px] w-[17px] items-center justify-center border-[1.5px] border-accent">
          <span className="h-1 w-1 bg-accent" />
        </span>
        <span className="text-[13px] font-semibold tracking-[-0.01em]">Provenance</span>
      </div>

      <div className="px-4 py-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
          {MEMORY_LAYER.property}
        </p>

        <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-1.5">
          {(
            [
              [st.sources, "sources"],
              [st.decisions, "decisions"],
              [st.actions, "open actions"],
              [st.teams, "teams"],
            ] as const
          ).map(([v, label]) => (
            <span key={label} className="flex items-baseline gap-1.5">
              <span className="font-display text-[17px] tabular-nums text-foreground">{v}</span>
              <span className="text-[10.5px] text-muted-foreground">{label}</span>
            </span>
          ))}
        </div>

        {/* what it has made of the work */}
        <ul className="mt-3.5 space-y-1 border-t border-foreground/[0.07] pt-3">
          {MEMORY_LAYER.structure.map((sig, i) => (
            <motion.li
              key={sig}
              initial={false}
              animate={{ opacity: lit ? 1 : 0.35 }}
              transition={{ duration: 0.4, ease: EASE, delay: lit ? 0.15 + i * 0.05 : 0 }}
              className="flex items-center gap-2 text-[11.5px] text-foreground"
            >
              <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-accent text-warm-white">
                <svg viewBox="0 0 12 12" className="h-1.5 w-1.5" fill="none">
                  <path
                    d="M2.5 6.2 5 8.5 9.5 3.5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {sig}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** something the team gets back */
function Output({ o, lit }: { o: (typeof OUT)[number]; lit: boolean }) {
  return (
    <div
      className={cn(
        "border-l-2 pl-3 transition-colors duration-700",
        lit ? "border-accent" : "border-foreground/15"
      )}
    >
      <p
        className={cn(
          "font-mono text-[8.5px] uppercase tracking-[0.13em] transition-colors duration-700",
          lit ? "text-accent" : "text-muted-foreground"
        )}
      >
        {o.kind}
      </p>
      <p className="mt-0.5 text-[12px] leading-snug text-foreground">
        {o.variant === "ask" ? `“${o.title}”` : o.title}
      </p>
      <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
        {"due" in o && o.due ? `${o.meta} · ${o.due}` : o.meta}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

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
};

function Glyph({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-[15px] w-[15px] shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}
