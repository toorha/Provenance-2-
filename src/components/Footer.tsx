import Link from "next/link";
import { ProvenanceLockup } from "@/components/ProvenanceMark";

/* Placeholder for this build stage. The real closing CTA and footer are a later
   pass. One tonal step up from the canvas, so the page closes without ever
   leaving the dark environment (DESIGN.md §6.3). */

export function Footer() {
  return (
    <footer className="border-t border-[rgba(243,244,240,0.10)] bg-canvas">
      <div className="track py-band">
        <div className="grid12 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <ProvenanceLockup className="text-paper" markSize={22} />
            {/* the ambition line — its one permitted homepage appearance (§24.1),
                as a signature rather than a claim */}
            <p className="mt-3 text-mono-sm uppercase text-paper-muted">
              Building the memory layer for real assets
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:justify-self-end">
            <Link
              href="/thesis"
              className="-my-2 inline-flex min-h-[44px] items-center text-ui text-paper-muted transition-colors duration-instant hover:text-paper"
            >
              Thesis
            </Link>
          </div>
        </div>

        <p className="mt-16 text-mono-sm uppercase text-paper-subtle">
          Sections 4 to 8 are not built yet. This stage is the shell, hero,
          problem section and Meet Vera.
        </p>
      </div>
    </footer>
  );
}
