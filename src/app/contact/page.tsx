import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ContactForm } from "./ContactForm";
import { CALL_URL } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact · Provenance",
  description:
    "Talk to the team building Provenance, the memory layer for real assets.",
};

/* Contact, and the call, on one page.

   TWO WAYS THROUGH, AND NEITHER IS THE FALLBACK. Somebody with a question
   writes it down; somebody weighing whether this is for them would rather
   talk, and making them type a message first to earn a calendar link is a
   toll booth. So the call sits beside the form at the same weight rather
   than under it in small text.

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
          </div>

          {/* the other way through, on its own rule so it is an alternative
              rather than a footnote to the form */}
          <div className="col-span-12 mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <div className="border-t border-[rgba(243,244,240,0.16)] pt-8 lg:mt-[168px]">
              <h2 className="text-heading-3 text-paper">
                Would rather talk?
              </h2>
              <p className="mt-4 max-w-[34ch] text-body text-paper-muted">
                Book a call and we will walk through what your team is dealing
                with today.
              </p>
              <a
                href={CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-2.5 text-[15px] font-semibold text-paper transition-colors duration-instant hover:text-white"
              >
                Book a call
                <svg
                  viewBox="0 0 14 14"
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" />
                </svg>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
