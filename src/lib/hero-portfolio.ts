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

/* Crop alignment lives in HeroAerial, next to the overlay box that has to
   match it exactly. Splitting the two across files is how they drift. */

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

/* EIGHT ASSETS, SIX CLASSES, ALL OF THEM WHERE THE IMAGE IS ACTUALLY VISIBLE.

   The point of the variety is that a portfolio is not a set of office towers.
   A grocery-anchored plaza and a logistics shed say "these are real assets
   somebody owns" in a way that six glass towers never would.

   Everything left of about 70% sits under the opaque part of the left fade,
   so nothing is marked there: an outline with no visible building under it
   reads as a bug, not as restraint. */
export const HERO_HIGHLIGHTS: Highlight[] = [
  { id: "civic", type: "institutional", x: 87.51, y: 19.31, w: 4.96, h: 8.52, hideBelowLg: true },
  { id: "residences", type: "residential", x: 72.23, y: 29.39, w: 3.92, h: 4.52, pin: 6 },
  { id: "office", type: "office", x: 77.08, y: 31.37, w: 6.08, h: 6.67, hideBelowLg: true },
  { id: "plaza", type: "retail", x: 71.93, y: 63.41, w: 3.96, h: 3.41, pin: 5 },
  { id: "tower", type: "mixed-use", x: 89.63, y: 59.40, w: 1.67, h: 2.52, pin: 10 },
  { id: "neighbourhood", type: "retail", x: 93.20, y: 63.17, w: 4.25, h: 3.41, hideBelowLg: true },
  { id: "logistics", type: "industrial", x: 83.67, y: 74.01, w: 2.67, h: 5.43, pin: 5 },
  { id: "highstreet", type: "retail", x: 76.59, y: 82.08, w: 6.08, h: 3.41 },
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
  { name: "Meridian Avenue", axis: "h", along: 33.07, at: 84, hideBelowLg: true },
  { name: "Foundry Road", axis: "h", along: 75.19, at: 70 },
  { name: "Market Street", axis: "v", along: 71.33, at: 45 },
  { name: "Harbour Street", axis: "v", along: 86.67, at: 55, hideBelowLg: true },
  { name: "Port Street", axis: "v", along: 92.56, at: 38, hideBelowLg: true },
];
