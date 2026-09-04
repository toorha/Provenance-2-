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

/* One marked property. x/y/w/h are the roof, which the marker hangs over;
   `hideBelowLg` drops a property from the mobile crop, where only three or
   four survive. */
export type Highlight = {
  id: string;
  type: HighlightType;
  /** left edge, % */ x: number;
  /** top edge, % */ y: number;
  /** % of image width */ w: number;
  /** % of image height */ h: number;
  hideBelowLg?: boolean;
};

/* FIVE MARKED ASSETS, FIVE CLASSES.

   The point of the variety is that a portfolio is not a set of office towers.
   A grocery-anchored plaza and a logistics shed say "these are real assets
   somebody owns" in a way five glass towers never would.

   Nothing is marked left of about 70%, because the left fade is still close
   to opaque there and a marker with no visible building under it reads as a
   bug rather than as restraint. */
export const HERO_HIGHLIGHTS: Highlight[] = [
  { id: "residences", type: "residential", x: 72.25, y: 28.11, w: 3.92, h: 4.52 },
  { id: "office", type: "office", x: 77.09, y: 29.65, w: 6.08, h: 6.67, hideBelowLg: true },
  { id: "tower", type: "mixed-use", x: 89.94, y: 53.24, w: 1.67, h: 2.52 },
  { id: "plaza", type: "retail", x: 71.99, y: 62.25, w: 3.96, h: 3.41 },
  { id: "logistics", type: "industrial", x: 83.71, y: 73.11, w: 2.67, h: 3.60 },
];

/* Street names, so the frame reads as a place rather than as a texture.

   VERTICAL STREETS ONLY, AND THAT IS NOT A STYLE CHOICE.

   Buildings lean up the frame, so anything sitting below a horizontal road
   sweeps straight over it: label one of those and you have named a road that
   is not there. The vertical channels survive, because the same lean only
   crosses them at a shallow angle, so those are the ones that get names.

   `along` is the road's own x. `at` is where down that road the label sits,
   chosen to clear the markers. */
export type StreetLabel = {
  name: string;
  /** % — the road's x position */ along: number;
  /** % — position down the street */ at: number;
  hideBelowLg?: boolean;
};

/* Every `at` below was picked by scanning its road for a stretch the
   buildings have not swept over, then checking it clears the markers. Move
   one by eye and it will end up naming a road nobody can see. */
export const HERO_STREETS: StreetLabel[] = [
  { name: "Market Street", along: 71.33, at: 40 },
  /* for anyone who actually reads the map */
  { name: "Memory Lane", along: 82.94, at: 56, hideBelowLg: true },
  { name: "Harbour Street", along: 86.67, at: 44 },
  { name: "Port Street", along: 92.56, at: 34, hideBelowLg: true },
];
