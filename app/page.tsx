import { JsonLd } from "@/components/JsonLd";
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <Navbar1 />
      <main>
        <Hero />
        <TrustLogos />
        <FounderSection />
        <ServicesGrid />
        <AboutStats />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
