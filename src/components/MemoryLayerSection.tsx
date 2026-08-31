import { MemoryFlow } from "./MemoryFlow";
import { AskProvenance } from "./AskProvenance";
import { ASK_PROVENANCE, MEMORY_LAYER } from "@/lib/demo-data";

export function MemoryLayerSection() {
  return (
    <section id="memory" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{MEMORY_LAYER.label}</p>

        <h2 className="mt-7 max-w-[20ch] font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {MEMORY_LAYER.headline}
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {MEMORY_LAYER.subhead}
        </p>

        <div className="mt-12 lg:mt-16">
          <MemoryFlow />
        </div>

        {/* what the memory powers */}
        <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-foreground/15 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            It powers
          </span>
          {MEMORY_LAYER.powers.map((p) => (
            <span
              key={p}
              className="text-[13px] font-medium text-foreground after:mx-1 after:text-border-dark after:content-['·'] last:after:content-none"
            >
              {p}
            </span>
          ))}
        </div>

        {/* ask the record */}
        <div className="mt-16 flex flex-col items-center lg:mt-20">
          <span
            className="h-12 w-px bg-gradient-to-b from-transparent to-foreground/25"
            aria-hidden="true"
          />
        </div>

        <div className="mt-8 lg:mt-10">
          <div className="flex items-baseline gap-5">
            <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-accent">
              &rarr;
            </span>
            <h3 className="max-w-2xl font-display text-[1.9rem] leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[2.4rem]">
              {ASK_PROVENANCE.headline}
            </h3>
          </div>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-graphite lg:pl-[2.9rem]">
            {ASK_PROVENANCE.intro}
          </p>

          <div className="mt-10 lg:mt-12">
            <AskProvenance />
          </div>

          <p className="mt-14 max-w-[32ch] border-l-2 border-accent pl-6 font-display text-[20px] leading-[1.2] tracking-[-0.02em] text-foreground lg:text-[24px]">
            {ASK_PROVENANCE.payoff}
          </p>
        </div>
      </div>
    </section>
  );
}
