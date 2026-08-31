import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { MemoryLayerSection } from "@/components/MemoryLayerSection";
import { ProactiveSection } from "@/components/ProactiveSection";
import { TeamsSection } from "@/components/TeamsSection";
import { LongViewSection } from "@/components/LongViewSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProblemSection />
        <HowItWorksSection />
        <MemoryLayerSection />
        <ProactiveSection />
        <TeamsSection />
        <LongViewSection />
      </main>
      <Footer />
    </>
  );
}
