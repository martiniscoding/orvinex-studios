import type { Metadata } from "next";
import Shell, { Container } from "@/components/Shell";
import ServiceList from "@/components/sections/ServiceList";
import Footer from "@/components/sections/Footer";
import { servicesIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "Software and AI Development Services | Orvinex",
  description:
    "Custom software, web and mobile apps, RAG chatbots and AI tools. One team, one roadmap.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <Shell>
      <Container className="pb-4">
        {/* On a laptop the heading and the board together are exactly one
            screen under the nav (72px) and the shell's top padding (3.5rem),
            so every service is visible without scrolling. It is a minimum,
            not a fixed height, so nothing clips if the copy ever grows. */}
        <div className="flex flex-col gap-7 lg:min-h-[min(calc(100svh-72px-3.5rem),880px)] lg:gap-8 lg:pb-8 lg:[@media(max-height:820px)]:gap-6 lg:[@media(max-height:820px)]:pb-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
            <h1 className="display-serif text-[clamp(2rem,min(3.5vw,5.4vh),3rem)]">{servicesIntro.title}</h1>
            <p className="max-w-[52ch] text-[0.9375rem] leading-[1.6] text-muted lg:pb-1">{servicesIntro.body}</p>
          </div>
          <div className="min-h-0 flex-1">
            <ServiceList />
          </div>
        </div>
        <Footer />
      </Container>
    </Shell>
  );
}
