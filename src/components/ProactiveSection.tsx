import { ProvenanceApp } from "./ProvenanceApp";
import { PRODUCT } from "@/lib/demo-data";

export function ProactiveSection() {
  return (
    <section id="today" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{PRODUCT.label}</p>
        <h2 className="mt-7 max-w-2xl font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {PRODUCT.headline}
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17.5px] leading-[1.6] text-graphite lg:text-[18.5px]">
          {PRODUCT.body}
        </p>

        <div className="mt-14 lg:mt-16">
          <ProvenanceApp />
        </div>

        <p className="mt-6 max-w-[54ch] text-[13px] leading-[1.6] text-muted-foreground">
          Memory, detection, recommendation, action. The record does the connecting, so the
          work comes to you instead of waiting to be searched for.
        </p>
      </div>
    </section>
  );
}
