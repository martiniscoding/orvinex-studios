import Sidebar from "@/components/Sidebar";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FinalNote from "@/components/sections/FinalNote";
import Footer from "@/components/sections/Footer";
import { Divider } from "@/components/ui/Bits";
import { problem, solution, finalNote } from "@/content/site";

export default function Page() {
  return (
    <>
      <Sidebar />
      <main className="lg:pl-[var(--rail)]">
        <div className="px-3 pb-4 lg:py-5 lg:pr-5 lg:pl-0">
          <div className="rounded-[var(--radius-panel)] bg-panel px-5 py-10 sm:px-8 lg:px-14 lg:py-16">
            <Hero />
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
            <Pricing />
            <Divider label="What clients said" />
            <Testimonials />
            <Divider label={finalNote.eyebrow} />
            <FinalNote />
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
