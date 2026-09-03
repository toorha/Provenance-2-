/* The hero's aerial layer, and everything tunable about it.

   Kept out of the JSX on purpose (§17 of the hero brief): the visual has to be
   adjustable without anyone opening the component that owns the headline.

   THE COORDINATES BELONG TO THE IMAGE. Every number here is a percentage of
   the aerial, not of the viewport, so one set of values survives every
   breakpoint and every crop. They were measured off the asset, not guessed —
   replace the image and they all have to be re-measured. */

/* Sits in /public. A wide, dark, high-altitude aerial of mixed city fabric:
   retail, mixed-use, residential, office and industrial in one frame.

   If the file is absent the hero degrades to the flat black canvas it was
   before, with no broken-image artefact, because the layer carries an empty
   alt and is marked decorative. */
export const HERO_AERIAL_SRC = "/hero/portfolio-aerial.png";

/* The aerial's own aspect, which the overlays have to reproduce exactly.
   The highlight and street coordinates are percentages OF THE IMAGE, but the
   image is object-fit: cover and therefore cropped, so the overlays are laid
   out inside a box that replicates that crop. Get this wrong and every
   outline drifts off its building the moment the viewport changes shape. */
export const HERO_AERIAL_W = 2400;
export const HERO_AERIAL_H = 1350;

/* Dead centre, and it has to stay dead centre: it is the one object-position
   the overlay box can reproduce in CSS without measuring anything at runtime.
   The crop still lands well — the box is wider than the image above 1024px,
   so nothing is cut horizontally there, and the mobile band keeps the middle
   88% of the width, which is where the highlighted assets are. */
export const HERO_AERIAL_POSITION = "50% 50%";

export type HighlightType =
  | "retail"
  | "mixed-use"
  | "residential"
  | "office"
  | "industrial"
  | "institutional";

/* One highlighted property. `pin` is the mast height as a percentage of the
   layer, and 0 or absent means no marker. `hideBelowLg` drops a property from
   the mobile crop, where only three or four should survive. */
export type Highlight = {
  id: string;
  type: HighlightType;
  /** left edge, % */ x: number;
  /** top edge, % */ y: number;
  /** % of layer width */ w: number;
  /** % of layer height */ h: number;
  pin?: number;
  hideBelowLg?: boolean;
};

/* SIX ASSETS, FIVE CLASSES, ALL OF THEM WHERE THE IMAGE IS ACTUALLY VISIBLE.

   The point of the variety is that a portfolio is not a set of office towers.
   A grocery-anchored plaza and a logistics shed say "these are real assets
   somebody owns" in a way that six glass towers never would.

   Everything left of about 70% sits under the opaque part of the left fade,
   so nothing is marked there: an outline with no visible building under it
   reads as a bug, not as restraint. */
export const HERO_HIGHLIGHTS: Highlight[] = [
  { id: "residences", type: "residential", x: 74.34, y: 24.83, w: 5.33, h: 15.85, pin: 7, hideBelowLg: true },
  { id: "office", type: "office", x: 74.47, y: 42.80, w: 5.42, h: 3.04 },
  { id: "plaza", type: "retail", x: 74.06, y: 54.02, w: 5.42, h: 5.60, pin: 6 },
  { id: "tower", type: "mixed-use", x: 84.01, y: 57.03, w: 2.72, h: 3.87, pin: 11 },
  { id: "neighbourhood", type: "retail", x: 89.18, y: 54.03, w: 9.21, h: 5.60, hideBelowLg: true },
  { id: "logistics", type: "industrial", x: 80.92, y: 69.75, w: 3.17, h: 7.85, pin: 6 },
];

/* Street names, so the frame reads as a place rather than as a texture.

   `along` is the road's own position: for a horizontal street it is the y of
   the centreline, for a vertical one the x. `at` is where along that road the
   label sits, chosen to miss the highlighted properties. */
export type StreetLabel = {
  name: string;
  axis: "h" | "v";
  /** % — y for a horizontal street, x for a vertical one */ along: number;
  /** % — position along the street */ at: number;
  hideBelowLg?: boolean;
};

export const HERO_STREETS: StreetLabel[] = [
  { name: "Meridian Avenue", axis: "h", along: 43.22, at: 84, hideBelowLg: true },
  { name: "Foundry Road", axis: "h", along: 68.85, at: 71 },
  { name: "Canal Road", axis: "h", along: 82.67, at: 76, hideBelowLg: true },
  /* 62, not 30: at 30 the label ran down the side of the residences block and
     clipped its outline. Vertical names need a clear stretch of road. */
  { name: "Market Street", axis: "v", along: 80.08, at: 62, hideBelowLg: true },
  { name: "Port Street", axis: "v", along: 88.40, at: 26 },
];
