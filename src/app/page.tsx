import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductSection } from "@/components/ProductSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { SystemSection } from "@/components/SystemSection";
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
        {/* 3 the product: track work, ask the property, surface what matters */}
        <ProductSection />
        {/* 4 how the work gets captured */}
        <HowItWorksSection />
        {/* 5 inputs -> property memory -> outputs */}
        <SystemSection />
        {/* 6 what it compounds into */}
        <OverTimeSection />
        {/* 7 close */}
        <LongViewSection />
      </main>
      <Footer />
    </>
  );
}
