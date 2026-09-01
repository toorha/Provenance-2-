"use client";

import { motion } from "framer-motion";
import { CONTEXT_DECAY, PEOPLE } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const F = CONTEXT_DECAY.fragments;
type Frag = (typeof F)[number];
type PersonKey = keyof typeof PEOPLE;

/* Placement, not a grid. Sizes differ, a few overlap, and nothing is
   joined to anything else — the absence of connection is the point. */
const PLACE: Record<string, string> = {
  leasing: "lg:col-start-1 lg:col-span-7 lg:mt-0 lg:rotate-[-0.5deg]",
  development: "lg:col-start-6 lg:col-span-7 lg:-mt-6 lg:rotate-[0.7deg]",
  asset: "lg:col-start-1 lg:col-span-6 lg:-mt-10 lg:rotate-[0.4deg]",
  legal: "lg:col-start-7 lg:col-span-6 lg:mt-4 lg:rotate-[-0.6deg]",
  operations: "lg:col-start-2 lg:col-span-5 lg:-mt-4 lg:rotate-[-0.3deg]",
  planning: "lg:col-start-7 lg:col-span-5 lg:-mt-8 lg:rotate-[0.5deg]",
  meeting: "lg:col-start-3 lg:col-span-7 lg:mt-2 lg:rotate-[0.3deg]",
};

export function ProblemSection() {
  const d = CONTEXT_DECAY;
  const { ref, step } = useSequence(F.length, { beatMs: 420, startMs: 200 });

  return (
    <section id="problem" className="tex tex-paper bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{d.label}</p>
        <h2 className="mt-7 font-display text-[2.2rem] leading-[1.04] tracking-[-0.026em] text-foreground sm:text-[2.7rem] lg:text-[3.1rem]">
          {d.headline[0]}
          <br />
          <span className="text-graphite">{d.headline[1]}</span>
        </h2>
        <p className="mt-7 max-w-[62ch] text-[17px] leading-[1.65] text-graphite lg:text-[17.5px]">
          {d.body}
        </p>

        {/* the asset everything below belongs to */}
        <div className="relative mt-16 lg:mt-20">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 text-center font-display text-[5.5rem] leading-none tracking-[-0.03em] text-foreground/[0.045] lg:block"
          >
            {d.property}
          </p>

          <div
            ref={ref}
            className="relative grid grid-cols-1 gap-6 sm:mx-auto sm:max-w-xl lg:mx-0 lg:max-w-none lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0"
          >
            {F.map((frag, i) => (
              <motion.div
                key={frag.id}
                initial={false}
                animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 14 }}
                transition={{ duration: 0.6, ease: EASE }}
                className={cn("relative", PLACE[frag.id])}
                style={{ zIndex: F.length - i }}
              >
                <Fragment frag={frag} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* what that adds up to */}
        <div className="mt-20 lg:mt-28">
          <p className="flex flex-wrap gap-x-3 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {d.closing.count.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </p>
          <p className="mt-5 max-w-[22ch] font-display text-[1.9rem] leading-[1.12] tracking-[-0.024em] text-foreground sm:text-[2.4rem]">
            {d.closing.lead[0]}{" "}
            <span className="text-graphite">{d.closing.lead[1]}</span>
          </p>
          <p className="mt-5 max-w-[50ch] text-[15px] leading-[1.6] text-muted-foreground">
            {d.closing.sub}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */

function Fragment({ frag }: { frag: Frag }) {
  const person = frag.person ? PEOPLE[frag.person as PersonKey] : null;
  const sm = frag.size === "sm";

  return (
    <article
      className={cn(
        "frag rounded-[2px]",
        sm ? "px-4 py-3.5" : "px-5 py-4",
        frag.size === "lg" && "shadow-[0_2px_5px_hsl(var(--foreground)/0.05),0_26px_44px_-28px_hsl(var(--foreground)/0.4)]"
      )}
    >
      {/* who and when */}
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent">
          {frag.team}
        </span>
        <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.11em] text-muted-foreground">
          {frag.when}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        {person && (
          <span className="flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-accent/[0.12] text-[8px] font-semibold text-accent">
            {person.initials}
          </span>
        )}
        <p
          className={cn(
            "font-medium text-foreground",
            sm ? "text-[12.5px]" : "text-[13.5px]"
          )}
        >
          {frag.title}
        </p>
      </div>

      <p
        className={cn(
          "mt-2.5 leading-[1.55] text-foreground",
          sm ? "text-[12.5px]" : "text-[13.5px]"
        )}
      >
        {frag.quote}
      </p>

      <p className="mt-3 border-t border-foreground/[0.07] pt-2.5 text-[11.5px] leading-[1.45] text-muted-foreground">
        {frag.note}
      </p>
    </article>
  );
}
