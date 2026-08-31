"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "The problem", href: "#problem" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Property memory", href: "#memory" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHero = !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        onHero
          ? "bg-transparent"
          : "border-b border-foreground/10 bg-bone/85 backdrop-blur-md"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-[22px] w-[22px] items-center justify-center border",
              onHero ? "border-bone/35" : "border-accent"
            )}
          >
            <div className={cn("h-[7px] w-[7px]", onHero ? "bg-bone/85" : "bg-accent")} />
          </div>
          <span
            className={cn(
              "text-[15px] font-semibold tracking-[-0.015em]",
              onHero ? "text-bone" : "text-foreground"
            )}
          >
            Provenance
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "label-mono transition-colors duration-300",
                onHero
                  ? "text-bone/45 hover:text-bone"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#request-access"
            className={cn(
              "rounded-[2px] border px-4 py-[7px] text-[13px] font-medium transition-colors duration-300",
              onHero
                ? "border-bone/25 text-bone hover:border-bone/55 hover:bg-bone/[0.06]"
                : "border-foreground/20 text-foreground hover:border-foreground/45 hover:bg-foreground/[0.04]"
            )}
          >
            Request early access
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "block h-px w-5 transition-all",
                onHero ? "bg-warm-white" : "bg-foreground",
                i === 0 && mobileOpen && "translate-y-[3.5px] rotate-45",
                i === 1 && mobileOpen && "opacity-0",
                i === 2 && mobileOpen && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          ))}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className={cn(
            "md:hidden border-t px-6 py-6 space-y-4",
            onHero ? "border-warm-white/10 bg-dark-section" : "border-border bg-background"
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block text-[16px] font-medium",
                onHero ? "text-warm-white/80" : "text-slate"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#request-access"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "inline-block text-[13px] font-medium px-4 py-2.5 rounded-sm border",
              onHero ? "border-warm-white/25 text-warm-white" : "border-border"
            )}
          >
            Request early access
          </a>
        </div>
      )}
    </header>
  );
}
