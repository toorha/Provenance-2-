"use client";

import { motion } from "framer-motion";
import { CONTEXT_DECAY } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CurrentWorkDemo() {
  const today = CONTEXT_DECAY.today;
  const captures = CONTEXT_DECAY.captures;
  const total = today.length + captures.length + 1;

  const { ref, step } = useSequence(total, {
    beatMs: 240,
    startMs: 300,
    loop: false,
  });

  const capturedFrom = today.length; // captures start revealing after the today list

  return (
    <div ref={ref} className="rounded-[3px] border border-border bg-background">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,1fr)_2.5rem_minmax(0,0.9fr)]">
        {/* today */}
        <Column label="Today" sub="a live property workflow">
          <ul className="space-y-1.5">
            {today.map((item, i) => (
              <Row key={item} on={step >= i + 1}>
                <span
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full",
                    /overdue/i.test(item) ? "bg-[#B4482C]" : "bg-accent"
                  )}
                />
                {item}
              </Row>
            ))}
          </ul>
        </Column>

        <Gutter on={step >= capturedFrom} />

        {/* what provenance captures */}
        <Column label="What Provenance captures" sub="from that work" tint>
          <ul className="space-y-1.5">
            {captures.map((c, i) => (
              <Row key={c} on={step >= capturedFrom + i + 1}>
                <svg
                  viewBox="0 0 12 12"
                  className="h-3 w-3 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 6.2 5 8.5 9.5 3.5" />
                </svg>
                {c}
              </Row>
            ))}
          </ul>
        </Column>

        <Gutter on={step >= total - 1} />

        {/* added to memory */}
        <Column label="Result" sub="every day">
          <motion.div
            initial={false}
            animate={{ opacity: step >= total ? 1 : 0.5, y: step >= total ? 0 : 4 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-[3px] border border-accent/30 bg-accent/[0.06] px-3 py-2 text-[12.5px] font-semibold text-accent"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6.2 5 8.5 9.5 3.5" />
            </svg>
            {CONTEXT_DECAY.addedTo}
          </motion.div>
          <p className="mt-3 text-[12px] leading-[1.5] text-muted-foreground">
            The memory is built from current work, not entered after the fact.
          </p>
        </Column>
      </div>
    </div>
  );
}

function Column({
  label,
  sub,
  tint,
  children,
}: {
  label: string;
  sub: string;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-t border-border px-5 py-5 lg:border-t-0 lg:border-l lg:first:border-l-0",
        tint && "bg-warm-white"
      )}
    >
      <p className="label-mono text-foreground/70">
        {label}
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
      <div className="mt-3.5">{children}</div>
    </div>
  );
}

function Row({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <motion.li
      initial={false}
      animate={{ opacity: on ? 1 : 0.4, x: on ? 0 : -3 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex items-center gap-2.5 text-[13px] leading-[1.4] text-foreground"
    >
      {children}
    </motion.li>
  );
}

function Gutter({ on }: { on: boolean }) {
  return (
    <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
      <motion.span
        initial={false}
        animate={{ opacity: on ? 1 : 0.25, x: on ? 2 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={cn("text-[15px]", on ? "text-accent" : "text-border-dark")}
      >
        &rarr;
      </motion.span>
    </div>
  );
}
