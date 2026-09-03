import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * The mark: a P built as a piece of architecture. A chamfered column
 * carries a solid bowl, and a door swings out of the block in
 * perspective. The block takes currentColor so the mark can sit on the
 * canvas, on a dark band, or inside the product chrome unchanged.
 * ------------------------------------------------------------------ */
export function ProvenanceMark({
  className,
  door = "#AEB4B0",
}: {
  className?: string;
  door?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 246"
      className={className}
      fill="none"
      role="img"
      aria-label="Provenance"
    >
      <path
        d="M48 2 L135 2 A85 85 0 0 1 135 172 L48 172 L48 245 L2 232 L2 63 Z"
        fill="currentColor"
      />
      <path
        d="M57 63 L115 83 L115 227 L57 243 Z"
        fill={door}
        stroke={door}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* mark, rule, wordmark — the lockup used in the header and the footer */
export function ProvenanceLogo({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <ProvenanceMark
        className={cn("h-[26px] w-auto text-accent", markClassName)}
      />
      <span aria-hidden="true" className="h-[20px] w-px bg-border-dark" />
      <span
        className={cn(
          "text-[15px] font-semibold uppercase tracking-[0.18em] text-foreground",
          wordClassName,
        )}
      >
        Provenance
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * The Vera mark: a V drawn as four strokes rather than two, the inner
 * left one in spruce. The doubling is what keeps it from reading as a
 * plain letter, and it is the one place the accent appears at brand
 * scale. Traced from the supplied logo.
 * ------------------------------------------------------------------ */
export function VeraMark({
  className,
  accent = "hsl(var(--accent))",
}: {
  className?: string;
  accent?: string;
}) {
  return (
    <svg
      viewBox="0 0 132 136"
      className={className}
      fill="none"
      strokeLinecap="round"
      role="img"
      aria-label="Vera"
    >
      {/* the left arm, and its spruce companion converging on the vertex */}
      <path d="M11 11 L63 125" stroke="currentColor" strokeWidth="13" />
      <path d="M34 13 L66 124" stroke={accent} strokeWidth="10" />
      {/* the right arm, and the lighter stroke that shadows it */}
      <path d="M70 125 L117 11" stroke="currentColor" strokeWidth="13" />
      <path d="M88 90 L124 11" stroke="currentColor" strokeWidth="9" />
    </svg>
  );
}

/* mark and wordmark, for anywhere Vera is named rather than acting */
export function VeraLogo({
  className,
  markClassName,
  wordClassName,
}: {
  className?: string;
  markClassName?: string;
  wordClassName?: string;
}) {
  return (
    <span className={cn("flex items-baseline gap-2.5", className)}>
      <VeraMark
        className={cn(
          "h-[22px] w-auto shrink-0 text-foreground",
          markClassName,
        )}
      />
      <span
        className={cn(
          "font-display text-[26px] leading-none tracking-[-0.015em] text-foreground",
          wordClassName,
        )}
      >
        Vera
      </span>
    </span>
  );
}
