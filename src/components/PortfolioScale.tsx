"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HERO, DEPARTMENTS } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * 1  one property
 * 2  its active work appears
 * 3  the departments behind that work
 * 4  pull back — a few more properties
 * 5  the portfolio
 */
const STEPS = 5;

/* the surrounding portfolio: a 7x4 field the camera pulls back to reveal.
   the hero property sits at col 3, row 1 (0-indexed). */
const COLS = 7;
const ROWS = 4;
const HERO_COL = 3;
const HERO_ROW = 1;

/* deterministic per-tile variation — no Math.random, so server and
   client render identical markup */
function tileSeed(i: number) {
  const a = (i * 2654435761) % 4294967296;
  return {
    h: 0.55 + ((a >> 3) % 45) / 100, // massing height 0.55–1.0
    w: 0.6 + ((a >> 9) % 35) / 100, // massing width
    dots: 1 + ((a >> 15) % 3), // 1–3 activity marks
    lit: (a >> 21) % 5 === 0, // a few have something needing attention
  };
}

export function PortfolioScale() {
  const reduced = useReducedMotion();
  const { ref, step } = useSequence(STEPS, {
    beatMs: 1150,
    startMs: 400,
    loop: true,
    loopPauseMs: 4200,
  });

  const s = reduced ? STEPS : step;

  // the camera: tight on the hero tile, then pulls back to the field
  const zoom = s <= 3 ? 2.35 : s === 4 ? 1.6 : 1;
  const originX = ((HERO_COL + 0.5) / COLS) * 100;
  const originY = ((HERO_ROW + 0.5) / ROWS) * 100;

  // how much of the portfolio has faded up
  const fieldOpacity = s >= 5 ? 1 : s === 4 ? 0.55 : 0;

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-[3px] border border-foreground/10 bg-secondary/60"
        style={{ aspectRatio: "16 / 10" }}
      >
        {/* faint drafting grid, fixed to the frame */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground)/0.05) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground)/0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* the camera */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${originX}% ${originY}%`,
            transition: "transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            className="grid h-full w-full gap-[1.6%] p-[2%]"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {Array.from({ length: COLS * ROWS }, (_, i) => {
              const col = i % COLS;
              const row = Math.floor(i / COLS);
              const isHero = col === HERO_COL && row === HERO_ROW;
              return (
                <PropertyTile
                  key={i}
                  hero={isHero}
                  step={s}
                  seed={tileSeed(i)}
                  opacity={isHero ? 1 : fieldOpacity}
                />
              );
            })}
          </div>
        </div>

        {/* active work around the hero property — outside the camera, so
            it never scales with the zoom */}
        <div className="pointer-events-none absolute inset-0">
          {HERO.activity.map((label, i) => {
            const on = s === 2 || s === 3;
            const left = i % 2 === 0;
            const y = 15 + Math.floor(i / 2) * 21;
            return (
              <motion.span
                key={label}
                initial={false}
                animate={{ opacity: on ? 1 : 0, x: on ? 0 : left ? 8 : -8 }}
                transition={{ duration: 0.45, ease: EASE, delay: on ? i * 0.09 : 0 }}
                className={cn(
                  "absolute flex items-center gap-1.5 whitespace-nowrap",
                  left ? "right-[69%]" : "left-[69%]"
                )}
                style={{ top: `%` }}
              >
                {!left && <Mark />}
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-graphite">
                  {label}
                </span>
                {left && <Mark />}
              </motion.span>
            );
          })}
        </div>

        {/* the departments behind the work — a quiet band, step 3 only */}
        <motion.div
          initial={false}
          animate={{ opacity: s === 3 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-gradient-to-t from-secondary via-secondary/85 to-transparent px-4 pb-4 pt-10"
        >
          {DEPARTMENTS.map((dept) => (
            <span
              key={dept}
              className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-graphite"
            >
              {dept}
            </span>
          ))}
        </motion.div>

        {/* running count, bottom right — system state, not marketing */}
        <div className="pointer-events-none absolute bottom-3 right-4">
          <motion.p
            initial={false}
            animate={{ opacity: s >= 4 ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground tabular-nums"
          >
            {s >= 5 ? "28 properties · 6 teams" : "3 properties"}
          </motion.p>
        </div>
      </div>

      <p className="mt-4 max-w-[46ch] text-[13.5px] leading-[1.55] text-muted-foreground">
        {HERO.caption}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function PropertyTile({
  hero,
  step,
  seed,
  opacity,
}: {
  hero: boolean;
  step: number;
  seed: ReturnType<typeof tileSeed>;
  opacity: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity }}
      transition={{ duration: 0.9, ease: EASE }}
      className={cn(
        "relative flex items-end justify-center border",
        hero ? "border-accent/45 bg-accent/[0.05]" : "border-foreground/10 bg-foreground/[0.02]"
      )}
    >
      {/* massing */}
      <svg viewBox="0 0 40 30" className="h-full w-full" preserveAspectRatio="none">
        <rect
          x={20 - (seed.w * 28) / 2}
          y={30 - seed.h * 20}
          width={seed.w * 28}
          height={seed.h * 20}
          fill="none"
          stroke={hero ? "hsl(var(--accent))" : "hsl(var(--foreground)/0.3)"}
          strokeWidth={hero ? 1 : 0.7}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={20 - (seed.w * 28) / 2}
          y1={30 - seed.h * 20 + 4}
          x2={20 + (seed.w * 28) / 2}
          y2={30 - seed.h * 20 + 4}
          stroke={hero ? "hsl(var(--accent)/0.55)" : "hsl(var(--foreground)/0.16)"}
          strokeWidth={0.7}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* the rest of the portfolio carries its own quiet activity */}
      {!hero && opacity > 0 && (
        <div className="absolute left-1 top-1 flex gap-[3px]">
          {Array.from({ length: seed.dots }, (_, d) => (
            <span
              key={d}
              className={cn(
                "h-[3px] w-[3px] rounded-full",
                seed.lit && d === 0 ? "bg-accent/70" : "bg-foreground/25"
              )}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function Mark() {
  return <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-accent" />;
}
