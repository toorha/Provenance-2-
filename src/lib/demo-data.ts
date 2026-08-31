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

export const PEOPLE = {
  alex: "Alex Morgan",
  jordan: "Jordan Lee",
  sarah: "Sarah Chen",
} as const;

export const ORGS = {
  planning: "Atlas Planning",
  engineering: "Northline Engineering",
  legal: "Meridian Legal",
  municipal: "Planning Department",
} as const;

export const EVIDENCE_TYPES = [
  "Email",
  "Meeting",
  "Report",
  "Invoice",
  "Lease",
  "Permit",
  "Drawing",
] as const;

/* ------------------------------------------------------------------ *
 * THE HIDDEN PROBLEM
 * ------------------------------------------------------------------ */
export const CONTEXT_DECAY = {
  label: "Context decay",
  headline:
    "Important property decisions are happening every day. Most of the context around them won't last.",
  body: "Every property generates a constant stream of emails, meetings, reports, actions and decisions. Without a system that captures what happened, why it happened, who owns the next step, and what remains unresolved, that context quickly gets scattered across people and tools.",
  payoff: "Keep track of what's happening now. Never lose why it happened.",
  consequence:
    "The next step gets missed, the reasoning is gone by the time it matters, and the same ground gets covered twice.",
  consequencePoints: [
    "Follow-ups slip because no one is tracking who owns them",
    "The reasoning behind a decision fades within months",
    "Work gets redone because the earlier answer was never written down",
  ],
  /* a current-day property workflow → what Provenance captures → memory */
  today: [
    "Meeting completed",
    "Decision captured",
    "Action assigned",
    "Deadline tracked",
    "Consultant follow-up overdue",
    "New report received",
    "Property record updated",
  ],
  captures: [
    "What happened",
    "What was decided",
    "Why",
    "Owner",
    "Due date",
    "Unresolved items",
    "Source evidence",
  ],
  addedTo: "Added to property memory",
} as const;

/* ------------------------------------------------------------------ *
 * ASK THE RECORD — interactive panel. Click a question, the property
 * record answers with its sources. Fictional data, Westmount Centre.
 * ------------------------------------------------------------------ */
export const ASK_PRESETS = [
  {
    id: "redevelopment",
    tag: "Redevelopment",
    chip: "Why we shelved the 2022 redevelopment concept",
    q: "Why did we abandon the 2022 redevelopment concept, and what would need to change for it to work today?",
    answer: [
      {
        label: "What happened",
        text: "The 2022 concept proposed two new retail pads and a revised access configuration for the north parcel.",
      },
      {
        label: "Why it stalled",
        text: "The municipality required a different access arrangement, the civil consultant identified servicing constraints, and the anchor tenant objected to the revised circulation plan.",
      },
      {
        label: "What has changed",
        text: "The anchor's exclusivity and signage provisions lapse in 2027, and the city updated its access standards in 2025.",
      },
      {
        label: "What this means now",
        text: "A revised concept is worth costing once the servicing question is retested against current standards.",
      },
    ],
    sources: [
      "2022 Concept Plan",
      "City Pre-Consultation Comments",
      "Civil Servicing Memo",
      "Anchor Lease",
      "2026 Planning Update",
    ],
  },
  {
    id: "roof",
    tag: "Capital planning",
    chip: "Roof condition and outstanding work",
    q: "What condition is the roof in, and what roof work is still outstanding?",
    answer: [
      {
        text: "The eastern section was replaced in 2014 and carries a manufacturer warranty through 2034. The western section was deferred at that time with about a decade of useful life remaining; the 2023 assessment rated it fair and projected replacement around 2028. On the rooftop units, RTU-3 was replaced in 2026 and units 1, 2 and 4 are budgeted for 2027.",
      },
    ],
    sources: [
      "2014 Roof invoice & warranty",
      "2023 Condition assessment",
      "2026 Capital plan",
      "Northline inspection report",
    ],
  },
  {
    id: "leasing",
    tag: "Leasing",
    chip: "Tenant restrictions on a repositioning",
    q: "Which tenant obligations or restrictions could affect a repositioning?",
    answer: [
      {
        text: "The anchor lease carries a full-line grocery use exclusivity and a co-tenancy clause tied to two of the three junior anchors. The exclusivity and a signage-control provision lapse in 2027. Three in-line tenants hold relocation clauses that demolition on the north parcel would trigger.",
      },
    ],
    sources: [
      "Anchor Lease (2011, amended 2019)",
      "Junior anchor leases",
      "In-line lease abstracts",
      "2024 Lease review",
    ],
  },
  {
    id: "environmental",
    tag: "Due diligence",
    chip: "Environmental and site conditions",
    q: "What environmental or site conditions would a buyer flag?",
    answer: [
      {
        text: "A Phase I completed in 2020 for the refinancing found no recognized environmental conditions and required no further action. A historical dry cleaner on a since-demolished outparcel was reviewed and closed out in that report. Separately, the north-parcel storm system is undersized for added density, which is noted in the servicing memo.",
      },
    ],
    sources: [
      "2020 Phase I ESA",
      "Consultant closure letter",
      "Lender correspondence",
      "Civil Servicing Memo",
    ],
  },
  {
    id: "hvac",
    tag: "Operations",
    chip: "Why the rooftop unit replacement is phased",
    q: "Why is the rooftop unit replacement split across two budget years?",
    answer: [
      {
        text: "Only RTU-3 failed inspection in 2026, so it was replaced right away. The other three units still had useful life, and replacing all four in one year would have pushed the capital budget past its cap, so units 1, 2 and 4 moved to the 2027 plan.",
      },
    ],
    sources: [
      "Northline inspection report",
      "Capital planning review",
      "RTU-3 invoice",
    ],
  },
] as const;

/* ------------------------------------------------------------------ *
 * SEE HOW PROVENANCE WORKS — one continuous product sequence
 * An email is captured, a meeting adds the reasoning, the property
 * memory grows, and months later the record answers a question.
 * ------------------------------------------------------------------ */
export const PRODUCT_SEQUENCE = {
  property: "Westmount Centre",

  phases: [
    "Email received",
    "Extracting",
    "Meeting linked",
    "Memory updated",
    "Answering",
  ],

  email: {
    from: `${PEOPLE.jordan} · ${ORGS.engineering}`,
    time: "Tue 2:03 PM",
    subject: "RTU-3 replacement recommended",
    lead: "RTU-3 failed its third inspection this year. We recommend ",
    highlight: "full replacement rather than another repair",
    tail: ". Estimate attached.",
  },
  emailExtract: [
    { label: "Property", value: "Westmount Centre" },
    { label: "Decision", value: "Replace RTU-3", tone: "accent" },
    { label: "Evidence", value: "Northline inspection report" },
    { label: "Action", value: "Issue PO to Northline" },
    { label: "Owner", value: PEOPLE.sarah },
    { label: "Due", value: "Oct 3" },
  ],

  meeting: {
    title: "Capital planning review",
    meta: "4 attendees · 26 min",
    summary:
      "The team approved RTU-3 now and moved the remaining three rooftop units into the 2027 plan, ",
    summaryHighlight: "rather than replacing all four this year",
    tail: ".",
  },
  meetingExtract: [
    { label: "Why", value: "Only RTU-3 had failed. The others still had useful life." },
    { label: "Action", value: "Budget units 1, 2 and 4 for 2027" },
  ],

  memory: {
    added: [
      { year: "2026", title: "RTU-3 replaced" },
      { year: "2027", title: "Rooftop units 1, 2, 4 planned" },
    ],
    priorYear: "2023",
    priorTitle: "HVAC replacement",
    eventsFrom: 11,
    eventsTo: 13,
    status: "Property memory updated",
  },

  /* what Provenance pulls out, split into the two kinds of value */
  currentWork: [
    { label: "Decision", value: "Replace RTU-3" },
    { label: "Owner", value: PEOPLE.sarah },
    { label: "Due", value: "Oct 3" },
    { label: "Open", value: "3 units deferred to 2027 plan" },
  ],

  ask: {
    when: "Later, when it matters",
    question: "Why didn't we replace all the rooftop units at once?",
    answer:
      "Only RTU-3 had failed inspection in 2026. The other three units still had useful life, so they were deferred to the 2027 capital plan to manage cash flow.",
    evidence: ["Northline inspection report", "Capital planning review", "RTU-3 invoice"],
  },
} as const;

/* ------------------------------------------------------------------ *
 * THE PRODUCT — Daily Digest, proactive signals, signal detail, property
 * Memory -> Detection -> Recommendation -> Action
 * ------------------------------------------------------------------ */
export const PRODUCT = {
  label: "The product",
  headline: "Useful today. Smarter over time.",
  body: "Provenance opens on a briefing of what changed across your portfolio, why each change matters against everything the property already knows, and what to do next.",

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
 * THE MEMORY LAYER  (system diagram)
 * Many kinds of work feed a single Provenance memory layer, which turns
 * them into a growing property record. Ends with a later question.
 * ------------------------------------------------------------------ */
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
        { label: "To", value: `${PEOPLE.jordan} · ${ORGS.engineering}` },
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

export const MEMORY_LAYER = {
  label: "The memory layer",
  headline: "Everything feeds the memory layer.",
  subhead:
    "Emails, meetings, reports and project records all become structured property context inside Provenance.",
  payoff: "Fragmented work in. One living, source-backed memory of the property out.",

  /** the fragmented sources, arranged in an arc feeding inward */
  sources: [
    { tag: "MAIL", glyph: "mail", label: "Email", type: "Outlook email", title: "Re: Roof review" },
    { tag: "MTG", glyph: "meeting", label: "Meeting notes", type: "Meeting notes", title: "Capital planning review" },
    { tag: "RPT", glyph: "report", label: "Report", type: "Consultant report", title: "Roof condition assessment" },
    { tag: "INV", glyph: "invoice", label: "Invoice", type: "Invoice", title: "Roof replacement, phase 1" },
    { tag: "PPT", glyph: "deck", label: "Slide deck", type: "Slide deck", title: "Redevelopment options" },
    { tag: "DWG", glyph: "drawing", label: "Drawing", type: "Drawing", title: "Roof plan, Rev. 04" },
    { tag: "DOC", glyph: "lease", label: "Lease memo", type: "Lease memo", title: "Anchor tenant expansion" },
  ],

  /** structured signals the layer produces, one per source it reads */
  signals: [
    "Property identified",
    "Event detected",
    "Decision captured",
    "Action created",
    "Evidence linked",
  ],

  /** the centre — the memory layer, which grows as sources feed */
  events: { from: 7, to: 14 },
  linkedSources: { from: 20, to: 34 },

  /** what the memory layer powers */
  outputs: [
    { label: "Property Memory", sub: "what happened and why" },
    { label: "Ask Provenance", sub: "answers with sources" },
    { label: "Daily Digest", sub: "what changed today" },
    { label: "Signals", sub: "what needs attention" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * ONE PROPERTY. YEARS OF CONTEXT.
 * ------------------------------------------------------------------ */
export const PROPERTY_TIMELINE = [
  {
    year: "2012",
    fn: "Acquisitions",
    phase: "Property acquired",
    zone: null,
    what: "Westmount Centre is purchased and set up in Provenance with title, financing terms and a condition baseline.",
    why: "A clean starting record so every later decision has a reference point.",
    evidence: ["Purchase agreement", "Condition survey", "Title file"],
  },
  {
    year: "2014",
    fn: "Capital projects",
    phase: "Roof capital project",
    zone: "roof",
    what: "Northline assesses the roof. The team approves phase 1 over the eastern section rather than a full replacement.",
    why: "The western membrane still had useful life. Phasing the work deferred roughly $400K.",
    evidence: ["Roof assessment", "Capital meeting", "Invoice", "Warranty"],
  },
  {
    year: "2017",
    fn: "Leasing",
    phase: "Tenant expansion",
    zone: "retail",
    what: "An adjoining unit is combined with an existing tenant's space. Meridian handles the lease amendment.",
    why: "The tenant needed room to renew. Keeping them avoided nine months of downtime on the unit.",
    evidence: ["Lease amendment", "Space plan", "Building permit"],
  },
  {
    year: "2020",
    fn: "Asset management",
    phase: "Environmental review",
    zone: "ground",
    what: "A Phase I environmental assessment is completed ahead of refinancing. No further action required.",
    why: "The lender required a current report. Findings attach to the site, not a folder.",
    evidence: ["Phase I report", "Consultant letter", "Lender correspondence"],
  },
  {
    year: "2023",
    fn: "Operations",
    phase: "HVAC replacement",
    zone: "rooftop",
    what: "Four rooftop units are replaced over two quarters. Warranties and commissioning reports are captured per unit.",
    why: "The units were past end of life and driving up service calls.",
    evidence: ["Equipment schedule", "Invoices", "Warranties", "Commissioning reports"],
  },
  {
    year: "2026",
    fn: "Development",
    phase: "Redevelopment review",
    zone: "parcel",
    what: "Atlas studies adding density on the north parcel. A pre-application meeting with the Planning Department opens the file.",
    why: "Land values support a second phase. Early feedback shapes what is worth pursuing.",
    evidence: ["Concept drawings", "Pre-application notes", "Municipal correspondence"],
  },
] as const;

/* The property record is not just history — it has a live current state. */
export const PROPERTY_CURRENT = {
  happeningNow: [
    "RTU-3 replacement in progress with Northline",
    "Redevelopment feasibility on the north parcel",
  ],
  open: [
    "Revised servicing plan is unresolved",
    "3 rooftop units deferred to the 2027 plan",
  ],
  needsAttention: [
    "Consultant deliverable is 6 days overdue",
    "Roof warranty expires in 42 days",
  ],
  changedRecently: [
    "Drive-through zoning now permitted",
    "Survey scope decision captured today",
  ],
} as const;

export const MEMORY_QUERY = {
  question: "Why was the 2014 roof project phased?",
  answer:
    "The western membrane still had useful life, so only the eastern section was replaced. Phasing the work deferred roughly $400K.",
  sourceCount: 4,
  aside: "The context that was captured the day it happened is still here, still usable.",
} as const;
