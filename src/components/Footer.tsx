export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-5 w-5 border-2 border-accent flex items-center justify-center">
              <div className="h-1.5 w-1.5 bg-accent" />
            </div>
            <span className="text-[16px] font-semibold text-foreground tracking-[-0.01em]">
              Provenance
            </span>
          </div>
          <p className="text-[15px] text-slate max-w-xs">
            The memory layer for commercial real estate.
          </p>
        </div>

        <a
          id="request-access"
          href="mailto:hello@provenance.example"
          className="inline-flex items-center justify-center text-[15px] font-semibold text-warm-white bg-accent px-8 py-3.5 rounded-sm hover:bg-accent-light transition-colors duration-200"
        >
          Request early access
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-12 pt-8 border-t border-border">
        <p className="text-[13px] text-muted-foreground">
          &copy; {new Date().getFullYear()} Provenance. Illustrative demo. All
          property data is fictional.
        </p>
      </div>
    </footer>
  );
}
