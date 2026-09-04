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

/* The aerial's own aspect, which the street overlay has to reproduce exactly.
   Its coordinates are percentages OF THE IMAGE, but the image is
   object-fit: cover and therefore cropped, so the overlay is laid out inside
   a box that replicates that crop. Get this wrong and every label drifts off
   its road the moment the viewport changes shape. */
export const HERO_AERIAL_W = 2400;
export const HERO_AERIAL_H = 1350;

/* Crop alignment lives in HeroAerial, next to the overlay box that has to
   match it exactly. Splitting the two across files is how they drift. */

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
  { name: "Harbour Street", along: 86.67, at: 56 },
  { name: "Port Street", along: 92.56, at: 34, hideBelowLg: true },
];
