import { clsx } from "clsx";

/* The Provenance mark.

   A P built from three stacked layers: a pale bowl behind, a mid tone across
   the middle, and the deep stem in front. The layers are the idea. Property
   history accumulates in strata, each one still visible through the ones laid
   over it, and the mark says that before a word of copy does.

   THIS IS THE MASTER BRAND MARK, which makes it the opposite of the Vera
   Convergence mark in every respect that matters. Vera is a single weight of
   line, active, and green. Provenance is solid, layered, still, and neutral.
   Vera acts; Provenance holds. Green never appears here.

   Fixed palette, not currentColor: the three tones ARE the mark, so it does
   not inherit its surface the way the Vera mark does. The `boxed` variant is
   the app icon, the same layers on the deep ground. */

const PALE = "#D8E5E0";
const MID = "#8CA3A8";
const DEEP = "#2F3D45";

export function ProvenanceMark({
  size = 24,
  boxed = false,
  onDark = false,
  className,
  title,
}: {
  size?: number;
  /** the app icon: layers on a deep rounded ground */
  boxed?: boolean;
  /** on the brand canvas the deep stem all but disappears against the ground,
      so it takes the pale tone and the whole mark stays readable */
  onDark?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}

      {boxed && <rect width="32" height="32" rx="8" fill={DEEP} />}

      <g transform={boxed ? "translate(6.5 6.5) scale(0.594)" : undefined}>
        {/* the bowl, furthest back and the lightest layer */}
        <rect x="12" y="4" width="16" height="16" rx="8" fill={PALE} />
        {/* the middle stratum, carried across both */}
        <rect
          x="7"
          y="9"
          width="15"
          height="11"
          rx="5.5"
          fill={MID}
          opacity="0.92"
        />
        {/* the stem, nearest and deepest */}
        <path
          d="M6 8a4 4 0 0 1 4-4h4v20a4 4 0 0 1-4 4H6V8Z"
          fill={boxed || onDark ? PALE : DEEP}
          opacity={boxed || onDark ? 0.96 : 1}
        />
      </g>
    </svg>
  );
}

/* The lockup: mark plus wordmark, at the one weight the wordmark is ever set
   in. The wordmark is the system face at 15px/600, never a drawn logotype,
   because a custom logotype here would compete with the mark for the only
   distinctive thing the identity has. */
export function ProvenanceLockup({
  className,
  markSize = 22,
  onDark = true,
}: {
  className?: string;
  markSize?: number;
  onDark?: boolean;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      {/* decorative here: the wordmark beside it already says the name,
          and titling both makes a screen reader announce it twice */}
      <ProvenanceMark size={markSize} onDark={onDark} />
      <span className="text-[15px] font-semibold tracking-[-0.01em]">
        Provenance
      </span>
    </span>
  );
}
