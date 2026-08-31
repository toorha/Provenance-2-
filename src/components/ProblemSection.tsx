"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CONTEXT_DECAY } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const F = CONTEXT_DECAY.fragments;
type Frag = (typeof F)[number];

/* four fragments, loosely stacked and slightly turned — the answer is
   here, but no two pieces sit in the same place */
const PLACE = [
  "lg:col-start-1 lg:col-span-6 lg:mt-0 rotate-[-0.8deg]",
  "lg:col-start-7 lg:col-span-6 lg:mt-14 rotate-[1deg]",
  "lg:col-start-2 lg:col-span-6 lg:mt-2 rotate-[0.6deg]",
  "lg:col-start-8 lg:col-span-5 lg:mt-6 rotate-[-1.1deg]",
];

export function ProblemSection() {
  const d = CONTEXT_DECAY;
  const { ref, step } = useSequence(F.length, { beatMs: 640, startMs: 200 });

  return (
    <section id="problem" className="tex tex-paper bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>
        <h2 className="mt-7 max-w-[16ch] font-display text-[2.3rem] leading-[1.02] tracking-[-0.026em] text-foreground sm:text-[2.9rem] lg:text-[3.4rem]">
          {d.headline}
        </h2>
        <p className="mt-7 max-w-[54ch] text-[17px] leading-[1.65] text-graphite lg:text-[18px]">
          {d.body}
        </p>

        {/* the question, and the pieces of its answer */}
        <div className="mt-16 border-l-2 border-foreground/25 pl-6 lg:mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Someone asks
          </p>
          <p className="mt-2.5 max-w-[26ch] font-display text-[1.75rem] leading-[1.15] tracking-[-0.022em] text-foreground sm:text-[2.1rem]">
            &ldquo;{d.question}&rdquo;
          </p>
        </div>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-7 sm:mx-auto sm:max-w-lg lg:mt-14 lg:max-w-none lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0"
        >
          {F.map((frag, i) => (
            <div key={frag.id} className={cn("relative", PLACE[i])}>
              <motion.div
                initial={false}
                animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 14 }}
                transition={{ duration: 0.65, ease: EASE }}
              >
                <Fragment frag={frag} />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <p className="max-w-[20ch] font-display text-[2rem] leading-[1.1] tracking-[-0.024em] text-foreground sm:text-[2.5rem]">
            The answer exists.{" "}
            <span className="text-graphite">
              It&rsquo;s scattered across people, files and time.
            </span>
          </p>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.6] text-muted-foreground">
            {d.closing.sub}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */

function Fragment({ frag }: { frag: Frag }) {
  const m = frag.meta as Record<string, string>;
  return (
    <div className="frag relative rounded-[2px]">
      <div className="flex items-center justify-between gap-3 border-b border-foreground/[0.07] px-4 py-2">
        <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-graphite">
          <Glyph kind={frag.kind} />
          {frag.system}
        </span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.11em] text-muted-foreground">
          {frag.when}
        </span>
      </div>

      <div className="px-4 py-3.5">
        {frag.kind === "notes" ? (
          <div className="frag-ruled -mx-1 px-1">
            <p className="text-[10.5px] text-muted-foreground">
              {m.title} &nbsp;&middot;&nbsp; {m.attendees}
            </p>
            <p className="mt-2 flex gap-2 text-[13.5px] leading-[1.5] text-foreground">
              <span className="text-muted-foreground">&mdash;</span>
              {frag.quote}
            </p>
          </div>
        ) : (
          <>
            <p className="text-[10.5px] text-muted-foreground">{m.from}</p>
            <p className="mt-0.5 text-[12px] font-medium text-graphite">{m.subject}</p>
            <div className="mt-3 border-l-2 border-foreground/20 pl-3">
              <p className="text-[13.5px] leading-[1.5] text-foreground">
                &ldquo;{frag.quote}&rdquo;
              </p>
            </div>
            {m.context && (
              <p className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-foreground">
                {m.context}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Glyph({ kind }: { kind: string }) {
  const paths: Record<string, ReactNode> = {
    email: <path d="M1.5 3h11v8h-11zM2 3.5l5 4 5-4" />,
    notes: <path d="M2.5 2h9v10h-9zM4.5 5h5M4.5 7.5h5M4.5 10h3" />,
  };
  return (
    <svg
      viewBox="0 0 14 14"
      className="h-[11px] w-[11px] shrink-0 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind]}
    </svg>
  );
}
