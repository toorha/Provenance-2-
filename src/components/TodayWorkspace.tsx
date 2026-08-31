"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MacWindow } from "./MacWindow";
import { PEOPLE, TODAY } from "@/lib/demo-data";
import { useSequence } from "@/lib/useSequence";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const ITEMS = TODAY.items;
const STEPS = ITEMS.length + 1;

type PersonKey = keyof typeof PEOPLE;
const who = (k: string) => PEOPLE[k as PersonKey];

/* each kind of work carries its own quiet colour */
const TONE: Record<string, string> = {
  due: "text-accent",
  open: "text-[#A8552F]",
  decided: "text-accent",
  filed: "text-muted-foreground",
  plain: "text-graphite",
};

export function TodayWorkspace() {
  const reduced = useReducedMotion();
  const { ref, step: raw } = useSequence(STEPS, {
    beatMs: 420,
    startMs: 300,
    loop: false,
  });
  const step = reduced ? STEPS : raw;

  return (
    <div ref={ref}>
      <MacWindow title="Provenance">
        <div className="flex min-h-[430px] bg-warm-white text-[13px] text-foreground">
          <Rail />

          <div className="flex min-w-0 flex-1 flex-col">
            {/* the property this is all attached to */}
            <div className="flex items-start justify-between gap-4 border-b border-foreground/[0.08] px-5 py-3.5">
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                  {TODAY.property.name}
                </h3>
                <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                  {TODAY.property.address}
                </p>
              </div>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <div className="flex -space-x-1.5">
                  {TODAY.involved.map((k) => (
                    <Avatar key={k} k={k} ring />
                  ))}
                </div>
                <span className="text-[11px] text-muted-foreground">5 teams</span>
              </div>
            </div>

            <Tabs />

            {/* the live work */}
            <div className="flex-1 px-5 py-4">
              <div className="flex items-baseline justify-between">
                <p className="text-[12px] font-semibold text-foreground">Today</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  6 items
                </p>
              </div>

              <ul className="mt-2.5 divide-y divide-foreground/[0.07]">
                {ITEMS.map((it, i) => (
                  <motion.li
                    key={it.id}
                    initial={false}
                    animate={{ opacity: step > i ? 1 : 0, y: step > i ? 0 : 6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-3.5 py-2.5"
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

                    {/* who owns it, or who is in it */}
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

              {/* detection, kept in its place */}
              <motion.div
                initial={false}
                animate={{ opacity: step >= STEPS ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-4 border-l-2 border-accent bg-accent/[0.045] py-2.5 pl-3.5 pr-3"
              >
                <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-accent">
                  {TODAY.opportunity.kind}
                </p>
                <p className="mt-1 text-[13px] text-foreground">{TODAY.opportunity.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">
                  {TODAY.opportunity.why}
                </p>
                <button
                  type="button"
                  className="mt-2 text-[11.5px] font-medium text-accent transition-opacity hover:opacity-70"
                >
                  {TODAY.opportunity.action} &rarr;
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </MacWindow>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Rail() {
  const items = ["Home", "Portfolio", "Search", "Tasks"];
  return (
    <nav className="hidden w-[150px] shrink-0 flex-col border-r border-foreground/[0.08] bg-foreground/[0.025] sm:flex">
      <div className="flex h-[42px] items-center gap-2 border-b border-foreground/[0.08] px-4">
        <span className="flex h-3.5 w-3.5 items-center justify-center border-[1.5px] border-accent">
          <span className="h-[3px] w-[3px] bg-accent" />
        </span>
        <span className="text-[12.5px] font-semibold text-foreground">Provenance</span>
      </div>
      <ul className="flex-1 space-y-px p-2">
        {items.map((label) => (
          <li key={label}>
            <span
              className={cn(
                "relative flex items-center rounded-[2px] py-1.5 pl-3 pr-2.5 text-[12.5px]",
                label === "Portfolio"
                  ? "bg-accent/[0.09] font-semibold text-foreground"
                  : "text-graphite"
              )}
            >
              {label === "Portfolio" && (
                <span className="absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 bg-accent" />
              )}
              {label}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-foreground/[0.08] px-4 py-3">
        <Avatar k="alex" />
        <span className="text-[11.5px] text-graphite">Alex Morgan</span>
      </div>
    </nav>
  );
}

function Tabs() {
  const tabs = ["Overview", "Memory", "Documents", "Tasks"];
  return (
    <div className="flex gap-5 border-b border-foreground/[0.08] px-5">
      {tabs.map((t) => (
        <span
          key={t}
          className={cn(
            "-mb-px border-b-2 py-2.5 text-[12.5px]",
            t === "Overview"
              ? "border-accent font-medium text-foreground"
              : "border-transparent text-graphite"
          )}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Avatar({ k, ring }: { k: string; ring?: boolean }) {
  const p = who(k);
  return (
    <span
      title={`${p.name} · ${p.dept}`}
      className={cn(
        "flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full bg-accent/[0.13] text-[8px] font-semibold text-accent",
        ring && "ring-[1.5px] ring-warm-white"
      )}
    >
      {p.initials}
    </span>
  );
}
