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
  headline: [
    "Keep track of what is happening now.",
    "Never lose why it happened.",
  ],
  body: "Vera is the AI teammate for teams running commercial real estate, keeping work connected across your portfolio while building the memory behind every property.",
  primary: "Request early access",
  secondary: "See how it works",
} as const;

/* ------------------------------------------------------------------ *
 * CONTEXT DECAY — the problem, stated once.
 * ------------------------------------------------------------------ */
export const VERA = {
  label: "Meet Vera",
  headline: "Your AI teammate across every function of your portfolio.",
  body: "Vera works where your teams already work, capturing decisions, tracking actions, filing documents, answering questions and surfacing what matters across development, leasing, asset management, operations, legal and planning.",

  /* the three jobs, named the way the product frame names them */
  jobs: [
    {
      id: "track",
      name: "Track the work",
      teaser: "Every team on one property record",
      line: "Decisions, actions, deadlines, meetings, open issues and documents, held in one place per property.",
    },
    {
      id: "ask",
      name: "Ask Vera",
      teaser: "Answers with the sources attached",
      line: "Ask a complicated question in plain language and get a structured answer with its sources attached.",
    },
    {
      id: "surface",
      name: "Proactive Insights",
      teaser: "What needs attention next",
      line: "Vera notices what changed, connects it to what happened before, and says what is worth doing next.",
    },
  ],

  /* the bridge from today to over time */
  bridge: {
    line: "Everything Vera learns builds Provenance.",
    today: "Vera helps your teams work today.",
    later:
      "Provenance becomes the persistent, source-backed memory of the property over time.",
    payoff: ["Useful from day one.", "More valuable with every decision."],
  },
} as const;

/* ------------------------------------------------------------------ *
 * CONTEXT DECAY — the problem, stated once.
 * ------------------------------------------------------------------ */
export const CONTEXT_DECAY = {
  label: "The problem",
  headline: ["Simple questions shouldn't", "require a scavenger hunt."],

  body: [
    "A property can have years of emails, meetings, reports, decisions and different teams behind it.",
    "So when someone asks a basic question, the answer is often spread across different people and places.",
  ],

  /* three questions anyone would recognise, covering past decisions,
     equipment history and current blockers, though the page never
     says so */
  questions: [
    "What was the issue with the last submission, and what are we doing differently now?",
    "When was this equipment last serviced, and what was done?",
    "What is still outstanding before this can move ahead?",
  ],

  closing: {
    lead: ["The information usually exists.", "The answer is scattered."],
    sub: "You shouldn't have to reconstruct the story before you can move the property forward.",
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
      meta: "Filed automatically by Vera",
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
      id: "followup",
      kind: "Follow-up",
      tone: "attention",
      title: "Consultant deliverable has not been received",
      why: "The revised turning analysis was due six days ago.",
      meta: "Northline Engineering",
      action: "Send a reminder",
    },
    {
      id: "records",
      kind: "Document",
      tone: "info",
      title: "8 new records filed across 3 properties",
      why: "Vera filed emails, meeting notes and reports against the properties they belong to.",
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
  label: "How Vera works",
  headline: "Vera works where your teams already work.",
  strap: "CC Vera. Invite Vera. Forward it to Vera. Ask Vera.",
  body: "No new system to keep up to date. Vera picks the work up in the tools your teams are already in, files it against the right property, and confirms what it did.",

  methods: [
    {
      id: "email",
      nav: "Email",
      tool: "Mail",
      title: "CC Vera on an email",
      kind: "New message",
      fields: [
        { label: "To", value: `${PEOPLE.jordan.name} · ${ORGS.engineering}` },
        { label: "Cc", value: "vera@provenance.ai", accent: true },
        { label: "Subject", value: "RTU-3 replacement recommended" },
      ],
      body: "RTU-3 failed its third inspection this year. We recommend full replacement rather than another repair.",
      result: "Vera captured it",
      captured: [
        { label: "Property matched", value: "Westmount Centre" },
        { label: "Captured", value: "Replacement recommended over repair" },
        { label: "Owner", value: "Daniel Kim · Operations" },
      ],
      updated: "Westmount Centre → HVAC",
    },
    {
      id: "meeting",
      nav: "Calendar",
      tool: "Calendar",
      title: "Invite Vera to a meeting",
      kind: "Calendar invite",
      fields: [
        { label: "Event", value: "South Pad Review" },
        { label: "When", value: "Thursday · 2:00 PM" },
        { label: "Guests", value: "Alex, Sarah, Jordan, Vera", accent: true },
      ],
      body: "Vera joins, takes the notes, and separates what was decided from what was only discussed.",
      result: "Vera captured the notes",
      captured: [
        { label: "Decision", value: "Preserve 9,000 SF footprint" },
        { label: "Action", value: "Complete turning analysis" },
        { label: "Owner", value: "Sarah Chen · Development" },
        { label: "Open issue", value: "Utility easement confirmation" },
      ],
      updated: "Westmount Centre → South Pad",
    },
    {
      id: "forward",
      nav: "Document",
      tool: "Mail",
      title: "Forward a document to Vera",
      kind: "Forwarded message",
      fields: [
        { label: "To", value: "vera@provenance.ai", accent: true },
        { label: "Subject", value: "Fwd: RTU-4 warranty" },
        { label: "Attached", value: "RTU-4 Warranty.pdf" },
      ],
      body: "Vera reads the document, files it where it belongs, and pulls out the dates that will matter later.",
      result: "Vera filed it",
      filedTo: ["Westmount Centre", "HVAC", "RTU-4", "Warranty"],
      captured: [{ label: "Extracted", value: "Warranty expiry · March 2029" }],
      updated: "Equipment history updated",
    },
    {
      id: "tell",
      nav: "Ask Vera",
      tool: "Vera",
      title: "Ask Vera a question",
      kind: "Message to Vera",
      fields: [{ label: "You", value: "What is holding up the south pad?" }],
      body: "Plain language works. Vera answers from the record and shows what it drew on.",
      result: "Vera answered",
      captured: [
        { label: "Answered from", value: "4 linked sources" },
        { label: "Blocked by", value: "Turning analysis, utility easement" },
      ],
      updated: "Answer and sources saved to the record",
    },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * INPUTS -> PROPERTY MEMORY -> OUTPUTS
 * The work goes in, structure accumulates, useful work comes back out.
 * ------------------------------------------------------------------ */
export const MEMORY_LAYER = {
  label: "Vera and Provenance",
  headline: ["Everything Vera learns", "builds Provenance."],
  subhead:
    "The work arrives in the tools your teams already use. Vera captures it, connects it and tracks it. What accumulates underneath is Provenance, the persistent memory of the property, which comes back out as answers, tasks and context.",

  /** the middle of the diagram is two things, not one */
  vera: {
    name: "Vera",
    role: "The AI teammate",
    does: ["captures", "connects", "understands", "tracks"],
  },

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
      adds: {
        kind: "Decision",
        title: "South pad footprint preserved",
        meta: "Feb 12",
      },
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
      adds: {
        kind: "Open action",
        title: "Turning analysis",
        meta: "Sarah Chen · Thu",
      },
    },
    {
      id: "report",
      glyph: "report",
      label: "Report",
      title: "Traffic memo · Rev. 03",
      at: { x: 15, y: 60 },
      steps: [
        { kind: "Constraint linked", value: "South pad loading configuration" },
      ],
      adds: {
        kind: "Issue",
        title: "Turning analysis outstanding",
        meta: "Open",
      },
    },
    {
      id: "drawing",
      glyph: "drawing",
      label: "Drawing",
      title: "Concept plan · Rev. 07",
      at: { x: 1, y: 84 },
      steps: [{ kind: "Revision identified", value: "South pad · Rev. 07" }],
      adds: {
        kind: "Property event",
        title: "Concept Rev. 07 received",
        meta: "Evidence linked",
      },
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
      steps: [
        { kind: "Issue updated", value: "Servicing information required" },
      ],
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
      kind: "Ask Vera",
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
  structure: [
    "Property matched",
    "Decisions linked",
    "Actions tracked",
    "Evidence connected",
  ],

  /** the three phases, named */
  phases: ["Work in", "Vera builds Provenance", "Work out"],

  payoff: [
    "Vera works with your teams.",
    "Provenance remembers for the property.",
  ],
} as const;

/* ------------------------------------------------------------------ *
 * ASK PROVENANCE — one strong question, sourced, shareable.
 * ------------------------------------------------------------------ */
export const ASK_PROVENANCE = {
  label: "Ask Vera",
  headline: "Ask Vera.",
  intro:
    "You are not searching documents. You are asking Vera what happened, and getting the story with its sources attached.",

  /** five questions, one per part of the organisation */
  cases: [
    {
      id: "development",
      category: "Development",
      question:
        "What's holding up the south pad, and what needs to happen before we can move it forward?",
      lead: "3 things are holding it up.",
      items: [
        {
          team: "Leasing",
          text: "The 9,000 SF footprint needs to remain for the prospective tenant.",
        },
        {
          team: "Traffic",
          text: "Vehicle-turning analysis is still outstanding.",
        },
        {
          team: "Legal",
          text: "The eastern utility easement still needs confirmation.",
        },
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
        {
          team: "",
          text: "The tenant requested the larger 9,000 SF footprint.",
        },
        {
          team: "",
          text: "The latest concept preserves the requested area but requires an alternate loading arrangement.",
        },
        {
          team: "",
          text: "Traffic analysis for that configuration is still outstanding.",
        },
      ],
      note: "The previous proposal assumed a smaller footprint and should not be used for Thursday's discussion.",
      noteLabel: "Also relevant",
      sources: 5,
      sourceList: [
        "Tenant email",
        "Concept plan · Rev. 07",
        "Traffic memo",
        "Prior proposal",
        "Meeting notes",
      ],
      actions: ["Prepare brief", "Share"],
      share: ["jordan", "sarah"],
    },
    {
      id: "operations",
      category: "Operations",
      question: "What's the history of RTU-4?",
      para: ["The full service history for RTU-4:"],
      timeline: [
        { year: "2020", text: "Installed" },
        { year: "2022", text: "Compressor repair" },
        { year: "2024", text: "Recurring control issue reported" },
        { year: "2025", text: "Control board replaced" },
        { year: "2026", text: "No major deficiencies reported" },
      ],
      facts: [{ label: "Warranty expires", value: "March 2029" }],
      sources: 6,
      sourceList: [
        "Service records",
        "Commissioning report",
        "Warranty",
        "Inspection notes",
      ],
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
      sourceList: [
        "2023 concept set",
        "Servicing memo",
        "2025 concept set",
        "Circulation review",
      ],
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
  label: "Provenance over time",
  headline: [
    "Teams change.",
    "The property persists.",
    "Its context should too.",
  ],
  body: "Every decision, project, issue and source captured through Vera becomes part of a property record that survives team turnover and keeps accumulating over the life of the asset.",

  /** the property stays; the roles around it rotate */
  roles: [
    { who: "Acquisitions", note: "Moved on" },
    { who: "Development", note: "Second manager" },
    { who: "Asset Management", note: "Changed twice" },
    { who: "Operations", note: "Still here" },
    { who: "Consultants", note: "Three firms" },
    { who: "Owner", note: "One sale" },
  ],

  constant: {
    label: "Constant",
    name: "Westmount Centre",
    note: "The record stays attached to the property.",
  },

  payoff: "The people move on. The record does not.",
} as const;

/* ------------------------------------------------------------------ *
 * FAQ — the questions the distinction has to survive
 * ------------------------------------------------------------------ */
export const FAQ = {
  label: "Questions",
  headline: "Questions, answered.",
  items: [
    {
      q: "Why can I not just use ChatGPT or Claude?",
      a: [
        "General AI can read a set of documents in a conversation.",
        "Vera works continuously with your team, capturing the property work happening across emails, meetings, documents and decisions.",
        "That activity builds Provenance, an ongoing source-backed record that becomes richer as the property changes and can, if the owner chooses, transfer with the asset in the future.",
      ],
    },
    {
      q: "How does Provenance handle privacy and sensitive information?",
      a: [
        "Access is controlled by your organisation.",
        "Teams can decide who can view specific records, answers and shared context, so sensitive information does not need to be available to everyone.",
      ],
    },
    {
      q: "What data does Provenance collect?",
      a: [
        "Provenance builds context from the information your organisation chooses to provide or connect, including emails, meetings, reports, drawings, documents, decisions and tasks.",
        "It is focused on property-related work, not unrelated personal information.",
      ],
    },
    {
      q: "Do we need to change how our team already works?",
      a: [
        "No.",
        "Vera is designed to work alongside existing workflows. Teams can CC Vera on emails, invite Vera to meetings, forward documents and interact with Vera alongside the tools they already use.",
      ],
    },
    {
      q: "Does Provenance replace our project or document management software?",
      a: [
        "Not necessarily.",
        "Those systems help manage tasks or store documents.",
        "Vera connects the decisions, actions, people and documents around a property, while Provenance preserves the context behind that work over time.",
      ],
    },
    {
      q: "Does everything transfer if a property is sold?",
      a: [
        "No. Any transfer is permissioned.",
        "Property-level history and evidence can move with the asset if the owner chooses, while internal underwriting, negotiations, strategy, returns and other company-specific information can remain private.",
      ],
    },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * ONBOARDING — the brief a new consultant gets instead of a week of
 * meetings. Same fictional property, same fictional firm.
 * ------------------------------------------------------------------ */
export const ONBOARDING = {
  label: "Onboarding",
  headline: "Bring new people up to speed faster.",
  body: "Give consultants and new team members the property history, active decisions, open issues, prior work and supporting sources they need, without rebuilding the story from scratch.",

  ask: "Bring Northline Engineering up to speed on the south pad before Thursday's kickoff.",

  brief: {
    property: "Westmount Centre",
    title: "South pad consultant brief",
    sections: [
      {
        label: "Current objective",
        lines: ["Advance the revised concept for internal review."],
      },
      {
        label: "Key decision",
        lines: ["Preserve the 9,000 SF tenant footprint."],
      },
      {
        label: "Open issues",
        lines: ["Vehicle-turning analysis", "Utility easement confirmation"],
      },
      {
        label: "Previous work",
        lines: [
          "Concept Rev. 05",
          "Concept Rev. 07",
          "Municipal comments",
          "Previous traffic review",
        ],
      },
    ],
    sources: "12 linked records",
    action: "Share with Northline Engineering",
  },

  payoff:
    "A new consultant should not need someone to manually rebuild six months of history before they can start useful work.",
} as const;

/* ------------------------------------------------------------------ *
 * FINAL CTA
 * ------------------------------------------------------------------ */
export const CTA = {
  headline: "Give every property a memory.",
  body: "Start with the work your team is already doing.",
  call: "Request early access",
  callUrl: "https://cal.com/harnav-toor-rninws",
} as const;

/* ------------------------------------------------------------------ *
 * THE PRODUCT SHOWCASE — the three things Provenance does, in one frame
 * ------------------------------------------------------------------ */
export const SHOWCASE = {
  label: "What Vera does",
  headline: ["Track the work.", "Ask Vera.", "Proactive Insights."],
  body: "Three modes of the same product, running on the same record. The work your team is already doing is what makes the other two possible.",
  modes: [
    {
      id: "track",
      label: "Track the work",
      note: "One property, many functions, one shared operating view. Vera keeps decisions, actions, deadlines, documents and open issues together across every team touching the asset.",
    },
    {
      id: "ask",
      label: "Ask Vera",
      note: "Ask in plain language. Vera answers from the record, with the sources attached, so the answer can go straight to the teams that need it.",
    },
    {
      id: "surface",
      label: "Proactive Insights",
      note: "Vera notices what changed, connects it to what happened before, and says what is worth doing about it.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * THESIS — the belief under the product. Its own page, deliberately,
 * so the homepage does not have to carry it.
 * ------------------------------------------------------------------ */
export const THESIS = {
  eyebrow: "Thesis",
  headline: [
    "Buildings outlive the people who work on them.",
    "Their memory should too.",
  ],

  opening:
    "A commercial property can exist for decades. Over that time, owners change, employees leave, consultants rotate, systems are replaced, projects are paused and restarted, and thousands of decisions accumulate around the asset.",

  /* the idea the rest of the argument rests on: the volume grows while the
     people who understand it keep changing */
  accumulation: {
    lead: "The longer a property exists, the more context it accumulates.",
    body: "Emails, reports, drawings, leases, approvals, project decisions, capital work, consultant advice, operational history, legal context and ownership history all build up around the asset. The volume grows every year. The people who understand it do not stay.",
  },

  /* what happens to a building across a few decades */
  churn: {
    label: "Across the life of a property",
    items: [
      "Owners change",
      "Employees leave",
      "Consultants rotate",
      "Development ideas are paused and revisited",
      "Capital work is completed or deferred",
      "Leases change",
      "Systems are repaired and replaced",
      "Municipal approvals evolve",
      "Hundreds of decisions are made",
    ],
  },

  pivot: {
    lead: [
      "The files often survive.",
      "The reasoning connecting them does not.",
    ],
    body: "Over time, that creates corporate amnesia. The organization keeps the records, but loses why decisions were made, what was tried, what changed, and what still matters.",
  },

  belief: {
    lead: [
      "Property knowledge should accumulate.",
      "It should not reset every time a team changes.",
    ],
  },

  /* how the product follows from the belief */
  model: {
    label: "The model",
    steps: [
      { name: "Work happens", note: "Emails, meetings, documents, decisions." },
      {
        name: "Vera captures the context",
        note: "In the work teams already do.",
      },
      {
        name: "Provenance builds the property memory",
        note: "Source-backed and connected over time.",
      },
      {
        name: "The memory compounds",
        note: "Every new decision starts with what the property already knows.",
      },
    ],
  },

  /* one is active, one is persistent, and they are one system */
  roles: {
    label: "Vera and Provenance",
    line: "Vera works with the team. Provenance remembers for the property.",
    items: [
      {
        name: "Vera",
        note: "The active intelligence. Vera reads, listens, captures, connects, understands and surfaces.",
      },
      {
        name: "Provenance",
        note: "The persistent memory. Provenance preserves, accumulates, connects history and keeps the evidence across time.",
      },
    ],
  },

  horizons: [
    {
      label: "Today",
      lead: "Vera helps teams",
      items: [
        "Answer property questions",
        "Track decisions and open issues",
        "Prepare for meetings",
        "Share context across teams",
        "Onboard new people faster",
        "Surface risks and opportunities",
      ],
    },
    {
      label: "Over time",
      lead: "Provenance becomes",
      items: [
        "Decision history",
        "Property history",
        "Project memory",
        "Source-backed rationale",
        "Context across team changes",
        "Continuity across ownership",
      ],
    },
  ],

  payoff: ["Useful today.", "Compounding over the life of the property."],

  /* the part that has to be stated carefully */
  transfer: {
    label: "On transfer",
    headline: "If a property changes hands, the history can go with it.",
    body: "The owner chooses what property-level history and evidence transfers with the asset. Internal strategy, underwriting, negotiations, returns, and other company-specific context can remain private.",
    close:
      "The next owner should not always need to rebuild the history of the property from zero.",
  },

  /* the distinction that makes the transfer answer credible */
  memory: {
    label: "Two kinds of memory",
    items: [
      {
        name: "Organization memory",
        note: "Private context belonging to the organization. Strategy, underwriting, returns, negotiations and internal analysis.",
      },
      {
        name: "Property memory",
        note: "Context tied to the property itself. History, decisions, approvals, drawings, warranties, work completed and the evidence behind them.",
      },
    ],
  },

  horizon:
    "Starting with real estate, Provenance is building a memory layer for long-lived physical assets.",

  conclusion: "Properties should not start over every time the people around them do.",
} as const;
