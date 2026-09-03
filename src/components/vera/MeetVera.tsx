"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ProductFrame } from "./ProductFrame";
import { TrackTheWork, type ListPhase } from "./TrackTheWork";
import { FakeCursor } from "./FakeCursor";
import { useCursorSequence, type Step } from "./useCursorSequence";
import type { ModeId } from "@/lib/vera-data";
import type { Beat } from "./ContextPanel";
import { AskVera, type AskState } from "./AskVera";
import {
  DemoNarrator,
  NarratorCaption,
  type NarratorCue,
} from "./DemoNarrator";
import {
  ProactiveInsights,
  type InsightState,
} from "./ProactiveInsights";
import { VeraMark } from "./VeraMark";
import { ASK_EXAMPLES, MEMORY_UPDATE } from "@/lib/ask-data";
import { ASK_CUES, INSIGHT_CUES, TRACK_CUES } from "@/lib/narrator-cues";

/* HOMEPAGE.md §5, Section 3. Meet Vera.

   WATCH FIRST, EXPLORE SECOND. The three modes used to be three sandboxes:
   every one of them needed the visitor to click a row, open a panel, expand a
   source and press something before it said anything. That asks somebody to
   learn an interface before they understand the product, which is backwards
   on a landing page.

   So the section now plays one guided run of three chapters, Track then Ask
   then Insights, and each chapter shows its own strongest case without a
   single required click. Everything stays live the whole time.

   USER INTENT ALWAYS WINS. Any deliberate interaction cancels the rest of the
   run permanently: switching mode, clicking a row, opening an insight, asking
   a question. Nothing will move a visitor off a tab they chose. That is the
   one rule that separates a guided reveal from a demo that fights you.

   The three mode buttons are never taken away. They are how the visitor knows
   there are three capabilities at all. */

/* Roughly 27 seconds end to end, and deliberately unhurried: every line has
   to stay up long enough to actually read (§16.6). */
const CHAPTER_GAP = 900;
const ASK_SETTLE = 1600;

export function MeetVera() {
  const [mode, setMode] = useState<ModeId>("track");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  /* Which of the three beats is being narrated. null = nothing is, so the
     panel sits at full weight and a real user reading it sees everything. */
  const [beat, setBeat] = useState<Beat>(null);
  const [camera, setCamera] = useState(false);
  /* how the list is emphasised while the demo runs, see TrackTheWork */
  const [phase, setPhase] = useState<ListPhase>("idle");
  /* One cue per chapter at most. An earlier pass narrated the actions too,
     which put green boxes over the very UI they were describing. */
  const [cue, setCue] = useState<NarratorCue | null>(null);

  const [ask, setAsk] = useState<AskState>({
    introducing: false,
    phase: "idle",
    typed: "",
    example: ASK_EXAMPLES[0],
    isUpdate: false,
    focus: null,
  });
  const [insight, setInsight] = useState<InsightState>({
    openId: null,
    sourcesOpen: false,
    introducing: false,
  });

  const frameRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});

  /* ── the guided run ─────────────────────────────────────────────────── */

  /* Set the moment the visitor does anything deliberate. Once true it never
     goes back: the rest of the run is abandoned rather than paused, because
     resuming a story somebody interrupted is the same as ignoring them. */
  const takenOver = useRef(false);
  const chapterTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearChapters = useCallback(() => {
    chapterTimers.current.forEach(clearTimeout);
    chapterTimers.current = [];
  }, []);
  const later = useCallback((ms: number, fn: () => void) => {
    chapterTimers.current.push(
      setTimeout(() => {
        if (!takenOver.current) fn();
      }, ms),
    );
  }, []);

  const askTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearAsk = useCallback(() => {
    askTimers.current.forEach(clearTimeout);
    askTimers.current = [];
  }, []);

  useEffect(() => () => {
    clearChapters();
    clearAsk();
  }, [clearChapters, clearAsk]);

  const isDesktop = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 1024px)").matches;

  /* Types the question out, then answers it.

     The answer arrives BY BLOCK, never character by character, which is the
     single strongest tell of a wrapped chat model (DESIGN.md §10.6).

     There is no focus walk any more. It used to dim the answer, then the
     rows, then the action in sequence, and three moving highlights inside one
     panel is exactly the choreography that made the demo tiring. The answer
     lands whole and stays lit. */
  const runAsk = useCallback(
    (text: string, isUpdate: boolean, example = ASK_EXAMPLES[0]) => {
      clearAsk();
      const at = (ms: number, fn: () => void) => {
        askTimers.current.push(setTimeout(fn, ms));
      };
      setAsk({
        introducing: false,
        phase: "typing",
        typed: "",
        example,
        isUpdate,
        focus: null,
      });
      setCue(null);

      /* the whole typing pass targets about 2.8s regardless of length, so a
         long question does not outstay its welcome and a short one still
         reads as typing rather than as a paste */
      const perChar = Math.max(9, Math.min(34, 2800 / text.length));
      let t = 240;
      for (let i = 1; i <= text.length; i++) {
        t += perChar * (0.75 + Math.random() * 0.5);
        at(t, () => setAsk((s) => ({ ...s, typed: text.slice(0, i) })));
      }
      t += 340;
      at(t, () => setAsk((s) => ({ ...s, phase: "thinking" })));
      /* long enough to register as a beat, short enough never to read as
         latency */
      t += 900;
      at(t, () =>
        setAsk((s) => ({
          ...s,
          phase: isUpdate ? "updated" : "answer",
          focus: null,
        })),
      );
      return t;
    },
    [clearAsk],
  );

  /* CHAPTER 3. Vera noticed something nobody asked about. The mode intro is
     the one cue here, because that is the single idea the interface cannot
     show on its own, and it plays over a blank panel so it covers nothing. */
  const beginInsights = useCallback(() => {
    if (takenOver.current) return;
    setMode("insights");
    setInsight({ openId: null, sourcesOpen: false, introducing: true });
    setCue(INSIGHT_CUES.intro);
    /* the insight opens itself once the annotation has gone */
    later(INSIGHT_CUES.intro.holdMs! + 700, () =>
      setInsight({ openId: "zoning", sourcesOpen: false, introducing: false }),
    );
  }, [later]);

  /* CHAPTER 2. A hard question, answered from the property record. No cue:
     a question typing itself and being answered needs no caption, and the
     annotation would only sit on the answer. */
  const beginAsk = useCallback(() => {
    if (takenOver.current) return;
    setMode("ask");
    setBeat(null);
    setCamera(false);
    setPhase("idle");
    setActiveId(null);
    setCue(null);
    const development = ASK_EXAMPLES[0];
    later(600, () => {
      const answeredAt = runAsk(development.question, false, development);
      later(600 + answeredAt + ASK_SETTLE, beginInsights);
    });
  }, [later, runAsk, beginInsights]);

  /* CHAPTER 1. Track, shortened.

     It used to open the sources drawer and then close the whole panel again,
     which added two clicks and a teardown to a story that was already told.
     It now ends with the panel open and every beat at full weight, so the
     final frame is the useful one. */
  const buildSteps = useCallback((): Step[] => {
    const row = () => rowRefs.current["spa-conflict"];

    return [
      { kind: "wait", ms: 600 },

      // the two rows worth opening
      { kind: "do", fn: () => { setPhase("showcase"); setCue(TRACK_CUES.rows); } },
      { kind: "wait", ms: 1400 },

      // and the one being demonstrated
      { kind: "move", to: row },
      { kind: "do", fn: () => setPhase("focus") },
      { kind: "wait", ms: 600 },
      { kind: "click" },
      { kind: "do", fn: () => { setActiveId("spa-conflict"); setCamera(true); } },
      { kind: "wait", ms: 500 },

      // what Vera understood, and where the one cue hands over
      { kind: "do", fn: () => { setBeat("read"); setCue(null); } },
      { kind: "wait", ms: 2000 },

      // the 2019 agreement against this week's drawing and meeting
      { kind: "do", fn: () => setBeat("connected") },
      { kind: "wait", ms: 2400 },

      // the decision the team has to make
      { kind: "do", fn: () => setBeat("next") },
      { kind: "wait", ms: 2000 },

      // settle: nothing dimmed, panel still open, fully interactive
      { kind: "do", fn: () => { setBeat(null); setCamera(false); setPhase("idle"); } },
      { kind: "wait", ms: CHAPTER_GAP },

      { kind: "do", fn: () => beginAsk() },
    ];
  }, [beginAsk]);

  const { pos, pressed, ping, stop: stopWalkthrough } = useCursorSequence(
    frameRef,
    buildSteps,
  );

  /* One place to hand control over, called by every deliberate interaction. */
  const takeOver = useCallback(() => {
    takenOver.current = true;
    clearChapters();
    stopWalkthrough();
  }, [clearChapters, stopWalkthrough]);

  /* Switching mode by hand. The guided run stops for good, and the mode opens
     at its most useful state rather than at an empty one: an intro cue on
     desktop, and on a phone the strongest case outright, because six taps to
     understand one feature is the problem this pass exists to remove. */
  const onModeChange = useCallback(
    (m: ModeId) => {
      takeOver();
      clearAsk();
      setMode(m);
      setBeat(null);
      setCamera(false);
      setPhase("idle");
      setActiveId(null);
      setSourcesOpen(false);

      const desktop = isDesktop();

      if (m === "ask") {
        setInsight({ openId: null, sourcesOpen: false, introducing: false });
        setCue(desktop ? ASK_CUES.intro : null);
        setAsk({
          introducing: desktop,
          phase: "idle",
          typed: "",
          example: ASK_EXAMPLES[0],
          isUpdate: false,
          focus: null,
        });
        if (!desktop) runAsk(ASK_EXAMPLES[0].question, false, ASK_EXAMPLES[0]);
        return;
      }

      if (m === "insights") {
        setCue(desktop ? INSIGHT_CUES.intro : null);
        setInsight({
          openId: desktop ? null : "zoning",
          sourcesOpen: false,
          introducing: desktop,
        });
        return;
      }

      setCue(null);
      setInsight({ openId: null, sourcesOpen: false, introducing: false });
    },
    [takeOver, clearAsk, runAsk],
  );

  return (
    <section
      id="product"
      /* back to the base canvas: the product window is the bright surface, so
         the section around it must be the darkest thing near it. That contrast
         IS the point, marketing environment then real software. */
      className="section-major anchor-offset overflow-hidden bg-canvas"
    >
      <div className="track">
        {/* intro, concise, so the product appears quickly */}
        <div className="grid12">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              {/* the mark rides the section label rather than repeating the
                  name on a line of its own. Saying "Meet Vera", then "Vera",
                  then a descriptor was three introductions to the same thing
                  before the product had shown anything. */}
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

        {/* the product, layout D, spans all 12.
            The camera is a scoped push, not a zoom effect: 1.08x with the
            origin set toward the panel, so the frame leans into the detail the
            way a product recording would. Disabled under reduced motion and
            below lg, where there is no panel to lean toward. */}
        <Reveal delay={120} className="mt-10 md:mt-12">
          {/* narrow layouts get the same line as a static caption. A floating
              box at this width would sit on the content it describes. */}
          <NarratorCaption cue={cue} />
          <div
            className={clsx(
              "relative origin-[78%_50%] transition-transform duration-deliberate ease-state",
              "motion-reduce:transform-none",
              camera ? "lg:scale-[1.08]" : "scale-100",
            )}
          >
            <div className="demo-scale surface-light rounded-frame">
              <ProductFrame
                mode={mode}
                onModeChange={onModeChange}
                frameRef={frameRef}
              >
                {mode === "track" && (
                  <TrackTheWork
                    activeId={activeId}
                    onSelect={(id) => {
                      /* a real click ends the run: nothing dims, nothing
                         advances, the viewer has it from here */
                      takeOver();
                      setActiveId(id);
                      setSourcesOpen(false);
                      setBeat(null);
                      setCamera(false);
                      setPhase("idle");
                      setCue(null);
                    }}
                    rowRefs={rowRefs}
                    beat={beat}
                    phase={phase}
                    focusId="spa-conflict"
                    sourcesOpen={sourcesOpen}
                    onToggleSources={() => {
                      takeOver();
                      setSourcesOpen((v) => !v);
                    }}
                  />
                )}
                {mode === "ask" && (
                  <AskVera
                    state={ask}
                    onPick={(kind, exampleId) => {
                      takeOver();
                      if (kind === "update") {
                        runAsk(MEMORY_UPDATE.input, true);
                        return;
                      }
                      const ex =
                        ASK_EXAMPLES.find((e) => e.id === exampleId) ??
                        ASK_EXAMPLES[0];
                      runAsk(ex.question, false, ex);
                    }}
                    onRole={(id) => {
                      takeOver();
                      const ex = ASK_EXAMPLES.find((e) => e.id === id);
                      if (ex) runAsk(ex.question, false, ex);
                    }}
                    onToggleSources={() => {
                      takeOver();
                      const opening = ask.phase !== "sources";
                      setAsk((s) => ({
                        ...s,
                        phase: opening ? "sources" : "answer",
                        focus: null,
                      }));
                    }}
                  />
                )}
                {mode === "insights" && (
                  <ProactiveInsights
                    state={insight}
                    onSelect={(id) => {
                      takeOver();
                      setInsight({
                        openId: id,
                        sourcesOpen: false,
                        introducing: false,
                      });
                      setCue(null);
                    }}
                    onToggleSources={() => {
                      takeOver();
                      setInsight((s) => ({ ...s, sourcesOpen: !s.sourcesOpen }));
                      setCue(null);
                    }}
                    onAsk={(role, question) => {
                      takeOver();
                      clearAsk();
                      setCue(null);
                      setInsight({
                        introducing: false,
                        openId: null,
                        sourcesOpen: false,
                      });
                      const ex =
                        ASK_EXAMPLES.find((e) => e.id === role) ??
                        ASK_EXAMPLES[0];
                      /* prefilled and waiting, not answered: this question is
                         not one of the worked examples, and inventing a reply
                         would be the one dishonest thing in the demo */
                      setAsk({
                        introducing: false,
                        phase: "idle",
                        typed: question,
                        example: ex,
                        isUpdate: false,
                        focus: null,
                      });
                      setMode("ask");
                    }}
                  />
                )}
              </ProductFrame>
            </div>

            {/* the cursor is clipped to the frame, it never escapes onto the
                page (§16.2). Rendered as a sibling overlay so it sits above
                the frame's own content. */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-frame">
              <FakeCursor pos={pos} pressed={pressed} ping={ping} />
              {/* desktop only, and inside the camera transform so annotation
                  and camera push travel together rather than fight */}
              <div className="hidden lg:block">
                <DemoNarrator
                  cue={cue}
                  frameRef={frameRef}
                  onCueLeaving={(id) => {
                    /* the interface fades in exactly as the annotation fades
                       out, which is the whole effect */
                    if (id === "ask-intro")
                      setAsk((s) => ({ ...s, introducing: false }));
                    if (id === "insight-intro")
                      setInsight((s) => ({ ...s, introducing: false }));
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
