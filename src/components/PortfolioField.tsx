"use client";

import { SitePlan } from "./SitePlan";
import { HERO, PEOPLE, PORTFOLIO_FIELD } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type PersonKey = keyof typeof PEOPLE;

/**
 * The portfolio, as a still. Six properties, each with the work
 * currently attached to it and the people carrying it. Nothing to sit
 * through — one indicator pulses, and that is all the motion here.
 */
export function PortfolioField() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 sm:gap-x-7 lg:gap-x-8 lg:gap-y-9">
        {PORTFOLIO_FIELD.map((p, i) => (
          <div
            key={p.id}
            /* a slight vertical stagger so it reads as a field, not a table */
            className={cn(i % 3 === 1 && "sm:mt-7", i % 3 === 2 && "sm:mt-3")}
          >
            {/* the asset */}
            <div className="opacity-[0.85]">
              <SitePlan plan={p.plan} />
            </div>

            <p className="mt-2.5 text-[12.5px] font-medium leading-tight text-foreground">
              {p.name}
            </p>

            {/* what is live on it */}
            <ul className="mt-2 space-y-1.5">
              {p.work.map((w) => (
                <li key={w.item} className="flex items-start gap-2">
                  <span
                    className={cn(
                      "mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full",
                      "live" in w && w.live ? "animate-pulse bg-accent" : "bg-accent/45"
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
                      {w.team}
                    </span>
                    <span className="block text-[11.5px] leading-tight text-graphite">
                      {w.item}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* who is carrying it */}
            {/* set apart, not stacked — at this size an overlap just
                reads as one smudged shape */}
            <div className="mt-2.5 flex gap-1">
              {p.people.map((k) => {
                const person = PEOPLE[k as PersonKey];
                return (
                  <span
                    key={k}
                    title={`${person.name} · ${person.dept}`}
                    className="flex h-[19px] w-[19px] items-center justify-center rounded-full bg-accent/[0.13] text-[8px] font-semibold tracking-[0.02em] text-accent"
                  >
                    {person.initials}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 border-t border-foreground/10 pt-4 font-mono text-[9.5px] uppercase tracking-[0.15em] text-muted-foreground">
        {HERO.caption}
      </p>
    </div>
  );
}
