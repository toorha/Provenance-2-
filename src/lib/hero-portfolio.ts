/* The hero's aerial layer, and everything tunable about it.

   Kept out of the JSX on purpose (§17 of the hero brief): the visual has to be
   adjustable without anyone opening the component that owns the headline. */

/* Sits in /public. Supply a wide, dark, high-altitude aerial of mixed city
   fabric: retail, mixed-use, residential, office and industrial in one frame.
   Landscape, at least 2400px wide, shot or rendered at dusk so the existing
   canvas has something to fade into.

   If the file is absent the hero degrades to the flat black canvas it was
   before, with no broken-image artefact, because the layer carries an empty
   alt and is marked decorative. */
export const HERO_AERIAL_SRC = "/hero/portfolio-aerial.jpg";

/* Which part of the frame survives the crop. The left third of the image sits
   under an opaque gradient on desktop, so bias toward the right where the
   highlighted assets should be. */
export const HERO_AERIAL_POSITION = "62% 45%";

export type HighlightType =
  | "retail"
  | "mixed-use"
  | "residential"
  | "office"
  | "industrial"
  | "institutional";

/* One highlighted property. All four geometry values are PERCENTAGES of the
   image layer, so the overlay scales with any crop and needs no recalculation
   per breakpoint.

   `hideBelowLg` drops a property from the mobile crop, where only two to four
   should survive. */
export type Highlight = {
  id: string;
  type: HighlightType;
  /** left edge, % */ x: number;
  /** top edge, % */ y: number;
  /** % of layer width */ w: number;
  /** % of layer height */ h: number;
  /** the vertical marker's height, % of layer height. 0 for no marker. */
  pin?: number;
  hideBelowLg?: boolean;
};

/* EMPTY BY DESIGN.

   The supplied aerial already carries its property outlines and markers, so
   drawing a second set on top would double them. This array is the path for a
   CLEAN aerial: fill it in and the overlay appears, with no other change.

   Five to seven entries, mixed types, always including a grocery-anchored
   retail plaza and a mixed-use or residential tower. Read the coordinates off
   the image as percentages, e.g.

     { id: "plaza", type: "retail", x: 58, y: 71, w: 15, h: 11, pin: 9 },
     { id: "tower", type: "mixed-use", x: 74, y: 38, w: 7, h: 13, pin: 14 },
*/
export const HERO_HIGHLIGHTS: Highlight[] = [];
