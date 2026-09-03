import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ClosingCta } from "@/components/ClosingCta";
import { THESIS } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Thesis · Provenance",
  description:
    "Buildings outlive the people who work on them. Their memory should too. The belief behind Vera and Provenance.",
};

/* ------------------------------------------------------------------ *
 * THE THESIS
 *
 * Product philosophy, so it is set as an argument rather than a feature
 * page: one column, long measure, almost no containment. The only
 * structures on the page are the two lists the argument actually needs.
 * ------------------------------------------------------------------ */
export default function ThesisPage() {
  const t = THESIS;

  return (
    <>
      <Navigation />
      <main>
        <article className="tex tex-paper tex-draft relative bg-background pt-36 pb-24 lg:pt-44 lg:pb-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="label-caps">{t.eyebrow}</p>

            <h1 className="mt-7 font-display text-[2.4rem] leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[3rem] lg:text-[3.4rem]">
              {t.headline[0]}
              <br />
              <span className="text-paper">{t.headline[1]}</span>
            </h1>

            <p className="mt-9 text-[19px] leading-[1.6] text-paper lg:text-[20px]">
              {t.opening}
            </p>

            <section className="mt-14 lg:mt-16">
              <p className="max-w-[26ch] font-display text-[1.6rem] leading-[1.18] tracking-[-0.022em] text-foreground sm:text-[1.9rem]">
                {t.accumulation.lead}
              </p>
              <p className="mt-6 text-[17px] leading-[1.65] text-paper">
                {t.accumulation.body}
              </p>
            </section>

            {/* the churn, as a plain list because it is a list */}
            <section className="mt-16 lg:mt-20">
              <p className="text-[10px] uppercase tracking-[0.07em] text-paper-muted">
                {t.churn.label}
              </p>
              <ul className="mt-5 grid gap-x-10 gap-y-0 sm:grid-cols-2">
                {t.churn.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border py-2.5 text-[15.5px] text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* the turn */}
            <section className="mt-16 lg:mt-20">
              <p className="max-w-[24ch] font-display text-[1.9rem] leading-[1.14] tracking-[-0.026em] text-foreground sm:text-[2.3rem]">
                {t.pivot.lead[0]}{" "}
                <span className="text-paper">{t.pivot.lead[1]}</span>
              </p>
              <p className="mt-7 text-[17px] leading-[1.65] text-paper">
                {t.pivot.body}
              </p>
            </section>

            <section className="mt-16 border-l-2 border-accent pl-6 lg:mt-20">
              <p className="max-w-[30ch] font-display text-[1.6rem] leading-[1.18] tracking-[-0.022em] text-foreground sm:text-[1.9rem]">
                {t.belief.lead[0]}{" "}
                <span className="text-paper">{t.belief.lead[1]}</span>
              </p>
            </section>

            {/* how the product follows from that */}
            <section className="mt-16 lg:mt-20">
              <p className="text-[10px] uppercase tracking-[0.07em] text-paper-muted">
                {t.model.label}
              </p>
              <ol className="mt-6">
                {t.model.steps.map((step, i) => (
                  <li
                    key={step.name}
                    className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-border py-5"
                  >
                    <span className="text-[10.5px] text-paper-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-[17px] font-semibold tracking-[-0.014em] text-foreground">
                        {step.name}
                      </span>
                      <span className="mt-1 block text-[15px] leading-[1.5] text-paper">
                        {step.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* one is active, one is persistent, and they are one system */}
            <section className="mt-16 border-t border-border pt-10 lg:mt-20">
              <p className="text-[10px] uppercase tracking-[0.07em] text-paper-muted">
                {t.roles.label}
              </p>
              <div className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-12">
                {t.roles.items.map((r) => (
                  <div key={r.name}>
                    <p className="text-[17px] font-semibold tracking-[-0.014em] text-foreground">
                      {r.name}
                    </p>
                    <p className="mt-2 text-[15.5px] leading-[1.55] text-paper">
                      {r.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[17px] leading-[1.6] text-foreground">
                {t.roles.line}
              </p>
            </section>

            {/* the two horizons, side by side once */}
            <section className="mt-16 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 sm:gap-14 lg:mt-20">
              {t.horizons.map((h) => (
                <div key={h.label}>
                  <p className="text-[10px] uppercase tracking-[0.07em] text-accent">
                    {h.label}
                  </p>
                  <p className="mt-2 text-[16px] font-semibold text-foreground">
                    {h.lead}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {h.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-2.5 text-[15px] leading-[1.5] text-paper"
                      >
                        <span
                          aria-hidden="true"
                          className="h-[4px] w-[4px] shrink-0 -translate-y-[3px] rounded-full bg-accent/55"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <p className="mt-14 font-display text-[1.5rem] leading-[1.2] tracking-[-0.022em] text-foreground sm:text-[1.75rem]">
              <span className="text-vera-400">{t.payoff[0]}</span>{" "}
              {t.payoff[1]}
            </p>

            {/* the careful part */}
            <section className="mt-16 border-t border-border pt-10 lg:mt-20">
              <p className="text-[10px] uppercase tracking-[0.07em] text-paper-muted">
                {t.transfer.label}
              </p>
              <p className="mt-5 max-w-[30ch] text-[19px] font-semibold leading-[1.35] tracking-[-0.016em] text-foreground sm:text-[21px]">
                {t.transfer.headline}
              </p>
              <p className="mt-5 text-[17px] leading-[1.65] text-paper">
                {t.transfer.body}
              </p>
              <p className="mt-6 text-[16px] leading-[1.6] text-paper-muted">
                {t.transfer.close}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
                {t.memory.items.map((mem) => (
                  <div key={mem.name}>
                    <p className="text-[15px] font-semibold tracking-[-0.012em] text-foreground">
                      {mem.name}
                    </p>
                    <p className="mt-2 text-[15px] leading-[1.55] text-paper">
                      {mem.note}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* one restrained line about where this goes, then the conclusion.
                The promise itself is the closing section below, so it is not
                repeated here. */}
            <section className="mt-16 border-t border-border pt-10 lg:mt-20">
              <p className="text-[17px] leading-[1.65] text-paper">
                {t.horizon}
              </p>
              <p className="mt-8 max-w-[28ch] font-display text-[1.6rem] leading-[1.18] tracking-[-0.022em] text-foreground sm:text-[1.9rem]">
                {t.conclusion}
              </p>
            </section>
          </div>
        </article>

        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
