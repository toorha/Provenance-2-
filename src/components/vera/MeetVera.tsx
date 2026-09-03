"use client";

import { useCallback, useRef, useState } from "react";
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

/* HOMEPAGE.md §5, Section 3 — Meet Vera. Layout D (Full stage), mineral-050
   band, the one `loud` section on the page.

   The introduction is deliberately short: label, headline, one line of
   functions, then the product. No feature cards explaining Vera — the frame is
   the explanation.

   Track the Work is the ONE automatic walkthrough on the page. Ask Vera waits
   to be tried, and carries the only tab cue. Proactive Insights is manually
   explored too, and never autoplays. */

export function MeetVera() {
  const [mode, setMode] = useState<ModeId>("track");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  /* Which of the three beats is being narrated. null = nothing is, so the
     panel sits at full weight and a real user reading it sees everything. */
  const [beat, setBeat] = useState<Beat>(null);
  const [camera, setCamera] = useState(false);
  /* how the list is emphasised while the demo runs — see TrackTheWork */
  const [phase, setPhase] = useState<ListPhase>("idle");
  /* the narrator. One cue at a time, and it travels to the beat it explains
     so the camera, the cursor and the explanation agree on where to look. */
  const [cue, setCue] = useState<NarratorCue | null>(null);
  /* set when the Track walkthrough reaches its end, cleared as soon as the
     visitor goes anywhere. It is a prompt, not a permanent state. */
  const [promote, setPromote] = useState<ModeId | null>(null);

  /* Ask Vera. Nothing here runs on its own — the visitor picks a suggestion or
     a role, and only then does anything type. Track the Work stays the page's
     one automatic walkthrough, which is what keeps the section from feeling
     like an endless product tour. */
  const [ask, setAsk] = useState<AskState>({
    introducing: false,
    phase: "idle",
    typed: "",
    example: ASK_EXAMPLES[0],
    isUpdate: false,
    focus: null,
  });
  /* Proactive Insights. Manually explored, exactly like Ask Vera: no cursor
     sequence, no typing, no autoplay. Track stays the only demo that plays
     itself, and it never hands off to another tab when it finishes. */
  const [insight, setInsight] = useState<InsightState>({
    openId: null,
    sourcesOpen: false,
    introducing: false,
  });
  const introTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const askTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearAsk = useCallback(() => {
    askTimers.current.forEach(clearTimeout);
    askTimers.current = [];
  }, []);

  /* Types the text out, then answers. Natural cadence with jitter, and the
     answer arrives BY BLOCK — never character by character, which is the
     single strongest tell of a wrapped chat model (DESIGN.md §10.6). After it
     lands, focus walks answer → rows → close, the same attention mechanic
     Track the Work uses. */
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
      /* beside the input, because that is what is moving right now */
      /* nothing narrates over the typing or the answer. The mode intro says
         what Ask Vera does, and the answer speaks for itself. */
      setCue(null);

      /* Target the whole typing pass at about 3.2s regardless of length. A
         fixed per-character rate typed the short question in 2.2s, which was
         not long enough to read the cue that introduces it, while making the
         floor long enough to fix that left the box sitting on the answer. */
      const perChar = Math.max(9, Math.min(34, 3200 / text.length));
      let t = 260;
      for (let i = 1; i <= text.length; i++) {
        t += perChar * (0.75 + Math.random() * 0.5);
        at(t, () => setAsk((s) => ({ ...s, typed: text.slice(0, i) })));
      }
      t += 380;
      at(t, () => setAsk((s) => ({ ...s, phase: "thinking" })));
      /* long enough for "Vera is working" to register as a beat rather than
         a flicker, short enough that it never feels like latency */
      t += 1000;
      at(t, () => {
        setAsk((s) => ({
          ...s,
          phase: isUpdate ? "updated" : "answer",
          focus: isUpdate ? null : "answer",
        }));
      });
      if (!isUpdate) {
        t += 1600;
        at(t, () => setAsk((s) => ({ ...s, focus: "rows" })));
        t += 1900;
        at(t, () =>
          setAsk((s) => ({ ...s, focus: example.close ? "close" : null })),
        );
        t += 1400;
        at(t, () => setAsk((s) => ({ ...s, focus: null })));
      }
    },
    [clearAsk],
  );

  const frameRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});

  /* The Track walkthrough — a guided presentation, not a click-through.

     It opens by teaching the list: the two flagship rows brighten, the three
     ordinary rows recede, and it holds long enough for a viewer to see which
     two are worth opening. Only then does the cursor move.

     Inside the panel exactly one beat is at full weight at a time. The cursor
     alone was never going to carry that — it says where the pointer is, not
     where to read. About 11s. Do not speed it up; a demo too fast to read
     proves nothing (§16.6). */
  const buildSteps = useCallback((): Step[] => {
    const q = (sel: string) => () =>
      frameRef.current?.querySelector<HTMLElement>(sel) ?? null;
    const row = () => rowRefs.current["spa-conflict"];

    return [
      { kind: "wait", ms: 700 },

      // INTRO — these are the two worth looking at
      { kind: "do", fn: () => { setPhase("showcase"); setCue(TRACK_CUES.rows); } },
      { kind: "wait", ms: 1500 },

      // and this is the one being demonstrated
      { kind: "move", to: row },
      { kind: "do", fn: () => setPhase("focus") },
      { kind: "wait", ms: 650 },
      { kind: "click" },
      { kind: "do", fn: () => { setActiveId("spa-conflict"); setCamera(true); } },
      { kind: "wait", ms: 420 },

      // BEAT 1: what Vera understood. This is also where the rows cue hands
      // over, because Vera's read is now the thing to look at.
      { kind: "do", fn: () => { setBeat("read"); setCue(null); } },
      { kind: "wait", ms: 1750 },

      // BEAT 2: what Vera connected it from. 2019 against today.
      { kind: "do", fn: () => setBeat("connected") },
      { kind: "wait", ms: 2100 },

      // BEAT 3 — the decision the team has to make
      { kind: "do", fn: () => setBeat("next") },
      { kind: "wait", ms: 1700 },

      // the evidence, swapped into the same space
      { kind: "do", fn: () => { setBeat("connected"); setCue(null); } },
      { kind: "move", to: q("[data-sources-toggle]") },
      { kind: "wait", ms: 380 },
      { kind: "click" },
      { kind: "do", fn: () => setSourcesOpen(true) },
      { kind: "wait", ms: 1600 },
      { kind: "click" },
      { kind: "do", fn: () => setSourcesOpen(false) },
      { kind: "wait", ms: 450 },

      // close, and rest with BOTH flagships bright so the viewer is invited to
      // click the second one themselves
      { kind: "do", fn: () => { setBeat(null); setCamera(false); } },
      { kind: "move", to: q("[data-panel-close]") },
      { kind: "wait", ms: 340 },
      { kind: "click" },
      { kind: "do", fn: () => { setActiveId(null); setPhase("showcase"); } },
      { kind: "wait", ms: 400 },

      // the walkthrough is over, so Vera points at what to try next
      { kind: "do", fn: () => setPromote("ask") },
    ];
  }, []);

  const { pos, pressed, ping, stop: stopWalkthrough } = useCursorSequence(
    frameRef,
    buildSteps,
  );

  return (
    <section
      id="product"
      /* back to the base canvas: the product window is the bright surface, so
         the section around it must be the darkest thing near it. That contrast
         IS the point — marketing environment, then real software. */
      className="section-major anchor-offset overflow-hidden bg-canvas"
    >
      <div className="track">
        {/* intro — concise, so the product appears quickly */}
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

        {/* the line that switches the page into the TODAY register — it has to
            arrive right after two sections about decades (HOMEPAGE.md §5) */}
        <Reveal delay={60}>
          <p className="mt-7 max-w-[54ch] text-lead text-paper-muted">
            Vera keeps your team on track today, and connects that context
            while your team works.
          </p>
        </Reveal>


        {/* the product — layout D, spans all 12 */}
        {/* The camera is a scoped push, not a zoom effect: 1.08x with the
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
              onModeChange={(m) => {
                /* the walkthrough is Track's. Leaving Track is taking over,
                   and a sequence that keeps running would go on setting beats
                   and cues underneath another mode. */
                stopWalkthrough();
                setPromote(null);
                setMode(m);
                // switching modes ends any Track narration cleanly
                setBeat(null);
                setCamera(false);
                setPhase("idle");
                setActiveId(null);
                if (introTimer.current) clearTimeout(introTimer.current);
                setCue(m === "insights" ? INSIGHT_CUES.intro : null);
                /* the ask branch below sets its own cue */
                setInsight({
                  openId: null,
                  sourcesOpen: false,
                  introducing: m === "insights",
                });

                if (m === "ask") {
                  // Ask Vera always opens idle. It never types unprompted.
                  clearAsk();
                  setAsk({
                    introducing: true,
                    phase: "idle",
                    typed: "",
                    example: ASK_EXAMPLES[0],
                    isUpdate: false,
                    focus: null,
                  });
                  setCue(ASK_CUES.intro);
                }
              }}
              frameRef={frameRef}
              promote={promote}
            >
              {mode === "track" && (
                <TrackTheWork
                  activeId={activeId}
                  onSelect={(id) => {
                    setActiveId(id);
                    setSourcesOpen(false);
                    // a real click ends the narration; nothing should dim and
                    // the viewer takes over
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
                  onToggleSources={() => setSourcesOpen((v) => !v)}
                />
              )}
              {mode === "ask" && (
                <AskVera
                  state={ask}
                  onPick={(kind, exampleId) => {
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
                    const ex = ASK_EXAMPLES.find((e) => e.id === id);
                    if (ex) runAsk(ex.question, false, ex);
                  }}
                  onToggleSources={() => {
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
                    setInsight({ openId: id, sourcesOpen: false, introducing: false });
                    /* not narrated. The box landed on the reasoning and the
                       Ask Vera action, which is exactly what the visitor
                       opened the insight to read, and the mode intro has
                       already made the point. */
                    setCue(null);
                  }}
                  onToggleSources={() => {
                    /* not narrated. The source treatment already makes the
                       point, and a cue here would be over-explaining. */
                    setInsight((s) => ({ ...s, sourcesOpen: !s.sourcesOpen }));
                    setCue(null);
                  }}
                  onAsk={(role, question) => {
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
                    /* the question is prefilled and waiting, not answered:
                       the visitor sends it, and the role is already selected
                       so the worked examples are one click away. */
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

            {/* the cursor is clipped to the frame — it never escapes onto the
                page (§16.2). Rendered as a sibling overlay so it sits above the
                frame's own content. */}
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
