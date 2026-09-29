import type { Metadata } from "next";
import Shell, { Container } from "@/components/Shell";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";
import { pricingTeaser } from "@/content/site";

export const metadata: Metadata = {
  title: "Pricing — Orvinex",
  description:
    "Fixed prices for websites, brand systems and web and mobile apps, designed and built, plus a monthly retainer. The numbers are on the page.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <Shell>
      <Container className="pb-4">
        <div className="mb-10 lg:mb-14">
          <p className="eyebrow">{pricingTeaser.eyebrow}</p>
          <h1 className="display-serif mt-4 max-w-[18ch] text-[clamp(2.25rem,5vw,3.75rem)]">
            {pricingTeaser.title}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.0625rem] text-muted">{pricingTeaser.body}</p>
        </div>
        <Pricing />
        <Footer />
      </Container>
    </Shell>
  );
}
