import { clsx } from "clsx";

/* DESIGN.md §4.4.
   Section labels are 20px / 600 / sentence case with a 2px x 24px rule above.
   They are deliberately NOT tiny tracked all-caps eyebrows and NOT mono — that
   daintiness is the specific failure this treatment exists to correct. */

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* the rule is Vera green on dark — the one accent mark per section */}
      <div className="mb-3.5 h-0.5 w-6 bg-vera-400" />
      <p className="text-section-label text-paper">{children}</p>
    </div>
  );
}
