import { WorkflowDemo } from "./WorkflowDemo";
import { MemoryFlow } from "./MemoryFlow";
import { MEMORY_LAYER, WORKFLOW } from "@/lib/demo-data";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="tex tex-paper tex-draft relative bg-secondary py-28 lg:py-36"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{WORKFLOW.label}</p>

        {/* ---- 1. you work normally ---- */}
        <Step n="01" title={WORKFLOW.headline} body={WORKFLOW.body} />
        <div className="mt-11 lg:mt-14 lg:pl-[3.6rem]">
          <WorkflowDemo />
        </div>

        {/* ---- 2. it all feeds one memory layer ---- */}
        <div className="mt-24 border-t border-foreground/15 pt-16 lg:mt-32">
          <Step n="02" title={MEMORY_LAYER.headline} body={MEMORY_LAYER.subhead} />
          <div className="mt-14 lg:mt-16">
            <MemoryFlow />
          </div>
        </div>

        {/* ---- 3. and that memory powers the product ---- */}
        <div className="mt-24 border-t border-foreground/15 pt-16 lg:mt-28">
          <Step
            n="03"
            title="That memory powers the rest."
            body="Everything below runs on the same record: what needs attention today, what happened before, and why."
          />
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <>
      <div className="mt-8 flex items-baseline gap-5">
        <span className="font-mono text-[11px] font-medium tabular-nums tracking-[0.14em] text-accent">
          {n}
        </span>
        <h2 className="max-w-2xl font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {title}
        </h2>
      </div>
      <p className="mt-6 max-w-[52ch] text-[17.5px] leading-[1.6] text-graphite lg:pl-[3.6rem] lg:text-[18.5px]">
        {body}
      </p>
    </>
  );
}
