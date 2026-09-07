import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Proof from "@/components/sections/Proof";
import Specimen from "@/components/sections/Specimen";
import Problem from "@/components/sections/Problem";
import Naming from "@/components/sections/Naming";
import Solution from "@/components/sections/Solution";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Founder from "@/components/sections/Founder";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Proof />
        <Specimen />
        <Problem />
        <Naming />
        <Solution />
        <Approach />
        <Services />
        <Work />
        <Pricing />
        <Testimonials />
        <Founder />
      </main>
      <Footer />
    </>
  );
}
