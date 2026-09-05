/* The three stories the landing page tells.

   THE BALANCE THIS FILE IS TRYING TO HOLD. Written for insiders it became
   unreadable: Rev. 07 encroaching on an access easement means nothing to most
   people who will see this page. Stripped to plain sentences it read as
   marketing copy in a fake browser, because two bare facts and a conclusion
   is not evidence, it is a claim.

   So the metadata is real and the explanation is plain. "Site Plan Agreement,
   2019" is exactly what the record is called, and the excerpt beside it says
   what it means in words anyone can read. Vera's conclusion never uses a term
   the evidence has not already made obvious.

   THREE RECORDS, ALWAYS. Two is a coincidence, four is a list. Three is the
   smallest number that reads as Vera having connected something. */

export type EvidenceKind = "drawing" | "agreement" | "meeting" | "rules";

export type Evidence = {
  kind: EvidenceKind;
  /** what sort of record this is */
  label: string;
  /** when, in human terms. Never a timestamp or an id. */
  date: string;
  /** what the record is actually called */
  title: string;
  /** the one line from it that matters here */
  excerpt: string;
};

export type VeraStory = {
  id: "track" | "ask" | "insights";
  /** What this mode is FOR, said before any of it happens.

      THE THREE ROLES ARE DISTINCT AND HAVE TO STAY DISTINCT.
        Track     what is happening, what is blocking it, what moves it forward
        Ask       what do I need to know
        Insights  what should I know that I have not thought to ask
      Track is the project execution layer: Vera derives live project state
      from the work already happening, rather than a team maintaining tasks by
      hand. It is not conflict detection and it is not a status report.

      Somebody who lands mid-scroll sees records and a green conclusion and has
      to reverse-engineer what they are looking at. One sentence on an almost
      empty panel costs two seconds and means the evidence that follows is read
      as a demonstration of something rather than as decoration. */
  intro: string;
  property: { name: string; project: string };
  framing: string;
  /** Ask only. The question is the entry point, so it leads. */
  question?: string;
  /** Insights only. */
  headline?: string;
  /** Ask answers first and shows its working underneath. Track and Insights
      build to the conclusion. That ordering is the difference between the
      modes, and it is why they do not read as the same screen. */
  answerFirst?: boolean;
  evidence: Evidence[];
  conclusionLabel: string;
  conclusion: string;
  next: string;
  sources: string;
};

export const STORIES: Record<VeraStory["id"], VeraStory> = {
  track: {
    id: "track",
    intro:
      "Vera keeps a live understanding of the project, so your team can see what is holding it back and what needs to happen next to move it forward.",
    property: { name: "Westmount Centre", project: "South Pad redevelopment" },
    framing: "Vera keeps up with what is changing across the property.",
    evidence: [
      {
        kind: "drawing",
        label: "Drawing",
        date: "Today",
        title: "Concept Plan Rev. 07",
        excerpt: "Loading area moved into the east access corridor.",
      },
      {
        kind: "agreement",
        label: "Agreement",
        date: "2019",
        title: "Site Plan Agreement",
        excerpt: "East access corridor must remain unobstructed.",
      },
      {
        kind: "meeting",
        label: "Meeting",
        date: "Today, 10:30",
        title: "Design coordination",
        excerpt: "Team plans to advance Rev. 07 at Thursday's review.",
      },
    ],
    conclusionLabel: "Vera connected them",
    conclusion:
      "The latest plan conflicts with an existing property requirement, and it is going to review on Thursday.",
    next: "Revise the loading layout or confirm whether the agreement can be changed.",
    sources: "3 records connected",
  },

  ask: {
    id: "ask",
    intro:
      "Ask Vera anything about a property. Vera pieces together the relevant history and context to give you the answer.",
    property: { name: "Westmount Centre", project: "South Pad redevelopment" },
    framing: "Asked this morning",
    question: "Can we move forward with the South Pad?",
    answerFirst: true,
    evidence: [
      {
        kind: "agreement",
        label: "Agreement",
        date: "2019",
        title: "Site Plan Agreement",
        excerpt: "Access corridor must remain clear.",
      },
      {
        kind: "drawing",
        label: "Drawing",
        date: "Today",
        title: "Concept Plan Rev. 07",
        excerpt: "The new loading area now overlaps that corridor.",
      },
      {
        kind: "meeting",
        label: "Meeting",
        date: "Today",
        title: "Design coordination",
        excerpt: "Rev. 07 is scheduled for Thursday's review.",
      },
    ],
    conclusionLabel: "Not yet",
    conclusion:
      "The latest plan conflicts with an older property agreement, and the team plans to review that same plan on Thursday.",
    next: "Revise the loading layout or confirm whether the agreement can be changed.",
    sources: "Answer based on 3 property records",
  },

  insights: {
    id: "insights",
    intro:
      "Vera proactively monitors your properties for internal and external changes, surfacing risks, opportunities, and anything your team should know.",
    property: { name: "Westmount Centre", project: "South Pad redevelopment" },
    framing: "Nobody asked. Vera noticed on its own.",
    headline: "A project paused in 2023 may now be possible.",
    evidence: [
      {
        kind: "drawing",
        label: "Concept",
        date: "2023",
        title: "Drive-through concept paused",
        excerpt: "The proposed use was not allowed under the rules at the time.",
      },
      {
        kind: "rules",
        label: "Rules update",
        date: "2026",
        title: "Municipal rules updated",
        excerpt: "The same use is now permitted on this site.",
      },
      {
        kind: "agreement",
        label: "Property record",
        date: "Kept since 2023",
        title: "Original concept drawings",
        excerpt: "The paused concept is still in the property's records.",
      },
    ],
    conclusionLabel: "Vera connected the change",
    conclusion:
      "The main reason this project stopped in 2023 may no longer apply.",
    next: "Revisit the old concept against today's site conditions.",
    sources: "3 records connected across 3 years",
  },
};

export const STORY_ORDER: VeraStory["id"][] = ["track", "ask", "insights"];
