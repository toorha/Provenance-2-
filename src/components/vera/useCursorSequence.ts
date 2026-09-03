"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* DESIGN.md §16 — the fake cursor.

   The real user's pointer is never customised. This drives a drawn cursor that
   exists only inside a product frame.

   The contract this hook enforces, in full:
   - travel 380-520ms scaled to distance, on ease-cursor, along a slight ARC —
     straight-line travel is what reads as "robot" rather than "hand"
   - 80ms settle before a click; click contracts to 0.88 for 90ms
   - 500-800ms dwell between steps so a viewer can read what changed
   - pauses on real hover over the frame
   - STOPS PERMANENTLY on any real click inside the frame — the user has taken
     over and the demo must not fight them for control
   - pauses when the section leaves the viewport, resumes from the same step
   - does not run at all below 768px, and not under prefers-reduced-motion */

export type Step =
  | { kind: "move"; to: () => HTMLElement | null }
  | { kind: "click" }
  | { kind: "wait"; ms: number }
  | { kind: "do"; fn: () => void };

const EASE_CURSOR = (t: number) => {
  // cubic-bezier(.33, 0, .15, 1) sampled — accelerates, then settles
  const c1 = 0.33,
    c2 = 0.15;
  const u = 1 - t;
  return 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * 1;
};

export function useCursorSequence(
  frameRef: React.RefObject<HTMLElement | null>,
  buildSteps: () => Step[],
) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [pressed, setPressed] = useState(false);
  const [ping, setPing] = useState(0);
  const [running, setRunning] = useState(false);

  const pausedRef = useRef(false);
  /* stopped = the viewer took over, permanent */
  const stoppedRef = useRef(false);
  /* cancelled = this particular run was torn down (effect cleanup, including
     React's StrictMode remount). A cancelled run must die at its next await,
     or two sequences end up driving the same demo at once. */
  const cancelledRef = useRef(false);
  /* survives effect re-runs, which an effect-local variable does not */
  const startedRef = useRef(false);
  const interactedRef = useRef(false);
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dead = useCallback(
    () => stoppedRef.current || cancelledRef.current,
    [],
  );

  const clearTimers = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    rafRef.current = null;
    timerRef.current = null;
  }, []);

  /* wait that respects pause and permanent stop */
  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        const startedAt = performance.now();
        const tick = () => {
          if (dead()) return resolve();
          if (pausedRef.current) {
            timerRef.current = setTimeout(tick, 120);
            return;
          }
          const left = ms - (performance.now() - startedAt);
          if (left <= 0) return resolve();
          timerRef.current = setTimeout(tick, Math.min(left, 60));
        };
        tick();
      }),
    [dead],
  );

  /* travel along a quadratic arc, control point offset perpendicular to the
     path by ~8% of the distance (§16.3) */
  const moveTo = useCallback(
    (el: HTMLElement | null) =>
      new Promise<void>((resolve) => {
        const frame = frameRef.current;
        if (!el || !frame) return resolve();
        const fr = frame.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        const from = posRef.current;
        /* Rendered pixels throughout: the cursor overlay is a sibling of the
           scaled frame, not a child of it, so no conversion belongs here. */
        const to = {
          x: r.left - fr.left + Math.min(r.width * 0.32, 190),
          y: r.top - fr.top + r.height / 2,
        };
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.hypot(dx, dy);
        const dur = Math.max(380, Math.min(520, 380 + dist * 0.35));
        // perpendicular control point
        const cx = (from.x + to.x) / 2 + -dy * 0.08;
        const cy = (from.y + to.y) / 2 + dx * 0.08;
        const start = performance.now();

        const frameStep = (now: number) => {
          if (dead()) return resolve();
          if (pausedRef.current) {
            rafRef.current = requestAnimationFrame(frameStep);
            return;
          }
          const raw = Math.min(1, (now - start) / dur);
          const t = EASE_CURSOR(raw);
          const u = 1 - t;
          const x = u * u * from.x + 2 * u * t * cx + t * t * to.x;
          const y = u * u * from.y + 2 * u * t * cy + t * t * to.y;
          posRef.current = { x, y };
          setPos({ x, y });
          if (raw < 1) rafRef.current = requestAnimationFrame(frameStep);
          else resolve();
        };
        rafRef.current = requestAnimationFrame(frameStep);
      }),
    [frameRef, dead],
  );

  const click = useCallback(async () => {
    await sleep(80); // settle before the click
    if (dead()) return;
    setPressed(true);
    setPing((n) => n + 1);
    await sleep(90);
    setPressed(false);
    await sleep(90);
  }, [sleep, dead]);

  const play = useCallback(async () => {
    if (dead()) return;
    setRunning(true);
    for (const step of buildSteps()) {
      if (dead()) break;
      if (step.kind === "move") await moveTo(step.to());
      else if (step.kind === "click") await click();
      else if (step.kind === "wait") await sleep(step.ms);
      else if (step.kind === "do") step.fn();
    }
    setRunning(false);
  }, [buildSteps, moveTo, click, sleep, dead]);

  /* stop permanently — the viewer has taken over */
  const stop = useCallback(() => {
    stoppedRef.current = true;
    clearTimers();
    setRunning(false);
    setPos(null);
  }, [clearTimers]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    /* this run is alive until its own cleanup says otherwise */
    cancelledRef.current = false;

    /* The cinematic cursor is desktop only. Below the desktop breakpoint the
       product stacks and there is no room for a fake pointer to mean
       anything, so the demo stays user controlled. */
    const tooNarrow = window.matchMedia("(max-width: 1023px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (tooNarrow || reduced) {
      stoppedRef.current = true;
      return;
    }

    const onEnter = () => (pausedRef.current = true);
    const onLeave = () => (pausedRef.current = false);

    /* Any real interaction before the demo starts cancels it outright: the
       product is user controlled from that moment. A click during the run
       stops it for the same reason. */
    const takeOver = () => {
      interactedRef.current = true;
      stop();
    };
    frame.addEventListener("pointerenter", onEnter);
    frame.addEventListener("pointerleave", onLeave);
    frame.addEventListener("pointerdown", takeOver);
    frame.addEventListener("keydown", takeOver);
    frame.addEventListener("focusin", takeOver);

    /* How much of the FRAME, not the section, is on screen. Triggering from
       the section meant the demo could start while the frame itself was still
       below the fold. */
    const visibleFraction = () => {
      const r = frame.getBoundingClientRect();
      if (r.height === 0) return 0;
      const shown =
        Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      // a frame taller than the viewport can never reach 100%
      const reachable = Math.min(r.height, window.innerHeight);
      return Math.max(0, shown) / reachable;
    };
    const ENTER = 0.7;
    const KEEP = 0.35;

    let settle: ReturnType<typeof setTimeout> | null = null;

    const begin = () => {
      if (startedRef.current || dead() || interactedRef.current) return;
      startedRef.current = true;
      // seed the cursor just outside the frame's left edge
      posRef.current = {
        x: -40,
        y: frame.getBoundingClientRect().height * 0.42,
      };
      setPos(posRef.current);
      void play();
    };

    /* Reaching the threshold is not enough. Wait for the scroll to settle,
       then check again, so a fast scroll through the section never starts a
       demo the viewer has already passed. */
    const arm = () => {
      if (startedRef.current || dead() || interactedRef.current) return;
      if (settle) return;
      if (visibleFraction() < ENTER) return;
      settle = setTimeout(() => {
        settle = null;
        if (document.hidden) return;
        if (visibleFraction() < ENTER) return;
        begin();
      }, 320);
    };

    const disarm = () => {
      if (settle) {
        clearTimeout(settle);
        settle = null;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const ratio = e.intersectionRatio;
          if (!startedRef.current) {
            if (ratio >= ENTER) arm();
            else disarm();
            return;
          }
          // already running: this is purely a pause / resume signal
          pausedRef.current = ratio < KEEP || document.hidden;
        });
      },
      { threshold: [0, KEEP, ENTER, 1] },
    );
    io.observe(frame);

    /* Fallback, kept and strengthened. IntersectionObserver can fail to
       deliver an initial record when the element is already in view at mount,
       and in some embedded and automated browsers it does not fire at all.
       The product must never depend on the observer to render, and the demo
       should still play, so poll cheaply on scroll and resize. */
    const onScrollOrResize = () => {
      if (!startedRef.current) arm();
      else pausedRef.current = visibleFraction() < KEEP || document.hidden;
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    const initial = setTimeout(onScrollOrResize, 250);

    /* A hidden tab stops rAF, which would strand the cursor mid travel. Treat
       it exactly like leaving the viewport: pause, then resume where it was.
       Never restart from step one. */
    const onVisibility = () => {
      if (document.hidden) {
        pausedRef.current = true;
        disarm();
      } else if (startedRef.current) {
        pausedRef.current = visibleFraction() < KEEP;
      } else {
        arm();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      /* Cancel this run rather than leaving it to race the next one. The
         demo has not visibly begun at this point (the first step is a 700ms
         wait), so re-arming from the rest state is correct and invisible. */
      cancelledRef.current = true;
      startedRef.current = false;
      disarm();
      io.disconnect();
      clearTimeout(initial);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      document.removeEventListener("visibilitychange", onVisibility);
      frame.removeEventListener("pointerenter", onEnter);
      frame.removeEventListener("pointerleave", onLeave);
      frame.removeEventListener("pointerdown", takeOver);
      frame.removeEventListener("keydown", takeOver);
      frame.removeEventListener("focusin", takeOver);
      clearTimers();
    };
  }, [frameRef, play, stop, clearTimers, dead]);

  return { pos, pressed, ping, running, stop };
}
