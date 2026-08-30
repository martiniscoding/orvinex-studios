import { JsonLd } from "@/components/JsonLd";
import { listCatalogue } from "@/lib/service-catalogue";
import { homeStructuredData } from "./structured-data";
import { AboutStats } from "@/components/AboutStats";
import { ContactCTA } from "@/components/ContactCTA";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { FounderSection } from "@/components/FounderSection";
import { Hero } from "@/components/Hero";
import { Navbar1 } from "@/components/ui/navbar-1";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Testimonials } from "@/components/Testimonials";
import { TrustLogos } from "@/components/TrustLogos";
import { listPublishedTestimonials } from "@/lib/testimonials";

/** Cached; editing a review calls revalidatePath("/"), so the band updates
 *  instantly without making the landing page dynamic. */
export const revalidate = 3600;

export default async function HomePage() {
  const [testimonials, services] = await Promise.all([
    listPublishedTestimonials(),
    listCatalogue(),
  ]);

  return (
    <>
      <JsonLd data={homeStructuredData(services)} />
      <Navbar1 />
      <main>
        <Hero />
        <TrustLogos />
        <FounderSection />
        <ServicesGrid />
        <AboutStats />
        <Testimonials items={testimonials} />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
