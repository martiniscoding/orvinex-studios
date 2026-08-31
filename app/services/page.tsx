import type { Metadata } from "next";

import { ContactCTA } from "@/components/ContactCTA";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import { ServiceCatalogue } from "@/components/services/ServiceCatalogue";
import { ServicesHero } from "@/components/services/ServicesHero";
import { Navbar1 } from "@/components/ui/navbar-1";
import { listCatalogue } from "@/lib/service-catalogue";

// Kept under 158 characters: past that Google truncates the snippet mid-word.
const description =
  "Custom software, web and mobile apps, e-commerce systems, RAG chatbots, AI tools, marketplace research, SEO and growth — one team, one roadmap.";

export const metadata: Metadata = {
  title: "Software, AI and Growth Services",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    url: "https://orvinex.store/services",
    siteName: "Orvinex",
    title: "Software, AI and Growth Services | Orvinex",
    description,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software, AI and Growth Services | Orvinex",
    description,
    images: ["/opengraph-image"],
  },
};

export const revalidate = 3600;

export default async function ServicesPage() {
  const services = await listCatalogue();

  return (
    <>
      <Navbar1 />
      <main>
        <ServicesHero services={services} />
        <ServiceCatalogue services={services} />
        <ProcessStrip />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
