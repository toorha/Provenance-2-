"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

/* HOMEPAGE.md §5. FAQ.

   This section answers objections, so it is deliberately the quietest thing
   on the page: a label, a headline, and six rules with text between them. No
   cards, no search, no icons, no illustration. Anything more would turn an
   honest set of answers into another piece of marketing.

   WHAT IS NOT CLAIMED HERE MATTERS AS MUCH AS WHAT IS. There is no SOC 2, no
   ISO, no encryption specifics, no data residency and no retention policy in
   the security answer, because none of that exists in the product yet and
   inventing it in a FAQ is how a company ends up with a promise it cannot
   keep. It says safeguards are INTENDED to protect information and that
   access is governed by the customer's own permissions, which is a
   description of the design rather than a certification. The customisation
   answer says Provenance CAN be tailored, never that any particular
   integration is already built, for the same reason. Nothing transfers
   automatically when a property is sold.

   THE AUDIENCE IS WIDER THAN THE FIRST CUSTOMERS. Owners and asset managers
   may be the strongest early accounts, but a FAQ written only for them tells
   a consultant, an architect or an engineer that this is not their tool. They
   are the ones who inherit incomplete context, add to it and hand it on, so
   they are named explicitly. The same reasoning removed "institutional" from
   the customisation answer.

   THE PRIVACY ANSWER DRAWS ONE LINE ABOVE ALL OTHERS: a private environment
   per organization, not a shared knowledge base pooled across customers. That
   is the question anyone evaluating an AI product is actually asking, and it
   deserves a direct sentence rather than an inference.

   There is no "why not just use ChatGPT" question any more. Answering it put
   the page on someone else's ground and invited a comparison the product does
   not need to win: the difference is persistence, and the rest of the page
   already demonstrates it.

   One panel open at a time. The first is open on arrival. */

type Faq = { q: string; a: string[] };

const FAQS: Faq[] = [
  {
    q: "How is this different from SharePoint or a document system?",
    a: [
      "Those systems are built to store and organize files. Provenance keeps the context behind them too, including what changed, what was decided, why it happened, and how different pieces of information connect over time.",
    ],
  },
  {
    q: "Who is Provenance built for?",
    a: [
      "Provenance is built for teams that manage complex property information over long periods of time. That includes owners, developers, asset managers, consultants, architects, engineers, contractors, planners, and operators who need better continuity across projects, decisions, documents, and people.",
      "Owners keep the memory, the people they work with contribute to it, and everyone works from better context.",
    ],
  },
  {
    q: "How does Vera learn about a property?",
    a: [
      "Vera learns from the work your team is already doing. Emails, meetings, documents, decisions, and updates become part of the property context, so the record keeps building as work moves forward.",
    ],
  },
  {
    q: "Does my team need to change how they work?",
    a: [
      "The goal is to avoid creating another system your team has to constantly maintain. Include Vera in the work already happening, and Vera captures the context behind it while your team keeps working normally.",
    ],
  },
  {
    q: "How does Provenance keep our data private and secure?",
    a: [
      "Provenance is designed as a private environment for your organization’s portfolio and projects. Access to properties and information is controlled by your organization, and Vera only works with information a user is authorized to access. Customer data is not pooled into a shared knowledge base across organizations.",
      "Provenance uses technical and organizational safeguards intended to protect customer information, with access governed by your organization’s permissions and account configuration.",
    ],
  },
  {
    q: "What happens when a property is sold?",
    a: [
      "Not everything should move with the property. Private company strategy, negotiations, and internal analysis can remain private, while the property history and supporting records you choose can stay with the asset.",
    ],
  },
  {
    q: "Can Provenance be customized for our organization?",
    a: [
      "Yes. Provenance can be tailored to the way your team already works, including custom workflows, views, data structures, permissions, and integrations for larger portfolios and organizations.",
    ],
  },
  {
    q: "Who is building Provenance?",
    a: [
      "Provenance is being built by a team with experience working across institutional real estate development, planning, construction, and software. We are building around problems we have seen firsthand: fragmented property history, lost context, and teams repeatedly rebuilding information that should already be known.",
    ],
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section anchor-offset bg-canvas">
      <div className="track">
        <div className="grid12">
          <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
            <SectionLabel>FAQ</SectionLabel>
          </Reveal>
        </div>

        <div className="grid12 mt-5">
          <Reveal delay={40} className="col-span-12 md:col-span-6 lg:col-span-9">
            <h2 className="text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] text-paper sm:text-[2.125rem] lg:text-[3rem] lg:leading-[1.06] lg:tracking-[-0.018em]">
              Questions you might have.
            </h2>
          </Reveal>
        </div>

        <div className="grid12 mt-12 md:mt-14">
          <Reveal delay={60} className="col-span-12 lg:col-span-9">
            <ul>
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className="border-t border-[var(--hairline)] last:border-b">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-q-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className={clsx(
                          "flex w-full cursor-pointer items-start gap-6 py-6 text-left",
                          "transition-colors duration-instant",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vera-400",
                          isOpen ? "text-paper" : "text-paper hover:text-paper",
                        )}
                      >
                        <span className="flex-1 text-[1.125rem] font-medium leading-[1.35] tracking-[-0.008em] sm:text-[1.25rem]">
                          {f.q}
                        </span>
                        {/* a plus that becomes a minus. One stroke moves, and
                            nothing else does. */}
                        <span
                          aria-hidden
                          className="relative mt-1.5 grid h-4 w-4 flex-none place-items-center text-paper-muted"
                        >
                          <span className="absolute h-px w-4 bg-current" />
                          <span
                            className={clsx(
                              "absolute h-4 w-px bg-current transition-transform duration-base ease-state",
                              isOpen ? "scale-y-0" : "scale-y-100",
                            )}
                          />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      hidden={!isOpen}
                      className="pb-7"
                    >
                      {f.a.map((p, j) => (
                        <p
                          key={p.slice(0, 24)}
                          className={clsx(
                            "max-w-[68ch] text-body text-paper-muted",
                            j > 0 && "mt-4",
                          )}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
