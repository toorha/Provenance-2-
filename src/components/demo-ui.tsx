"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PaneLabel } from "./MacWindow";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Fades/slides a block in when `show` becomes true. Stays mounted so
 *  nothing in the window jumps. */
export function Reveal({
  show,
  children,
  className,
  y = 8,
  delay = 0,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : y }}
      transition={{ duration: 0.45, ease, delay: show ? delay : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type Field = { label: string; value: string; tone?: string };

/** the label / value list that every extraction produces */
export function ExtractFields({
  show,
  fields,
  heading = "Captured by Provenance",
}: {
  show: boolean;
  fields: readonly Field[];
  heading?: string;
}) {
  return (
    <Reveal show={show}>
      <PaneLabel>{heading}</PaneLabel>
      <dl className="mt-2 divide-y divide-border/70">
        {fields.map((f, i) => (
          <motion.div
            key={f.label}
            initial={false}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.35, ease, delay: show ? i * 0.08 : 0 }}
            className="flex items-baseline gap-3 py-[5px]"
          >
            <dt className="w-[62px] shrink-0 label-mono !text-[9.5px] !tracking-[0.12em] text-muted-foreground">
              {f.label}
            </dt>
            <dd
              className={cn(
                "text-[12.5px] leading-snug",
                f.tone === "accent" ? "text-accent font-semibold" : "text-foreground"
              )}
            >
              {f.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </Reveal>
  );
}

/** an email in the main area, with one clause that highlights */
export function EmailRow({
  show,
  from,
  meta,
  subject,
  lead,
  highlight,
  tail,
  highlightOn,
}: {
  show: boolean;
  from: string;
  meta: string;
  subject: string;
  lead: string;
  highlight: string;
  tail: string;
  highlightOn: boolean;
}) {
  return (
    <Reveal show={show}>
      <div className="border-b border-border pb-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[12px] font-semibold text-foreground truncate">
            {from}
          </span>
          <span className="text-[10.5px] text-muted-light shrink-0">{meta}</span>
        </div>
        <p className="mt-0.5 text-[12.5px] font-medium text-foreground">{subject}</p>
        <p className="mt-1 text-[12px] leading-[1.5] text-slate">
          {lead}
          <mark
            className={cn(
              "rounded-[2px] px-0.5 transition-colors duration-500",
              highlightOn ? "bg-accent/15 text-accent" : "bg-transparent text-slate"
            )}
          >
            {highlight}
          </mark>
          {tail}
        </p>
      </div>
    </Reveal>
  );
}

/** the small "✓ Property memory updated" chip */
export function StatusChip({ show, text }: { show: boolean; text: string }) {
  return (
    <Reveal show={show}>
      <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-accent/[0.07] px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-accent">
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
          <path
            d="M2.5 6.2 5 8.5 9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {text}
      </span>
    </Reveal>
  );
}

/** the resting state before a demo's sequence starts */
export function Watching({
  label = "Watching for new records",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[11.5px] text-muted-foreground",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent/60 animate-pulse" />
      {label}
    </p>
  );
}

/** one line on a compact timeline */
export function TimelineLine({
  year,
  label,
  fresh,
}: {
  year: string;
  label: string;
  fresh?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 translate-y-[3px] rounded-full",
          fresh ? "bg-accent ring-[3px] ring-accent/15" : "bg-foreground/30"
        )}
      />
      <span className="font-display text-[12px] text-foreground tabular-nums">{year}</span>
      <span className="text-[11px] text-slate leading-tight">{label}</span>
    </div>
  );
}
