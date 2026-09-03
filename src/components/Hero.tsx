import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/* HOMEPAGE.md §5, Section 1 — the hero states the thesis. Not the product, not
   an outcome, not Vera.

   Typography and composition carry it. No animation beyond one entrance, no
   dashboard, no map, no floating anything: it has to work as a still image.

   LAYOUT — measured. display-1 at 76px needs ~980px for a line of this length,
   so the headline takes c1–c11 and the supporting copy sits beneath at c1–c5.
   A side-by-side split orphans words (DESIGN.md §6.2). */

export function Hero() {
  return (
    <section className="track pt-[152px] pb-[104px] md:pt-[188px] md:pb-[132px]">
      <div className="grid12">
        <Reveal className="col-span-12 lg:col-span-11">
          <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.018em] text-paper [text-wrap:balance] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.75rem] lg:leading-[1.0] xl:text-display-1">
            Buildings outlive the people who work on them.{" "}
            {/* the second sentence takes its own line where there is room for
                one, and simply follows on where there is not */}
            <span className="lg:block">Their memory should too.</span>
          </h1>
        </Reveal>

        <Reveal
          delay={80}
          className="col-span-12 mt-10 sm:col-span-10 lg:col-span-6 lg:mt-12"
        >
          {/* what actually has to survive, named plainly. "Institutional
              knowledge" and "property intelligence" say the same thing and
              mean nothing: these four nouns are the ones a visitor recognises
              from their own week. */}
          <p className="text-lead text-paper-muted">
            Keep the decisions, documents, history, and context behind every
            property, even as the people around it change.
          </p>

          {/* The product, in five words. Subordinate to the thesis by size and
              weight — it is the second thing read, never a competing headline.
              The closing CTA turns the same line into an instruction. */}
          <p className="mt-6 text-heading-3 text-paper">
            Give every property a memory.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#access" variant="primary">
              Request early access
            </Button>
            <Button href="#product" variant="secondary">
              See how it works
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
