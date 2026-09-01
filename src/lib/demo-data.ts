/**
 * Fictional demo data. No real companies, people, properties,
 * municipalities, documents or projects are referenced.
 */

export const DEMO_PROPERTY = {
  name: "Westmount Centre",
  address: "1840 Westmount Avenue",
  city: "Hamilton, ON",
  kind: "Mixed-use retail & office",
  years: 14, // 2012 -> 2026
} as const;

/** the team, used consistently across every product surface */
export const PEOPLE = {
  alex: { name: "Alex Morgan", dept: "Portfolio", initials: "AM" },
  sarah: { name: "Sarah Chen", dept: "Development", initials: "SC" },
  jordan: { name: "Jordan Lee", dept: "Leasing", initials: "JL" },
  maya: { name: "Maya Patel", dept: "Asset Management", initials: "MP" },
  daniel: { name: "Daniel Kim", dept: "Operations", initials: "DK" },
  emma: { name: "Emma Clarke", dept: "Legal", initials: "EC" },
  noah: { name: "Noah Williams", dept: "Planning", initials: "NW" },
} as const;

export const ROSTER = [
  PEOPLE.sarah,
  PEOPLE.jordan,
  PEOPLE.maya,
  PEOPLE.daniel,
  PEOPLE.emma,
  PEOPLE.noah,
] as const;

export const DEPARTMENTS = [
  "Development",
  "Leasing",
  "Asset Management",
  "Operations",
  "Legal",
  "Planning",
] as const;

export const ORGS = {
  planning: "Atlas Planning",
  engineering: "Northline Engineering",
  legal: "Meridian Legal",
  municipal: "Planning Department",
} as const;

/* ------------------------------------------------------------------ *
 * HERO — the scale problem
 * ------------------------------------------------------------------ */
export const HERO = {
  eyebrow: "Building the self-updating memory layer for commercial real estate",
  headline: "Know what's happening across every property.",
  body: "Provenance keeps track of what was decided, what still needs to happen, and the context behind it, then updates the property record as your team works.",
  primary: "Request early access",
  secondary: "See how it works",
  footnote: "Built for teams across Development, Leasing, Asset Management and Operations.",
} as const;

/* ------------------------------------------------------------------ *
 * CONTEXT DECAY — the problem, stated once.
 * ------------------------------------------------------------------ */
export const CONTEXT_DECAY = {
  label: "Organizational amnesia",
  headline: ["Everyone has part of the story.", "No one has the whole property."],
  body: "A property is constantly changing through leasing, operations, development, capital planning, legal work and municipal approvals. Each team sees a different piece. Over time, the files stay, but the reasoning connecting them gets harder to recover.",
  property: "Westmount Centre",

  /* Seven pieces of the same asset, each held by a different team at a
     different time. Read together they form a chain — tenant footprint
     to loading to turning conflict to easement to municipal conditions
     — but nothing here draws that chain, because nothing does. */
  fragments: [
    {
      id: "leasing",
      team: "Leasing",
      when: "Today",
      person: "jordan",
      title: "Prospective tenant requirements",
      quote:
        "The prospective tenant wants a 10-year term with two five-year options, but only if the landlord delivers the full 9,000 SF footprint shown on the latest concept.",
      note: "Reducing the building size could require reopening commercial terms.",
      size: "lg",
    },
    {
      id: "development",
      team: "Development",
      when: "8 months ago",
      person: "sarah",
      title: "East pad concept study",
      quote:
        "The team tested a 7,500 SF standalone retail pad on the east side of the property, but the concept was paused after truck-turning analysis showed that the loading movement would conflict with the main customer drive aisle.",
      note: "The concept was not paused because of tenant demand.",
      size: "lg",
    },
    {
      id: "meeting",
      team: "Development · Leasing · Operations",
      when: "Yesterday",
      person: null,
      title: "Westmount Centre concept review",
      quote:
        "The team agreed to keep the larger tenant footprint, shift the loading area west, and have the traffic consultant test the revised truck path before the next concept review.",
      note: "Three decisions were made in a single meeting.",
      size: "lg",
    },
    {
      id: "asset",
      team: "Asset Management",
      when: "May",
      person: "maya",
      title: "2026 capital plan",
      quote:
        "The remaining roof replacement was deferred after the consultant found the membrane could remain in service for another 2 to 3 years with localized repairs.",
      note: "The area is to be reassessed during the 2027 capital planning cycle.",
      size: "md",
    },
    {
      id: "legal",
      team: "Legal",
      when: "2 years ago",
      person: "emma",
      title: "Title review for the east boundary",
      quote:
        "A registered utility easement runs through the eastern portion of the property. Any future building or loading area in that zone will need to be checked against the easement rights.",
      note: "This constraint does not appear on the current concept drawing.",
      size: "md",
    },
    {
      id: "operations",
      team: "Operations",
      when: "Last week",
      person: "daniel",
      title: "RTU-4 service history",
      quote:
        "RTU-4 has had three control-related service calls in the past 18 months. The last technician recommended replacing the control board if the fault returns.",
      note: "The warranty expires in March 2029.",
      size: "sm",
    },
    {
      id: "planning",
      team: "Planning",
      when: "14 months ago",
      person: "noah",
      title: "Municipal pre-consultation",
      quote:
        "Municipal staff supported additional commercial development in principle, but required the team to maintain parking supply and demonstrate that site circulation would continue to function after redevelopment.",
      note: "Nothing was rejected outright, but the conditions still need to be solved.",
      size: "sm",
    },
  ],

  closing: {
    count: ["One property.", "Six teams.", "Years of decisions."],
    lead: ["The information exists.", "The understanding is scattered."],
    sub: "Before the next decision can be made, someone usually has to piece the story back together.",
  },
} as const;

/* ------------------------------------------------------------------ *
 * THE PRODUCT — Daily Digest, proactive signals, signal detail, property
 * Memory -> Detection -> Recommendation -> Action
 * ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ *
 * WHAT IT CAN DO TODAY — the shared operating layer for active work.
 * One property, every team, all the live work attached to it.
 * ------------------------------------------------------------------ */
export const TODAY = {
  label: "What it can do today",
  headline: "For the work happening right now.",
  body: "Provenance keeps decisions, actions, deadlines, documents and open issues connected across every team working on the property.",

  property: {
    name: "Westmount Centre",
    address: "1840 Westmount Avenue · Hamilton, ON",
  },

  /** the live work, as it would stand this morning */
  items: [
    {
      id: "turning",
      kind: "Action",
      tone: "due",
      title: "Turning analysis",
      person: "sarah",
      meta: "Due Thursday",
    },
    {
      id: "lease",
      kind: "Update",
      tone: "plain",
      title: "Lease revision received",
      person: "jordan",
      meta: "This morning",
    },
    {
      id: "plan",
      kind: "Document",
      tone: "filed",
      title: "Concept Plan Rev. 07",
      person: null,
      meta: "Filed automatically",
    },
    {
      id: "easement",
      kind: "Open issue",
      tone: "open",
      title: "Utility easement confirmation",
      person: "emma",
      meta: "Open 14 days",
    },
    {
      id: "footprint",
      kind: "Decision",
      tone: "decided",
      title: "Preserve 9,000 SF footprint",
      person: "sarah",
      meta: "Captured Feb 12",
    },
    {
      id: "review",
      kind: "Meeting",
      tone: "plain",
      title: "South Pad Review",
      person: null,
      meta: "Thursday · 2:00 PM",
      with: ["sarah", "jordan", "emma"],
    },
  ],

  /** everyone with work on this property right now */
  involved: ["sarah", "jordan", "emma", "daniel", "maya"],

  /** detection, kept small — a consequence of memory, not the pitch */
  /** the proactive layer — what the record pushes at you */
  signals: [
    {
      id: "zoning",
      kind: "Opportunity",
      tone: "opportunity",
      title: "Drive-through uses are now permitted",
      why: "A previous QSR concept was paused because this use was prohibited.",
      meta: "Westmount Centre",
      action: "Review previous concept",
    },
    {
      id: "overdue",
      kind: "Open issue",
      tone: "overdue",
      title: "Turning analysis is overdue by 6 days",
      why: "This blocks the South Pad review on Thursday.",
      meta: "Sarah Chen · Development",
      action: "Draft follow-up",
    },
    {
      id: "warranty",
      kind: "Expiry",
      tone: "attention",
      title: "Roof warranty expires in 42 days",
      why: "An unresolved deficiency was recorded at the last inspection.",
      meta: "Westmount Centre",
      action: "Start warranty review",
    },
    {
      id: "records",
      kind: "New context",
      tone: "info",
      title: "8 new records were added yesterday",
      why: "Emails, meeting notes and reports were added across three properties.",
      meta: "3 properties",
      action: "Review updates",
    },
  ],

  payoff: "One property. Many teams. Shared context.",
} as const;

/* ------------------------------------------------------------------ *
 * HOW IT WORKS — step 1: you work the way you already work.
 * Four ordinary actions, each captured without changing the workflow.
 * ------------------------------------------------------------------ */
export const WORKFLOW = {
  label: "How it works",
  headline: "You work the way you already work.",
  body: "No new system to keep up to date. Copy Provenance in, invite it, forward it something, or just tell it where a record belongs.",

  methods: [
    {
      id: "email",
      nav: "Email",
      title: "CC Provenance on an email",
      kind: "New message",
      fields: [
        { label: "To", value: `${PEOPLE.jordan.name} · ${ORGS.engineering}` },
        { label: "Cc", value: "provenance", accent: true },
        { label: "Subject", value: "RTU-3 replacement recommended" },
      ],
      body: "RTU-3 failed its third inspection this year. We recommend full replacement rather than another repair.",
      result: "Captured",
      resultDetail: "Decision, owner and due date filed to Westmount Centre",
    },
    {
      id: "meeting",
      nav: "Meeting",
      title: "Invite it to a meeting",
      kind: "Calendar invite",
      fields: [
        { label: "Event", value: "Capital planning review" },
        { label: "When", value: "Thursday · 2:00 PM" },
        { label: "Guests", value: "Alex, Sarah, Jordan, Provenance", accent: true },
      ],
      body: "Provenance joins, takes the notes, and separates what was decided from what was only discussed.",
      result: "Notes captured",
      resultDetail: "Reasoning and follow-up actions filed against the decision",
    },
    {
      id: "forward",
      nav: "Document",
      title: "Forward a document",
      kind: "Forwarded message",
      fields: [
        { label: "To", value: "provenance", accent: true },
        { label: "Subject", value: "Fwd: Roof condition assessment" },
        { label: "Attached", value: "Roof-condition-assessment.pdf" },
      ],
      body: "The report is read, summarised, and linked to the project it belongs to.",
      result: "Filed",
      resultDetail: "Linked to the 2014 roof project and the 2026 capital plan",
    },
    {
      id: "tell",
      nav: "Instruction",
      title: "Tell it where something belongs",
      kind: "Message to Provenance",
      fields: [{ label: "You", value: "File this under Westmount Centre, capital planning" }],
      body: "Plain language works. Provenance confirms where it filed the record and what it linked.",
      result: "Filed",
      resultDetail: "Westmount Centre · Capital planning · 3 sources linked",
    },
  ],
} as const;


/* ------------------------------------------------------------------ *
 * INPUTS -> PROPERTY MEMORY -> OUTPUTS
 * The work goes in, structure accumulates, useful work comes back out.
 * ------------------------------------------------------------------ */
export const MEMORY_LAYER = {
  label: "The memory layer",
  headline: ["Everything your team does", "builds the property memory."],
  subhead:
    "Emails, meetings, drawings, decisions and actions flow into one shared record, then come back out as answers, tasks and context the team can actually use.",

  property: "Westmount Centre",

  /** what arrives, where it sits in the field, and what Provenance
   *  understands from it. `adds` writes a row into the memory. */
  inputs: [
    {
      id: "email",
      glyph: "mail",
      label: "Email",
      title: "South pad concept revision",
      at: { x: 3, y: 9 },
      steps: [
        { kind: "Property matched", value: "Westmount Centre" },
        { kind: "Decision captured", value: "Preserve 9,000 SF footprint" },
      ],
      adds: { kind: "Decision", title: "South pad footprint preserved", meta: "Feb 12" },
    },
    {
      id: "meeting",
      glyph: "meeting",
      label: "Meeting",
      title: "South Pad Review",
      at: { x: 0, y: 37 },
      steps: [
        { kind: "Action detected", value: "Complete turning analysis" },
        { kind: "Owner and due date", value: "Sarah Chen · Thursday" },
      ],
      adds: { kind: "Open action", title: "Turning analysis", meta: "Sarah Chen · Thu" },
    },
    {
      id: "report",
      glyph: "report",
      label: "Report",
      title: "Traffic memo · Rev. 03",
      at: { x: 15, y: 60 },
      steps: [{ kind: "Constraint linked", value: "South pad loading configuration" }],
      adds: { kind: "Issue", title: "Turning analysis outstanding", meta: "Open" },
    },
    {
      id: "drawing",
      glyph: "drawing",
      label: "Drawing",
      title: "Concept plan · Rev. 07",
      at: { x: 1, y: 84 },
      steps: [{ kind: "Revision identified", value: "South pad · Rev. 07" }],
      adds: { kind: "Property event", title: "Concept Rev. 07 received", meta: "Evidence linked" },
    },
    {
      id: "lease",
      glyph: "lease",
      label: "Lease memo",
      title: "Prospective tenant terms",
      at: { x: 20, y: 2 },
      steps: [{ kind: "Person identified", value: "Jordan Lee · Leasing" }],
    },
    {
      id: "municipal",
      glyph: "letter",
      label: "Correspondence",
      title: "Municipal comments",
      at: { x: 19, y: 78 },
      steps: [{ kind: "Issue updated", value: "Servicing information required" }],
    },
    {
      id: "invoice",
      glyph: "invoice",
      label: "Invoice",
      title: "Survey scope",
      at: { x: 14, y: 22 },
      steps: [{ kind: "Deadline identified", value: "Due Thursday" }],
    },
  ],

  /** system state, quiet — early and late */
  state: {
    from: { sources: 12, events: 6, decisions: 2, actions: 1, teams: 2 },
    to: { sources: 126, events: 47, decisions: 12, actions: 8, teams: 6 },
  },

  /** what the same memory gives back — fewer, and more considered */
  outputs: [
    {
      id: "ask",
      kind: "Ask Provenance",
      variant: "ask",
      title: "What's holding up the south pad?",
      meta: "Answered from 4 sources",
      at: { x: 68, y: 8 },
    },
    {
      id: "task",
      kind: "Task",
      variant: "task",
      title: "Complete turning analysis",
      meta: "Sarah Chen · Development",
      due: "Due Thursday",
      at: { x: 74, y: 33 },
    },
    {
      id: "shared",
      kind: "Shared context",
      variant: "shared",
      title: "South pad status",
      people: ["SC", "JL", "EC"],
      meta: "Development · Leasing · Legal",
      at: { x: 68, y: 58 },
    },
    {
      id: "prep",
      kind: "Meeting prep",
      variant: "prep",
      title: "Thursday South Pad Review",
      meta: "5 relevant updates",
      at: { x: 74, y: 84 },
    },
  ],

  /** what the memory holds once the work has passed through it */
  structure: ["Property matched", "Decisions linked", "Actions tracked", "Evidence connected"],

  /** the three phases, named */
  phases: ["Work in", "Property memory", "Work out"],

  payoff: ["Work goes in.", "Useful context comes out.", "The property remembers."],
} as const;

/* ------------------------------------------------------------------ *
 * ASK PROVENANCE — one strong question, sourced, shareable.
 * ------------------------------------------------------------------ */
export const ASK_PROVENANCE = {
  label: "Ask the property",
  headline: "Ask the property.",
  intro:
    "You are not searching documents. You are asking the property what happened, and getting the story with its sources attached.",

  /** five questions, one per part of the organisation */
  cases: [
    {
      id: "development",
      category: "Development",
      question:
        "What's holding up the south pad, and what needs to happen before we can move it forward?",
      lead: "3 things are holding it up.",
      items: [
        { team: "Leasing", text: "The 9,000 SF footprint needs to remain for the prospective tenant." },
        { team: "Traffic", text: "Vehicle-turning analysis is still outstanding." },
        { team: "Legal", text: "The eastern utility easement still needs confirmation." },
      ],
      nextStep:
        "Complete the turning analysis and confirm the easement before Thursday's concept review.",
      sources: 4,
      sourceList: [
        "Development meeting · Feb 12",
        "Leasing email · May 18",
        "Traffic memo · Rev. 03",
        "Legal correspondence · Jan 27",
      ],
      actions: ["View sources", "Share"],
      share: ["sarah", "jordan", "emma"],
    },
    {
      id: "asset",
      category: "Asset Management",
      question: "Why was the remaining roof replacement deferred?",
      para: [
        "The remaining replacement was deferred during the 2024 capital review because the inspected areas were still performing adequately and the team prioritised the west roof section first.",
        "The deferred area was expected to be reassessed during the 2027 capital planning cycle.",
      ],
      facts: [
        { label: "Last inspection", value: "September 2026" },
        { label: "Warranty", value: "West section through 2029" },
        { label: "Next review", value: "2027 capital planning" },
      ],
      factsLabel: "Current state",
      sources: 3,
      sourceList: ["Capital plan", "Roof report", "Meeting notes"],
      actions: ["View history", "Share"],
      share: ["maya", "daniel"],
    },
    {
      id: "leasing",
      category: "Leasing",
      question: "What do we need to know before Thursday's tenant meeting?",
      lead: "3 items are relevant.",
      items: [
        { team: "", text: "The tenant requested the larger 9,000 SF footprint." },
        { team: "", text: "The latest concept preserves the requested area but requires an alternate loading arrangement." },
        { team: "", text: "Traffic analysis for that configuration is still outstanding." },
      ],
      note: "The previous proposal assumed a smaller footprint and should not be used for Thursday's discussion.",
      noteLabel: "Also relevant",
      sources: 5,
      sourceList: ["Tenant email", "Concept plan · Rev. 07", "Traffic memo", "Prior proposal", "Meeting notes"],
      actions: ["Prepare brief", "Share"],
      share: ["jordan", "sarah"],
    },
    {
      id: "operations",
      category: "Operations",
      question: "What's the history of RTU-4?",
      para: ["RTU-4 was installed in 2020. Since installation:"],
      timeline: [
        { year: "2022", text: "Compressor repair" },
        { year: "2024", text: "Recurring control issue reported" },
        { year: "2025", text: "Control board replaced" },
        { year: "2026", text: "No major deficiencies reported" },
      ],
      facts: [{ label: "Warranty expires", value: "March 2029" }],
      sources: 6,
      sourceList: ["Service records", "Commissioning report", "Warranty", "Inspection notes"],
      actions: ["Open equipment history", "Share"],
      share: ["daniel", "maya"],
    },
    {
      id: "portfolio",
      category: "Portfolio",
      question: "Have we looked at redeveloping this site before?",
      lead: "Yes. Two concepts were evaluated previously.",
      concepts: [
        {
          year: "2023",
          title: "Standalone retail pad",
          outcome: "Paused after servicing constraints were identified.",
        },
        {
          year: "2025",
          title: "Multi-tenant concept",
          outcome:
            "Not advanced because the proposed access configuration did not work with the site circulation plan.",
        },
      ],
      sources: 11,
      sourceList: ["2023 concept set", "Servicing memo", "2025 concept set", "Circulation review"],
      actions: ["View previous concepts", "Share"],
      share: ["sarah", "noah"],
    },
  ],

  share: {
    title: "Share this context",
    group: "South Pad Working Group",
    include: ["Summary", "Sources", "Open actions"],
    action: "Share context",
    add: "+ Add people",
    confirm: "Shared with the group.",
  },

  payoff: "One answer. Shared context across every team involved.",
} as const;

/* ------------------------------------------------------------------ *
 * OVER TIME — the same work, compounding.
 * ------------------------------------------------------------------ */
export const OVER_TIME = {
  label: "Over time",
  headline: ["Teams change.", "The property persists.", "Its context should too."],
  body: "Every decision, project, issue and piece of evidence captured through Provenance becomes part of a source-backed record that survives team turnover and future ownership.",

  today: {
    label: "With Provenance, your team can",
    items: [
      "Coordinate active work",
      "Capture decisions as they happen",
      "Track actions and deadlines",
      "Answer questions from the record",
      "Share context across departments",
    ],
  },
  later: {
    label: "And the property gains",
    items: [
      "Decision history",
      "Property timeline",
      "Historical rationale",
      "Source lineage",
      "Institutional memory",
    ],
  },

  turnover: [
    { who: "Acquisition lead", note: "Left", here: false },
    { who: "Asset manager", note: "On vacation", here: false },
    { who: "Development manager", note: "Still here", here: true },
    { who: "Leasing team", note: "Left", here: false },
  ],

  payoff: "The people move on. The record does not.",
} as const;

/* ------------------------------------------------------------------ *
 * FINAL CTA
 * ------------------------------------------------------------------ */
export const CTA = {
  headline: "Give every property a memory.",
  body: "Start with the work your team is already doing.",
  action: "Request early access",
} as const;

/* ------------------------------------------------------------------ *
 * THE PRODUCT SHOWCASE — the three things Provenance does, in one frame
 * ------------------------------------------------------------------ */
export const SHOWCASE = {
  label: "The product",
  headline: ["Track what's happening.", "Ask what happened.", "Surface what matters next."],
  body: "All three run on the same record. The work your team is already doing is what makes the other two possible.",
  modes: [
    {
      id: "track",
      label: "Track work",
      note: "Provenance connects decisions, actions, deadlines, documents and open issues across every team working on the property.",
    },
    {
      id: "ask",
      label: "Ask the property",
      note: "Ask a complicated question and Provenance answers it from the record, with the sources attached, so the answer can go straight to the teams that need it.",
    },
    {
      id: "surface",
      label: "Surface what matters",
      note: "The record notices what changed, connects it to what happened before, and says what is worth doing about it.",
    },
  ],
} as const;
