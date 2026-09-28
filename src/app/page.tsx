import Shell, { Container } from "@/components/Shell";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import PricingTeaser from "@/components/sections/PricingTeaser";
import Testimonials from "@/components/sections/Testimonials";
import FinalNote from "@/components/sections/FinalNote";
import Footer from "@/components/sections/Footer";
import { Divider } from "@/components/ui/Bits";
import { problem, solution, finalNote } from "@/content/site";

export default function Page() {
  return (
    <Shell hero>
      <Hero />
      <Container className="pb-4">
        <Divider label="The work" />
        <Work />
        <Divider label={problem.eyebrow} />
        <Problem />
        <Divider label={solution.eyebrow} />
        <Solution />
        <Divider label="How it works" />
        <Approach />
        <Divider label="Services" />
        <Services />
        <Divider label="Pricing" />
        <PricingTeaser />
        <Divider label="What clients said" />
        <Testimonials />
        <Divider label={finalNote.eyebrow} />
        <FinalNote />
        <Footer />
      </Container>
    </Shell>
  );
}
