"use client";

import { motion } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { WORKFLOW } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* three beats per method: the record appears, Provenance is picked out,
   Provenance confirms what it filed */
const BEATS = 3;
const METHODS = WORKFLOW.methods;
const STEPS = METHODS.length * BEATS;

export function WorkflowDemo() {
  const { ref, step } = useSequence(STEPS, {
    beatMs: 780,
    startMs: 400,
    loop: true,
    loopPauseMs: 1600,
  });

  const idx = step === 0 ? 0 : Math.min(METHODS.length - 1, Math.floor((step - 1) / BEATS));
  const sub = step === 0 ? 0 : ((step - 1) % BEATS) + 1;
  const m = METHODS[idx];

  return (
    <div ref={ref}>
      <MacWindow title="Provenance" className="max-w-4xl">
        <div className="flex min-h-[300px] bg-warm-white font-sans text-charcoal">
          {/* the four ways you use it */}
          <nav className="hidden w-[150px] shrink-0 flex-col border-r border-foreground/10 bg-foreground/[0.035] sm:flex">
            <p className="border-b border-border px-3.5 py-2.5 label-mono !text-[9.5px] text-muted-foreground">
              How you use it
            </p>
            <ul className="flex-1 space-y-px p-2">
              {METHODS.map((item, i) => {
                const on = i === idx;
                return (
                  <li key={item.id}>
                    <span
                      className={cn(
                        "relative flex items-center gap-2 rounded-[2px] py-1.5 pl-3 pr-2.5 text-[12px]",
                        on ? "font-semibold text-charcoal" : "text-slate"
                      )}
                      style={{
                        backgroundColor: on ? "rgba(28,74,54,0.09)" : "transparent",
                      }}
                    >
                      {on && (
                        <span className="absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full bg-accent" />
                      )}
                      {item.nav}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="border-t border-border px-3.5 py-3 text-[10.5px] leading-[1.4] text-muted-foreground">
              Nothing new to maintain.
            </p>
          </nav>

          {/* the record you are already creating */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <p className="text-[12.5px] font-semibold text-charcoal">{m.title}</p>
              <span className="text-[10.5px] text-muted-light">{m.kind}</span>
            </div>

            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex-1 px-4 py-3.5"
            >
              <dl className="divide-y divide-border/70">
                {m.fields.map((f) => {
                  const isProv = "accent" in f && f.accent;
                  return (
                    <div key={f.label} className="flex items-baseline gap-3 py-[7px]">
                      <dt className="w-[62px] shrink-0 label-mono !text-[9.5px] !tracking-[0.12em] text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="text-[12.5px] leading-snug text-charcoal">
                        {isProv ? (
                          <Highlighted text={f.value} on={sub >= 2} />
                        ) : (
                          f.value
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="mt-3 max-w-[62ch] border-t border-border pt-3 text-[12px] leading-[1.5] text-slate">
                {m.body}
              </p>

              <div
                className="mt-4 flex items-start gap-2.5 border-l-2 border-accent bg-accent/[0.05] py-2.5 pl-3 pr-3"
                style={{
                  opacity: sub >= 3 ? 1 : 0,
                  transform: sub >= 3 ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity .4s cubic-bezier(.22,1,.36,1), transform .4s cubic-bezier(.22,1,.36,1)",
                }}
              >
                <svg
                  viewBox="0 0 14 14"
                  className="mt-[2px] h-3.5 w-3.5 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7.5 6 10l5-6" />
                </svg>
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold text-accent">{m.result}</span>
                  <span className="mt-0.5 block text-[11.5px] leading-[1.4] text-slate">
                    {m.resultDetail}
                  </span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </MacWindow>
    </div>
  );
}

/** the word that does the work, picked out on the second beat */
function Highlighted({ text, on }: { text: string; on: boolean }) {
  const i = text.toLowerCase().indexOf("provenance");
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span
        className={cn(
          "rounded-[2px] px-0.5 font-semibold transition-colors duration-500",
          on ? "bg-accent/15 text-accent" : "bg-transparent text-charcoal"
        )}
      >
        {text.slice(i, i + 10)}
      </span>
      {text.slice(i + 10)}
    </>
  );
}
