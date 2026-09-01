"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Avatar, Shell, who } from "./Chrome";
import { TODAY } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const ITEMS = TODAY.items;

const TONE: Record<string, string> = {
  due: "text-accent",
  open: "text-[#A8552F]",
  decided: "text-accent",
  filed: "text-muted-foreground",
  plain: "text-graphite",
};

export function TrackWork() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(ITEMS.length, {
    beatMs: 260,
    startMs: 200,
    loop: false,
  });
  const step = reduced ? ITEMS.length : raw;

  return (
    <div ref={ref} className="contents">
      <Shell
        tab="Overview"
        aside={
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <div className="flex -space-x-1.5">
              {TODAY.involved.map((k) => (
                <Avatar key={k} k={k} ring />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">5 teams</span>
          </div>
        }
      >
        <div className="px-5 py-4">
          <div className="flex items-baseline justify-between">
            <p className="text-[12px] font-semibold text-foreground">Today</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {ITEMS.length} items
            </p>
          </div>

          <ul className="mt-2.5 divide-y divide-foreground/[0.07]">
            {ITEMS.map((it, i) => (
              <motion.li
                key={it.id}
                initial={false}
                animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 5 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="group flex items-center gap-3.5 py-2.5 transition-colors hover:bg-foreground/[0.02]"
              >
                <span
                  className={cn(
                    "w-[68px] shrink-0 font-mono text-[9.5px] uppercase tracking-[0.1em]",
                    TONE[it.tone] ?? "text-graphite"
                  )}
                >
                  {it.kind}
                </span>

                <span className="min-w-0 flex-1 truncate text-[13.5px] text-foreground">
                  {it.title}
                </span>

                <span className="hidden w-[150px] shrink-0 items-center gap-2 sm:flex">
                  {"with" in it && it.with ? (
                    <>
                      <span className="flex -space-x-1.5">
                        {it.with.map((k) => (
                          <Avatar key={k} k={k} ring />
                        ))}
                      </span>
                      <span className="truncate text-[11px] text-muted-foreground">
                        {it.with.map((k) => who(k).dept).join(" · ")}
                      </span>
                    </>
                  ) : it.person ? (
                    <>
                      <Avatar k={it.person} />
                      <span className="min-w-0 truncate text-[11.5px] text-graphite">
                        {who(it.person).name}
                        <span className="text-muted-foreground">
                          {" · "}
                          {who(it.person).dept}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">Provenance</span>
                  )}
                </span>

                <span
                  className={cn(
                    "w-[104px] shrink-0 text-right text-[11.5px]",
                    it.tone === "due" || it.tone === "open"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {it.meta}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Shell>
    </div>
  );
}
