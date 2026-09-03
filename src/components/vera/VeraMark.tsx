/* The selected Vera mark: Convergence.

   Three separate signals enter at three different heights, meet at one node,
   and leave as a single resolved path. Scattered context, convergence,
   understanding. The V lives in the negative space between the incoming
   strokes and is never drawn as a letter.

   32 unit grid, 3 unit stroke, square caps, currentColor throughout, so the
   mark inherits whatever surface it sits on and monochrome is the default
   rather than an export. See VERA_BRAND.md §11.

   USE IT SPARINGLY. Green already says Vera. The mark identifies the major
   Vera moments (the introduction, the narrator, the Ask Vera tab, the
   Proactive Insights reasoning header) and nothing else. It never sits beside
   every generated sentence, every evidence row or every green highlight. */

export function VeraMark({
  size = 16,
  className,
  /** give a title only where the mark carries meaning on its own. Repeated
      or decorative instances stay aria-hidden. */
  title,
}: {
  size?: number;
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
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="square">
        <path d="M4 7 L15 16" />
        <path d="M4 16 L15 16" />
        <path d="M4 25 L15 16" />
        <path d="M17 16 L28 16" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
    </svg>
  );
}
