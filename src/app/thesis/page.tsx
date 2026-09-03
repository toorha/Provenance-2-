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

   FIVE MOMENTS, AND NOT ONE OF THEM IS THE PRODUCT. This page used to run to
   ten sections and spent most of them re-explaining Vera: a four step model,
   a "useful today" list, a "compounds over time" list, an organization versus
   property memory taxonomy, and a section on transfer mechanics. All of that
   is argued better on the homepage by a product that demonstrates it.

   The division is: the homepage answers what Provenance is and why you would
   use it. This page answers why the category should exist at all. When those
   two blur, the thesis becomes a second homepage and stops being an argument.

   Typography and rules carry it. No cards, no diagrams, no product terms. */

export default function ThesisPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── 1. the thesis ─────────────────────────────────────────────── */}
        <section className="track pb-[88px] pt-[132px] md:pb-[104px] md:pt-[164px]">
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
                <span className="lg:block">Their memory should too.</span>
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
                replaced, projects are paused and restarted, and thousands of
                decisions accumulate around the asset.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── 2. the problem ────────────────────────────────────────────── */}
        <Section label="The problem" heading="The asset persists. Its context does not.">
          <p className="text-body text-paper-muted">
            A property accumulates drawings, reports, approvals, emails,
            repairs, leases and decisions over many years. Those records end up
            spread across people, companies, consultants, systems, inboxes,
            shared drives and data rooms. Some of it simply disappears.
          </p>
          {/* the line the whole page is built around */}
          <p className="mt-8 max-w-[26ch] text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.012em] text-paper sm:text-[1.75rem]">
            The files often survive. The reasoning connecting them does not.
          </p>
          <p className="mt-8 text-body text-paper-muted">
            Every team change forces part of the property to be relearned. That
            is{" "}
            <span className="font-medium text-vera-400">corporate amnesia</span>
            : the records remain, but the thinking behind them is gone.
          </p>
        </Section>

        {/* ── 3. the belief ─────────────────────────────────────────────── */}
        <Section
          label="The belief"
          heading="The memory should belong to the property."
        >
          <p className="text-body text-paper-muted">
            Today, almost everything a property knows belongs implicitly to
            whichever organization happens to be managing it. When that
            organization changes, so does the memory.
          </p>
          <p className="mt-6 text-body text-paper-muted">
            We believe there should also be a persistent layer of memory
            organized around the property itself. What happened, why it
            happened, what changed, what evidence supports it, and what still
            matters. That record should become more useful as a property gets
            older, not less complete.
          </p>
        </Section>

        {/* ── 4. why it matters over time ───────────────────────────────── */}
        <Section
          label="Over time"
          heading="Property memory should compound."
        >
          <p className="text-body text-paper-muted">
            Every project, repair, approval, lease and decision should add to
            what the property already knows.
          </p>
          <p className="mt-6 text-body text-paper-muted">
            A decision made ten years ago should make a decision today easier. A
            consultant&rsquo;s report should not become detached from what
            happened after it. A new employee should not need five years of
            tenure to understand five years of history. A future owner should
            not have to reconstruct a property from a data room.
          </p>
        </Section>

        {/* ── 5. continuity, then the conviction ────────────────────────── */}
        <Section label="Continuity" heading="Memory should outlast ownership.">
          <p className="text-body text-paper-muted">
            Not every piece of company information should transfer. Internal
            strategy, negotiations and underwriting can stay private. But the
            property-level history and evidence an owner chooses to preserve
            should not have to disappear simply because the asset changed
            hands.
          </p>

          <hr className="rule-full mt-16 md:mt-20" />
          <p className="mt-12 max-w-[24ch] text-[1.75rem] font-semibold leading-[1.14] tracking-[-0.015em] text-paper sm:text-[2.125rem] md:mt-14 lg:max-w-[30ch] lg:text-[2.5rem]">
            Properties should not start over every time the people around them
            do.
          </p>
        </Section>
      </main>

      {/* the conclusion is the promise itself, and the one action on the page */}
      <ClosingCta />
      <Footer />
    </>
  );
}

/* One shape for all four body moments: a quiet label, a headline, and prose
   at a readable measure. The rule above each is the only ornament. */
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
    <section className="track pb-[72px] md:pb-[88px]">
      <hr className="rule-full" />
      <div className="grid12 mt-12 md:mt-14">
        <Reveal className="col-span-12 md:col-span-6 lg:col-span-3">
          <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
            {label}
          </p>
        </Reveal>
        <Reveal
          delay={40}
          className="col-span-12 mt-6 md:col-span-6 lg:col-span-8 lg:mt-0"
        >
          <h2 className="max-w-[22ch] text-[1.5rem] font-semibold leading-[1.16] tracking-[-0.014em] text-paper sm:text-[1.875rem] lg:text-[2.25rem]">
            {heading}
          </h2>
          <div className="mt-7 max-w-[62ch]">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
