import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "./ContactForm";
import { BookACall } from "@/components/BookACall";

export const metadata: Metadata = {
  title: "Contact · Provenance",
  description:
    "Talk to the team building Provenance, the memory layer for real assets.",
};

/* Contact, and the call, on one page.

   TWO WAYS THROUGH. Somebody with a question writes it down; somebody
   weighing whether this is for them would rather talk. The call sits under
   the form behind a rule, in the same column and the same place it occupies
   on Request access, because a calendar link that moves around the site is
   one a visitor has to go looking for. It is a real alternative at full
   size, not a footnote in small text, but it does not come first: the form
   is what the page is for.

   THIS IS NOT REQUEST ACCESS. That page asks for a team, a role and a
   portfolio size because it is the start of a qualification. This one asks
   for a name, an address and a sentence, because the whole job is letting
   somebody say something. Two forms that ask the same questions would mean
   we only needed one. */

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="track pb-[88px] pt-[132px] md:pb-[108px] md:pt-[164px]">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.016em] text-paper sm:text-[2.5rem] lg:text-display-2">
              Contact
            </h1>
            <p className="mt-6 max-w-[46ch] text-lead text-paper-muted">
              Questions about Provenance, how it would fit your portfolio, or
              anything else. We read everything.
            </p>

            <div className="mt-12 md:mt-14">
              <ContactForm />
            </div>

            {/* Same column, same position as on Request access. It used to
                sit in a right rail here, which put the two pages' calendar
                links in two different places for no reason a visitor could
                see. */}
            <BookACall className="mt-14 border-t border-[rgba(243,244,240,0.16)] pt-10 md:mt-16" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
