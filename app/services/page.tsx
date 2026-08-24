import type { Metadata } from "next";

import { ContactCTA } from "@/components/ContactCTA";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import { ServiceCatalogue } from "@/components/services/ServiceCatalogue";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Navbar1 } from "@/components/ui/navbar-1";

const description =
  "Custom software, web and mobile applications, e-commerce management systems, RAG chatbots, personalised AI tools, marketplace research, SEO and growth marketing — the full Orvinex catalogue, delivered by one team.";

export const metadata: Metadata = {
  title: "Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "https://orvinex.store/services",
    siteName: "Orvinex",
    title: "Services | Orvinex",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Orvinex",
    description,
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar1 />
      <main>
        <ServicesHero />
        <ServiceCatalogue />
        <ProcessStrip />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
