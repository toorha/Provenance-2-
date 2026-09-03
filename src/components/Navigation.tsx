"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { ProvenanceLockup } from "@/components/ProvenanceMark";

/* DESIGN.md §9.
   60px. Sans at ui 14px/500. Transparent over the hero, solid canvas with a
   hairline after 24px of scroll. No backdrop blur: blur is on the banned list
   and reads generic.

   THE NAV IS THE SITE ARCHITECTURE, not a table of contents for one long
   page. "Product" was the wrong label because the product identity is Vera,
   and "The memory layer" was too abstract to be a primary destination. What
   replaces them says where a visitor can actually go: the product, the
   functions it serves, the argument, and the questions.

   Four destinations and one action. Every one of them resolves: #product and
   #faq and #access are real sections on this page, /thesis is a real route.

   Below 768px the links collapse to a full-height overlay panel, not a
   dropdown (§9.2). */

const LINKS = [
  { href: "#product", label: "Meet Vera" },
  { href: "/thesis", label: "Thesis" },
  { href: "#faq", label: "FAQ" },
];

export function Navigation() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock the page while the overlay is open, and close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 h-[60px]",
          "transition-[background-color,border-color] duration-base ease-state",
          solid || open
            ? "border-b border-[rgba(243,244,240,0.10)] bg-canvas"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="track flex h-full items-center gap-8">
          <Link
            href="/"
            className="-my-2 inline-flex min-h-[44px] items-center text-paper"
          >
            <ProvenanceLockup markSize={22} />
          </Link>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group relative inline-block py-0.5 text-ui text-paper-muted transition-colors duration-instant before:absolute before:inset-x-0 before:-top-[11px] before:-bottom-[11px] before:content-[''] hover:text-paper"
                >
                  {l.label}
                  {/* underline grows from 0 to full width, left origin (§9.2) */}
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-paper transition-transform duration-quick ease-state group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <Button href="#access" variant="primary" size="md">
              Request access
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-overlay"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-control text-paper md:hidden"
            >
              {/* 1.5px stroke, square caps: icons are structural (§14) */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                {open ? (
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                ) : (
                  <path
                    d="M3 6h14M3 13h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* full-height overlay panel, not a dropdown */}
      <div
        id="nav-overlay"
        hidden={!open}
        className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-canvas md:hidden"
      >
        <div className="track pb-16 pt-10">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[rgba(243,244,240,0.10)] py-5 text-heading-2 text-paper"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Button href="#access" variant="primary" className="mt-8">
            Request access
          </Button>
        </div>
      </div>
    </>
  );
}
