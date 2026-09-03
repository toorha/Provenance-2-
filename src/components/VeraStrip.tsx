import { VERA } from "@/lib/demo-data";

/* ------------------------------------------------------------------ *
 * What Vera does, immediately under the fold.
 *
 * The narrative that follows earns its conclusion slowly, which is
 * right for the argument and wrong for someone deciding in ten seconds
 * whether to keep reading. This band answers "what is it" before the
 * problem section starts, and Meet Vera expands it properly later.
 * ------------------------------------------------------------------ */
export function VeraStrip() {
  return (
    <section
      aria-label="What Vera does"
      className="border-y border-border bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <ol className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {VERA.jobs.map((job, i) => (
            <li
              key={job.id}
              className={
                "py-6 sm:py-7 " +
                (i === 0 ? "sm:pr-7" : i === 1 ? "sm:px-7" : "sm:pl-7")
              }
            >
              <p className="text-[16px] font-semibold tracking-[-0.014em] text-foreground">
                {job.name}
              </p>
              <p className="mt-1 text-[14.5px] leading-[1.45] text-steel">
                {job.teaser}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
