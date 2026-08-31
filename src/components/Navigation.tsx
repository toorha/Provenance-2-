"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Why Provenance", href: "#problem" },
  { label: "What it does today", href: "#today" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Memory", href: "#memory" },
  { label: "Vision", href: "#vision" },
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
              "border-accent"
            )}
          >
            <div className={cn("h-[7px] w-[7px]", "bg-accent")} />
          </div>
          <span
            className={cn(
              "text-[15px] font-semibold tracking-[-0.015em]",
              "text-foreground"
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
                "text-[13px] font-medium transition-colors duration-300",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#request-access"
            className={cn(
              "rounded-[2px] border px-4 py-[7px] text-[13px] font-medium transition-colors duration-300",
              "border-foreground/20 text-foreground hover:border-foreground/45 hover:bg-foreground/[0.04]"
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
                "bg-foreground",
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
            "border-border bg-background"
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block text-[16px] font-medium",
                "text-graphite"
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
              "border-border text-foreground"
            )}
          >
            Request early access
          </a>
        </div>
      )}
    </header>
  );
}
