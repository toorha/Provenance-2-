import Link from "next/link";
import { clsx } from "clsx";

/* DESIGN.md §8.
   Buttons respond with colour and nothing else — no scale, no lift, no shadow
   on any state. That restraint is what makes them read as software. */

type Variant = "primary" | "vera" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

/* On a dark canvas the primary inverts: warm white fill, near-black label.
   17.4:1, and it keeps green reserved for Vera product actions rather than
   spending the accent on a generic CTA (DESIGN.md §8.4). */
const VARIANT: Record<Variant, string> = {
  primary: "bg-paper text-canvas hover:bg-white",
  /* Vera green is for Vera product actions only, never a generic CTA */
  vera: "bg-vera-500 text-paper hover:bg-vera-600",
  secondary:
    "bg-transparent text-paper border border-[rgba(243,244,240,0.22)] hover:border-[rgba(243,244,240,0.42)] hover:bg-[rgba(243,244,240,0.05)]",
  ghost: "bg-transparent text-paper-muted hover:text-paper",
  /* on a light product surface, the primary flips back to ink */
  inverse: "bg-ink text-mineral-50 hover:bg-ink-deep",
};

const SIZE: Record<Size, string> = {
  sm: "h-8 px-3 text-ui-sm",
  md: "h-[38px] px-4 text-ui",
  lg: "h-11 px-5 text-button",
};

export function Button({
  href,
  variant = "primary",
  size = "lg",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center rounded-control",
        "transition-colors duration-instant ease-state",
        // touch targets hold 44px regardless of declared size (§17.2)
        "max-lg:h-11",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
