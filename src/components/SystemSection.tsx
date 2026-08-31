import { MemoryFlow } from "./MemoryFlow";
import { MEMORY_LAYER } from "@/lib/demo-data";

export function SystemSection() {
  return (
    <section id="memory" className="tex tex-paper tex-draft relative bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{MEMORY_LAYER.label}</p>
        <h2 className="mt-7 font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {MEMORY_LAYER.headline[0]}
          <br />
          <span className="text-graphite">{MEMORY_LAYER.headline[1]}</span>
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {MEMORY_LAYER.subhead}
        </p>

        <div className="mt-10 lg:mt-8">
          <MemoryFlow />
        </div>
      </div>
    </section>
  );
}
