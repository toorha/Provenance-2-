"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Shell } from "./Chrome";
import { TODAY } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const SIGNALS = TODAY.signals;

const DOT: Record<string, string> = {
  opportunity: "bg-accent",
  overdue: "bg-[#A8552F]",
  attention: "border border-foreground/45",
  info: "bg-muted-light",
};

export function SurfaceSignals() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(SIGNALS.length, {
    beatMs: 300,
    startMs: 200,
    loop: false,
  });
  const step = reduced ? SIGNALS.length : raw;

  return (
    <div ref={ref} className="contents">
      <Shell
        tab="Overview"
        aside={
          <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:block">
            {SIGNALS.length} open
          </span>
        }
      >
        <div className="px-5 py-4">
          <p className="text-[12px] font-semibold text-foreground">Worth your attention</p>

          <ul className="mt-3 space-y-0">
            {SIGNALS.map((s, i) => (
              <motion.li
                key={s.id}
                initial={false}
                animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 6 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={cn(
                  "border-b border-foreground/[0.07] py-3 last:border-b-0",
                  s.tone === "opportunity" && "border-l-2 border-l-accent bg-accent/[0.035] pl-3.5"
                )}
              >
                <p className="flex items-center gap-2 text-[10.5px]">
                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[s.tone])} />
                  <span
                    className={cn(
                      "font-mono uppercase tracking-[0.12em]",
                      s.tone === "opportunity" ? "text-accent" : "text-graphite"
                    )}
                  >
                    {s.kind}
                  </span>
                  <span className="text-muted-light">·</span>
                  <span className="text-muted-light">{s.meta}</span>
                </p>

                <p className="mt-1.5 text-[13.5px] font-medium text-foreground">{s.title}</p>
                <p className="mt-0.5 max-w-[62ch] text-[12px] leading-[1.45] text-graphite">
                  {s.why}
                </p>

                <button
                  type="button"
                  className="mt-2 text-[11.5px] font-medium text-accent transition-opacity hover:opacity-70"
                >
                  {s.action} &rarr;
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </Shell>
    </div>
  );
}
