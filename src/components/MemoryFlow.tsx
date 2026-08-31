"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MEMORY_LAYER } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const IN = MEMORY_LAYER.inputs;
const OUT = MEMORY_LAYER.outputs;

/* one beat per input, then the outputs emerge one at a time */
const N_IN = IN.length;
const N_OUT = OUT.length;
const STEPS = N_IN + N_OUT + 1;

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * Math.min(1, Math.max(0, t)));
}

export function MemoryFlow() {
  const { ref, step } = useSequence(STEPS, {
    beatMs: 720,
    startMs: 300,
    loop: true,
    loopPauseMs: 3600,
  });

  const fed = Math.min(N_IN, step);
  const activeIn = step >= 1 && step <= N_IN ? step - 1 : -1;
  const outShown = Math.max(0, Math.min(N_OUT, step - N_IN));
  const t = fed / N_IN;

  const s = MEMORY_LAYER.state;
  const stat = {
    sources: lerp(s.from.sources, s.to.sources, t),
    decisions: lerp(s.from.decisions, s.to.decisions, t),
    actions: lerp(s.from.actions, s.to.actions, t),
    events: lerp(s.from.events, s.to.events, t),
    teams: lerp(s.from.teams, s.to.teams, t),
  };

  return (
    <div ref={ref}>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.05fr)_minmax(0,0.92fr)] lg:items-center lg:gap-5">
        {/* ---------------- inputs ---------------- */}
        <div>
          <ColLabel>Work coming in</ColLabel>
          <div className="mt-3 space-y-1.5">
            {IN.map((item, i) => (
              <InputRow
                key={item.id}
                item={item}
                active={activeIn === i}
                done={fed > i}
              />
            ))}
          </div>
        </div>

        {/* ---------------- the memory ---------------- */}
        <div className="relative">
          <Feed side="left" on={activeIn >= 0} />
          <Feed side="right" on={outShown > 0} />
          <MemoryCard
            stat={stat}
            extract={activeIn >= 0 ? IN[activeIn].extract : null}
            settled={step >= STEPS}
          />
        </div>

        {/* ---------------- outputs ---------------- */}
        <div>
          <ColLabel>Work coming out</ColLabel>
          <div className="mt-3 space-y-1.5">
            {OUT.map((o, i) => (
              <OutputRow key={o.id} o={o} on={outShown > i} fresh={outShown === i + 1} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-[38ch] font-display text-[1.35rem] leading-[1.2] tracking-[-0.022em] text-foreground sm:text-[1.6rem]">
        {MEMORY_LAYER.payoff}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ColLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
      {children}
    </p>
  );
}

/** the connector into / out of the memory card — desktop only */
function Feed({ side, on }: { side: "left" | "right"; on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-1/2 hidden h-px w-5 lg:block",
        side === "left" ? "right-full" : "left-full"
      )}
      style={{
        background:
          side === "left"
            ? "linear-gradient(to right, transparent, hsl(var(--accent)))"
            : "linear-gradient(to left, transparent, hsl(var(--accent)))",
        opacity: on ? 0.7 : 0.18,
        transition: "opacity 500ms",
      }}
    />
  );
}

function InputRow({
  item,
  active,
  done,
}: {
  item: (typeof IN)[number];
  active: boolean;
  done: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : done ? 0.45 : 0.75, x: active ? 3 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(
        "flex items-center gap-2.5 border bg-background px-2.5 py-2 transition-colors duration-300",
        active ? "border-accent/55" : "border-foreground/10"
      )}
    >
      <Glyph
        name={item.glyph}
        className={active ? "text-accent" : "text-muted-foreground"}
      />
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-foreground">
          {item.label}
        </span>
        <span className="block truncate text-[12px] text-foreground">{item.title}</span>
      </span>
    </motion.div>
  );
}

function MemoryCard({
  stat,
  extract,
  settled,
}: {
  stat: Record<string, number>;
  extract: { kind: string; value: string } | null;
  settled: boolean;
}) {
  const rows: [string, number][] = [
    ["sources", stat.sources],
    ["decisions", stat.decisions],
    ["open actions", stat.actions],
    ["events", stat.events],
    ["teams", stat.teams],
  ];

  return (
    <div className="border border-foreground/20 bg-warm-white shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_20px_44px_-26px_rgba(19,20,19,0.4)]">
      <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
        <span className="flex h-4 w-4 items-center justify-center border-[1.5px] border-accent">
          <span className="h-[3px] w-[3px] bg-accent" />
        </span>
        <span className="text-[12.5px] font-semibold text-foreground">Provenance</span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
          Property memory
        </span>
      </div>

      <div className="px-4 py-3">
        <p className="text-[12.5px] font-medium text-foreground">
          {MEMORY_LAYER.property}
        </p>

        {/* what Provenance just pulled out of the arriving record */}
        <div className="mt-3 min-h-[46px] border-l-2 border-accent/40 pl-3">
          {extract ? (
            <motion.div
              key={extract.value}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="font-mono text-[8.5px] uppercase tracking-[0.13em] text-accent">
                {extract.kind}
              </p>
              <p className="mt-1 text-[12px] leading-[1.4] text-foreground">
                {extract.value}
              </p>
            </motion.div>
          ) : (
            <p className="pt-1 text-[11.5px] text-muted-foreground">
              {settled ? "Up to date" : "Watching for work"}
            </p>
          )}
        </div>

        {/* internal state */}
        <dl className="mt-3.5 border-t border-foreground/10 pt-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between py-[3px]">
              <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </dt>
              <dd className="font-mono text-[12px] tabular-nums text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function OutputRow({
  o,
  on,
  fresh,
}: {
  o: (typeof OUT)[number];
  on: boolean;
  fresh: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        "border bg-background px-2.5 py-2 transition-colors duration-500",
        fresh ? "border-accent/55" : "border-foreground/10"
      )}
    >
      <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-accent">
        {o.kind}
      </p>
      <p className="mt-0.5 truncate text-[12px] text-foreground">{o.title}</p>
      <p className="truncate text-[10.5px] text-muted-foreground">{o.detail}</p>
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
      className={cn("h-4 w-4 shrink-0", className)}
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
