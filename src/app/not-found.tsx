import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";

/* The 404.

   App Router convention, so an unknown route returns a real 404 status
   rather than a 200 with apologetic content on it. That distinction matters
   to crawlers and to anyone debugging a broken link.

   No illustration, no torn page, no oversized numeral filling the viewport.
   The line is the moment, and a property site whose whole argument is about
   lost context can afford to say exactly that when a page goes missing.

   Content-driven height rather than a forced 100vh, which on a short window
   would push the actions off screen to satisfy a layout rule nobody asked
   for. */

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="track pb-[96px] pt-[152px] md:pb-[132px] md:pt-[188px]">
        <div className="grid12">
          <div className="col-span-12 lg:col-span-8">
            <p className="text-mono-sm uppercase tracking-[0.08em] text-paper-subtle">
              404
            </p>

            <h1 className="mt-5 max-w-[18ch] text-[2rem] font-semibold leading-[1.08] tracking-[-0.016em] text-paper sm:text-[2.5rem] lg:text-display-2">
              This page lost its context.
            </h1>

            <p className="mt-6 max-w-[48ch] text-lead text-paper-muted">
              The page you&rsquo;re looking for may have moved, changed, or
              never existed.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/" variant="primary">
                Return to Provenance
              </Button>
              <Button href="/#product" variant="secondary">
                Meet Vera
              </Button>
            </div>

            <p className="mt-10 text-body-sm text-paper-subtle">
              Some things should be easier to find.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

