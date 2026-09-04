import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RequestAccessForm } from "./RequestAccessForm";
import { BookACall } from "@/components/BookACall";

export const metadata: Metadata = {
  title: "Request access · Provenance",
  description:
    "Tell us about your team and how you would use Provenance, the memory layer for real assets.",
};

/* A page, not a modal. Requesting access is a considered thing to do, and a
   dialog over a marketing page frames it as an interruption to the browsing
   rather than the point of it. It also gives the link somewhere real to go
   from every surface, including the Thesis page and any future email. */

export default function RequestAccessPage() {
  return (
    <>
      <Navigation />
      <main className="track pb-[88px] pt-[132px] md:pb-[108px] md:pt-[164px]">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="text-[2rem] font-semibold leading-[1.08] tracking-[-0.016em] text-paper sm:text-[2.5rem] lg:text-display-2">
              Request access
            </h1>
            <p className="mt-6 max-w-[46ch] text-lead text-paper-muted">
              Tell us a little about your team and how you would use
              Provenance.
            </p>
            <p className="mt-4 max-w-[52ch] text-body text-paper-subtle">
              We are currently working with real estate teams to shape the
              product around the way properties are actually managed.
            </p>

            <div className="mt-12 md:mt-14">
              <RequestAccessForm />
            </div>

            {/* In the same column as the form rather than off in a right
                rail, and after it rather than above it: the form is what
                this page is for, and a calendar link placed first would
                quietly become the easier option. */}
            <BookACall className="mt-14 border-t border-[rgba(243,244,240,0.16)] pt-10 md:mt-16" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
