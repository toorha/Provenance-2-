import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ProactiveSection } from "@/components/ProactiveSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { SystemSection } from "@/components/SystemSection";
import { AskSection } from "@/components/AskSection";
import { OverTimeSection } from "@/components/OverTimeSection";
import { LongViewSection } from "@/components/LongViewSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* 1 the scale problem */}
        <Hero />
        {/* 2 why context is hard to assemble */}
        <ProblemSection />
        {/* 3 what it does for the work happening now */}
        <ProactiveSection />
        {/* 4 how the work gets captured */}
        <HowItWorksSection />
        {/* 5 inputs -> property memory -> outputs */}
        <SystemSection />
        {/* 6 ask the property */}
        <AskSection />
        {/* 7 what it compounds into */}
        <OverTimeSection />
        {/* 8 close */}
        <LongViewSection />
      </main>
      <Footer />
    </>
  );
}
