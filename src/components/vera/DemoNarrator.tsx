"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { VeraMark } from "./VeraMark";

/* The Vera annotation system.

   Not a tooltip, not a speech bubble, not a demo overlay. A branded editorial
   annotation that belongs to Vera: the mark and the name on one quiet row,
   the message underneath in white on solid Vera green.

   IT NEVER TRAVELS. A box gliding across the frame is the thing the eye
   watches, which is exactly backwards: the product is the subject. Each
   message fades out completely, is repositioned while invisible, and the next
   one fades in already in place. There is no transition on transform anywhere
   in this component, which is what guarantees it.

   TIMING IS STORY BEATS, NOT WORD COUNT. A cue with no holdMs stays mounted
   until the demo reaches the next meaningful visual state and replaces it, so
   the product keeps moving underneath a cue that is still on screen. minMs is
   a floor: a beat that arrives early cannot yank a cue off before it has been
   read. holdMs is only for cues the visitor triggered, where there is no
   following beat to wait for.

   Smaller box, longer relevant presence. That trade is the whole point.

   Desktop only. On narrow layouts a floating box would sit on top of the very
   content it is describing, so the caller renders NarratorCaption instead. */

export type NarratorAnchor =
  /** dead centre of the body. Only for a deliberately blank panel, where
      there is no active region to sit next to. */
  | "center"
  | "top-left"
  | "top-right"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-right";

export type NarratorCue = {
  /** changing the id runs the fade out, reposition, fade in cycle */
  id: string;
  /** an optional headline above the message. Large variant only. */
  title?: string;
  text: string;
  anchor: NarratorAnchor;
  /** override the measure. Default 320px, 420px max for the long Ask line. */
  maxW?: number;
  /** the floor. Nothing may replace this cue before it has been visible this
      long, so an early story beat cannot cut a message short. */
  minMs?: number;
  /** self-hide after this long. Omit for event-driven cues, which stay until
      the demo replaces or clears them. */
  holdMs?: number;
  /** the larger variant. Only for a cue that has the panel to itself: with
      nothing behind it, the annotation is the content and should be read at
      the size of a statement rather than a footnote. */
  large?: boolean;
};

/* Frame padding, and the fallback height of the two chrome bars.

   The real top boundary is measured: anything inside the frame marked
   data-narrator-avoid (the mode tabs, the Ask Vera input and the role
   selector above it) pushes the top anchors below itself. That is why no
   message carries a pixel offset of its own. */
const PAD = 16;
/* Bottom anchors sit further off the edge than side anchors do. Pinned at
   the same 16px the box read as stuck to the frame rather than placed in the
   space below the content, and it crowded the rounded corner. */
const BOTTOM_PAD = 52;
const CHROME = 92;

const FADE = 200;
/* the beat of nothing between two annotations. Without it the swap reads as a
   text change in one persistent box rather than as two separate cards. */
const GAP = 180;

export function DemoNarrator({
  cue,
  frameRef,
  onCueLeaving,
}: {
  cue: NarratorCue | null;
  frameRef: React.RefObject<HTMLDivElement | null>;
  /* Fires the instant a cue begins fading out. A blank intro panel that
     schedules its own reveal on a parallel timer desynchronises the moment
     the narrator is delayed for any reason, and the box ends up sitting on
     content it was supposed to precede. Anything that has to move with the
     annotation listens to this instead. */
  onCueLeaving?: (id: string) => void;
}) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  /* what is currently painted, which lags `cue` by one fade out */
  const [painted, setPainted] = useState<NarratorCue | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [visible, setVisible] = useState(false);

  const leavingRef = useRef(onCueLeaving);
  useEffect(() => {
    leavingRef.current = onCueLeaving;
  }, [onCueLeaving]);

  const visibleRef = useRef(false);
  const shownAtRef = useRef(0);
  useEffect(() => {
    visibleRef.current = visible;
    if (visible) shownAtRef.current = performance.now();
  }, [visible]);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  /* A new cue never overwrites a visible one in place, and never before that
     one has met its floor. It waits out the remainder, then the fade and the
     gap, and only then does the box move and change its words. */
  useEffect(() => {
    clearTimers();
    const at = (ms: number, fn: () => void) => {
      timers.current.push(setTimeout(fn, ms));
    };

    const floorLeft = visibleRef.current
      ? Math.max(
          0,
          (painted?.minMs ?? 0) - (performance.now() - shownAtRef.current),
        )
      : 0;

    const leaving = painted?.id;
    if (!cue) {
      at(floorLeft, () => {
        setVisible(false);
        if (leaving) leavingRef.current?.(leaving);
      });
      at(floorLeft + FADE, () => setPainted(null));
      return clearTimers;
    }
    if (visibleRef.current) {
      at(floorLeft, () => {
        setVisible(false);
        if (leaving) leavingRef.current?.(leaving);
      });
      at(floorLeft + FADE + GAP, () => {
        setPos(null);
        setPainted(cue);
      });
    } else {
      setPos(null);
      setPainted(cue);
    }
    return clearTimers;
    // painted is read for its floor only; re-running on it would restart the swap
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cue?.id, cue, clearTimers]);

  /* Measured, not guessed: the box is placed from its own size and the
     frame's, so a longer line never hangs off the right edge. This runs while
     the box is still invisible, which is the whole trick. */
  useLayoutEffect(() => {
    if (!painted) return;
    const f = frameRef.current?.getBoundingClientRect();
    const b = boxRef.current?.getBoundingClientRect();
    if (!f || !b) return;

    /* Rendered pixels throughout. The annotation overlay is a sibling of the
       scaled frame rather than a child, so rects are already in the same
       space as the transform below and no conversion belongs here. */
    const frameW = f.width;
    const frameH = f.height;
    const boxW = b.width;
    const boxH = b.height;

    let top = CHROME;
    frameRef.current
      ?.querySelectorAll<HTMLElement>("[data-narrator-avoid]")
      .forEach((el) => {
        const r = el.getBoundingClientRect();
        top = Math.max(top, r.bottom - f.top);
      });

    const x =
      painted.anchor === "center"
        ? (frameW - boxW) / 2
        : painted.anchor.endsWith("right")
          ? frameW - boxW - PAD
          : PAD;
    const y = painted.anchor.startsWith("top")
      ? top + PAD
      : painted.anchor.startsWith("bottom")
        ? frameH - boxH - BOTTOM_PAD
        : painted.anchor === "center"
          ? CHROME + (frameH - CHROME - boxH) / 2
          : top + (frameH - top) / 2 - boxH / 2;
    setPos({ x: Math.round(x), y: Math.round(y) });
  }, [painted, frameRef]);

  /* in place and invisible, so now it can appear. A cue with no holdMs stays
     mounted until the story replaces it. */
  useEffect(() => {
    if (!painted || !pos || visibleRef.current) return;
    const t: ReturnType<typeof setTimeout>[] = [];
    t.push(setTimeout(() => setVisible(true), 20));
    if (painted.holdMs !== undefined) {
      t.push(
        setTimeout(() => {
          setVisible(false);
          leavingRef.current?.(painted.id);
        }, 20 + FADE + painted.holdMs),
      );
    }
    return () => t.forEach(clearTimeout);
  }, [painted, pos]);

  return (
    <div
      ref={boxRef}
      data-narrator
      data-anchor={painted?.anchor}
      aria-hidden
      className={clsx(
        "pointer-events-none absolute left-0 top-0",
        "rounded-control bg-vera-600",
        painted?.large ? "px-5 py-4" : "px-3 py-2",
        visible && pos ? "opacity-100" : "opacity-0",
      )}
      style={{
        maxWidth: painted?.maxW ?? 320,
        transform: pos
          ? `translate3d(${pos.x}px, ${pos.y}px, 0)`
          : "translate3d(0, -9999px, 0)",
        /* opacity only. Adding transform here would make it glide. */
        transitionProperty: "opacity",
        transitionDuration: `${FADE}ms`,
        transitionTimingFunction: "cubic-bezier(.40, 0, .20, 1)",
      }}
    >
      {/* the identity row. Present enough to own the annotation, quiet enough
          that the message is still what gets read. */}
      <div className="flex items-center gap-2 text-white/80">
        <VeraMark size={painted?.large ? 18 : 14} />
        <span
          className={clsx(
            "font-product font-semibold uppercase tracking-[0.08em]",
            painted?.large ? "text-[12px]" : "text-[11px]",
          )}
        >
          Vera
        </span>
      </div>
      {painted?.title && (
        <p className="mt-2 font-product text-[21px] font-semibold leading-[1.3] tracking-[-0.012em] text-white">
          {painted.title}
        </p>
      )}
      <p
        className={clsx(
          "font-product text-white",
          painted?.large
            ? painted.title
              ? "mt-2 text-[15px] font-medium leading-[1.5] text-white/90"
              : "mt-2 text-[21px] font-semibold leading-[1.3] tracking-[-0.012em]"
            : "mt-1 text-[13.5px] font-medium leading-[1.42]",
        )}
      >
        {painted?.text}
      </p>
    </div>
  );
}

/* The narrow-layout fallback. Same line and the same identity, no floating
   box, and a reserved height so the frame below never shifts as cues come and
   go. */
export function NarratorCaption({ cue }: { cue: NarratorCue | null }) {
  return (
    <p
      data-narrator-caption
      className={clsx(
        "flex min-h-6 items-center gap-1.5 text-[13px] font-medium text-vera-400",
        "transition-opacity duration-base ease-state lg:hidden",
        cue ? "opacity-100" : "opacity-0",
      )}
    >
      <VeraMark size={13} className="shrink-0" />
      {cue?.text}
    </p>
  );
}
