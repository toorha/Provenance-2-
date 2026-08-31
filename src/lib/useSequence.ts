"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface SequenceOptions {
  beatMs?: number;
  startMs?: number;
  loop?: boolean;
  loopPauseMs?: number;
}

/**
 * Plays a numbered sequence (0..totalSteps) once the element scrolls
 * into view. Each demo element checks `step >= n` to decide whether it
 * has arrived yet. With `loop`, the sequence restarts after a pause.
 *
 * Reduced motion jumps straight to the finished state.
 */
export function useSequence(totalSteps: number, opts: SequenceOptions = {}) {
  const { beatMs = 1150, startMs = 450, loop = false, loopPauseMs = 2800 } = opts;

  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);

  // Start when the element is (or scrolls) near the viewport. Uses a
  // plain IntersectionObserver plus an immediate rect check so it works
  // regardless of mount order.
  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (r.top < vh * 0.9 && r.bottom > vh * 0.1) setActive(true);
    };
    check();
    if (active) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setActive(true);
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", check);
    };
  }, [active]);

  useEffect(() => {
    if (reduced) {
      setStep(totalSteps);
      return;
    }
    if (!active) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setStep(0);
      for (let i = 1; i <= totalSteps; i++) {
        timers.push(
          setTimeout(() => {
            if (!cancelled) setStep(i);
          }, startMs + i * beatMs)
        );
      }
      if (loop) {
        timers.push(setTimeout(run, startMs + totalSteps * beatMs + loopPauseMs));
      }
    };
    run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active, reduced, totalSteps, beatMs, startMs, loop, loopPauseMs]);

  return { ref, step, reduced, done: step >= totalSteps };
}
