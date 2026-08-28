import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Markdown } from "@/components/blog/Markdown";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar1 } from "@/components/ui/navbar-1";
import { Reveal } from "@/components/ui/Reveal";
import { servicePageStructuredData } from "@/lib/blog-schema";
import { getServicePage, listServicePages } from "@/lib/service-pages";
import { BANDS, SERVICES } from "@/lib/services";
import { BOOKING_URL } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const pages = await listServicePages();
  return pages.map((page) => ({ slug: page.slug }));
}

type Params = { params: { slug: string } };

function catalogueEntry(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = await getServicePage(params.slug);
  const service = catalogueEntry(params.slug);
  if (!page || !service) return { title: "Not found", robots: { index: false } };

  const title = page.metaTitle?.trim() || `${service.title} | Orvinex`;
  const description = page.metaDescription?.trim() || page.intro;

  return {
    // metaTitle already carries the brand, so opt out of the "%s | Orvinex"
    // template rather than ending up with it twice.
    title: { absolute: title },
    description,
    alternates: { canonical: `/services/${page.slug}` },
    openGraph: {
      type: "website",
      url: `https://orvinex.store/services/${page.slug}`,
      siteName: "Orvinex",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const page = await getServicePage(params.slug);
  const service = catalogueEntry(params.slug);
  if (!page || !service) notFound();

  const band = BANDS.find((b) => b.id === service.band);
  const siblings = SERVICES.filter(
    (other) => other.band === service.band && other.slug !== service.slug
  );

  return (
    <>
      <JsonLd
        data={servicePageStructuredData({
          slug: page.slug,
          name: service.title,
          headline: page.headline,
          description: page.metaDescription?.trim() || page.intro,
          faq: page.faq,
        })}
      />
      <Navbar1 />

      <main>
        <section className="relative overflow-hidden pt-32 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-grid mask-hero-grid opacity-80"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[380px] w-[min(90vw,720px)] -translate-x-1/2 rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgb(var(--primary) / calc(0.2 * var(--wash))) 0%, transparent 70%)",
            }}
          />

          <Reveal className="mx-auto max-w-[46rem] px-5">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[13.5px] text-muted outline-none transition-colors hover:text-ink focus-visible:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2.2} />
              All services
            </Link>

            <div className="mt-7 flex items-center gap-3">
              <span className="font-mono text-[12px] tracking-[0.2em] text-primary">
                {service.code}
              </span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                {band?.label}
              </span>
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.1rem,4.8vw,3.1rem)] font-bold leading-[1.07] tracking-[-0.035em] text-ink text-balance">
              {page.headline}
            </h1>

            <p className="mt-6 text-[17px] leading-relaxed text-muted">
              {page.intro}
            </p>

            <ul className="mt-7 flex flex-wrap gap-1.5">
              {service.stack.map((entry) => (
                <li
                  key={entry}
                  className="rounded-full border border-ink/[0.09] bg-ink/[0.03] px-3 py-1 text-[12px] font-medium tracking-wide text-ink/60"
                >
                  {entry}
                </li>
              ))}
            </ul>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary-deep px-6 py-3 text-[14.5px] font-semibold text-ink shadow-glow-btn outline-none transition-colors hover:bg-primary focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              Discuss your project
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
          </Reveal>
        </section>

        <section className="mx-auto max-w-[46rem] px-5 pt-14">
          <hr className="border-ink/[0.08]" />
          <div className="mt-8">
            <Markdown>{page.body}</Markdown>
          </div>
        </section>

        {page.faq.length > 0 && (
          <section className="mx-auto max-w-[46rem] px-5 pt-16">
            <h2 className="font-display text-[24px] font-bold tracking-tight text-ink">
              Common questions
            </h2>
            <div className="mt-6 divide-y divide-ink/[0.08] border-y border-ink/[0.08]">
              {page.faq.map((item) => (
                // <details> keeps the answer in the DOM when collapsed, so the
                // text is crawlable and the FAQPage markup describes content
                // that is genuinely on the page.
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[16px] font-semibold text-ink marker:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {siblings.length > 0 && (
          <section className="mx-auto max-w-[46rem] px-5 pb-4 pt-16">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/45">
              Also in {band?.label}
            </h2>
            <ul className="mt-5">
              {siblings.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="group flex items-baseline gap-3 border-t border-ink/[0.08] py-4 outline-none"
                  >
                    <span className="font-mono text-[11px] tracking-[0.14em] text-ink/30">
                      {other.code}
                    </span>
                    <span className="font-display text-[16px] font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">
                      {other.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-16">
          <ContactCTA />
        </div>
      </main>

      <Footer />
    </>
  );
}
