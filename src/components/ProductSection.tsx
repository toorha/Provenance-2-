import { ProductShowcase } from "./ProductShowcase";
import { SHOWCASE } from "@/lib/demo-data";

export function ProductSection() {
  return (
    <section id="product" className="tex tex-paper bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="label-caps">{SHOWCASE.label}</p>
        <h2 className="mt-7 font-display text-display-sm leading-[1.04] text-foreground sm:text-display-md">
          {SHOWCASE.headline[0]}
          <br />
          {SHOWCASE.headline[1]}
          <br />
          <span className="text-graphite">{SHOWCASE.headline[2]}</span>
        </h2>
        <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.6] text-graphite lg:text-[18px]">
          {SHOWCASE.body}
        </p>

        <div className="mt-12 lg:mt-14">
          <ProductShowcase />
        </div>
      </div>
    </section>
  );
}
