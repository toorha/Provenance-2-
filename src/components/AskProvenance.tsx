"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { ASK_PROVENANCE, PEOPLE } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const A = ASK_PROVENANCE;

/*
 * 1   the question is in
 * 2   Provenance reads the memory
 * 3-5 the three constraints
 * 6   the reasoning behind them
 * 7   the suggested next step
 * 8   the sources
 */
const STEPS = 8;

export function AskProvenance() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(STEPS, { beatMs: 620, startMs: 350 });
  const step = reduced ? STEPS : raw;

  const [share, setShare] = useState<"closed" | "open" | "sent">("closed");
  const [openSource, setOpenSource] = useState<number | null>(null);

  return (
    <div ref={ref} className="mx-auto max-w-3xl">
      <MacWindow title="Provenance">
        <div className="relative flex min-h-[420px] flex-col bg-warm-white font-sans text-foreground">
          {/* header */}
          <div className="flex items-center gap-2 border-b border-foreground/10 px-4 py-2.5">
            <span className="flex h-4 w-4 items-center justify-center border-[1.5px] border-accent">
              <span className="h-[3px] w-[3px] bg-accent" />
            </span>
            <span className="text-[12px] font-semibold">Westmount Centre</span>
            <span className="text-[11px] text-muted-foreground">· Ask</span>
          </div>

          {/* the question */}
          <div className="border-b border-foreground/10 px-4 py-3">
            <div className="flex items-start gap-2.5">
              <svg
                viewBox="0 0 16 16"
                className="mt-[3px] h-3.5 w-3.5 shrink-0 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="7" cy="7" r="4.5" />
                <path d="m11 11 3.5 3.5" strokeLinecap="round" />
              </svg>
              <p className="text-[13.5px] leading-[1.45] text-foreground">{A.question}</p>
            </div>
          </div>

          {/* the answer */}
          <div className="flex-1 px-4 py-4">
            {step < 2 ? (
              <p className="text-[12px] text-muted-foreground">Reading the property memory…</p>
            ) : (
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-accent">
                  <span className="h-1 w-1 bg-accent" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[13px] leading-[1.5] text-foreground">{A.lead}</p>

                  <ol className="mt-3 space-y-2.5">
                    {A.constraints.map((c, i) => (
                      <motion.li
                        key={c.team}
                        initial={false}
                        animate={{
                          opacity: step >= 3 + i ? 1 : 0,
                          y: step >= 3 + i ? 0 : 4,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="flex gap-3"
                      >
                        <span className="w-[74px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.11em] text-accent">
                          {String(i + 1).padStart(2, "0")} · {c.team}
                        </span>
                        <span className="text-[13px] leading-[1.45] text-foreground">
                          {c.text}
                        </span>
                      </motion.li>
                    ))}
                  </ol>

                  <motion.p
                    initial={false}
                    animate={{ opacity: step >= 6 ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-3.5 text-[12.5px] leading-[1.5] text-graphite"
                  >
                    {A.rationale}
                  </motion.p>

                  <motion.div
                    initial={false}
                    animate={{ opacity: step >= 7 ? 1 : 0, y: step >= 7 ? 0 : 4 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-3.5 border-l-2 border-accent pl-3"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-accent">
                      Suggested next step
                    </p>
                    <p className="mt-1 text-[12.5px] leading-[1.5] text-foreground">
                      {A.nextStep}
                    </p>
                  </motion.div>

                  {/* sources */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: step >= 8 ? 1 : 0, y: step >= 8 ? 0 : 4 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="mt-5 border-t border-foreground/10 pt-3"
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
                      {A.sources.length} sources
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {A.sources.map((s, i) => (
                        <button
                          key={s.title}
                          type="button"
                          onClick={() => setOpenSource(openSource === i ? null : i)}
                          className={cn(
                            "flex items-center gap-1.5 rounded-[2px] border px-2 py-1 text-[11px] transition-colors duration-200",
                            openSource === i
                              ? "border-accent bg-accent/[0.07] text-accent"
                              : "border-foreground/12 text-graphite hover:border-accent/45 hover:text-foreground"
                          )}
                        >
                          {s.title}
                          <span className="font-mono text-[9px] text-muted-foreground">
                            {s.when}
                          </span>
                        </button>
                      ))}
                    </div>

                    <AnimatePresence initial={false}>
                      {openSource !== null && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: EASE }}
                          className="overflow-hidden font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                        >
                          <span className="mt-2 block">
                            {A.sources[openSource].kind} · filed to Westmount Centre · South Pad
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* share */}
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShare("open")}
                        className="inline-flex items-center gap-1.5 rounded-[2px] bg-accent px-3 py-[6px] text-[11.5px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
                      >
                        <ShareIcon />
                        Share
                      </button>
                      {share === "sent" && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[11.5px] text-accent"
                        >
                          {A.share.confirm}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </div>

          {share === "open" && (
            <SharePanel onSend={() => setShare("sent")} onClose={() => setShare("closed")} />
          )}
        </div>
      </MacWindow>

      <p className="mt-5 max-w-[40ch] text-[13.5px] leading-[1.55] text-muted-foreground">
        {A.payoff}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function SharePanel({ onSend, onClose }: { onSend: () => void; onClose: () => void }) {
  const [include, setInclude] = useState<string[]>([...A.share.include]);
  const people = A.share.people.map((k) => PEOPLE[k as keyof typeof PEOPLE]);

  const toggle = (v: string) =>
    setInclude((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-charcoal/35 px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[340px] border border-foreground/15 bg-warm-white shadow-[0_24px_60px_-18px_rgba(19,20,19,0.45)]"
      >
        <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3">
          <p className="text-[12.5px] font-semibold">{A.share.title}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="m3 3 8 8M11 3l-8 8" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 px-4 py-4">
          {/* the group already working on this */}
          <div>
            <p className="text-[12.5px] font-medium text-foreground">{A.share.group}</p>
            <ul className="mt-2.5 space-y-1.5">
              {people.map((p) => (
                <li key={p.name} className="flex items-center gap-2.5">
                  <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-accent/[0.13] text-[8.5px] font-semibold text-accent">
                    {p.initials}
                  </span>
                  <span className="text-[12.5px] text-foreground">
                    {p.name}
                    <span className="text-muted-foreground"> · {p.dept}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-2.5 text-[11.5px] text-graphite transition-colors hover:text-accent"
            >
              {A.share.add}
            </button>
          </div>

          {/* what travels with it */}
          <div className="border-t border-foreground/10 pt-3.5">
            <div className="space-y-1.5">
              {A.share.include.map((item) => {
                const on = include.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggle(item)}
                    className="flex w-full items-center gap-2.5 text-left text-[12.5px] text-foreground"
                  >
                    <span
                      className={cn(
                        "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[2px] border transition-colors",
                        on
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-foreground/25"
                      )}
                    >
                      {on && <Tick small />}
                    </span>
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/10 px-4 py-3">
          <button
            type="button"
            onClick={onSend}
            className="rounded-[2px] bg-accent px-4 py-[7px] text-[12.5px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
          >
            {A.share.action}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Tick({ small }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={small ? "h-2.5 w-2.5" : "h-3 w-3 text-accent"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7.5 6 10l5-6" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 14 14"
      className="h-3 w-3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="3" r="1.6" />
      <circle cx="3" cy="7" r="1.6" />
      <circle cx="11" cy="11" r="1.6" />
      <path d="M4.4 6.2 9.6 3.7M4.4 7.8l5.2 2.5" />
    </svg>
  );
}
