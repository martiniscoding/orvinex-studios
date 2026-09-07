import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import { pricingTeaser } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing — Plumbline",
  description:
    "Fixed prices for launch sites, brand systems and product UI, plus a monthly retainer. The numbers are on the page.",
};

export default function PricingPage() {
  return (
    <Shell>
      <div className="mb-10 lg:mb-14">
        <p className="eyebrow">{pricingTeaser.eyebrow}</p>
        <h1 className="hero-type mt-4 max-w-[18ch] text-[clamp(1.875rem,4.4vw,3.25rem)]">
          {pricingTeaser.title}
        </h1>
        <p className="mt-5 max-w-[52ch] text-[1.0625rem] text-muted">
          {pricingTeaser.body}
        </p>
      </div>
      <Pricing />
      <Footer />
    </Shell>
  );
}
