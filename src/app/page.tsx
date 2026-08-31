import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ProactiveSection } from "@/components/ProactiveSection";
import { PropertyMemoryScroll } from "@/components/PropertyMemoryScroll";
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
        <ProactiveSection />
        <PropertyMemoryScroll />
        <LongViewSection />
      </main>
      <Footer />
    </>
  );
}
