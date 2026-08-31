"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { ASK_PROVENANCE } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const Q = ASK_PROVENANCE.queries;

type Phase = "typing" | "thinking" | "answered";

export function AskProvenance() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const touched = useRef(false);
  const reduced = useReducedMotion();

  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);

  const query = Q[idx];

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const wait = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const runQuery = useCallback(
    (i: number) => {
      clearTimers();
      const q = Q[i];
      setIdx(i);
      setPhase("typing");
      setTyped(0);

      // once the visitor picks a question, stop the ambient rotation
      const advance = (next: () => void, ms: number) => {
        if (!touched.current) wait(ms, next);
      };

      if (reduced) {
        setTyped(q.q.length);
        setPhase("answered");
        advance(() => runQuery((i + 1) % Q.length), 4200);
        return;
      }

      const total = q.q.length;
      let c = 0;
      const type = () => {
        c = Math.min(total, c + 1);
        setTyped(c);
        if (c < total) {
          wait(26, type);
        } else {
          wait(420, () => {
            setPhase("thinking");
            wait(900, () => {
              setPhase("answered");
              advance(
                () => runQuery((i + 1) % Q.length),
                i === Q.length - 1 ? 5200 : 2600
              );
            });
          });
        }
      };
      wait(260, type);
    },
    [reduced]
  );

  const pick = (i: number) => {
    touched.current = true;
    runQuery(i);
  };

  // start once scrolled into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el || started) return;
    const io = new IntersectionObserver(
      (e) => e.some((x) => x.isIntersecting) && setStarted(true),
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    runQuery(0);
    return clearTimers;
  }, [started, runQuery]);

  return (
    <div ref={rootRef} className="mx-auto max-w-3xl">
      <MacWindow title="Provenance">
        <div className="flex min-h-[214px] flex-col bg-warm-white text-foreground">
          {/* header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="flex h-4 w-4 items-center justify-center border-[1.5px] border-accent">
              <span className="h-[3px] w-[3px] bg-accent" />
            </span>
            <span className="text-[12px] font-semibold text-foreground">Westmount Centre</span>
            <span className="text-[11px] text-muted-foreground">· Ask</span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {query.kind}
            </span>
          </div>

          {/* pick a question */}
          <div className="flex flex-wrap gap-1.5 border-b border-border px-4 py-2.5">
            {Q.map((q, qi) => {
              const on = qi === idx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => pick(qi)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-200",
                    on
                      ? "border-accent bg-accent/[0.07] text-accent"
                      : "border-border text-muted-foreground hover:border-accent/45 hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      on ? "bg-accent" : "border border-border-dark"
                    )}
                  />
                  {q.kind}
                </button>
              );
            })}
          </div>

          {/* search bar */}
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5 rounded-[2px] border border-border bg-background px-3 py-2">
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="m11 11 3.5 3.5" strokeLinecap="round" />
              </svg>
              <p className="min-w-0 flex-1 text-[13px] leading-snug text-foreground">
                {query.q.slice(0, typed)}
                {phase === "typing" && (
                  <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-accent align-baseline animate-pulse" />
                )}
              </p>
              <span
                className={cn(
                  "shrink-0 rounded-[2px] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors",
                  phase === "typing" && typed === query.q.length
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                Return
              </span>
            </div>
          </div>

          {/* answer */}
          <div className="min-h-[196px] flex-1 px-4 py-4">
            {phase === "thinking" ? (
              <div className="flex items-center gap-2 py-1 text-[12px] text-muted-foreground">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                      style={{ animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </span>
                Searching the property memory
              </div>
            ) : phase === "answered" ? (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex gap-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-accent">
                  <span className="h-1 w-1 bg-accent" />
                </span>
                <div className="min-w-0 flex-1">
                  <Answer query={query} />
                </div>
              </motion.div>
            ) : (
              <p className="py-1 text-[12px] text-muted-foreground">Asking the record…</p>
            )}
          </div>
        </div>
      </MacWindow>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Answer({ query }: { query: (typeof Q)[number] }) {
  const [viewed, setViewed] = useState(false);

  // list-style answer (current state)
  if ("list" in query && query.list) {
    return (
      <div>
        <p className="text-[13.5px] font-medium leading-[1.5] text-foreground">
          {query.lead}
        </p>
        <ul className="mt-2.5 space-y-1.5">
          {query.list.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.15 + i * 0.1 }}
              className="flex items-start gap-2.5 text-[13px] leading-[1.45] text-foreground"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    );
  }

  // paragraph answer, optionally with sources + actions (roof) or a note
  if (!("answer" in query)) return null;
  return (
    <div>
      <p className="text-[13.5px] leading-[1.55] text-foreground">{query.answer}</p>

      {"note" in query && query.note && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="mt-2 text-[12.5px] leading-[1.5] text-muted-foreground"
        >
          {query.note}
        </motion.p>
      )}

      {"sources" in query && query.sources && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.4, ease: EASE }}
          className="mt-4 border-t border-border pt-3"
        >
          <p className="label-mono text-muted-foreground">{query.sources.length} sources</p>
          <ul className="mt-2 space-y-1">
            {query.sources.map((s, i) => (
              <li
                key={s}
                className={cn(
                  "flex items-center gap-2 rounded-[2px] px-1.5 py-1 text-[12px] transition-colors",
                  viewed ? "bg-accent/[0.05] text-foreground" : "text-slate"
                )}
              >
                <span className="font-mono text-[9px] tabular-nums text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>

          {"actions" in query && query.actions && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setViewed((v) => !v)}
                className={cn(
                  "rounded-[2px] px-3 py-[6px] text-[11.5px] font-medium transition-colors duration-300",
                  viewed
                    ? "bg-accent/10 text-accent"
                    : "bg-accent text-accent-foreground hover:bg-accent-light"
                )}
              >
                {query.actions[0]}
              </button>
              <button
                type="button"
                className="rounded-[2px] border border-border px-3 py-[6px] text-[11.5px] font-medium text-slate transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
              >
                {query.actions[1]}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
