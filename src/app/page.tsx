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
import { Divider } from "@/components/ui/Bits";
import JsonLd from "@/components/JsonLd";
import { faq, howWeWork, testimonialsIntro, workflow } from "@/content/site";

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
        <Divider label="Founder" />
        <Founder />
        <Divider label={testimonialsIntro.eyebrow} />
        <Testimonials />
        <Divider label="How we work" />
        <HowWeWork content={howWeWork} />
        <Divider label={workflow.eyebrow} />
        <Process />
        <Divider label={faq.eyebrow} />
        <Faq />
        <Divider label="Contact" />
        <Contact />
        <Footer />
      </Container>
    </Shell>
  );
}
