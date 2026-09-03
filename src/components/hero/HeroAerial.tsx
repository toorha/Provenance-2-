import Image from "next/image";
import {
  HERO_AERIAL_POSITION,
  HERO_AERIAL_SRC,
  HERO_HIGHLIGHTS,
  type Highlight,
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
        "relative mt-12 h-[250px] w-full sm:h-[300px] md:h-[340px]",
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
          className="object-cover"
          style={{ objectPosition: HERO_AERIAL_POSITION }}
        />
      </div>

      {/* 3 · property highlights, over the image and under the gradient so the
             fade dims them on the left exactly as it dims the buildings */}
      <HighlightOverlay />

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
               rgb(${CANVAS}) 38%,
               rgba(${CANVAS}, 0.96) 54%,
               rgba(${CANVAS}, 0.90) 64%,
               rgba(${CANVAS}, 0.62) 74%,
               rgba(${CANVAS}, 0.24) 88%,
               rgba(${CANVAS}, 0.05) 100%)`,
            /* nav contrast (§14) */
            `linear-gradient(180deg,
               rgba(${CANVAS}, 0.82) 0px,
               rgba(${CANVAS}, 0.42) 96px,
               rgba(${CANVAS}, 0) 200px)`,
            /* and the floor, so the section ends in canvas rather than in a
               photograph that stops */
            `linear-gradient(0deg,
               rgb(${CANVAS}) 0%,
               rgba(${CANVAS}, 0.72) 9%,
               rgba(${CANVAS}, 0) 30%)`,
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
      <div className="absolute inset-0 border border-vera-400/70 bg-vera-400/[0.07]" />
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
