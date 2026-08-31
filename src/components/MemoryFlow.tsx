"use client";

import { motion } from "framer-motion";
import { MEMORY_LAYER } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* one source feeds the centre per beat, then a settled final state */
const N = MEMORY_LAYER.sources.length;
const STEPS = N + 1;

const W = 940;
const H = 392;
const CX = 470;
const CY = 200;

/* sources sit on an arc that wraps the centre — they all point inward */
const ANGLES = [198, 162, 126, 90, 54, 18, -18];
const ARC_RX = 396;
const ARC_RY = 168;
/* where a connector lands on the centre card */
const HUB_RX = 176;
const HUB_RY = 96;

const rad = (deg: number) => (deg * Math.PI) / 180;

/* rounded so the server and client render identical inline styles */
function sourceAt(i: number) {
  const a = rad(ANGLES[i]);
  return {
    x: Math.round(CX + ARC_RX * Math.cos(a)),
    y: Math.round(CY - ARC_RY * Math.sin(a)),
  };
}

function pathFor(i: number) {
  const a = rad(ANGLES[i]);
  const s = sourceAt(i);
  const tx = Math.round(CX + HUB_RX * Math.cos(a));
  const ty = Math.round(CY - HUB_RY * Math.sin(a));
  const mx = (s.x + tx) / 2;
  const my = (s.y + ty) / 2;
  const cx = Math.round(mx + (CX - mx) * 0.42);
  const cy = Math.round(my + (CY - my) * 0.42);
  return `M ${s.x} ${s.y} Q ${cx} ${cy} ${tx} ${ty}`;
}

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * Math.min(1, Math.max(0, t)));
}

export function MemoryFlow() {
  const { ref, step } = useSequence(STEPS, {
    beatMs: 900,
    startMs: 500,
    loop: true,
    loopPauseMs: 4600,
  });
  const d = MEMORY_LAYER;

  const active = step >= 1 && step <= N ? step - 1 : -1;
  const fed = step >= 1 ? Math.min(N, step) : 0;
  const settled = step >= STEPS;
  const events = lerp(d.events.from, d.events.to, fed / N);
  const linked = lerp(d.linkedSources.from, d.linkedSources.to, fed / N);

  return (
    <div ref={ref}>
      {/* ---------- desktop: sources arc inward to one centre ---------- */}
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
          {d.sources.map((s, i) => {
            const dPath = pathFor(i);
            const on = active === i || settled;
            return (
              <g key={s.tag}>
                {on && (
                  <path
                    d={dPath}
                    className="stroke-accent"
                    strokeWidth={7}
                    strokeLinecap="round"
                    opacity={0.09}
                  />
                )}
                <path
                  d={dPath}
                  className={on ? "stroke-accent" : "stroke-border-dark"}
                  strokeWidth={on ? 1.5 : 1}
                  strokeLinecap="round"
                  opacity={on ? 0.9 : 0.32}
                />
                <circle
                  r={on ? 3.2 : 1.8}
                  className={on ? "fill-accent" : "fill-border-dark"}
                  opacity={on ? 1 : 0.45}
                >
                  <animateMotion
                    dur={`${on ? 1.5 : 3.2}s`}
                    repeatCount="indefinite"
                    begin={`-${i * 0.35}s`}
                    path={dPath}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {d.sources.map((s, i) => {
          const p = sourceAt(i);
          return (
            <div
              key={s.tag}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: p.x, top: p.y }}
            >
              <SourceNode s={s} active={active === i} fed={fed > i} />
            </div>
          );
        })}

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: CX, top: CY, width: 328 }}
        >
          <Hub fed={fed} events={events} linked={linked} settled={settled} />
        </div>
      </div>

      {/* ---------- mobile: stacked ---------- */}
      <div className="lg:hidden">
        <p className="mb-2.5 label-mono text-muted-foreground">Fragmented sources</p>
        <div className="grid grid-cols-2 gap-2">
          {d.sources.map((s, i) => (
            <div
              key={s.tag}
              className={cn(
                "flex items-center gap-2.5 rounded-[3px] border bg-warm-white px-3 py-2.5",
                active === i ? "border-accent" : "border-border"
              )}
            >
              <Glyph name={s.glyph} className={active === i ? "text-accent" : "text-slate"} />
              <span className="text-[12px] font-semibold text-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="my-3 text-center text-[15px] text-border-dark" aria-hidden="true">
          &darr;
        </p>

        <Hub fed={fed} events={events} linked={linked} settled={settled} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Hub({
  fed,
  events,
  linked,
  settled,
}: {
  fed: number;
  events: number;
  linked: number;
  settled: boolean;
}) {
  const signals = MEMORY_LAYER.signals;
  return (
    <div className="rounded-[4px] border-2 border-foreground/25 bg-warm-white shadow-[0_2px_14px_rgba(20,19,17,0.07),0_44px_80px_-30px_rgba(20,19,17,0.4)]">
      {/* identity */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <span
            className="flex items-center justify-center border-[1.5px] border-accent"
            style={{ height: 17, width: 17 }}
          >
            <span className="h-1 w-1 bg-accent" />
          </span>
          <span className="text-[14px] font-bold tracking-[-0.01em] text-foreground">
            Provenance
          </span>
        </div>
        <p className="mt-0.5 text-[10.5px] text-muted-foreground">
          The memory layer for the property
        </p>
      </div>

      {/* structured context accumulating */}
      <ul className="space-y-1.5 px-4 py-3">
        {signals.map((sig, i) => {
          const on = fed > i;
          const fresh = fed === i + 1;
          return (
            <motion.li
              key={sig}
              initial={false}
              animate={{ opacity: on ? 1 : 0.26, x: on ? 0 : -3 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex items-center gap-2 text-[11.5px] text-foreground"
            >
              <span
                className={cn(
                  "flex h-3 w-3 shrink-0 items-center justify-center rounded-full border",
                  on ? "border-accent bg-accent text-warm-white" : "border-border"
                )}
              >
                {on && (
                  <svg viewBox="0 0 12 12" className="h-1.5 w-1.5" fill="none">
                    <path
                      d="M2.5 6.2 5 8.5 9.5 3.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className={cn(fresh && "font-semibold text-accent")}>{sig}</span>
            </motion.li>
          );
        })}
      </ul>

      {/* growth */}
      <div className="flex items-center gap-5 border-t border-border px-4 py-2.5">
        <Count value={events} label="events" />
        <Count value={linked} label="linked sources" />
        <span
          className={cn(
            "ml-auto h-1.5 w-1.5 rounded-full bg-accent",
            !settled && "animate-pulse"
          )}
        />
      </div>
    </div>
  );
}

function Count({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <motion.span
        key={value}
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="font-display text-[17px] tabular-nums text-foreground"
      >
        {value}
      </motion.span>
      <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
    </span>
  );
}

function SourceNode({
  s,
  active,
  fed,
}: {
  s: (typeof MEMORY_LAYER.sources)[number];
  active: boolean;
  fed: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : fed ? 0.48 : 0.78, scale: active ? 1.06 : 1 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex w-[104px] flex-col items-center gap-1.5 text-center"
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-[3px] border transition-colors duration-300",
          active
            ? "border-accent bg-accent/[0.07] shadow-[0_8px_22px_-6px_rgba(30,80,58,0.45)]"
            : "border-border bg-warm-white"
        )}
      >
        <Glyph name={s.glyph} className={active ? "text-accent" : "text-slate"} big />
      </span>
      <span
        className={cn(
          "text-[10.5px] font-semibold leading-tight",
          active ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {s.label}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */

const GLYPHS: Record<string, React.ReactNode> = {
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
      <path d="M8 14h3" />
    </>
  ),
  report: (
    <>
      <path d="M6 3.5h8l4 4v13H6z" />
      <path d="M14 3.5v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  invoice: (
    <>
      <path d="M6 3.5h12v17l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6z" />
      <path d="M9.5 8h5M9.5 11.5h5" />
    </>
  ),
  deck: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M3 9h18M12 17v3M8.5 20h7" />
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
};

function Glyph({
  name,
  className,
  big,
}: {
  name: string;
  className?: string;
  big?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(big ? "h-[21px] w-[21px]" : "h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}
