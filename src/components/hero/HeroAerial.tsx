import Image from "next/image";
import {
  HERO_AERIAL_H,
  HERO_AERIAL_SRC,
  HERO_AERIAL_W,
  HERO_STREETS,
  type StreetLabel,
} from "@/lib/hero-portfolio";

/* The aerial behind the thesis.

   THREE LAYERS, SEPARATELY TUNABLE (§16): the photograph, the gradient that
   dissolves it into the canvas, and the street names. The copy lives in the
   hero itself, and nothing here knows what the headline says.

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
      {/* 1 · the photograph.

             THE DRIFT IS ON THE IMAGE, NOT ON THIS BOX. It used to scale the
             wrapper, which scales the wrapper's clip box with it: at 1.016 the
             photograph grew about three pixels past every edge while the
             gradient layers, which are unscaled siblings, stayed put. The
             result was a hairline of raw undimmed photograph along the bottom
             of the phone band, with a hard edge where the fade had already
             finished. Scaling the image inside a clip box that does not move
             keeps the fade and the photograph the same size. */}
      <div className="absolute inset-0 overflow-hidden">
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
          className="hero-aerial-drift object-cover object-right lg:object-center"
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
            /* Nav contrast (§14), but no heavier than it has to be. At 0.82
               falling to nothing over 200px this scrim was flattening the top
               third of the frame to plain black, so the city appeared to
               start well below the fold of its own image. It can be this
               light because the nav links sit on the left, where the
               left-to-right fade is already close to opaque, and the one
               control that does sit over open image is a solid pill that
               carries its own background. */
            `linear-gradient(180deg,
               rgba(${CANVAS}, 0.58) 0px,
               rgba(${CANVAS}, 0.24) 84px,
               rgba(${CANVAS}, 0) 150px)`,
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

      {/* 3 · the street names, ABOVE the gradient because they are the one
             thing here that has to stay legible rather than dissolve. They
             say the frame is a place with addresses, which is what makes the
             buildings in it read as real assets. */}
      <CoverBox>
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
  return (
    <span
      className={[
        "hero-street absolute whitespace-nowrap font-mono text-[11px] uppercase",
        "tracking-[0.16em] text-paper-subtle/80 lg:text-[13px]",
        s.hideBelowLg ? "hidden lg:block" : "",
      ].join(" ")}
      style={{
        left: `${s.along}%`,
        top: `${s.at}%`,
        /* vertical-rl, not rotate(). A rotated span is still laid out as a
           wide box, so translate(-50%) shifted it by half the LENGTH of the
           name rather than half its line height and dropped it several
           percent to the left, straight through a marked property. In
           vertical writing mode the box is genuinely narrow and the centring
           is honest. */
        writingMode: "vertical-rl",
        transform: "translateX(-50%)",
      }}
    >
      {s.name}
    </span>
  );
}
