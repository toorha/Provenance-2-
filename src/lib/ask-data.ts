/* Ask Vera: the five role examples and the property-memory update.

   All fictional. Same property as Track the Work, and deliberately the same
   underlying facts: Development reasons over the Site Plan Agreement conflict
   and Leasing over the tenant handover. Reusing the context is the point, it
   is one property memory rather than five unrelated demos.

   HOW VERA ANSWERS. A verdict sentence, then a short briefing of two to four
   sentences that does the reasoning, then the structured evidence beneath it.
   The briefing is where Vera sounds like a teammate: it says what happened,
   why it matters, how the pieces connect and what should happen next. It must
   never restate the rows word for word, and the rows must never be the only
   thing on offer. Three database fields under a headline is not an answer.

   THE ANSWER FORMAT STILL CHANGES WITH THE QUESTION. A capital-planning
   question wants "decided then, changed since"; an equipment question wants a
   timeline; a redevelopment question wants prior attempts. The shell stays
   identical and only the shape of the evidence moves. */

export type AnswerFormat =
  /** numbered blockers: the things stopping progress */
  | "blockers"
  /** what was decided, what changed, where that leaves it */
  | "thenNow"
  /** a dated service history */
  | "timeline"
  /** prior attempts and why each stopped */
  | "history";

export type AnswerRow = {
  /** the scannable left column: an index, a year, or a state */
  tag: string;
  title?: string;
  body?: string;
};

export type AskExample = {
  id: string;
  role: string;
  question: string;
  /** the verdict. One sentence, and the first thing read. */
  answer: string;
  /** the reasoning, in full sentences. One or two short paragraphs. */
  briefing: string[];
  format: AnswerFormat;
  rows: AnswerRow[];
  /** the closing line. Its label changes with the format. */
  close?: { label: string; body: string };
  sources: { title: string; meta: string }[];
};

export const ASK_EXAMPLES: AskExample[] = [
  {
    id: "development",
    role: "Development",
    question:
      "Can we move forward with the South Pad at Westmount Centre, and what still needs to happen before Thursday's review?",
    answer: "Yes, but I would not advance the current concept unchanged.",
    briefing: [
      "The loading area on Rev. 07 conflicts with an access requirement in the 2019 Site Plan Agreement. Northline's turning analysis is outstanding, and Legal has not confirmed the amendment path.",
      "If the loading layout is revised and the amendment path is confirmed before Thursday, the concept can move forward to review.",
    ],
    format: "blockers",
    rows: [
      {
        tag: "01",
        title: "Site Plan Agreement",
        body: "Rev. 07 places the loading area inside the protected access corridor.",
      },
      {
        tag: "02",
        title: "Turning analysis",
        body: "Northline has not delivered the updated analysis for the revised layout.",
      },
      {
        tag: "03",
        title: "Legal",
        body: "Confirmation is still needed that the 2019 requirement can be amended.",
      },
    ],
    close: {
      label: "Next",
      body: "Resolve the loading layout and confirm the amendment path before Thursday's review.",
    },
    sources: [
      { title: "Site Plan Agreement", meta: "2019" },
      { title: "Concept Plan Rev. 07", meta: "Sep 01" },
      { title: "Tenant requirements", meta: "Current lease" },
      { title: "Turning analysis update", meta: "Northline Engineering" },
      { title: "Legal correspondence", meta: "Meridian Legal" },
      { title: "South Pad Review", meta: "Thursday" },
    ],
  },

  {
    id: "asset-management",
    role: "Asset management",
    question:
      "Why was the west roof replacement at Westmount Centre deferred, and has anything changed since?",
    answer:
      "The 2024 deferral was reasonable, but its conditions no longer hold.",
    briefing: [
      "Replacement was deferred at the 2024 capital review because the roof was still performing adequately and the repair history did not justify the spend. Funding moved to the parking structure instead.",
      "Operations has since logged repeated leaks in the west section, including a new issue this year, which undermines the condition assumptions the original decision rested on.",
    ],
    format: "thenNow",
    rows: [
      {
        tag: "2024 decision",
        body: "Replacement deferred on acceptable condition. Funding moved to the parking structure.",
      },
      {
        tag: "What changed",
        body: "Repeated west-section leaks since, including one now affecting a tenant handover.",
      },
    ],
    close: {
      label: "Current read",
      body: "Reassess replacement during the next capital review.",
    },
    sources: [
      { title: "Capital plan", meta: "2024" },
      { title: "Roof condition report", meta: "2024" },
      { title: "Repair work orders", meta: "2025" },
      { title: "Roof leak service log", meta: "Today" },
    ],
  },

  {
    id: "leasing",
    role: "Leasing",
    question:
      "What should I know before I confirm possession for Unit 12 at Westmount Centre?",
    answer: "I would hold the possession confirmation for now.",
    briefing: [
      "The lease requires Unit 12 to be delivered watertight, and Operations has an open roof leak above the unit. The permanent repair is booked for Wednesday, after the Monday handover.",
      "Confirm whether the repair can be accelerated, or move the possession date, before the notice goes out.",
    ],
    format: "blockers",
    rows: [
      {
        tag: "01",
        title: "Lease",
        body: "The delivery condition requires the premises to be watertight at handover.",
      },
      {
        tag: "02",
        title: "Operations",
        body: "An active roof leak above Unit 12 is still open.",
      },
      {
        tag: "03",
        title: "Work order",
        body: "Northline's permanent repair is booked two days after handover.",
      },
    ],
    close: {
      label: "Next",
      body: "Accelerate the repair or move the possession date before sending the notice.",
    },
    sources: [
      { title: "Lease delivery conditions", meta: "Current lease" },
      { title: "Roof leak service log", meta: "Today" },
      { title: "Roof repair work order", meta: "Northline Roofing" },
      { title: "Possession confirmation draft", meta: "Leasing" },
    ],
  },

  {
    id: "operations",
    role: "Operations",
    question:
      "What is the full history of RTU-4 at Harbourgate Industrial, and is anything coming up?",
    answer: "Five service events since 2020, three of them related and recent.",
    briefing: [
      "The 2022 compressor repair was isolated. The three most recent are related: a controls fault in March 2025, a control-board replacement that November, and compressor service in May 2026.",
      "The warranty stays active until March 2029, so any new fault should be checked against it before outside work is authorized.",
    ],
    format: "timeline",
    rows: [
      { tag: "2020", body: "Installed" },
      { tag: "2022", body: "Compressor repaired" },
      { tag: "Mar 2025", body: "Controls fault reported" },
      { tag: "Nov 2025", body: "Control board replaced" },
      { tag: "May 2026", body: "Compressor serviced" },
    ],
    close: {
      label: "Before authorizing work",
      body: "Check any new fault against the active warranty.",
    },
    sources: [
      { title: "RTU-4 equipment record", meta: "2020" },
      { title: "Service history", meta: "2022 to 2026" },
      { title: "Warranty certificate", meta: "Mar 2029" },
    ],
  },

  {
    id: "portfolio",
    role: "Portfolio",
    question:
      "Have we looked at redeveloping the Westmount Centre South Pad before, and why didn't we proceed?",
    answer: "Yes. The site has been studied twice before the current concept.",
    briefing: [
      "A standalone retail pad was paused in 2023 because servicing capacity could not support the program. A multi-tenant concept returned in 2025 and stopped on access and circulation.",
      "The current South Pad concept reopens the opportunity under a different layout, so those constraints should be tested again rather than assumed resolved.",
    ],
    format: "history",
    rows: [
      {
        tag: "2023",
        title: "Standalone retail pad",
        body: "Paused: servicing capacity could not support the program.",
      },
      {
        tag: "2025",
        title: "Multi-tenant concept",
        body: "Stopped: access and internal circulation.",
      },
      {
        tag: "Current",
        title: "South Pad concept",
        body: "Reopened under a revised layout.",
      },
    ],
    close: {
      label: "Current read",
      body: "Test the earlier servicing and access constraints against the new layout.",
    },
    sources: [
      { title: "Retail pad concept", meta: "2023" },
      { title: "Multi-tenant concept", meta: "2025" },
      { title: "Servicing constraints study", meta: "2023" },
    ],
  },
];

/* The second capability. The same input takes messy human context, the kind
   that comes off a phone call or a site visit and never reaches a document,
   and turns it into structured property memory.

   No briefing here. The visitor supplied the context, so explaining it back
   to them would be padding. The typed text is deliberately NOT cleaned up. */
export const MEMORY_UPDATE = {
  input:
    "Westmount Centre update: Legal confirmed the 2019 access clause can be amended. We're keeping the current tenant footprint and revising the loading layout instead. Sarah is following up with traffic and Rev. 08 should be ready Friday.",
  captured: [
    { tag: "Decision", body: "Keep current tenant footprint." },
    { tag: "Issue", body: "2019 access clause can be amended." },
    { tag: "Action", body: "Revise loading layout." },
    { tag: "Owner", body: "Sarah Chen · Traffic follow-up" },
    { tag: "Current", body: "Rev. 08 expected Friday." },
  ],
  summary: "1 decision · 1 issue · 2 actions · 1 concept",
} as const;

/* Two ask, one update, so the idle state shows both capabilities without a
   line of copy explaining either. */
export const ASK_SUGGESTIONS = [
  {
    kind: "ask" as const,
    exampleId: "development",
    label:
      "Can we move forward with the South Pad at Westmount Centre, and what needs to happen before Thursday?",
  },
  {
    kind: "ask" as const,
    exampleId: "operations",
    label:
      "What is the full history of RTU-4 at Harbourgate Industrial, and is anything coming up?",
  },
  {
    kind: "update" as const,
    exampleId: null,
    label:
      "Westmount Centre update: Legal confirmed the 2019 access clause can be amended.",
  },
];

export const SHARE_RECIPIENTS = ["Sarah Chen", "Jordan Lee", "Emma Clarke"];
