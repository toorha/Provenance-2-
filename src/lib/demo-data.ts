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
      meta: { from: "Priya Anand · Leasing", subject: "Re: South pad — footprint", context: "buried in a thread" },
      quote: "Reducing the building any further would compromise the current tenant opportunity.",
    },
    {
      id: "traffic",
      kind: "email",
      system: "Traffic consultant",
      when: "Last week",
      meta: { from: "Doyle & Associates", subject: "South pad — outstanding items", context: "attachment not opened" },
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
      meta: { from: "M. Rourke · Legal", subject: "South pad — title review", context: "may be superseded" },
      quote: "Utility easements along the eastern portion of the pad still need to be confirmed.",
    },
    {
      id: "plan",
      kind: "drawing",
      system: "Concept plan",
      when: "Rev 07",
      meta: { sheet: "SP-101", note: "not yet issued" },
      quote: "Alternate loading configuration under review.",
    },
    {
      id: "tracker",
      kind: "tracker",
      system: "Project tracker",
      when: "Updated 4 months ago",
      row: { project: "South Pad", status: "On Hold", owner: "—" },
      stale: true,
    },
    {
      id: "municipal",
      kind: "letter",
      system: "Municipal comments",
      when: "Resubmission pending",
      meta: { ref: "PL-2024-0391", body: "Planning & Development" },
      quote: "Additional servicing information required prior to resubmission.",
    },
  ],

  /* what it takes to answer one question */
  reconstruct: [
    "Message multiple people",
    "Search old emails",
    "Find the latest drawings",
    "Reopen consultant reports",
    "Read the meeting notes",
    "Work out which version is current",
    "Reconstruct why decisions were made",
    "Figure out what is still unresolved",
  ],

  closing: {
    lead: "The answer exists. It's scattered across people, files and time.",
    sub: "And every day spent reconstructing it is another day the property doesn't move forward.",
  },
} as const;

/* ------------------------------------------------------------------ *
 * ONE PROPERTY. MANY TEAMS. — who benefits, stated once.
 * ------------------------------------------------------------------ */
export const TEAMS = {
  label: "One memory",
  headline: "One property. Many teams. One memory.",
  chain: [
    "Acquisitions",
    "Asset management",
    "Operations",
    "Leasing",
    "Development",
    "Ownership transition",
  ],
  line: "Teams change. The property does not. Provenance carries the context forward.",
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

/* ------------------------------------------------------------------ *
 * THE MEMORY LAYER — everything captured feeds one growing memory.
 * ------------------------------------------------------------------ */
export const MEMORY_LAYER = {
  label: "The memory layer",
  headline: "Everything feeds the memory layer.",
  subhead:
    "Emails, meetings, reports, drawings, invoices and project records become structured property context inside Provenance.",

  sources: [
    { tag: "MAIL", glyph: "mail", label: "Email", type: "Outlook email", title: "Re: Roof review" },
    { tag: "MTG", glyph: "meeting", label: "Meeting notes", type: "Meeting notes", title: "Capital planning review" },
    { tag: "RPT", glyph: "report", label: "Report", type: "Consultant report", title: "Roof condition assessment" },
    { tag: "INV", glyph: "invoice", label: "Invoice", type: "Invoice", title: "Roof replacement, phase 1" },
    { tag: "PPT", glyph: "deck", label: "Slide deck", type: "Slide deck", title: "Redevelopment options" },
    { tag: "DWG", glyph: "drawing", label: "Drawing", type: "Drawing", title: "Roof plan, Rev. 04" },
    { tag: "DOC", glyph: "lease", label: "Lease memo", type: "Lease memo", title: "Anchor tenant expansion" },
  ],

  signals: [
    "Decision captured",
    "Action tracked",
    "Reason preserved",
    "Evidence linked",
    "Issue resolved",
  ],

  events: { from: 7, to: 10 },
  linkedSources: { from: 20, to: 28 },

  powers: ["Ask Provenance", "Daily Digest", "Signals", "Property history"],
} as const;

/* ------------------------------------------------------------------ *
 * ASK PROVENANCE — the memory is built, so the record can be asked.
 * ------------------------------------------------------------------ */
export const ASK_PROVENANCE = {
  headline: "Then just ask what happened.",
  intro:
    "The memory was built from the work the team already does, so Provenance answers from it directly. Not document search.",

  queries: [
    {
      id: "roof",
      kind: "History",
      q: "Why was the roof replacement phased?",
      answer:
        "The eastern roof section was replaced in 2018. The western section was intentionally deferred after the consultant assessed it as having about five years of useful life remaining.",
      sources: ["Building assessment", "Capital meeting", "Email thread", "Contractor invoice"],
      actions: ["View sources", "Open roof history"],
    },
    {
      id: "current",
      kind: "Current state",
      q: "What needs attention at Westmount Centre right now?",
      lead: "3 items need attention:",
      list: [
        "Consultant servicing plan is 6 days overdue",
        "Roof warranty expires in 42 days",
        "RTU-3 replacement is currently in progress",
      ],
    },
    {
      id: "decision",
      kind: "Decision context",
      q: "What did we decide in yesterday's capital meeting?",
      answer:
        "Proceed with the eastern roof replacement and request contractor pricing by September 12.",
      note: "2 actions created.",
    },
    {
      id: "prior",
      kind: "Prior knowledge",
      q: "Have we looked at a drive-through here before?",
      answer:
        "Yes. A QSR opportunity was evaluated in 2024 but paused because drive-through uses were not permitted under the zoning in effect at the time.",
      note: "The current zoning has since changed.",
    },
  ],

  payoff: "Current state. Past decisions. Original evidence. One place to ask.",
} as const;
