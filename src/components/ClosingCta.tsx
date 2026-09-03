import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/lib/demo-data";

/* HOMEPAGE.md §5. The closing statement.

   The page has already made every argument it is going to make, so this one
   does nothing except return the brand promise and offer the next step. One
   headline, one line, one button.

   The hero introduces "Give every property a memory" as a promise. Here the
   same words land as an instruction, which is the only reason repeating them
   is worth the space.

   Nothing else belongs here: no second explanation, no screenshot, no logo
   wall, no testimonial, no gradient, no glow. The whole page is the argument
   and this is the signature. */

export function ClosingCta() {
  return (
    <section
      id="access"
      className="scroll-mt-[60px] bg-canvas pb-[132px] pt-[72px] md:pb-[168px] md:pt-[88px]"
    >
      <div className="track">
        <div className="grid12">
          <Reveal className="col-span-12 lg:col-span-9">
            <h2 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.018em] text-paper sm:text-[2.5rem] lg:text-display-2">
              {CTA.headline}
            </h2>
          </Reveal>

          <Reveal delay={60} className="col-span-12 mt-6 lg:col-span-7">
            <p className="text-lead text-paper-muted">{CTA.body}</p>

            <div className="mt-10">
              <Button href={CTA.callUrl} variant="primary">
                Request access
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
