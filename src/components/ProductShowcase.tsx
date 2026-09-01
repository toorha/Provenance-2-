"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { TrackWork } from "./modes/TrackWork";
import { AskProperty } from "./modes/AskProperty";
import { SurfaceSignals } from "./modes/SurfaceSignals";
import { SHOWCASE } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const MODES = SHOWCASE.modes;

/** where the pointer should be, as a percentage of the frame */
export type Point = { x: number; y: number } | null;

export function ProductShowcase() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState(0);
  const [touched, setTouched] = useState(false);
  const [cursor, setCursor] = useState<Point>(null);
  const [clicking, setClicking] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));

  /** move the pointer onto a real element, then click it */
  const pointAt = useCallback((el: HTMLElement | null) => {
    const frame = frameRef.current;
    if (!el || !frame) return;
    const f = frame.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (!f.width || !f.height) return;
    setCursor({
      x: ((r.left + r.width / 2 - f.left) / f.width) * 100,
      y: ((r.top + r.height / 2 - f.top) / f.height) * 100,
    });
  }, []);

  /* an unhurried tour of the three modes, until the visitor takes over */
  useEffect(() => {
    if (reduced || touched) {
      setCursor(null);
      return;
    }
    let m = 0;
    const run = () => {
      at(4200, () => {
        m = (m + 1) % MODES.length;
        pointAt(tabRefs.current[m]);
        at(420, () => {
          setClicking(true);
          setMode(m);
          at(180, () => setClicking(false));
          at(900, () => setCursor(null));
        });
        run();
      });
    };
    run();
    return clear;
  }, [reduced, touched, pointAt]);

  const pick = (i: number) => {
    clear();
    setTouched(true);
    setCursor(null);
    setMode(i);
  };

  return (
    <div>
      {/* the three things it does */}
      <div className="mb-5 flex flex-wrap gap-x-1 gap-y-2">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            onClick={() => pick(i)}
            className={cn(
              "rounded-[2px] px-3 py-1.5 text-left transition-colors duration-200",
              i === mode
                ? "bg-accent/[0.09] text-accent"
                : "text-graphite hover:bg-foreground/[0.04] hover:text-foreground"
            )}
          >
            <span className="block text-[13px] font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      <div ref={frameRef} className="relative">
        <MacWindow title="Provenance">
          <div className="relative min-h-[440px] bg-warm-white font-sans text-foreground">
            {mode === 0 && <TrackWork />}
            {mode === 1 && <AskProperty onInteract={() => setTouched(true)} />}
            {mode === 2 && <SurfaceSignals />}
          </div>
        </MacWindow>

        {/* the pointer, driving the tour */}
        {cursor && !reduced && (
          <motion.div
            initial={false}
            animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
            transition={{ duration: 0.55, ease: EASE }}
            className="pointer-events-none absolute z-30"
          >
            <motion.span
              animate={{ scale: clicking ? 0.82 : 1 }}
              transition={{ duration: 0.16, ease: EASE }}
              className="block"
            >
              <svg viewBox="0 0 16 20" className="h-[19px] w-[15px] drop-shadow-[0_1px_2px_rgba(19,20,19,0.35)]">
                <path
                  d="M1 1.2 13.4 11l-5.4.5L5.4 17z"
                  fill="#F7F5EF"
                  stroke="#131413"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              {clicking && (
                <motion.span
                  initial={{ scale: 0.4, opacity: 0.55 }}
                  animate={{ scale: 1.7, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute -left-1.5 -top-1.5 h-6 w-6 rounded-full border border-accent"
                />
              )}
            </motion.span>
          </motion.div>
        )}
      </div>

      <p className="mt-5 max-w-[52ch] text-[13.5px] leading-[1.55] text-muted-foreground">
        {MODES[mode].note}
      </p>
    </div>
  );
}
