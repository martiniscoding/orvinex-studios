import type { Metadata } from "next";
import Shell, { Container } from "@/components/Shell";
import ServiceList from "@/components/sections/ServiceList";
import Footer from "@/components/sections/Footer";
import { serviceGroups, servicesIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "Software, AI and Growth Services | Orvinex",
  description:
    "Custom software, web and mobile apps, e-commerce systems, RAG chatbots, AI tools, marketplace research, SEO and growth — one team, one roadmap.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Shell>
      <Container className="pb-4">
        <div className="mb-12 lg:mb-16">
          <p className="eyebrow">{servicesIntro.eyebrow}</p>
          <h1 className="display-serif mt-4 max-w-[20ch] text-[clamp(2.25rem,5vw,3.75rem)]">
            {servicesIntro.title}
          </h1>
          <p className="mt-5 max-w-[60ch] text-[1.0625rem] text-muted">{servicesIntro.body}</p>
          <nav aria-label="Service groups" className="mt-8 flex flex-wrap gap-2">
            {serviceGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-line px-4 py-2 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {g.label}
              </a>
            ))}
          </nav>
        </div>
        <ServiceList />
        <Footer />
      </Container>
    </Shell>
  );
}
