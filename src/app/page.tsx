import type { Metadata } from "next";
import Shell, { Container } from "@/components/Shell";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import Founder from "@/components/sections/Founder";
import Testimonials from "@/components/sections/Testimonials";
import HowWeWork from "@/components/HowWeWork";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import { faq, howWeWork } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Page() {
  return (
    <Shell hero>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <Hero />
      <Showcase />
      <Container className="pb-4">
        <div className="mt-16 space-y-16 lg:mt-24 lg:space-y-24">
          <Founder />
          <Testimonials />
          <HowWeWork content={howWeWork} />
          <Process />
          <Faq />
          <Contact />
        </div>
        <Footer />
      </Container>
    </Shell>
  );
}
