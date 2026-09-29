import type { Metadata } from "next";
import Shell, { Container } from "@/components/Shell";
import WorkGrid from "@/components/sections/WorkGrid";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Work — Orvinex",
  description: "Products we have designed, built and shipped.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <Shell>
      <Container className="pb-4">
        <div className="mb-10 text-center lg:mb-12">
          <p className="eyebrow">Work</p>
          <h1 className="display-serif mx-auto mt-4 max-w-[16ch] text-[clamp(2.25rem,5.4vw,4rem)]">
            Showcase of our <span className="text-accent italic">best work</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[48ch] text-[1.0625rem] text-muted">
            Products we have designed, built and shipped. Hover a project to see what it is.
          </p>
        </div>
        <WorkGrid />
        <Footer />
      </Container>
    </Shell>
  );
}
