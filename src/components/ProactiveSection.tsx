import { TodayWorkspace } from "./TodayWorkspace";
import { TODAY } from "@/lib/demo-data";

export function ProactiveSection() {
  return (
    <section id="today" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{TODAY.label}</p>
        <h2 className="mt-7 max-w-2xl font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {TODAY.headline}
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17.5px] leading-[1.6] text-graphite lg:text-[18.5px]">
          {TODAY.body}
        </p>

        <div className="mt-12 lg:mt-14">
          <TodayWorkspace />
        </div>

        <p className="mt-8 font-display text-[1.5rem] leading-[1.2] tracking-[-0.022em] text-foreground sm:text-[1.9rem]">
          {TODAY.payoff}
        </p>
      </div>
    </section>
  );
}
