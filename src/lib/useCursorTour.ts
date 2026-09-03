"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type TourStep = {
  /** which registered target to move to */
  at: string;
  /** what to do once the cursor arrives */
  run?: () => void;
  /** how long to rest there before the next step */
  hold?: number;
};

type Point = { x: number; y: number };

/**
 * A pointer that demonstrates the product once and then gets out of the
 * way. It plays when the frame scrolls into view, and any real input
 * from the person watching cancels it for good, because a demo that
 * fights the user is worse than no demo.
 */
export function useCursorTour(steps: TourStep[], enabled = true) {
  const stageRef = useRef<HTMLDivElement>(null);
  const targets = useRef(new Map<string, HTMLElement | null>());
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const doneRef = useRef(false);

  const reduced = useReducedMotion();
  const [pos, setPos] = useState<Point | null>(null);
  const [pressed, setPressed] = useState(false);
  const [running, setRunning] = useState(false);

  /** components call this on the elements the tour visits */
  const target = useCallback(
    (name: string) => (el: HTMLElement | null) => {
      targets.current.set(name, el);
    },
    [],
  );

  const stop = useCallback(() => {
    doneRef.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
    setPos(null);
  }, []);

  /* the person took over */
  useEffect(() => {
    if (!enabled || reduced) return;
    const cancel = () => stop();
    const opts = { passive: true } as const;
    window.addEventListener("pointerdown", cancel, opts);
    window.addEventListener("keydown", cancel, opts);
    window.addEventListener("wheel", cancel, opts);
    return () => {
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("wheel", cancel);
    };
  }, [enabled, reduced, stop]);

  /* play once, the first time the frame is properly on screen */
  useEffect(() => {
    if (!enabled || reduced || doneRef.current) return;
    const stage = stageRef.current;
    if (!stage) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || doneRef.current) return;
        io.disconnect();
        play();
      },
      { threshold: 0.45 },
    );
    io.observe(stage);

    function play() {
      setRunning(true);
      let t = 500;

      steps.forEach((step) => {
        /* move */
        timers.current.push(
          setTimeout(() => {
            if (doneRef.current) return;
            const stageBox = stageRef.current?.getBoundingClientRect();
            const el = targets.current.get(step.at);
            if (!stageBox || !el) return;
            const b = el.getBoundingClientRect();
            setPos({
              x: b.left - stageBox.left + b.width / 2,
              y: b.top - stageBox.top + b.height / 2,
            });
          }, t),
        );
        t += 620;

        /* press, act, release */
        if (step.run) {
          timers.current.push(
            setTimeout(() => {
              if (doneRef.current) return;
              setPressed(true);
              step.run?.();
            }, t),
          );
          timers.current.push(
            setTimeout(() => !doneRef.current && setPressed(false), t + 160),
          );
          t += 220;
        }

        t += step.hold ?? 700;
      });

      /* fade out and leave the product alone */
      timers.current.push(
        setTimeout(() => {
          doneRef.current = true;
          setRunning(false);
          setPos(null);
        }, t + 400),
      );
    }

    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reduced]);

  return { stageRef, target, pos, pressed, running, stop };
}
