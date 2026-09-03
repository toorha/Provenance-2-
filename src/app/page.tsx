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

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <MeetVera />
        <HowVeraWorks />
        <ProvenanceSystem />
        <FaqSection />
        <ClosingCta />
      </main>
      {/* THE DESCENT — hard edge, full bleed, no fade and no gradient (§6.3) */}
      <Footer />
    </>
  );
}
