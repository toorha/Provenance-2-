"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MacWindow, AppShell } from "./MacWindow";
import { ease } from "./demo-ui";
import { ASK_PRESETS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type Preset = (typeof ASK_PRESETS)[number];
type Phase = "typing" | "searching" | "answered";
type Turn = {
  id: string;
  q: string;
  answer: Preset["answer"];
  sources: readonly string[];
  phase: Phase;
  typed: number;
};

export function BeforeAfterDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const touched = useRef(false);
  const reduced = useReducedMotion();

  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);

  const asked = new Set(turns.map((t) => t.id));
  const remaining = ASK_PRESETS.filter((p) => !asked.has(p.id));
  const activeTurn = turns[turns.length - 1];
  const typingBar = activeTurn?.phase === "typing";

  const patch = (id: string, next: Partial<Turn>) =>
    setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, ...next } : t)));

  const ask = useCallback(
    (preset: Preset) => {
      setBusy(true);
      setTurns((prev) => [
        ...prev,
        {
          id: preset.id,
          q: preset.q,
          answer: preset.answer,
          sources: preset.sources,
          phase: "typing",
          typed: 0,
        },
      ]);

      if (reduced) {
        patch(preset.id, { phase: "answered", typed: preset.q.length });
        setBusy(false);
        return;
      }

      const total = preset.q.length;
      const per = Math.max(1, Math.round(total / 20));
      let c = 0;
      const type = () => {
        c = Math.min(total, c + per);
        patch(preset.id, { typed: c });
        if (c < total) {
          timers.current.push(window.setTimeout(type, 38));
        } else {
          timers.current.push(
            window.setTimeout(() => {
              patch(preset.id, { phase: "searching" });
              timers.current.push(
                window.setTimeout(() => {
                  patch(preset.id, { phase: "answered" });
                  setBusy(false);
                }, 1300)
              );
            }, 340)
          );
        }
      };
      timers.current.push(window.setTimeout(type, 240));
    },
    [reduced]
  );

  // start once scrolled into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || started) return;
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && setStarted(true),
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // auto-ask the first question if the visitor hasn't touched it
  useEffect(() => {
    if (!started || touched.current || turns.length > 0) return;
    const t = window.setTimeout(() => {
      if (!touched.current) ask(ASK_PRESETS[0]);
    }, 550);
    timers.current.push(t);
  }, [started, ask, turns.length]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const onChip = (preset: Preset) => {
    if (busy) return;
    touched.current = true;
    ask(preset);
  };

  const reset = () => {
    if (busy) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    touched.current = true;
    setTurns([]);
  };

  return (
    <div ref={rootRef}>
      <MacWindow title="Provenance" className="max-w-4xl">
        <AppShell
          nav="Properties"
          mainClassName="flex flex-col"
          main={
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="flex h-4 w-4 items-center justify-center border-[1.5px] border-accent">
                  <span className="h-[3.5px] w-[3.5px] bg-accent" />
                </span>
                <span className="text-[12px] font-bold text-foreground">Westmount Centre</span>
                <span className="text-[11px] text-muted-light">· Ask</span>
              </div>

              {/* thread */}
              <div
                ref={threadRef}
                className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4"
                style={{ minHeight: 264, maxHeight: 400 }}
              >
                {turns.length === 0 && !typingBar ? (
                  <p className="m-auto max-w-xs text-center text-[12.5px] leading-[1.5] text-muted-foreground">
                    Ask anything about this property. Every answer is drawn from its record and
                    shows its sources.
                  </p>
                ) : (
                  turns.map((t) => <TurnView key={t.id} turn={t} />)
                )}
              </div>

              {/* suggestions */}
              <div className="border-t border-border px-4 pb-2.5 pt-3">
                {remaining.length > 0 ? (
                  <>
                    <p className="mb-2 label-mono !text-[9.5px] text-muted-foreground">
                      {turns.length === 0 ? "Try asking" : "Ask another"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {remaining.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          disabled={busy}
                          onClick={() => onChip(p)}
                          className={cn(
                            "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition-colors",
                            busy
                              ? "border-border text-muted-light"
                              : "border-border text-slate hover:border-accent hover:bg-accent/[0.04] hover:text-accent"
                          )}
                        >
                          <span className="text-[9px] font-bold uppercase tracking-[0.05em] text-accent/70">
                            {p.tag}
                          </span>
                          <span className="font-medium">{p.chip}</span>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      That is the whole record, from five angles.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      disabled={busy}
                      className="text-[11px] font-semibold text-accent hover:underline disabled:text-muted-light"
                    >
                      Start over
                    </button>
                  </div>
                )}
              </div>

              {/* ask bar */}
              <div className="border-t border-border px-4 py-3">
                <div className="flex items-center gap-2 rounded-[2px] border border-border bg-warm-white px-3 py-2">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" fill="none">
                    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p className="min-w-0 flex-1 truncate text-[13px] text-foreground">
                    {typingBar ? (
                      <>
                        {activeTurn.q.slice(0, activeTurn.typed)}
                        <span className="ml-0.5 inline-block h-[0.95em] w-[2px] translate-y-[2px] bg-accent align-middle animate-pulse" />
                      </>
                    ) : (
                      <span className="text-muted-light">Ask about this property</span>
                    )}
                  </p>
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] transition-colors",
                      typingBar ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-light"
                    )}
                  >
                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
                      <path
                        d="M7 11.5V3M7 3 3.2 6.8M7 3l3.8 3.8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          }
        />
      </MacWindow>

      <p className="mt-4 max-w-4xl text-[13px] leading-[1.6] text-muted-foreground">
        Without Provenance, each of these answers means days of reconstruction across drives,
        inboxes and consultants, and the picture is often still incomplete.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TurnView({ turn }: { turn: Turn }) {
  if (turn.phase === "typing") return null;
  return (
    <div className="flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="flex justify-end"
      >
        <p className="max-w-[82%] rounded-2xl rounded-br-sm bg-accent/10 px-3.5 py-2 text-[13.5px] leading-[1.45] text-foreground">
          {turn.q}
        </p>
      </motion.div>

      <div className="flex gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-accent">
          <span className="h-1 w-1 bg-accent" />
        </span>
        <div className="min-w-0 flex-1">
          {turn.phase === "searching" ? (
            <div className="flex items-center gap-2 py-0.5 text-[12.5px] text-slate">
              <span className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                    style={{ animationDelay: `${i * 160}ms` }}
                  />
                ))}
              </span>
              Searching property memory
            </div>
          ) : (
            <Answer answer={turn.answer} sources={turn.sources} />
          )}
        </div>
      </div>
    </div>
  );
}

function Answer({
  answer,
  sources,
}: {
  answer: Preset["answer"];
  sources: readonly string[];
}) {
  const srcDelay = answer.length * 0.45 + 0.15;
  return (
    <div className="flex flex-col gap-3">
      {answer.map((block, i) => (
        <motion.div
          key={block.text}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease, delay: i * 0.45 }}
        >
          {"label" in block && block.label && (
            <p className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-muted-foreground">
              {block.label}
            </p>
          )}
          <p
            className={cn(
              "text-[13.5px] leading-[1.55] text-foreground",
              "label" in block && block.label && "mt-1"
            )}
          >
            {block.text}
          </p>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: srcDelay }}
        className="border-t border-border pt-3"
      >
        <p className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-muted-foreground">
          Sources
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {sources.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, ease, delay: srcDelay + 0.1 + i * 0.06 }}
              className="rounded-[4px] border border-border bg-warm-white px-2 py-1 text-[11px] font-medium text-slate"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
