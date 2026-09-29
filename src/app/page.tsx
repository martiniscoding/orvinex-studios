import type { Metadata } from "next";
import Shell, { Container } from "@/components/Shell";
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import Founder from "@/components/sections/Founder";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { Divider } from "@/components/ui/Bits";
import { testimonialsIntro, workflow } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Page() {
  return (
    <Shell hero>
      <Hero />
      <Showcase />
      <Container className="pb-4">
        <Divider label="Founder" />
        <Founder />
        <Divider label={testimonialsIntro.eyebrow} />
        <Testimonials />
        <Divider label={workflow.eyebrow} />
        <Process />
        <Divider label="Contact" />
        <Contact />
        <Footer />
      </Container>
    </Shell>
  );
}
