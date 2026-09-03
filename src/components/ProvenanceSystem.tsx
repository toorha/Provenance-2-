"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProvenanceMark } from "@/components/ProvenanceMark";

/* HOMEPAGE.md §5. The Provenance system.

   Everything before this showed what Vera does. This answers the question
   that follows: what happens to all of that context. The answer is that it
   accumulates, and the accumulation is Provenance.

   THE COMPOSITION IS THE ARGUMENT. Everyday records converge on one point,
   that point is Vera, what Vera builds is Provenance, and what comes back out
   is a set of things the page has already shown working. It is the
   Convergence mark drawn at the scale of a whole system, which is exactly the
   point: many things, one understanding, a memory, many outcomes.

   BOTH SIDE COLUMNS ARE PLAIN LISTS. The right side carried a worked example
   per row for a while, which turned the edge of the diagram into a second
   product tour and pulled the eye away from the card that is the actual
   subject. Inputs and outputs are now weighted the same, and the centre wins.

   NOT A FLOWCHART. There is not a box or an arrow between stages anywhere in
   it. The curves are the only connectors and they all meet at a single node,
   so the shape reads as convergence rather than as a pipeline.

   VERA IS ACTIVE, PROVENANCE IS STABLE. They share one card because they are
   one system, split by a rule: Vera on top with the mark and the only green
   in the section, Provenance beneath it in neutral ink at half again the
   size, because the section is named after the memory rather than the
   intelligence. Green would have been
   the easy way to make Provenance look important and it would have broken the
   one rule that makes green mean anything.

   EVERYTHING IS LEGIBLE WITHOUT MOTION. The sequence only shifts emphasis
   between parts that are all present in the first frame, so reduced motion, a
   failed observer or a screenshot all leave the section complete. */

const WORK_IN = [
  "Emails",
  "Meetings",
  "Drawings",
  "Reports",
  "Leases",
  "Decisions",
  "Updates",
];

const VERA_VERBS = ["Captures", "connects", "understands", "tracks"];

/* Named after the modes the page has already demonstrated. */
const WORK_OUT = [
  "Ask Vera",
  "Track the Work",
  "Proactive Insights",
  "Decision History",
  "Shared Context",
  "Meeting Prep",
];

/* one pass, about seven seconds, then it rests at full weight and never runs
   again. The stage only raises emphasis; nothing appears or disappears. */
const BEATS = [1500, 1700, 1800, 1600];

/* The curve field is MEASURED, not authored.

   It used to be a fixed viewBox stretched to fit, which meant the curves
   started at coordinates that had nothing to do with where the list items
   actually sat. They emerged from the gaps between words, and no amount of
   tuning the constants would have fixed it, because flexbox decides where
   the items go and the numbers could not know that.

   Now every row is measured and one curve is drawn per item, from the edge
   of its own text to the node. The viewBox is the container's real pixel
   size, so a coordinate here is a pixel there. */
type Geo = {
  w: number;
  h: number;
  node: { x: number; y: number };
  inX: number;
  outX: number;
  cardL: number;
  cardR: number;
  inY: number[];
  outY: number[];
};

const curve = (x0: number, y0: number, x1: number, y1: number) => {
  const d = (x1 - x0) * 0.55;
  return `M ${x0} ${y0} C ${x0 + d} ${y0}, ${x1 - d} ${y1}, ${x1} ${y1}`;
};

export function ProvenanceSystem() {
  const ref = useRef<HTMLDivElement | null>(null);
  /* 0 rest, 1 work in, 2 Vera, 3 Provenance, 4 work out, 5 settled */
  const [stage, setStage] = useState(0);
  /* Armed only once a sequence is actually scheduled. At rest the mark is
     drawn: if the timers never run, which is what happens in a backgrounded
     tab, the section must still be complete rather than showing a half drawn
     logo forever. */
  const [armed, setArmed] = useState(false);
  /* the travelling dots. Off until mount confirms motion is welcome, so the
     server-rendered diagram is the static one. */
  const [flow, setFlow] = useState(false);
  const [geo, setGeo] = useState<Geo | null>(null);
  const inRefs = useRef<(HTMLLIElement | null)[]>([]);
  const outRefs = useRef<(HTMLLIElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inColRef = useRef<HTMLDivElement | null>(null);
  const outColRef = useRef<HTMLDivElement | null>(null);

  /* Measured on mount and on every resize. Below the desktop breakpoint the
     columns stack and there is nothing to join, so it clears itself. */
  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const measure = () => {
      const stacked = !window.matchMedia("(min-width: 1024px)").matches;
      const card = cardRef.current;
      const inCol = inColRef.current;
      const outCol = outColRef.current;
      if (stacked || !card || !inCol || !outCol) return setGeo(null);

      const H = host.getBoundingClientRect();
      const c = card.getBoundingClientRect();
      const mid = (el: HTMLElement | null) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return r.top - H.top + r.height / 2;
      };
      setGeo({
        w: Math.round(H.width),
        h: Math.round(H.height),
        node: { x: c.left - H.left + c.width / 2, y: c.top - H.top + c.height / 2 },
        inX: inCol.getBoundingClientRect().right - H.left + 12,
        outX: outCol.getBoundingClientRect().left - H.left - 12,
        cardL: c.left - H.left - 10,
        cardR: c.right - H.left + 10,
        inY: inRefs.current.map(mid).filter((n): n is number => n !== null),
        outY: outRefs.current.map(mid).filter((n): n is number => n !== null),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(5);
      return;
    }
    setFlow(true);

    let started = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      if (started) return;
      /* Never arm in a background tab. Timers there are throttled to minutes,
         which would strand the sequence mid-way. Unarmed means the section
         simply sits complete at rest. */
      if (document.hidden) return;
      started = true;
      setArmed(true);
      let t = 400;
      [1, 2, 3, 4, 5].forEach((s, i) => {
        timers.push(setTimeout(() => setStage(s), t));
        t += BEATS[i] ?? 0;
      });
    };

    const inView = () => {
      const r = el.getBoundingClientRect();
      if (!r.height) return false;
      const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return shown / Math.min(r.height, window.innerHeight) >= 0.4;
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 },
    );
    io.observe(el);

    /* the same fallback the rest of the page uses: an observer that never
       delivers must not be the reason a section sits at half weight */
    const onScroll = () => inView() && run();
    window.addEventListener("scroll", onScroll, { passive: true });
    const initial = setTimeout(onScroll, 300);
    const backstop = setTimeout(() => setStage(5), 9000);

    /* Coming back to a tab that was hidden mid-sequence: do not resume a
       story the viewer did not watch, just settle. */
    const onVisibility = () => {
      if (document.hidden) return;
      if (started) setStage(5);
      else if (inView()) run();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(initial);
      clearTimeout(backstop);
      timers.forEach(clearTimeout);
    };
  }, []);

  const lit = (s: number) => stage === s || stage >= 5;
  const emph = (s: number) =>
    lit(s) ? "opacity-100" : stage === 0 ? "opacity-100" : "opacity-[0.5]";

  return (
    <section
      id="how-it-works"
      className="section anchor-offset overflow-hidden bg-canvas"
    >
      <div className="track">
        <div className="grid12">
          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <SectionLabel>Provenance</SectionLabel>
          </Reveal>
        </div>

        <div className="grid12 mt-5">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-9">
            <h2 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] text-paper sm:text-[2.125rem] lg:text-[3rem] lg:leading-[1.06] lg:tracking-[-0.018em]">
              The memory builds as the work happens.
            </h2>
          </Reveal>
        </div>

        <div className="grid12 mt-6">
          <Reveal delay={60} className="col-span-12 md:col-span-6 lg:col-span-7">
            <p className="text-lead text-paper-muted">
              Vera captures the context behind everyday work and turns it into a
              persistent record your team can keep using.
            </p>
          </Reveal>
        </div>

        {/* ── the system ─────────────────────────────────────────────── */}
        <Reveal delay={100} className="mt-16 md:mt-20">
          <div ref={ref} className="relative">
            {/* the curve field, behind everything and desktop only: at narrow
                widths the three regions stack and there is nothing to join */}
            {geo && (
              <svg
                aria-hidden
                viewBox={`0 0 ${geo.w} ${geo.h}`}
                className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              >
                <g fill="none" stroke="rgba(243,244,240,0.30)" strokeWidth="1.25">
                  {geo.inY.map((y, i) => (
                    <path
                      key={`in-${i}`}
                      d={curve(geo.inX, y, geo.cardL, geo.node.y)}
                      className="transition-opacity duration-considered ease-state"
                      style={{
                        opacity: !armed || stage >= 1 ? 1 : 0.4,
                        transitionDelay: `${i * 30}ms`,
                      }}
                    />
                  ))}
                  {geo.outY.map((y, i) => (
                    <path
                      key={`out-${i}`}
                      d={curve(geo.cardR, geo.node.y, geo.outX, y)}
                      className="transition-opacity duration-considered ease-state"
                      style={{
                        opacity: !armed || stage >= 4 ? 1 : 0.4,
                        transitionDelay: `${i * 30}ms`,
                      }}
                    />
                  ))}
                </g>

                {flow && (
                  <g fill="var(--vera-400)">
                    {geo.inY.map((y, i) => (
                      <circle key={`fin-${i}`} r="2.6" opacity="0.85">
                        <animateMotion
                          dur="4.2s"
                          begin={`${i * 0.6}s`}
                          repeatCount="indefinite"
                          path={curve(geo.inX, y, geo.cardL, geo.node.y)}
                        />
                      </circle>
                    ))}
                    {geo.outY.map((y, i) => (
                      <circle key={`fout-${i}`} r="2.6" opacity="0.85">
                        <animateMotion
                          dur="4.2s"
                          begin={`${1.2 + i * 0.6}s`}
                          repeatCount="indefinite"
                          path={curve(geo.cardR, geo.node.y, geo.outX, y)}
                        />
                      </circle>
                    ))}
                  </g>
                )}
              </svg>
            )}

            <div className="relative grid gap-y-12 lg:grid-cols-[186px_minmax(0,1fr)_186px] lg:items-center lg:gap-x-8">
              {/* 01 WORK IN */}
              <div
                ref={inColRef}
                className={clsx(
                  "transition-opacity duration-considered ease-state",
                  emph(1),
                )}
              >
                <Stage label="Work in" className="lg:text-right" />
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 lg:block lg:space-y-[26px] lg:text-right">
                  {WORK_IN.map((w, i) => (
                    <li
                      key={w}
                      ref={(el) => {
                        inRefs.current[i] = el;
                      }}
                      className="text-body text-paper-muted"
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 02 + 03: one card, split by a rule. Vera builds Provenance. */}
              <div className="lg:px-6">
                <div
                  ref={cardRef}
                  className="overflow-hidden rounded-panel border border-mineral-300 bg-mineral-0 font-product shadow-lift-2"
                >
                  {/* VERA: the mark, the green, the verbs */}
                  <div
                    className={clsx(
                      "px-6 py-5 text-center transition-opacity duration-considered ease-state",
                      emph(2),
                    )}
                  >
                    <p className="flex items-center justify-center gap-2 text-[16px] font-medium tracking-[-0.008em] text-ink">
                      <span className="text-vera-700">
                        <ConvergeMark active={!armed || stage >= 2} />
                      </span>
                      Vera
                    </p>
                    <p className="mt-1.5 text-[14px] leading-[1.5] text-slate">
                      {VERA_VERBS.slice(0, -1).join(", ")}, and{" "}
                      {VERA_VERBS[VERA_VERBS.length - 1]}.
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 border-y border-mineral-200 bg-mineral-50 py-1.5 text-[11px] uppercase tracking-[0.08em] text-slate">
                    <svg
                      width="9"
                      height="11"
                      viewBox="0 0 9 11"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M4.5 0v9M1 6l3.5 3.5L8 6"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        strokeLinecap="square"
                      />
                    </svg>
                    Builds
                  </div>

                  {/* PROVENANCE: neutral, and deliberately the heavier half.
                      The section is named after the memory. */}
                  <div
                    className={clsx(
                      "px-6 py-7 text-center transition-opacity duration-considered ease-state",
                      emph(3),
                    )}
                  >
                    <p className="flex items-center justify-center gap-2.5 text-[24px] font-semibold tracking-[-0.014em] text-ink">
                      <ProvenanceMark size={26} />
                      Provenance
                    </p>
                    <p className="mx-auto mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-slate">
                      The memory layer for the property. What happened, why it
                      happened, what changed, and what still matters.
                    </p>
                  </div>
                </div>
              </div>

              {/* 04 WORK OUT */}
              <div
                ref={outColRef}
                className={clsx(
                  "transition-opacity duration-considered ease-state",
                  emph(4),
                )}
              >
                <Stage label="Work out" />
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 lg:block lg:space-y-[26px]">
                  {WORK_OUT.map((o, i) => (
                    <li
                      key={o}
                      ref={(el) => {
                        outRefs.current[i] = el;
                      }}
                      className="text-body text-paper-muted"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stage({ label, className }: { label: string; className?: string }) {
  return (
    <p
      className={clsx(
        "text-mono-sm uppercase tracking-[0.08em] text-paper",
        className,
      )}
    >
      {label}
    </p>
  );
}

/* The selected mark, drawn once. The three incoming strokes arrive, then the
   node lands: scattered context resolving into one understanding, which is
   the whole idea of the section stated in 400ms. Plays a single time, never
   loops, and without motion it is simply the finished mark. */
function ConvergeMark({ active }: { active: boolean }) {
  return (
    <svg width={19} height={19} viewBox="0 0 32 32" fill="none" aria-hidden>
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        style={{
          strokeDasharray: 22,
          strokeDashoffset: active ? 0 : 22,
          transition: "stroke-dashoffset 420ms cubic-bezier(.16,1,.30,1)",
        }}
      >
        <path d="M4 7 L15 16" />
        <path d="M4 16 L15 16" />
        <path d="M4 25 L15 16" />
      </g>
      <path
        d="M17 16 L28 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
        style={{
          strokeDasharray: 12,
          strokeDashoffset: active ? 0 : 12,
          transition: "stroke-dashoffset 300ms cubic-bezier(.16,1,.30,1) 260ms",
        }}
      />
      <circle
        cx="16"
        cy="16"
        r="2.6"
        fill="currentColor"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 220ms ease 300ms",
        }}
      />
    </svg>
  );
}
