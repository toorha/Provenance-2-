import { AskProvenance } from "./AskProvenance";
import { ASK_PROVENANCE } from "@/lib/demo-data";

export function AskSection() {
  return (
    <section id="ask" className="tex tex-paper bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{ASK_PROVENANCE.label}</p>
        <h2 className="mt-7 font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {ASK_PROVENANCE.headline}
        </h2>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {ASK_PROVENANCE.intro}
        </p>

        <div className="mt-12 lg:mt-14">
          <AskProvenance />
        </div>
      </div>
    </section>
  );
}
