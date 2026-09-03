import type { NarratorCue } from "@/components/vera/DemoNarrator";

/* Narrator copy and pacing.

   COPY RULES: plain English, benefit led, no hype, no AI jargon, no em
   dashes. Each line says why the beat matters. None of them describe a click.

   PACING IS STORY BEATS, NOT WORD COUNT. Two kinds of cue:

     EVENT DRIVEN   no holdMs. The cue stays mounted while the product keeps
                    moving underneath it, and leaves only when the demo
                    reaches the next focal point and replaces it. minMs is the
                    floor, so an early beat cannot cut the message short.

     TIMED          holdMs set. Only for cues the visitor triggered
                    themselves, where there is no following beat to wait for.

   The old engine hid every cue on a word-count timer, which meant the good
   lines vanished while the thing they explained was still happening.

   ANCHORS ARE MEASURED, NOT CHOSEN BY FEEL. Every anchor below was checked
   against the real painted extent of the text and controls in that state, and
   the one nearest the active region without covering it wins. The frame is
   dense, so the safe anchor is often not the obvious one. */

export const TRACK_CUES = {
  /* Event driven. Set when the flagship rows brighten, and cleared when
     Vera's read becomes the focal point, so it is still on screen while the
     row is selected and the panel opens. Floor 3500ms puts it in the 3.5 to
     4.5s band whatever the choreography does.

     Left is the list side, and the space under five rows is the one genuinely
     empty region of the open frame. */
  rows: {
    id: "track-rows",
    text: "Vera connects old property history to work happening today.",
    anchor: "bottom-left",
    minMs: 3500,
  },
  /* NOT WIRED, deliberately. Measured: with the panel open, the panel's own
     text runs to the frame's right edge, so every right-side anchor covers
     either the connected records or the Next action, at every box width from
     200px to 320px. The only clear anchor is bottom-left, which would put the
     explanation on the opposite side of the frame from the camera push. One
     well-placed moment beats two, so Track narrates the list and nothing
     else. Re-wire this in MeetVera if the panel ever gains a clear margin. */
  connected: {
    id: "track-connected",
    text: "Three records reveal one issue the current team needs to know.",
    anchor: "bottom-right",
  },
} satisfies Record<string, NarratorCue>;

export const ASK_CUES = {
  /* The mode opens on Vera. The panel is held blank while this is on screen,
     so the annotation is the only thing to read and dead centre is clear by
     construction. The interface fades in as it fades out.

     This replaced a cue that ran during typing at top-left. That one had to
     be timed against the typing, which meant it either cut short or sat on
     the answer once it landed. An intro has no such race: nothing else is on
     screen while it speaks. */
  intro: {
    id: "ask-intro",
    title: "Get the Answer Without Digging for It.",
    text: "Ask a question about a property and Vera pieces together the information across old files, email threads, meetings, and previous decisions.",
    anchor: "center",
    maxW: 520,
    large: true,
    holdMs: 5200,
  },
} satisfies Record<string, NarratorCue>;


export const INSIGHT_CUES = {
  /* Fires when the visitor lands on the mode, because the tab name alone does
     not say what the mode does. The panel is deliberately blank while this is
     on screen, so the annotation is the only thing to read and dead centre is
     clear by construction. The insights fade in as it fades out. */
  intro: {
    id: "insight-intro",
    title: "Vera Notices Things Your Team Might Miss.",
    text: "If something changes that affects a property, Vera connects it to what happened before and tells you why it matters.",
    anchor: "center",
    maxW: 520,
    large: true,
    holdMs: 5200,
  },
} satisfies Record<string, NarratorCue>;
