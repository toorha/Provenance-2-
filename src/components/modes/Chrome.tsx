"use client";

import type { ReactNode } from "react";
import { PEOPLE, TODAY } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type PersonKey = keyof typeof PEOPLE;
export const who = (k: string) => PEOPLE[k as PersonKey];

/** the parts of the window that never change between modes */
export function Shell({
  tab,
  children,
  aside,
}: {
  tab: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex min-h-[440px] text-[13px]">
      <Rail />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-foreground/[0.08] px-5 py-3.5">
          <div>
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
              {TODAY.property.name}
            </h3>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">
              {TODAY.property.address}
            </p>
          </div>
          {aside}
        </header>
        <Tabs active={tab} />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

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

function Tabs({ active }: { active: string }) {
  const tabs = ["Overview", "Memory", "Documents", "Tasks"];
  return (
    <div className="flex gap-5 border-b border-foreground/[0.08] px-5">
      {tabs.map((t) => (
        <span
          key={t}
          className={cn(
            "-mb-px border-b-2 py-2.5 text-[12.5px] transition-colors duration-300",
            t === active
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

export function Avatar({ k, ring }: { k: string; ring?: boolean }) {
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
