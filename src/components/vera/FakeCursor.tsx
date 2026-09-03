"use client";

/* DESIGN.md §16.2 — a drawn arrow, 16x16, ink fill with a 1px mineral-000
   outline so it stays legible on any surface it crosses. Not a screenshot of an
   OS cursor, not a circle, not a dot. Clipped to the frame — it never escapes
   onto the page. */

export function FakeCursor({
  pos,
  pressed,
  ping,
}: {
  pos: { x: number; y: number } | null;
  pressed: boolean;
  ping: number;
}) {
  if (!pos) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-30"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* click ring: 20px, 1px vera-600, opacity .5 -> 0 over 320ms (§16.4) */}
      <span
        key={ping}
        className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-vera-600"
        style={{ animation: ping ? "vera-ping 320ms ease-out forwards" : "none" }}
      />
      <svg
        width="17"
        height="20"
        viewBox="0 0 17 20"
        className="block"
        style={{
          transform: `scale(${pressed ? 0.88 : 1})`,
          transformOrigin: "2px 2px",
          transition: "transform 90ms cubic-bezier(.33,0,.15,1)",
        }}
      >
        <path
          d="M1.5 1.2 L1.5 15.4 L5.2 12.0 L7.6 17.6 L10.2 16.5 L7.9 11.1 L12.8 10.9 Z"
          fill="#1E2422"
          stroke="#FBFCFB"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
