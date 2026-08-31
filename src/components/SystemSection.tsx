import { MemoryFlow } from "./MemoryFlow";
import { MEMORY_LAYER } from "@/lib/demo-data";

export function SystemSection() {
  return (
    <section id="memory" className="tex tex-paper tex-draft relative bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{MEMORY_LAYER.label}</p>
        <h2 className="mt-7 max-w-[18ch] font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {MEMORY_LAYER.headline}
        </h2>
        <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {MEMORY_LAYER.subhead}
        </p>

        <div className="mt-12 lg:mt-14">
          <MemoryFlow />
        </div>
      </div>
    </section>
  );
}
