import { WorkflowDemo } from "./WorkflowDemo";
import { WORKFLOW } from "@/lib/demo-data";

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="tex tex-paper tex-draft relative bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{WORKFLOW.label}</p>

        <h2 className="mt-7 max-w-[20ch] font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          It works where you already work.
        </h2>
        <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
          CC it. Invite it. Forward it. File it.
        </p>

        <div className="mt-12 lg:mt-14">
          <WorkflowDemo />
        </div>

        <p className="mt-12 max-w-[46ch] text-[16px] leading-[1.6] text-graphite lg:mt-14">
          No manual filing. No meeting-note cleanup. No rebuilding the story later.
        </p>
      </div>
    </section>
  );
}
