"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

/* DESIGN.md §15.4.
   opacity 0->1 and translateY 12px->0, 340ms on ease-entrance, triggered at 25%.
   Once only — never re-animates on scroll back up, because re-animation is the
   fastest way to make a site feel cheap. 12px of travel, not 40px: long travel
   reads as marketing. */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect(); // once only
          }
        });
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    /* Fallback. Content that only becomes visible via IntersectionObserver is
       invisible if the observer never delivers a record — which happens when an
       element is already in view at mount, and in some embedded browsers. An
       invisible page is a far worse failure than an un-animated one, so also
       check position directly on scroll until shown. */
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
        setShown(true);
        window.removeEventListener("scroll", check);
        io.disconnect();
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    const initial = setTimeout(check, 200);

    return () => {
      io.disconnect();
      clearTimeout(initial);
      window.removeEventListener("scroll", check);
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={clsx(
        "motion-safe:transition-[opacity,transform]",
        "motion-safe:duration-considered motion-safe:ease-entrance",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
        className,
      )}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
