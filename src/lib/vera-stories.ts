/* The three stories the landing page tells.

   PLAIN LANGUAGE IS THE POINT. Every earlier version of this was written for
   somebody who already knows what a site plan agreement is, what Rev. 07
   means, and why an access corridor matters. A visitor who has never worked
   in real estate could not follow a word of it, and they are most of the
   people who will read this page.

   The scenarios underneath are unchanged. Only the vocabulary moved: "a 2019
   property agreement says this area must remain clear" is the same fact as
   the access corridor clause, and anyone can read it.

   FOUR BLOCKS PER STORY, NEVER MORE. A label, what Vera concluded, two or
   three pieces of context, one next step. Anything else belongs in the real
   product rather than on a page somebody is skimming. */

export type StoryBlock = {
  /** the small label above the line */
  label: string;
  body: string;
  /** the one block that carries Vera's conclusion, rendered as such */
  isConclusion?: boolean;
};

export type VeraStory = {
  id: "track" | "ask" | "insights";
  /** the one-line framing above the story */
  framing: string;
  /** the question, for Ask Vera only. Shown complete, never typed. */
  question?: string;
  /** the headline, for Insights only */
  headline?: string;
  blocks: StoryBlock[];
  next: string;
  /** quiet, and never the visual focus */
  sources?: string;
};

export const STORIES: Record<VeraStory["id"], VeraStory> = {
  track: {
    id: "track",
    framing: "Vera keeps up with what is changing across a property.",
    blocks: [
      {
        label: "New plan",
        body: "A new loading plan was added today.",
      },
      {
        label: "Older agreement",
        body: "A 2019 property agreement says this area must remain clear.",
      },
      {
        label: "Vera connected them",
        body: "The new plan conflicts with an existing property requirement.",
        isConclusion: true,
      },
    ],
    next: "Revise the plan before Thursday's review.",
    sources: "Based on 3 property records",
  },

  ask: {
    id: "ask",
    framing: "Ask a question. Vera answers from the property's history.",
    question: "Can we move forward with this project?",
    blocks: [
      {
        label: "Vera",
        body: "Not yet. The current plan conflicts with an older property agreement, and the issue needs to be resolved before the next review.",
        isConclusion: true,
      },
      {
        label: "2019",
        body: "Property agreement requires the area to remain clear.",
      },
      {
        label: "Today",
        body: "The latest plan places loading in that same area.",
      },
    ],
    next: "Revise the layout or confirm whether the agreement can be changed.",
    sources: "Based on 3 property records",
  },

  insights: {
    id: "insights",
    framing: "Nobody asked. Vera noticed on its own.",
    headline: "A project paused in 2023 may now be possible.",
    blocks: [
      {
        label: "2023",
        body: "The project was stopped because the proposed use was not allowed.",
      },
      {
        label: "2026",
        body: "The rules changed. That use is now allowed.",
      },
      {
        label: "Vera connected the change",
        body: "The original reason for stopping the project may no longer apply.",
        isConclusion: true,
      },
    ],
    next: "Revisit the old concept.",
    sources: "Based on 3 property records",
  },
};

export const STORY_ORDER: VeraStory["id"][] = ["track", "ask", "insights"];
