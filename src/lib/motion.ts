"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the user's reduced-motion preference. Motion on this site is
 * limited to scroll-driven state and a few short CSS fades; when this is
 * true, components render their final state with no animation.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export const easeOut = "cubic-bezier(0.22, 1, 0.36, 1)";
