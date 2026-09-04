import Image from "next/image";
import {
  HERO_AERIAL_H,
  HERO_AERIAL_SRC,
  HERO_AERIAL_W,
  HERO_HIGHLIGHTS,
  HERO_STREETS,
  type Highlight,
  type StreetLabel,
} from "@/lib/hero-portfolio";

/* The aerial behind the thesis.

   FOUR LAYERS, SEPARATELY TUNABLE (§16): the photograph, the gradient that
   dissolves it into the canvas, the optional property highlights, and — in the
   hero itself — the copy. Nothing here knows what the headline says.

   IT IS A BACKGROUND ON DESKTOP AND A BLOCK ON MOBILE. Above 1024px this sits
   absolutely behind the copy and bleeds past the right edge. Below it, the
   same element falls back into the flow underneath the CTAs as a wide, shallow
   band, which is why it is rendered after the copy in the DOM.

   NO BOUNDARY, ANYWHERE. The photograph spans the full section and is shaped
   entirely by gradients, so it never resolves into a rectangle sitting on the
   page. That is the difference between an integrated hero and a SaaS
   split-screen with a picture in the right half. */

const CANVAS = "13, 15, 14"; // canvas DEFAULT #0D0F0E, as rgb parts

export function HeroAerial() {
  return (
    <div
      aria-hidden
      className={[
        // mobile: a shallow band under the copy, full-bleed
        "relative mt-12 h-[400px] w-full sm:h-[460px] md:h-[520px]",
        "[container-type:size]",
        // desktop: the whole section, behind everything
        "lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:h-auto",
      ].join(" ")}
    >
      {/* 1 · the photograph */}
      <div className="hero-aerial-drift absolute inset-0 overflow-hidden">
        <Image
          src={HERO_AERIAL_SRC}
          alt=""
          fill
          priority
          /* the LCP element on this page is the headline, not the image, but
             the image is above the fold and large: fetch it eagerly and let
             the browser pick the width it needs */
          sizes="100vw"
          quality={82}
          /* ALIGNMENT IS SHARED WITH CoverBox BELOW. Change one and you must
             change the other, or every outline slides off its building.

             Desktop centres: the layer is wider than the image's aspect, so
             cover scales by width and nothing is cropped horizontally at all.
             The taller phone band is the opposite, cropping about half the
             width away, and centring there would throw away the right side of
             the frame, which is exactly where the portfolio is. So it anchors
             right. */
          className="object-cover object-right lg:object-center"
        />
      </div>

      {/* 2 · the gradient that makes it part of the page.

             Desktop reads left to right: opaque canvas across the copy, then a
             long dissolve so no edge is findable. Mobile reads top to bottom,
             because there the band has to melt into the canvas above and
             below it instead. */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background: [
            `linear-gradient(90deg,
               rgb(${CANVAS}) 0%,
               rgb(${CANVAS}) 22%,
               rgba(${CANVAS}, 0.94) 36%,
               rgba(${CANVAS}, 0.88) 48%,
               rgba(${CANVAS}, 0.80) 58%,
               rgba(${CANVAS}, 0.68) 66%,
               rgba(${CANVAS}, 0.42) 76%,
               rgba(${CANVAS}, 0.10) 88%,
               rgba(${CANVAS}, 0) 100%)`,
            /* nav contrast (§14) */
            `linear-gradient(180deg,
               rgba(${CANVAS}, 0.82) 0px,
               rgba(${CANVAS}, 0.42) 96px,
               rgba(${CANVAS}, 0) 200px)`,
            /* and the floor, so the section ends in canvas rather than in a
               photograph that stops */
            `linear-gradient(0deg,
               rgb(${CANVAS}) 0%,
               rgba(${CANVAS}, 0.75) 6%,
               rgba(${CANVAS}, 0) 22%)`,
          ].join(","),
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background: [
            `linear-gradient(180deg,
               rgb(${CANVAS}) 0%,
               rgba(${CANVAS}, 0.62) 13%,
               rgba(${CANVAS}, 0.30) 34%,
               rgba(${CANVAS}, 0.30) 64%,
               rgba(${CANVAS}, 0.62) 87%,
               rgb(${CANVAS}) 100%)`,
            `linear-gradient(90deg,
               rgba(${CANVAS}, 0.5) 0%,
               rgba(${CANVAS}, 0) 26%,
               rgba(${CANVAS}, 0) 74%,
               rgba(${CANVAS}, 0.5) 100%)`,
          ].join(","),
        }}
      />

      {/* 4 · street names, ABOVE the gradient because they are the one thing
             here that has to stay legible rather than dissolve. They say the
             frame is a place with addresses, which is what makes the
             properties in it read as real assets. */}
      {/* 3 · the properties, and 4 · the street names.

             Both sit ABOVE the gradient. Under it they were dimmed by the
             same fade that dims the buildings, which sounds right and reads
             as smudged: a mark that says "this one is remembered" has to be
             legible or it is not saying anything. Every one of them is placed
             where the image is genuinely visible, so nothing floats. */}
      <CoverBox>
        <HighlightOverlay />
        <StreetOverlay />
      </CoverBox>
    </div>
  );
}

/* THE OVERLAYS HAVE TO BE CROPPED THE WAY THE IMAGE IS.

   Percentages inside the layer are not percentages inside the photograph: the
   photograph is object-fit: cover, so it overflows the layer on one axis and
   is clipped. This box reproduces that exactly — the same aspect, sized to the
   larger of the two fits, centred — so a coordinate written against the image
   lands on the same pixel of the image at every viewport. Container units make
   it pure CSS; nothing has to be measured at runtime. */
function CoverBox({ children }: { children: React.ReactNode }) {
  const ratio = `${HERO_AERIAL_W} / ${HERO_AERIAL_H}`;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 lg:left-1/2 lg:right-auto lg:-translate-x-1/2"
        style={{
          aspectRatio: ratio,
          width: `max(100cqw, calc(100cqh * ${HERO_AERIAL_W} / ${HERO_AERIAL_H}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* Percentage geometry only, so one set of coordinates serves every breakpoint
   and every crop. Renders nothing at all when no properties are configured. */
function HighlightOverlay() {
  if (HERO_HIGHLIGHTS.length === 0) return null;
  return (
    <div className="absolute inset-0">
      {HERO_HIGHLIGHTS.map((p, i) => (
        <HighlightShape key={p.id} property={p} index={i} />
      ))}
    </div>
  );
}

/* A hairline perimeter and, optionally, a short mast with a point of light on
   top. No fill beyond a barely-there wash, no glow, no label, no line to any
   other property: the mark says this one is remembered, and nothing else. */
function HighlightShape({
  property: p,
  index,
}: {
  property: Highlight;
  index: number;
}) {
  return (
    <div
      className={[
        "hero-highlight absolute",
        p.hideBelowLg ? "hidden lg:block" : "",
      ].join(" ")}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: `${p.w}%`,
        height: `${p.h}%`,
        /* they arrive one after another rather than all at once (§9) */
        animationDelay: `${900 + index * 260}ms`,
      }}
    >
      <div className="absolute inset-0 border border-vera-400/85 bg-vera-400/[0.09]" />
      {p.pin ? (
        <>
          <div
            className="absolute left-1/2 w-px -translate-x-1/2 bg-gradient-to-t from-vera-400/10 to-vera-400/70"
            style={{ bottom: "100%", height: `${(p.pin / p.h) * 100}%` }}
          />
          <div
            className="hero-highlight-pin absolute left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-vera-400"
            style={{ bottom: `calc(100% + ${(p.pin / p.h) * 100}% - 2px)` }}
          />
        </>
      ) : null}
    </div>
  );
}

/* Set along the road itself: horizontal streets read left to right, vertical
   ones turn with the street. Mono, uppercase, tracked out and dim — the
   register of something printed on a plan, not a map pin. */
function StreetOverlay() {
  if (HERO_STREETS.length === 0) return null;
  return (
    <div className="absolute inset-0">
      {HERO_STREETS.map((s) => (
        <StreetName key={s.name} street={s} />
      ))}
    </div>
  );
}

function StreetName({ street: s }: { street: StreetLabel }) {
  const vertical = s.axis === "v";
  return (
    <span
      className={[
        "hero-street absolute whitespace-nowrap font-mono text-[11px] uppercase",
        "tracking-[0.16em] text-paper-subtle/80 lg:text-[13px]",
        s.hideBelowLg ? "hidden lg:block" : "",
      ].join(" ")}
      style={{
        left: `${vertical ? s.along : s.at}%`,
        top: `${vertical ? s.at : s.along}%`,
        /* vertical-rl, not rotate(). A rotated span is still laid out as a
           wide box, so translate(-50%) shifted it by half the LENGTH of the
           name rather than half its line height and dropped it several
           percent to the left, straight through a highlighted property.
           In vertical writing mode the box is genuinely narrow and the
           centring is honest. */
        writingMode: vertical ? "vertical-rl" : undefined,
        transform: vertical ? "translateX(-50%)" : "translateY(-50%)",
      }}
    >
      {s.name}
    </span>
  );
}
