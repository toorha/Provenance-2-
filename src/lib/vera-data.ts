/* Demo data for the Vera product frame.

   All of this is fictional. Westmount Centre, South Pad, every person and every
   consultant firm are invented for demonstration. No real or confidential data
   appears anywhere on this site (HOMEPAGE.md §11 checklist).

   DESIGN.md §10.3: every value is specific and plausible, and every row carries
   a source and a timestamp. Never "Project A", never "Task 1". */

export const PROPERTY = {
  name: "All properties",
  project: "South Pad",
  updated: "14:02",
  sources: 6,
} as const;

export type WorkType =
  | "Action"
  | "Update"
  | "Document"
  | "Open issue"
  | "Decision"
  | "Meeting"
  | "Follow-up";

export type WorkItem = {
  id: string;
  type: WorkType;
  /** Title Case throughout the list — never mixed with sentence case. */
  title: string;
  department: string;
  owner: string;
  when: string;
  /** the two rows carrying a reasoning panel. Listed first, kept brighter. */
  flagship?: boolean;
  /* A quiet nudge that this row is interactive. Only on the flagship the demo
     does NOT walk through — the other one demonstrates itself. */
  hint?: string;
  /** rows Vera generated or captured carry the Vera mark (§11) */
  byVera?: boolean;
  detail?: WorkDetail;
};

/* The detail panel is the product proof, not a task drawer.

   A drawer showing status / owner / due could be Asana, Monday or Jira. What
   separates this is `connected`: the pieces Vera drew together to explain WHY
   the issue exists at all.

   The requirement is meaningful cross-context reasoning — evidence a single
   view could not have shown together. Different KINDS of evidence is the
   strongest form of that. Department spread and date spread help but are not
   quotas to hit.

   The failure to avoid is same team + same source type + same moment. That is
   monitoring, not reasoning. */
export type WorkDetail = {
  status: string;
  ownerRole: string;
  due: string;
  /** Beat 1 — Vera's interpretation. One sentence, the panel's focal point. */
  read: string;
  /* Beat 2 — the evidence.

     `tag` is the left column, and it carries whichever dimension is the proof
     for that case. For the Site Plan Agreement it is TIME (2019 / Sep 01 /
     Today) because the argument is memory across years. For the tenant
     handover it is FUNCTION (Lease / Operations / Work order / Email draft)
     because the argument is context spread across teams right now.

     Scanning the left column alone should make the case. */
  connected: { tag: string; kind: string; body: string }[];
  /** Beat 3 — the decision, and everyone who has to act on it. */
  next: { action: string; by: string; owners: string[] };
  /** replaces the connected block in place, never a second drawer */
  sources: { title: string; meta: string }[];
};

/* One property, many functions, shared context — carried by the department
   column rather than by a sentence (DESIGN.md §10.4).

   FIVE rows, not the seven the product would show. A marketing demo has to be
   understood at a glance; seven rows made a visitor inspect the interface
   instead of reading the story. The two flagships lead, and the remaining
   three exist only to make the workspace feel alive. */
export const TRACK_ITEMS: WorkItem[] = [
  /* Flagship 1 — MEMORY ACROSS TIME. A 2019 obligation against current work.
     This is the default autoplay walkthrough. */
  {
    id: "spa-conflict",
    flagship: true,
    type: "Open issue",
    title: "Site Plan Agreement Conflict",
    department: "Development · Legal",
    owner: "Sarah Chen",
    when: "Due Thu",
    detail: {
      status: "Open",
      ownerRole: "Sarah Chen · Development",
      due: "Thursday",
      read: "The new concept may conflict with an access requirement in the 2019 Site Plan Agreement.",
      connected: [
        {
          tag: "2019",
          kind: "Agreement",
          body: "Access corridor must remain unobstructed.",
        },
        {
          tag: "Sep 01",
          kind: "Drawing",
          body: "Rev. 07 places the proposed loading area within that corridor.",
        },
        {
          tag: "Today",
          kind: "Meeting",
          body: "Team plans to advance Rev. 07 at Thursday's review.",
        },
      ],
      next: {
        action:
          "Revise the loading layout or confirm whether the agreement can be amended.",
        by: "Before Thursday",
        owners: ["Sarah Chen · Development"],
      },
      sources: [
        { title: "Site Plan Agreement", meta: "2019" },
        {
          title: "Concept Plan Rev. 07",
          meta: "Sep 01 · Northline Engineering",
        },
        { title: "South Pad Review notes", meta: "Today" },
      ],
    },
  },

  /* Flagship 2 — SHARED CONTEXT ACROSS FUNCTIONS, all of it happening now.
     Nobody here is making a bad decision. Leasing knows the handover date,
     Operations knows about the leak, the roofer knows the repair timing, and
     the lease holds the obligation. Each team has one true piece and no one
     has the whole thing. Manually explorable — never autoplayed. */
  {
    id: "tenant-handover",
    flagship: true,
    hint: "Click me",
    type: "Open issue",
    title: "Tenant Handover Risk",
    department: "Leasing · Operations",
    owner: "Jordan Lee",
    when: "Mon",
    detail: {
      status: "Open",
      ownerRole: "Jordan Lee · Leasing",
      due: "Monday",
      read: "The unit is scheduled for handover Monday, but an unresolved roof leak may prevent the landlord from meeting the lease delivery condition.",
      connected: [
        {
          tag: "Lease",
          kind: "Requirement",
          body: "Premises must be delivered watertight.",
        },
        {
          tag: "Operations",
          kind: "Today",
          body: "Active roof leak reported above Unit 12.",
        },
        {
          tag: "Work order",
          kind: "Wednesday",
          body: "Permanent repair scheduled Wednesday.",
        },
        {
          tag: "Email draft",
          kind: "Now",
          body: "Leasing preparing Monday possession confirmation.",
        },
      ],
      next: {
        action: "Confirm repair timing before sending the possession notice.",
        by: "Before Monday",
        owners: ["Jordan Lee · Leasing", "Daniel Kim · Operations"],
      },
      sources: [
        { title: "Lease delivery conditions", meta: "Current lease" },
        { title: "Roof leak service log", meta: "Operations · Today" },
        { title: "Roof repair work order", meta: "Northline Roofing · Wed" },
        { title: "Possession confirmation draft", meta: "Leasing · Now" },
      ],
    },
  },

  /* The three ordinary rows. They make the workspace feel real, and they must
     not compete for attention while the demo runs. */
  {
    id: "turning-analysis",
    type: "Action",
    title: "Turning Analysis Overdue",
    department: "Development",
    owner: "Sarah Chen",
    when: "Due 27 Aug",
  },
  {
    id: "lease-revision",
    type: "Update",
    title: "Lease Revision Received",
    department: "Leasing",
    owner: "Jordan Lee",
    when: "09:24",
  },
  {
    id: "concept-rev-07",
    type: "Document",
    title: "Concept Plan Rev. 07",
    department: "Consultant",
    owner: "Northline Eng.",
    when: "30 Aug",
    byVera: true,
  },
];

export const MODES = [
  {
    id: "track",
    label: "Track the work",
    /* every unselected mode carries the cue, so whichever two you are not
       looking at both invite a click */
    hint: "Try me",
    question: "What is happening?",
  },
  {
    id: "ask",
    label: "Ask Vera",
    hint: "Try me",
    question: "What happened, why, and what do I need to know?",
  },
  {
    /* Vera starts this one. Track answers "what is happening", Ask answers
       "what do I need to know", and this answers the question nobody thought
       to put. */
    id: "insights",
    label: "Proactive Insights",
    hint: "Try me",
    question: "What should I know that I did not think to ask?",
  },
] as const;

export type ModeId = (typeof MODES)[number]["id"];
