import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClosingCta } from "@/components/ClosingCta";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Thesis · Provenance",
  description:
    "Buildings outlive the people who work on them. Their memory should too.",
};

/* The thesis.

   THREE BLOCKS AND A LAST LINE. The problem, the belief, and what happens
   over time. It ran to five before, and the fifth was a separate section on
   continuity that said again what the fourth had already said about
   ownership: the transfer argument is one clause inside "over time", not a
   heading of its own.

   Also gone with it: the long list of document types, which is the
   homepage's job, and the second and third explanations of what property
   memory is, which the belief block states once.

   THE DIVISION OF LABOUR. The homepage answers what Provenance is and why
   you would use it. This page answers why the category should exist at all.
   When those two blur, the thesis becomes a second homepage and stops being
   an argument, which is why there is no product here, no Vera, and nothing
   that could be called a feature.

   Typography and rules carry it. No cards, no diagrams, no product terms. */

export default function ThesisPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── the thesis ───────────────────────────────────────────────── */}
        <section className="track pb-[72px] pt-[132px] md:pb-[88px] md:pt-[164px]">
          <div className="grid12">
            <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
              <SectionLabel>Thesis</SectionLabel>
            </Reveal>
          </div>

          <div className="grid12 mt-6">
            <Reveal
              delay={40}
              className="col-span-12 md:col-span-6 lg:col-span-9"
            >
              <h1 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.018em] text-paper sm:text-[2.5rem] lg:text-display-2">
                Buildings outlive the people who work on them.{" "}
                <span className="lg:mt-[0.16em] lg:block">
                  Their memory should too.
                </span>
              </h1>
            </Reveal>
          </div>

          <div className="grid12 mt-8">
            <Reveal
              delay={60}
              className="col-span-12 md:col-span-6 lg:col-span-7"
            >
              <p className="text-lead text-paper-muted">
                A commercial property can exist for decades. Over that time,
                owners change, employees leave, consultants rotate, systems are
                replaced, and decisions accumulate around the asset.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 1 · the problem ──────────────────────────────────────────── */}
        <Section label="The problem" heading="The asset persists. Its context does not.">
          <p className="text-body text-paper-muted">
            A property accumulates drawings, reports, emails, leases and
            decisions over many years. Those records end up scattered across
            people, companies and systems. Some disappear.
          </p>
          {/* the line the whole page is built around */}
          <p className="mt-8 max-w-[28ch] text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.012em] text-paper sm:text-[1.75rem]">
            The files often survive. The reasoning connecting them does not.
          </p>
          <p className="mt-8 text-body text-paper-muted">
            Every team change forces part of the property to be relearned. That
            is{" "}
            <span className="font-medium text-vera-400">corporate amnesia</span>
            .
          </p>
        </Section>

        {/* ── 2 · the belief ───────────────────────────────────────────── */}
        <Section
          label="The belief"
          heading="The memory should belong to the property."
        >
          <p className="text-body text-paper-muted">
            We believe there should be a persistent layer of memory organized
            around the property itself: what happened, why it happened, what
            changed, what evidence supports it, and what still matters.
          </p>
          <p className="mt-6 text-body text-paper-muted">
            That memory should become more useful as the property gets older,
            not less complete.
          </p>
        </Section>

        {/* ── 3 · over time ────────────────────────────────────────────── */}
        <Section label="Over time" heading="Property memory should compound.">
          <p className="text-body text-paper-muted">
            A decision made ten years ago should make a decision today easier. A
            new employee should not have to reconstruct years of history from
            scattered files and old conversations.
          </p>
          {/* Continuity used to be a section of its own here, which meant
              saying the ownership argument twice. It is one sentence. */}
          <p className="mt-6 text-body text-paper-muted">
            When ownership changes, the property-level history an owner chooses
            to preserve should be able to move with the asset, while private
            strategy, negotiations and underwriting remain private.
          </p>
        </Section>

        {/* ── the conviction ───────────────────────────────────────────── */}
        <section className="track pb-[72px] md:pb-[88px]">
          <hr className="rule-full" />
          <div className="grid12 mt-12 md:mt-14">
            <Reveal className="col-span-12 md:col-span-6 lg:col-span-9">
              <p className="max-w-[24ch] text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-paper sm:text-[2.125rem] lg:max-w-[30ch] lg:text-[2.5rem]">
                Properties should not start over every time the people around
                them do.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* the one action on the page */}
      <ClosingCta />
      <Footer />
    </>
  );
}

/* One shape for all three blocks: a quiet label, a headline, and prose at a
   readable measure. The rule above each is the only ornament, and the rhythm
   is the same every time so the page reads as one argument rather than as a
   set of separate essays. */
function Section({
  label,
  heading,
  children,
}: {
  label: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="track pb-[64px] md:pb-[76px]">
      <hr className="rule-full" />
      <div className="grid12 mt-10 md:mt-12">
        <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
          <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
            {label}
          </p>
        </Reveal>
        <Reveal
          delay={40}
          className="col-span-12 mt-5 md:col-span-6 lg:col-span-8 lg:mt-0"
        >
          <h2 className="max-w-[22ch] text-[1.5rem] font-semibold leading-[1.16] tracking-[-0.014em] text-paper sm:text-[1.875rem] lg:text-[2.25rem]">
            {heading}
          </h2>
          <div className="mt-6 max-w-[62ch]">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
