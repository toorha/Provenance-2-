"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProductFrame } from "./ProductFrame";
import { VeraShowcase, stepsFor } from "./VeraShowcase";
import { VeraMark } from "./VeraMark";
import type { ModeId } from "@/lib/vera-data";
import { STORIES, STORY_ORDER } from "@/lib/vera-stories";

/* HOMEPAGE.md §5, Section 3. Meet Vera.

   THIS SECTION EXPLAINS. IT DOES NOT ONBOARD.

   It used to be three simulated product surfaces with a fake cursor moving
   between them: a list you had to open, a question that typed itself a
   character at a time, and insights you had to expand. Understanding any one
   capability took half a minute of watching somebody operate software, and
   the copy assumed you already knew what a site plan agreement was.

   Now each mode is one finished example. Three blocks of context, one Vera
   conclusion, one next step, in language anyone can read. The section plays
   through all three by itself, and every mode is also one click away.

   WHAT IS GONE, DELIBERATELY: the fake cursor, the typing animation, the row
   selection, the role picker, the panel open and close, the source drawers,
   the narrator boxes, and the thinking delay. Every one of them was asking
   the visitor to operate a mock product in order to learn what it does.

   The full product surfaces still exist in this directory (TrackTheWork,
   AskVera, ProactiveInsights and the rest). They are the depth; this is the
   explanation. */

/* Long enough to read four short blocks, short enough that all three modes
   fit inside about half a minute. */
const STEP_MS = 620;
const HOLD_MS = 3600;
/* long enough to read one sentence and understand what is about to happen,
   short enough that nobody feels held up by it */
const INTRO_MS = 2600;
/* shorter when somebody asked for the mode themselves: they have already
   decided to look, so the sentence is a caption rather than a preamble */
const PICKED_INTRO_MS = 1900;

/* below zero is the intro panel: the mode saying what it is for before it
   does it. Also the state the section sits in before anything has played, so
   a visitor who never scrolls here still sees an explanation rather than an
   empty window. */
const INTRO = -1;

export function MeetVera() {
  const [mode, setMode] = useState<ModeId>("track");
  /* how much of the current story is showing. Infinity means all of it, which
     is what a visitor gets the moment they choose a mode themselves. */
  const [revealed, setRevealed] = useState(INTRO);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  /* set by any deliberate interaction. Once true the run is abandoned rather
     than paused: resuming a story somebody interrupted is the same as
     ignoring them. */
  const takenOver = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clear(), [clear]);

  /* The run: reveal a story block by block, hold, move to the next mode.
     Fades and nothing else. The animation supports reading; it is not the
     thing being watched. */
  useEffect(() => {
    /* Decide whether to animate BEFORE touching the ref, and fail open.
       Gating this on sectionRef.current meant that whenever the ref was not
       populated on the first commit the effect returned early, revealed
       stayed at zero, and the whole panel rendered at opacity zero with no
       way to recover. A section that silently shows nothing is far worse
       than one that skips its animation. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* no autoplay below the desktop breakpoint: on a phone each mode is one
       tap and shows itself complete */
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const el = sectionRef.current;

    if (reduced || !desktop || !el) {
      setRevealed(Infinity);
      return;
    }

    let started = false;

    const play = () => {
      if (started || takenOver.current || document.hidden) return;
      started = true;

      let t = 0;
      STORY_ORDER.forEach((id, chapter) => {
        const steps = stepsFor(id);
        /* every chapter opens on its own intro, including the first */
        const at = t;
        timers.current.push(
          setTimeout(() => {
            if (takenOver.current) return;
            if (chapter > 0) setMode(id);
            setRevealed(INTRO);
          }, at),
        );
        for (let s = 1; s <= steps; s++) {
          const when = t + INTRO_MS + s * STEP_MS;
          timers.current.push(
            setTimeout(() => {
              if (!takenOver.current) setRevealed(s);
            }, when),
          );
        }
        t += INTRO_MS + steps * STEP_MS + HOLD_MS;
      });
    };

    const visibleEnough = () => {
      const r = el.getBoundingClientRect();
      if (!r.height) return false;
      const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      return Math.max(0, shown) / Math.min(r.height, window.innerHeight) >= 0.7;
    };

    /* settle before starting, so scrolling quickly past does not begin a
       story the visitor has already left behind */
    let settle: ReturnType<typeof setTimeout> | null = null;
    const arm = () => {
      if (started || takenOver.current || settle) return;
      if (!visibleEnough()) return;
      settle = setTimeout(() => {
        settle = null;
        if (visibleEnough()) play();
      }, 340);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && arm()),
      { threshold: 0.7 },
    );
    io.observe(el);

    /* the observer has failed in real browsers before, and a section that
       silently never plays is worse than one that starts a beat early */
    const onScroll = () => arm();
    window.addEventListener("scroll", onScroll, { passive: true });
    const initial = setTimeout(arm, 300);
    const onVisibility = () => !document.hidden && arm();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      if (settle) clearTimeout(settle);
      clearTimeout(initial);
      clear();
    };
  }, [clear]);

  /* Choosing a mode ends the run for good.

     It still opens on the intro, because a visitor who picks Proactive
     Insights off the tab bar has no idea what Proactive Insights is, and
     jumping them straight to three records and a green box answers a question
     they were never asked. What they do NOT get is the drip: after the
     sentence the whole story arrives at once, so the cost of asking is one
     line of explanation rather than eight seconds of animation. */
  const onModeChange = useCallback(
    (m: ModeId) => {
      takenOver.current = true;
      clear();
      setMode(m);
      setRevealed(INTRO);
      timers.current.push(
        setTimeout(() => setRevealed(Infinity), PICKED_INTRO_MS),
      );
    },
    [clear],
  );

  const story = STORIES[mode as keyof typeof STORIES] ?? STORIES.track;

  return (
    <section
      id="product"
      /* back to the base canvas: the product window is the bright surface, so
         the section around it must be the darkest thing near it. That contrast
         IS the point, marketing environment then real software. */
      className="section-major anchor-offset overflow-hidden bg-canvas"
    >
      <div className="track">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <SectionLabel>
                <span className="inline-flex items-center gap-2.5">
                  <VeraMark size={20} className="text-vera-400" title="Vera" />
                  Meet Vera
                </span>
              </SectionLabel>
            </Reveal>
            <Reveal delay={40}>
              <h2 className="mt-5 max-w-[20ch] text-[2rem] font-semibold leading-[1.08] tracking-[-0.016em] text-paper sm:text-[2.5rem] lg:text-display-2">
                Your AI teammate across every function of your portfolio.
              </h2>
            </Reveal>
          </div>
        </div>

        {/* the line that switches the page into the TODAY register: it has to
            arrive right after two sections about decades (HOMEPAGE.md §5) */}
        <Reveal delay={60}>
          <p className="mt-7 max-w-[54ch] text-lead text-paper-muted">
            Vera keeps your team on track today, and connects that context
            while your team works.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10 md:mt-12">
          <div ref={sectionRef} className="demo-scale surface-light rounded-frame">
            <ProductFrame
              mode={mode}
              onModeChange={onModeChange}
              frameRef={frameRef}
            >
              <VeraShowcase story={story} revealed={revealed} />
            </ProductFrame>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
