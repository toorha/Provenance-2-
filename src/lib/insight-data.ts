/* Proactive Insights: what should I know that I did not think to ask?

   All fictional. No real municipality, employer, property, tenant or project.

   THE THREE PROVE THREE DIFFERENT KINDS OF REASONING, and that is the whole
   reason there are exactly three:

     1  regulatory   an external rule changed, and it unblocks old history
     2  market       the area around an asset changed since it was last looked at
     3  operating    a pattern across service history, not a single event

   THE PRODUCT PROOF IS NEVER "VERA MONITORS ZONING" or "Vera reads planning
   news". Anyone can subscribe to a feed. The proof is that Vera remembered
   WHY something was set aside years ago, and then noticed that the reason may
   no longer hold. That is the compounding value of property memory, and it is
   what separates this mode from a notifications inbox.

   No severity, no scores, no counts, no confidence, no traffic lights. */

export type Insight = {
  id: string;
  /** what kind of noticing this is. Never a severity. */
  kind: string;
  /** what Vera noticed. The first thing read. */
  statement: string;
  /** why it matters, in one sentence. */
  support: string;
  /** what it was drawn from. Quiet, never competing with the statement. */
  provenance: string[];
  /** what you can do. One action, never a menu. */
  action: string;
  /** the expanded reasoning. Concise: this is not a memo. */
  reasoning: { label: string; body: string }[];
  changed: string;
  next: string;
  /* the question this insight hands to Ask Vera, and the role it belongs to.
     Every insight ends the same way: Vera noticed, Vera explained, and now
     you can ask what to do about it. */
  ask: { role: string; question: string };
  sources: { title: string; meta: string }[];
};

export const INSIGHTS: Insight[] = [
  /* The flagship. An old concept died for a specific reason, that reason was
     external, and it has since changed. Nobody on the current team reopened
     the question, because nobody remembered there was a question to reopen. */
  {
    id: "zoning",
    kind: "Opportunity",
    statement: "A Development Concept Paused in 2023 May Now Be Viable.",
    support:
      "The concept was previously stopped because the proposed use was not permitted. The municipality's updated zoning by-law now permits the use on the site.",
    provenance: ["2023 concept", "Former zoning", "2026 zoning update"],
    action: "Reassess concept",
    reasoning: [
      {
        label: "2023",
        body: "A proposed drive-through concept was not advanced because the use was prohibited under the zoning in effect at the time.",
      },
      {
        label: "2026",
        body: "The municipality adopted an updated zoning by-law that now permits the use on the property.",
      },
    ],
    changed: "The original zoning constraint may no longer apply.",
    next: "Reassess the previous concept against current site constraints.",
    ask: {
      role: "development",
      question:
        "What would we need to change to make the previous concept work under the current zoning?",
    },
    sources: [
      { title: "Drive-through concept", meta: "2023" },
      { title: "Planning correspondence", meta: "2023" },
      { title: "Updated zoning by-law", meta: "2026" },
    ],
  },

  {
    id: "acquisition",
    kind: "Acquisition signal",
    statement:
      "A Proposed 4,000-Home Community Nearby Could Make This Site Worth Another Look.",
    support:
      "More people living nearby, with limited new retail planned, could increase demand for stores and services in the area.",
    provenance: [
      "Planning application",
      "Population growth",
      "Retail supply",
      "Site history",
    ],
    action: "Review acquisition opportunity",
    reasoning: [
      {
        label: "New community",
        body: "A proposed master-planned community would add approximately 4,000 homes nearby.",
      },
      {
        label: "Limited new retail",
        body: "The current plan adds relatively little neighbourhood-serving retail compared with the expected residential growth.",
      },
      {
        label: "Site history",
        body: "The team reviewed a nearby property before, but decided not to pursue it based on the demand at the time.",
      },
    ],
    changed:
      "The area could support more retail than when the property was last reviewed.",
    next: "Revisit the acquisition opportunity using the new growth planned around the site.",
    ask: {
      role: "portfolio",
      question:
        "Compare why we passed on this site before with what has changed now.",
    },
    sources: [
      { title: "Master-plan application", meta: "2026" },
      { title: "Nearby demand review", meta: "2022" },
      { title: "Nearby parcel review", meta: "2022" },
    ],
  },

  {
    id: "capital",
    kind: "Capital risk",
    statement: "RTU-4 May Need to Be Replaced Sooner Than Planned.",
    support:
      "Three related repairs in 14 months suggest this may be an ongoing issue, not isolated maintenance.",
    provenance: ["Service history", "Capital plan", "Warranty"],
    action: "Review replacement timing",
    reasoning: [
      {
        label: "Mar 2025",
        body: "A controls fault was reported and cleared without replacing major components.",
      },
      {
        label: "Nov 2025",
        body: "The same issue returned and the control board was replaced.",
      },
      {
        label: "May 2026",
        body: "Another related repair was required, marking a third event in 14 months.",
      },
    ],
    changed:
      "The repeated repairs now look like a pattern rather than separate one-off issues. That may mean higher maintenance costs, more downtime, and a greater chance of another failure.",
    next: "Review whether it still makes sense to keep repairing RTU-4 or replace it sooner.",
    ask: {
      role: "asset-management",
      question:
        "Compare the cost and risk of continuing repairs versus replacing RTU-4 sooner.",
    },
    sources: [
      { title: "RTU-4 service history", meta: "2025 to 2026" },
      { title: "Capital plan", meta: "Current" },
      { title: "Warranty certificate", meta: "Mar 2029" },
    ],
  },
];
