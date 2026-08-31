"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SitePlan } from "./SitePlan";
import { HERO, PORTFOLIO } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * 1  one property, filling the frame
 * 2  the work already attached to it
 * 3  the camera starts back
 * 4  neighbouring assets enter
 * 5  the portfolio, and it keeps going past the edges
 * 6  settle
 */
const STEPS = 6;

const HOME = PORTFOLIO.find((p) => p.hero)!;
/* the point the camera holds on, in frame percent */
const OX = HOME.at.x + HOME.w / 2;
const OY = HOME.at.y + 17;

/* forms fading off past the foreground — the portfolio continues */
const DISTANT = [
  { plan: "strip", x: -14, y: 4, w: 18 },
  { plan: "pad", x: 94, y: 33, w: 15 },
  { plan: "urban", x: -10, y: 86, w: 13 },
  { plan: "plaza", x: 84, y: 88, w: 20 },
  { plan: "pad", x: 50, y: -12, w: 14 },
] as const;

export function PortfolioScale() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(STEPS, {
    beatMs: 950,
    startMs: 350,
    loop: true,
    loopPauseMs: 5000,
  });
  const s = reduced ? STEPS : raw;

  const zoom = s <= 2 ? 2.75 : s === 3 ? 1.85 : s === 4 ? 1.32 : 1;
  const showField = s >= 3;
  const showNames = s >= 5;

  return (
    <div ref={ref} className="w-full">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        {/* ---------- the drawing, under the camera ---------- */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${OX}% ${OY}%`,
            transition: "transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {DISTANT.map((d, i) => (
            <motion.div
              key={`far-${i}`}
              initial={false}
              animate={{ opacity: s >= 5 ? 0.26 : 0 }}
              transition={{ duration: 1, ease: EASE, delay: s >= 5 ? 0.2 : 0 }}
              className="absolute"
              style={{ left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%` }}
            >
              <SitePlan plan={d.plan} />
            </motion.div>
          ))}

          {PORTFOLIO.map((p, i) => (
            <motion.div
              key={p.id}
              initial={false}
              animate={{ opacity: p.hero ? 1 : showField ? 1 : 0 }}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: !p.hero && showField ? 0.12 + i * 0.07 : 0,
              }}
              className="absolute"
              style={{ left: `${p.at.x}%`, top: `${p.at.y}%`, width: `${p.w}%` }}
            >
              <SitePlan plan={p.plan} hero={p.hero} />
            </motion.div>
          ))}
          {/* labels ride inside the camera so they stay locked to the
              drawing during the pull-back, counter-scaled to stay legible */}
          {HERO.work.map((w, i) => {
            const on = s === 2 || s === 3;
            const flip = w.at.x > 55;
            return (
              <motion.div
                key={w.item}
                initial={false}
                animate={{ opacity: on ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: on ? i * 0.12 : 0 }}
                className={cn(
                  "pointer-events-none absolute flex items-center gap-2",
                  flip ? "flex-row" : "flex-row-reverse"
                )}
                style={{
                  left: `${HOME.at.x + (HOME.w * w.at.x) / 100}%`,
                  top: `${HOME.at.y + (34 * w.at.y) / 100}%`,
                  transform: `translate(${flip ? "0" : "-100%"},-50%) scale(${1 / zoom})`,
                  transformOrigin: flip ? "left center" : "right center",
                  transition: "transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                <span className="whitespace-nowrap">
                  <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-accent">
                    {w.team}
                  </span>
                  <span className="block text-[11px] leading-tight text-graphite">{w.item}</span>
                </span>
              </motion.div>
            );
          })}

          {/* the context multiplying across every asset */}
          {PORTFOLIO.flatMap((p) =>
            Array.from({ length: p.dots }).map((_, k) => {
              const gx = p.at.x + (p.w * (14 + ((k * 29) % 70))) / 100;
              const gy = p.at.y + (p.w * 0.62 * (12 + ((k * 41) % 62))) / 100;
              return (
                <motion.span
                  key={`dot-${p.id}-${k}`}
                  initial={false}
                  animate={{ opacity: showNames ? 0.8 : 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EASE,
                    delay: showNames ? 0.35 + k * 0.06 : 0,
                  }}
                  className="pointer-events-none absolute rounded-full bg-accent"
                  style={{
                    left: `${gx}%`,
                    top: `${gy}%`,
                    width: 4,
                    height: 4,
                    transform: `translate(-50%,-50%) scale(${1 / zoom})`,
                    transition: "transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              );
            })
          )}

          {/* the rest of the portfolio, named once we can see it */}
          {PORTFOLIO.map((p) => (
            <motion.div
              key={`n-${p.id}`}
              initial={false}
              animate={{ opacity: showNames ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: showNames ? 0.3 : 0 }}
              className="pointer-events-none absolute whitespace-nowrap"
              style={{
                left: `${p.at.x}%`,
                top: `${p.at.y}%`,
                transform: `translate(0,-118%) scale(${1 / zoom})`,
                transformOrigin: "left bottom",
                transition: "transform 1500ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <span
                className={cn(
                  "block font-mono text-[8.5px] uppercase tracking-[0.13em]",
                  p.hero ? "text-foreground" : "text-graphite"
                )}
              >
                {p.name}
              </span>
              {p.context && (
                <span className="block text-[9.5px] leading-tight text-muted-foreground">
                  {p.context}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* the composition falls away at the edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 76% at 50% 48%, transparent 56%, hsl(var(--background)) 100%)",
          }}
        />
      </div>

      <p className="mt-3 max-w-[42ch] text-[13.5px] leading-[1.5] text-muted-foreground">
        <span className="block text-graphite">{HERO.caption[0]}</span>
        <span className="block">{HERO.caption[1]}</span>
      </p>
    </div>
  );
}
