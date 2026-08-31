import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A restrained desktop-application window. Presentation shell only:
 * traffic-light controls, a compact title bar, then the product UI.
 * Not a browser, not a macOS clone.
 */
export function MacWindow({
  title = "Provenance",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border border-foreground/12 bg-warm-white",
        "shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_2px_10px_rgba(19,20,19,0.06),0_36px_80px_-28px_rgba(19,20,19,0.42)]",
        className
      )}
    >
      <div className="relative flex h-[34px] items-center border-b border-foreground/10 bg-foreground/[0.035] px-3.5">
        <div className="flex items-center gap-[6px]">
          <span className="h-[9px] w-[9px] rounded-full bg-foreground/[0.18]" />
          <span className="h-[9px] w-[9px] rounded-full bg-foreground/[0.18]" />
          <span className="h-[9px] w-[9px] rounded-full bg-foreground/[0.18]" />
        </div>
        <span className="label-mono pointer-events-none absolute left-1/2 -translate-x-1/2 !text-[9.5px] text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

/**
 * Interior app layout: a thin sidebar, the main area, and an optional
 * context rail. Dividers, not cards.
 */
export function AppShell({
  nav,
  main,
  aside,
  asideAt = "xl",
  mainClassName,
}: {
  nav?: string;
  main: ReactNode;
  aside?: ReactNode;
  asideAt?: "lg" | "xl";
  mainClassName?: string;
}) {
  return (
    <div className="flex min-h-[214px] text-foreground">
      <Sidebar active={nav} />
      <div className={cn("flex-1 min-w-0", mainClassName)}>{main}</div>
      {aside && (
        <aside
          className={cn(
            "shrink-0 flex-col border-l border-border w-[168px]",
            asideAt === "lg" ? "hidden lg:flex" : "hidden xl:flex"
          )}
        >
          {aside}
        </aside>
      )}
    </div>
  );
}

const NAV = ["Portfolio", "Properties", "Activity", "Tasks"] as const;

function Sidebar({ active = "Properties" }: { active?: string }) {
  return (
    <nav className="hidden sm:flex w-[132px] shrink-0 flex-col border-r border-border bg-secondary/20">
      <div className="flex items-center gap-1.5 border-b border-border px-3 h-9">
        <span className="h-3 w-3 border-[1.5px] border-accent flex items-center justify-center">
          <span className="h-[3px] w-[3px] bg-accent" />
        </span>
        <span className="text-[11px] font-semibold text-foreground">Westmount</span>
      </div>
      <ul className="flex-1 px-2 py-2.5 space-y-0.5">
        {NAV.map((item) => (
          <li
            key={item}
            className={cn(
              "rounded-[4px] px-2 py-1.5 text-[12px] transition-colors",
              item === active
                ? "bg-accent/10 text-accent font-semibold"
                : "text-muted-foreground"
            )}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-2.5 flex items-center gap-2">
        <span className="h-5 w-5 rounded-full bg-accent/15 text-accent text-[9px] font-bold flex items-center justify-center">
          AM
        </span>
        <span className="text-[11px] text-muted-foreground">Alex Morgan</span>
      </div>
    </nav>
  );
}

/** section header used inside the main / aside areas */
export function PaneLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
      {children}
    </p>
  );
}
