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
  headline: ["Keep track of what's happening now.", "Never lose why it happened."],
  body: "Provenance helps property teams capture decisions, coordinate active work and preserve context across every asset in the portfolio.",
  primary: "Request early access",
  secondary: "See how it works",
  caption: "Active work across the portfolio, and the context behind it.",
} as const;

/** the hero field: a few properties with the work currently attached to
 *  them. Reads as a still — no sequence to sit through. */
export const PORTFOLIO_FIELD = [
  {
    id: "westmount",
    name: "Westmount Centre",
    plan: "anchored",
    people: ["sarah", "emma"],
    work: [
      { team: "Development", item: "Concept review" },
      { team: "Legal", item: "Easement outstanding", live: true },
    ],
  },
  {
    id: "riverstone",
    name: "Riverstone Plaza",
    plan: "plaza",
    people: ["jordan"],
    work: [{ team: "Leasing", item: "Tenant revision" }],
  },
  {
    id: "oakridge",
    name: "Oakridge Centre",
    plan: "strip",
    people: ["daniel", "sarah"],
    work: [
      { team: "Operations", item: "Roof issue" },
      { team: "Task", item: "Due Thursday" },
    ],
  },
  {
    id: "harbour",
    name: "Harbour Point",
    plan: "mixed",
    people: ["noah"],
    work: [{ team: "Planning", item: "Municipal comments" }],
  },
  {
    id: "cedar",
    name: "Cedar Park",
    plan: "pad",
    people: ["maya"],
    work: [{ team: "Asset Management", item: "Capex decision" }],
  },
  {
    id: "northline",
    name: "Northline Centre",
    plan: "redev",
    people: ["sarah", "jordan"],
    work: [{ team: "Meeting", item: "Decision captured" }],
  },
] as const;
/* ------------------------------------------------------------------ *
 * CONTEXT DECAY — the problem, stated once.
 * ------------------------------------------------------------------ */
export const CONTEXT_DECAY = {
  label: "Context decay",
  headline: "Everyone knows a piece. No one knows the whole thing.",
  body: "Property context is constantly being created across meetings, emails, documents, consultants and different teams. The information usually exists. Getting enough of it together to actually make a decision is the hard part.",
  question: "What's actually going on with the south pad?",

  /* the fragments that hold parts of the answer, each in a different
     place, created at a different time, owned by a different person */
  fragments: [
    {
      id: "leasing",
      kind: "email",
      system: "Leasing",
      when: "3 months ago",
      meta: { from: "Jordan Lee · Leasing", subject: "Re: South pad — footprint", context: "buried in a thread" },
      quote: "Reducing the building any further would compromise the current tenant opportunity.",
    },
    {
      id: "traffic",
      kind: "email",
      system: "Traffic consultant",
      when: "Last week",
      meta: { from: "Northline Engineering", subject: "South pad — outstanding items", context: "attachment not opened" },
      quote: "Vehicle-turning analysis is still outstanding.",
    },
    {
      id: "meeting",
      kind: "notes",
      system: "Meeting notes",
      when: "Feb 12",
      meta: { title: "Development review", attendees: "Dev, Leasing, Planning" },
      quote: "Team agreed to preserve the larger building footprint and test an alternate loading configuration.",
    },
    {
      id: "legal",
      kind: "email",
      system: "Legal",
      when: "8 months ago",
      meta: { from: "Emma Clarke · Legal", subject: "South pad — title review", context: "may be superseded" },
      quote: "Utility easements along the eastern portion of the pad still need to be confirmed.",
    },
  ],

  closing: {
    lead: "The answer exists. It's scattered across people, files and time.",
    sub: "And every day spent reconstructing it is another day the property doesn't move forward.",
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
      why: "Blocks the South Pad review on Thursday.",
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
      why: "Emails, meeting notes and reports across 3 properties.",
      meta: "3 properties",
      action: "Review updates",
    },
  ],

  payoff: "One property. Many teams. Shared context.",
} as const;
export const PRODUCT = {
  label: "What it can do today",
  headline: "For the work happening right now.",
  body: "Provenance keeps track of decisions, actions, deadlines, documents and unresolved issues across every property, and preserves the context behind them.",

  digest: {
    label: "Daily Digest",
    greeting: "Good morning, Alex",
    summary: "5 things need your attention across 24 properties.",
    meta: "Updated 8:30 AM",
  },

  signals: [
    {
      id: "zoning",
      status: "New opportunity",
      tone: "opportunity",
      property: "Westmount Centre",
      headline: "Drive-through uses are now permitted at Westmount Centre",
      highlight: "Drive-through uses",
      whySeeing:
        "A zoning restriction was the primary reason this opportunity was paused in 2024.",
      recommendation:
        "Revisit the prior concept and confirm whether the remaining constraints still apply.",
      actions: ["Review opportunity", "Schedule meeting"],
      dismissible: true,
      detail: {
        whatChanged: "A local zoning amendment now permits drive-through uses.",
        whyMatters:
          "A 2024 QSR opportunity at this property was previously abandoned because the use was not permitted.",
        whySurfaced:
          "The new zoning change directly resolves the primary reason the prior deal was paused.",
        prior: {
          title: "2024 QSR opportunity",
          status: "Paused",
          reason: "Drive-through use not permitted",
        },
        sources: ["2024 deal history", "Prior zoning review", "Current by-law amendment"],
        recommendation:
          "Revisit the former concept and confirm whether the remaining deal constraints still apply.",
      },
    },
    {
      id: "consultant",
      status: "Overdue",
      tone: "overdue",
      property: "Westmount Centre",
      headline: "Consultant deliverable is 6 days late",
      why: "The revised servicing plan is required before the next submission.",
      actions: ["Draft follow-up", "Open task"],
    },
    {
      id: "decision",
      status: "Decision captured",
      tone: "info",
      property: "Westmount Centre",
      headline: "Proceed with updated survey scope",
      why: "Recorded from this morning's site review, with the reasoning and owner attached.",
      actions: ["Open decision"],
    },
    {
      id: "warranty",
      status: "Due soon",
      tone: "attention",
      property: "Westmount Centre",
      headline: "Roof warranty expires in 42 days",
      why: "An unresolved deficiency was recorded during the last inspection.",
      actions: ["Start warranty review", "View history"],
    },
    {
      id: "records",
      status: "Memory updated",
      tone: "info",
      property: "Westmount Centre",
      headline: "6 new records added to Westmount Centre",
      why: "New emails, meeting notes, reports and invoices updated the property record.",
      actions: ["Review updates"],
    },
  ],

  meeting: {
    title: "Revisit 2024 QSR Opportunity",
    agenda: [
      "Review zoning amendment",
      "Revisit prior deal constraints",
      "Confirm updated feasibility",
      "Decide whether to reopen the opportunity",
    ],
    attendees: ["Development", "Leasing", "Planning"],
    created: "Meeting created and saved to Westmount Centre",
  },

  property: {
    name: "Westmount Centre",
    address: "1840 Westmount Avenue · Hamilton, ON",
    status: "Active · monitored",
    /* current state — what is live right now, not history */
    current: {
      openItems: [
        "Revised servicing plan is unresolved",
        "RTU-3 replacement PO awaiting sign-off",
        "QSR feasibility not yet scheduled",
      ],
      needsAttention: [
        "Consultant deliverable 6 days overdue",
        "Roof warranty expires in 42 days",
      ],
      changedRecently: [
        "Drive-through zoning permitted (today)",
        "Survey scope decision captured (today)",
        "6 records added yesterday",
      ],
    },
    overview: {
      recentDecisions: [
        "RTU-3 replacement approved",
        "Redevelopment review opened",
      ],
      deadlines: [
        "Revised servicing plan — 6 days overdue",
        "Roof warranty review — due in 42 days",
      ],
      updates: [
        "Zoning amendment recorded",
        "6 records added yesterday",
        "Capital planning notes linked",
      ],
    },
    memory: [
      { year: "2026", title: "Drive-through zoning changed", sources: 3 },
      {
        year: "2024",
        title: "QSR opportunity paused",
        note: "Reason: drive-through use not permitted",
        sources: 7,
      },
      { year: "2023", title: "HVAC replacement", note: "RTU-4 replaced", sources: 4 },
      {
        year: "2020",
        title: "Environmental review",
        note: "No further action required",
        sources: 5,
      },
    ],
    documents: [
      { name: "Current zoning amendment", kind: "By-law", date: "2026" },
      { name: "2024 QSR term sheet", kind: "Deal", date: "2024" },
      { name: "Prior zoning review", kind: "Report", date: "2024" },
      { name: "Roof condition assessment", kind: "Report", date: "2023" },
      { name: "RTU-4 commissioning report", kind: "Report", date: "2023" },
      { name: "Phase I environmental assessment", kind: "Report", date: "2020" },
    ],
    tasks: [
      { title: "Draft consultant follow-up", owner: "Alex Morgan", due: "6 days overdue", status: "Open" },
      { title: "Prepare roof warranty review", owner: "Sarah Chen", due: "In 42 days", status: "Open" },
      { title: "Confirm QSR feasibility", owner: "Development", due: "Not scheduled", status: "New" },
    ],
  },

  portfolio: [
    { name: "Westmount Centre", city: "Hamilton, ON", signals: 3, active: true },
    { name: "Harbour Industrial Park", city: "Burlington, ON", signals: 1, active: false },
    { name: "Kingsway Office Tower", city: "Toronto, ON", signals: 0, active: false },
    { name: "Northgate Retail Plaza", city: "Kitchener, ON", signals: 2, active: false },
    { name: "Riverside Distribution Centre", city: "London, ON", signals: 0, active: false },
  ],
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
  body: "Three things, one record. The work your team is already doing is what makes the other two possible.",
  modes: [
    {
      id: "track",
      label: "Track work",
      note: "Decisions, actions, deadlines, documents and open issues, connected across every team working on the property.",
    },
    {
      id: "ask",
      label: "Ask the property",
      note: "Complicated questions, answered from the record with the sources attached, then shared with the teams that need them.",
    },
    {
      id: "surface",
      label: "Surface what matters",
      note: "The record notices what changed, connects it to what happened before, and says what is worth doing about it.",
    },
  ],
} as const;
