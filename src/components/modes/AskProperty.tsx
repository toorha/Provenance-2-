"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Shell } from "./Chrome";
import { ASK_PROVENANCE, PEOPLE } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const A = ASK_PROVENANCE;
const CASES = A.cases;
type Case = (typeof CASES)[number];
type PersonKey = keyof typeof PEOPLE;

export function AskProperty() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [typed, setTyped] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [sources, setSources] = useState(false);
  const [share, setShare] = useState<"closed" | "open" | "sent">("closed");
  const timers = useRef<number[]>([]);

  const c = CASES[i];
  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  /* type the question in, then answer it */
  const run = useCallback(
    (idx: number) => {
      clear();
      const q = CASES[idx].question.length;
      if (reduced) {
        setTyped(q);
        setAnswered(true);
        return;
      }
      setTyped(0);
      setAnswered(false);
      let n = 0;
      const step = Math.max(1, Math.round(q / 22));
      const tick = () => {
        n = Math.min(q, n + step);
        setTyped(n);
        if (n < q) timers.current.push(window.setTimeout(tick, 34));
        else timers.current.push(window.setTimeout(() => setAnswered(true), 420));
      };
      timers.current.push(window.setTimeout(tick, 260));
    },
    [reduced]
  );

  useEffect(() => {
    run(i);
    return clear;
  }, [i, run]);

  const go = (next: number) => {
    setDir(next > i ? 1 : -1);
    setI((next + CASES.length) % CASES.length);
    setSources(false);
    setShare("closed");
  };

  return (
    <Shell tab="Overview">
      {/* which part of the organisation is asking */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5 border-b border-foreground/[0.07] px-5 py-2.5">
        {CASES.map((x, k) => (
          <button
            key={x.id}
            type="button"
            onClick={() => go(k)}
            className={cn(
              "rounded-[2px] px-2.5 py-1 text-[11.5px] transition-colors duration-200",
              k === i
                ? "bg-accent/[0.09] font-medium text-accent"
                : "text-graphite hover:bg-foreground/[0.04] hover:text-foreground"
            )}
          >
            {x.category}
          </button>
        ))}
      </div>

      {/* the question being typed */}
      <div className="border-b border-foreground/[0.07] px-5 py-3">
        <div className="flex items-start gap-2.5 rounded-[2px] border border-foreground/12 bg-background px-3 py-2">
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
          <p className="min-w-0 flex-1 text-[13px] leading-[1.45] text-foreground">
            {c.question.slice(0, typed)}
            {typed < c.question.length && (
              <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] animate-pulse bg-accent align-baseline" />
            )}
          </p>
        </div>
      </div>

      {/* the answer */}
      <div className="flex-1 px-5 py-4">
        {!answered ? (
          <p className="text-[12px] text-muted-foreground">Reading the property memory…</p>
        ) : (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: dir * 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="flex gap-3"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-[1.5px] border-accent">
              <span className="h-1 w-1 bg-accent" />
            </span>
            <div className="min-w-0 flex-1">
              <Answer c={c} showSources={sources} />
            </div>
          </motion.div>
        )}
      </div>

      {/* what you can do with it */}
      <div className="flex items-center gap-2 border-t border-foreground/[0.07] px-5 py-3">
        <button
          type="button"
          onClick={() => setSources((v) => !v)}
          className="rounded-[2px] bg-accent px-3.5 py-[7px] text-[12px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
        >
          {c.actions[0]}
        </button>
        <button
          type="button"
          onClick={() => setShare("open")}
          className="rounded-[2px] border border-foreground/15 px-3.5 py-[7px] text-[12px] font-medium text-graphite transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
        >
          {c.actions[1]}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <Pager label="Previous" onClick={() => go(i - 1)}>
            <path d="M9.5 3.5 5 8l4.5 4.5" />
          </Pager>
          <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
          </span>
          <Pager label="Next" onClick={() => go(i + 1)}>
            <path d="M6.5 3.5 11 8l-4.5 4.5" />
          </Pager>
        </div>
      </div>

      {share !== "closed" && (
        <SharePanel
          people={c.share}
          done={share === "sent"}
          onSend={() => setShare("sent")}
          onClose={() => setShare("closed")}
        />
      )}
    </Shell>
  );
}

/* ------------------------------------------------------------------ */

function Pager({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-foreground/15 text-graphite transition-colors duration-200 hover:border-foreground/40 hover:text-foreground"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}

function Answer({ c, showSources }: { c: Case; showSources: boolean }) {
  return (
    <div className="space-y-3.5">
      {"lead" in c && c.lead && <p className="text-[13px] leading-[1.5]">{c.lead}</p>}

      {"para" in c &&
        c.para?.map((p) => (
          <p key={p} className="max-w-[62ch] text-[13px] leading-[1.55]">
            {p}
          </p>
        ))}

      {"items" in c && c.items && (
        <ol className="space-y-2.5">
          {c.items.map((it, k) => (
            <li key={it.text} className="flex gap-3">
              <span className="w-[62px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.11em] text-accent">
                {String(k + 1).padStart(2, "0")}
                {it.team ? ` · ${it.team}` : ""}
              </span>
              <span className="text-[13px] leading-[1.45]">{it.text}</span>
            </li>
          ))}
        </ol>
      )}

      {"timeline" in c && c.timeline && (
        <ul className="space-y-1.5 border-l border-foreground/12 pl-3.5">
          {c.timeline.map((t) => (
            <li key={t.year} className="flex gap-3 text-[13px]">
              <span className="w-9 shrink-0 font-mono text-[11px] tabular-nums text-graphite">
                {t.year}
              </span>
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      )}

      {"concepts" in c && c.concepts && (
        <ul className="space-y-3">
          {c.concepts.map((x) => (
            <li key={x.year} className="border-l-2 border-foreground/15 pl-3.5">
              <p className="text-[13px] font-medium">
                <span className="font-mono text-[11px] tabular-nums text-graphite">{x.year}</span>
                <span className="mx-2 text-muted-foreground">·</span>
                {x.title}
              </p>
              <p className="mt-0.5 max-w-[58ch] text-[12.5px] leading-[1.45] text-graphite">
                {x.outcome}
              </p>
            </li>
          ))}
        </ul>
      )}

      {"facts" in c && c.facts && (
        <div className="border-t border-foreground/10 pt-3">
          {"factsLabel" in c && c.factsLabel && (
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
              {c.factsLabel}
            </p>
          )}
          <dl className="space-y-1">
            {c.facts.map((f) => (
              <div key={f.label} className="flex gap-3 text-[12.5px]">
                <dt className="w-[112px] shrink-0 text-muted-foreground">{f.label}</dt>
                <dd className="text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {"note" in c && c.note && (
        <div className="border-l-2 border-foreground/15 pl-3">
          {"noteLabel" in c && c.noteLabel && (
            <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
              {c.noteLabel}
            </p>
          )}
          <p className="mt-1 max-w-[58ch] text-[12.5px] leading-[1.5] text-graphite">{c.note}</p>
        </div>
      )}

      {"nextStep" in c && c.nextStep && (
        <div className="border-l-2 border-accent pl-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-accent">Next step</p>
          <p className="mt-1 max-w-[58ch] text-[12.5px] leading-[1.5]">{c.nextStep}</p>
        </div>
      )}

      <div className="border-t border-foreground/10 pt-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted-foreground">
          {c.sources} linked sources
        </p>
        <AnimatePresence initial={false}>
          {showSources && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.sourceList.map((s) => (
                  <span
                    key={s}
                    className="rounded-[2px] border border-foreground/12 px-2 py-1 text-[11px] text-graphite"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SharePanel({
  people,
  done,
  onSend,
  onClose,
}: {
  people: readonly string[];
  done: boolean;
  onSend: () => void;
  onClose: () => void;
}) {
  const [include, setInclude] = useState<string[]>([...A.share.include]);
  const list = people.map((k) => PEOPLE[k as PersonKey]);
  const depts = list.map((p) => p.dept);

  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center bg-charcoal/35 px-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[320px] border border-foreground/15 bg-warm-white shadow-[0_24px_60px_-18px_rgba(19,20,19,0.45)]"
      >
        {done ? (
          <div className="px-5 py-7 text-center">
            <p className="text-[13px] font-medium text-accent">
              Shared with {depts.join(", ").replace(/, ([^,]*)$/, " and $1")}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-[2px] border border-foreground/15 px-3.5 py-[6px] text-[12px] font-medium text-graphite hover:border-foreground/40 hover:text-foreground"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-foreground/10 px-4 py-3">
              <p className="text-[12.5px] font-semibold">{A.share.title}</p>
            </div>
            <div className="space-y-4 px-4 py-4">
              <ul className="space-y-1.5">
                {list.map((p) => (
                  <li key={p.name} className="flex items-center gap-2.5">
                    <span className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-accent/[0.13] text-[8.5px] font-semibold text-accent">
                      {p.initials}
                    </span>
                    <span className="text-[12.5px]">
                      {p.name}
                      <span className="text-muted-foreground"> · {p.dept}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5 border-t border-foreground/10 pt-3.5">
                {A.share.include.map((item) => {
                  const on = include.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setInclude((cur) =>
                          cur.includes(item) ? cur.filter((x) => x !== item) : [...cur, item]
                        )
                      }
                      className="flex w-full items-center gap-2.5 text-left text-[12.5px]"
                    >
                      <span
                        className={cn(
                          "flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[2px] border transition-colors",
                          on
                            ? "border-accent bg-accent text-accent-foreground"
                            : "border-foreground/25"
                        )}
                      >
                        {on && (
                          <svg
                            viewBox="0 0 12 12"
                            className="h-2 w-2"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2.5 6.2 5 8.5 9.5 3.5" />
                          </svg>
                        )}
                      </span>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2 border-t border-foreground/10 px-4 py-3">
              <button
                type="button"
                onClick={onSend}
                className="rounded-[2px] bg-accent px-4 py-[7px] text-[12.5px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent-light"
              >
                {A.share.action}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[2px] border border-foreground/15 px-3.5 py-[7px] text-[12.5px] font-medium text-graphite hover:border-foreground/40 hover:text-foreground"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
