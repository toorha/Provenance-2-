"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MEMORY_LAYER } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const IN = MEMORY_LAYER.inputs;
const OUT = MEMORY_LAYER.outputs;
const N_IN = IN.length;
const N_OUT = OUT.length;

/* 1 the memory sits there · 2..8 each record arrives · 9..12 the
   outputs emerge · 13 hold on the finished system */
const FIRST_IN = 2;
const FIRST_OUT = FIRST_IN + N_IN;
const STEPS = FIRST_OUT + N_OUT;

const CENTER = { x: 50, y: 50 };

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

  const s = MEMORY_LAYER.state;
  const stat = {
    sources: lerp(s.from.sources, s.to.sources, t),
    events: lerp(s.from.events, s.to.events, t),
    decisions: lerp(s.from.decisions, s.to.decisions, t),
    actions: lerp(s.from.actions, s.to.actions, t),
    teams: lerp(s.from.teams, s.to.teams, t),
  };

  /* the rows written into the memory, in the order they arrived */
  type Row = { kind: string; title: string; meta: string };
  const rows: Row[] = IN.slice(0, fed).flatMap((i) =>
    "adds" in i && i.adds ? [i.adds as Row] : []
  );

  const transform =
    activeIn >= 0 ? IN[activeIn].steps[Math.min(1, IN[activeIn].steps.length - 1)] : null;

  return (
    <div ref={ref}>
      {/* ---------------- the field ---------------- */}
      <div className="relative hidden lg:block" style={{ aspectRatio: "16 / 9" }}>
        {/* connectors — thin, and only lit while a record is travelling */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {IN.map((item, i) => {
            const on = activeIn === i;
            const done = fed > i;
            return (
              <line
                key={item.id}
                x1={item.at.x + 6}
                y1={item.at.y + 4}
                x2={CENTER.x - 9}
                y2={CENTER.y}
                stroke={on ? "hsl(var(--accent))" : "hsl(var(--foreground))"}
                strokeWidth={on ? 1.1 : 0.7}
                strokeOpacity={on ? 0.55 : done ? 0.09 : 0.05}
                vectorEffect="non-scaling-stroke"
                style={{ transition: "stroke-opacity 600ms" }}
              />
            );
          })}
          {OUT.map((o, i) => (
            <line
              key={o.id}
              x1={CENTER.x + 9}
              y1={CENTER.y}
              x2={o.at.x - 1}
              y2={o.at.y + 5}
              stroke="hsl(var(--accent))"
              strokeWidth={0.7}
              strokeOpacity={outShown > i ? 0.16 : 0}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-opacity 700ms" }}
            />
          ))}
        </svg>

        {/* records scattered across the upper-left field */}
        {IN.map((item, i) => (
          <div
            key={item.id}
            className="absolute w-[190px]"
            style={{ left: `${item.at.x}%`, top: `${item.at.y}%` }}
          >
            <Record item={item} active={activeIn === i} filed={fed > i} />
          </div>
        ))}

        {/* the property memory, holding the middle */}
        <div className="absolute left-1/2 top-1/2 w-[292px] -translate-x-1/2 -translate-y-1/2">
          <Transform t={transform} />
          <Memory rows={rows} stat={stat} />
        </div>

        {/* what comes back, lower-right */}
        {OUT.map((o, i) => (
          <div
            key={o.id}
            className="absolute w-[212px]"
            style={{ left: `${o.at.x}%`, top: `${o.at.y}%` }}
          >
            <Output o={o} on={outShown > i} />
          </div>
        ))}
      </div>

      {/* ---------------- stacked, small screens ---------------- */}
      <div className="space-y-6 lg:hidden">
        <div>
          <Cap>Arriving</Cap>
          <div className="mt-2 grid grid-cols-2 gap-x-5 gap-y-2.5">
            {IN.map((item, i) => (
              <Record key={item.id} item={item} active={activeIn === i} filed={fed > i} />
            ))}
          </div>
        </div>
        <div>
          <Transform t={transform} />
          <Memory rows={rows} stat={stat} />
        </div>
        <div>
          <Cap>Coming back</Cap>
          <div className="mt-2 space-y-2.5">
            {OUT.map((o, i) => (
              <Output key={o.id} o={o} on={outShown > i} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 font-display text-[1.4rem] leading-[1.16] tracking-[-0.022em] text-foreground sm:text-[1.7rem] lg:mt-4">
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

function Cap({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </p>
  );
}

/** an arriving record — no box, just the record itself */
function Record({
  item,
  active,
  filed,
}: {
  item: (typeof IN)[number];
  active: boolean;
  filed: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: active ? 1 : filed ? 0.34 : 0.7,
        x: active ? 6 : 0,
      }}
      transition={{ duration: 0.55, ease: EASE }}
      className="flex items-start gap-2"
    >
      <Glyph
        name={item.glyph}
        className={cn("mt-[3px]", active ? "text-accent" : "text-muted-foreground")}
      />
      <span className="min-w-0">
        <span className="block font-mono text-[8.5px] uppercase tracking-[0.13em] text-muted-foreground">
          {item.label}
        </span>
        <span
          className={cn(
            "block text-[12.5px] leading-snug",
            active ? "text-foreground" : "text-graphite"
          )}
        >
          {item.title}
        </span>
      </span>
    </motion.div>
  );
}

/** what Provenance just understood — a passing note above the memory */
function Transform({ t }: { t: { kind: string; value: string } | null }) {
  return (
    <div className="mb-2.5 h-[34px]">
      <AnimatePresence mode="wait">
        {t && (
          <motion.div
            key={t.value}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="border-l-2 border-accent pl-2.5"
          >
            <p className="font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent">
              {t.kind}
            </p>
            <p className="text-[12px] leading-tight text-foreground">{t.value}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** the property memory itself — the one thing that gets containment */
function Memory({
  rows,
  stat,
}: {
  rows: readonly { kind: string; title: string; meta: string }[];
  stat: Record<string, number>;
}) {
  return (
    <div className="bg-warm-white shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_2px_5px_rgba(19,20,19,0.05),0_26px_50px_-28px_rgba(19,20,19,0.4)]">
      <div className="flex items-center gap-2 px-4 pb-2.5 pt-3">
        <span className="flex h-4 w-4 items-center justify-center border-[1.5px] border-accent">
          <span className="h-[3px] w-[3px] bg-accent" />
        </span>
        <span className="text-[12.5px] font-semibold text-foreground">Provenance</span>
      </div>
      <p className="px-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
        {MEMORY_LAYER.property}
      </p>

      {/* what the memory now holds */}
      <div className="min-h-[132px] px-4 pb-1 pt-3.5">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex items-baseline gap-2.5 py-[5px]"
            >
              <span className="w-[74px] shrink-0 font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent">
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
        </AnimatePresence>
      </div>

      {/* quiet system state */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-foreground/[0.07] px-4 py-2.5">
        {(
          [
            ["sources", stat.sources],
            ["events", stat.events],
            ["decisions", stat.decisions],
            ["teams", stat.teams],
          ] as const
        ).map(([label, v]) => (
          <span key={label} className="flex items-baseline gap-1">
            <span className="font-mono text-[11px] tabular-nums text-foreground">{v}</span>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted-foreground">
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** what comes back out — treated by type, not as identical cards */
function Output({ o, on }: { o: (typeof OUT)[number]; on: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn(
        "pl-3",
        o.variant === "ask" ? "border-l-2 border-accent" : "border-l border-foreground/15"
      )}
    >
      <p className="font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent">{o.kind}</p>

      {o.variant === "ask" ? (
        <p className="mt-1 font-display text-[15px] leading-[1.25] text-foreground">
          &ldquo;{o.title}&rdquo;
        </p>
      ) : (
        <p className="mt-1 text-[12.5px] leading-snug text-foreground">{o.title}</p>
      )}

      {"people" in o && o.people ? (
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {o.people.map((p) => (
              <span
                key={p}
                className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-accent/12 font-mono text-[7.5px] font-semibold text-accent ring-[1.5px] ring-warm-white"
              >
                {p}
              </span>
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground">{o.meta}</span>
        </div>
      ) : (
        <p className="mt-0.5 text-[10.5px] text-muted-foreground">{o.meta}</p>
      )}

      {"due" in o && o.due && (
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-foreground/70">
          {o.due}
        </p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

const GLYPHS: Record<string, ReactNode> = {
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  meeting: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="1" />
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
      <rect x="3.5" y="4" width="17" height="16" rx="0.5" />
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
