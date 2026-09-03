import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroAerial } from "@/components/hero/HeroAerial";

/* HOMEPAGE.md §5, Section 1 — the hero states the thesis. Not the product, not
   an outcome, not Vera.

   THE AERIAL ARGUES THE SAME THING THE HEADLINE DOES. A portfolio seen from
   above is a picture of physical assets that will outlast everyone currently
   working on them, which is the claim the words make. It earns its place by
   agreeing with the sentence, not by decorating it.

   HIERARCHY IS UNCHANGED. Headline, then aerial, then supporting copy, then
   the product line, then the CTAs. The photograph never crosses under the
   text: an opaque gradient holds the left third at full canvas so the
   headline is read against black, exactly as it was before.

   LAYOUT — measured. The headline dropped from c1–c11 to c1–c8 and from 76px
   to 60px at xl so it clears the image rather than running into it. It is
   still four times the size of anything else in the section. Copy sits at
   c1–c5, well inside the opaque part of the fade.

   The aerial is rendered AFTER the copy because on mobile it belongs after
   the CTAs in reading order; above 1024px it becomes a background layer. */

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-[64px] pt-[132px] md:pb-[80px] md:pt-[164px] lg:min-h-[43rem] lg:pb-[128px] lg:pt-[188px]">
      <div className="track relative z-10">
        <div className="grid12">
          <Reveal className="col-span-12 lg:col-span-8">
            <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.018em] text-paper [text-wrap:balance] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.25rem] lg:leading-[1.02] lg:[text-wrap:pretty] xl:text-[3.75rem]">
              Buildings outlive the people who work on them.{" "}
              {/* the second sentence takes its own line where there is room for
                  one, and simply follows on where there is not */}
              <span className="lg:block">Their memory should too.</span>
            </h1>
          </Reveal>

          <Reveal
            delay={80}
            className="col-span-12 mt-10 sm:col-span-10 lg:col-span-5 lg:col-start-1 lg:mt-12"
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
              <Button href="/request-access" variant="primary">
                Request early access
              </Button>
              <Button href="#product" variant="secondary">
                See how it works
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <HeroAerial />
    </section>
  );
}
