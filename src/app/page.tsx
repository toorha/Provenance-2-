import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { MeetVera } from "@/components/vera/MeetVera";
import { HowVeraWorks } from "@/components/HowVeraWorks";
import { ProvenanceSystem } from "@/components/ProvenanceSystem";
import { FaqSection } from "@/components/FaqSection";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";

/* Build stage: shell, hero, problem, Meet Vera, How Vera works and the
   Provenance system. Provenance over time, FAQ and the closing CTA are later
   passes, each with its own review. */

/* A hairline between sections.

   The page is one long dark field, so a section ending and the next beginning
   was carried entirely by whitespace, and on a tall screen that reads as a
   gap rather than as a break. One rule at the content width is the same
   device the thesis page already uses, which is why it is a hairline and not
   a band: it should mark the seam, not become a feature.

   Decorative, so it is hidden from assistive tech: the heading underneath it
   already says a new section has begun. */
function SectionRule() {
  return (
    <div className="track" aria-hidden>
      <hr className="rule-full" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SectionRule />
        <ProblemSection />
        <SectionRule />
        <MeetVera />
        <SectionRule />
        <HowVeraWorks />
        <SectionRule />
        <ProvenanceSystem />
        <SectionRule />
        <FaqSection />
        <SectionRule />
        <ClosingCta />
      </main>
      {/* THE DESCENT — hard edge, full bleed, no fade and no gradient (§6.3) */}
      <Footer />
    </>
  );
}
