import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import Shell, { Container } from "@/components/Shell";
import Footer from "@/components/sections/Footer";
import ServiceCta from "@/components/sections/ServiceCta";
import { ArrowIcon } from "@/components/Icons";
import { serviceGroups, site } from "@/content/site";
import { serviceDetails, type Block, type Inline } from "@/content/serviceDetails";

type Props = { params: Promise<{ slug: string }> };

function find(slug: string) {
  const detail = serviceDetails.find((d) => d.id === slug);
  const group = serviceGroups.find((g) => g.services.some((s) => s.id === slug));
  const service = group?.services.find((s) => s.id === slug);
  return detail && group && service ? { detail, group, service } : null;
}

export function generateStaticParams() {
  return serviceDetails.map((d) => ({ slug: d.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  return {
    title: found.detail.metaTitle,
    description: found.detail.metaDescription,
    alternates: { canonical: `/services/${found.detail.id}` },
  };
}

function Rich({ content }: { content: Inline[] }) {
  return content.map((x, i) => {
    if (typeof x === "string") return x;
    let node: ReactNode = x.text;
    if (x.em) node = <em>{node}</em>;
    if (x.strong) node = <strong className="font-semibold text-ink">{node}</strong>;
    if (x.href) {
      const cls = "text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent";
      node = x.href.startsWith("/") ? (
        <Link href={x.href} className={cls}>{node}</Link>
      ) : (
        <a href={x.href} className={cls}>{node}</a>
      );
    }
    return <span key={i}>{node}</span>;
  });
}

function Body({ blocks }: { blocks: Block[] }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case "h2":
        return (
          <h2 key={i} className="mt-14 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em] first:mt-0">
            {b.text}
          </h2>
        );
      case "h3":
        return <h3 key={i} className="mt-8 text-[1.25rem] font-semibold tracking-[-0.02em]">{b.text}</h3>;
      case "p":
        return (
          <p key={i} className="mt-4 text-[1.0625rem] leading-[1.7] text-muted">
            <Rich content={b.content} />
          </p>
        );
      default: {
        const List = b.type;
        return (
          <List
            key={i}
            className={`mt-5 space-y-3 pl-5 text-[1.0625rem] leading-[1.7] text-muted marker:text-accent ${
              b.type === "ol" ? "list-decimal" : "list-disc"
            }`}
          >
            {b.items.map((item, j) => (
              <li key={j} className="pl-1.5">
                <Rich content={item} />
              </li>
            ))}
          </List>
        );
      }
    }
  });
}

export default async function ServicePage({ params }: Props) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { detail, group, service } = found;
  const siblings = group.services.filter((s) => s.id !== service.id);

  return (
    <Shell>
      <Container className="pb-4">
        {/* Hero */}
        <div className="mb-14 lg:mb-20">
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-faint transition-colors hover:text-ink"
          >
            <span className="rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5 [&_svg]:h-3.5 [&_svg]:w-3.5">
              <ArrowIcon />
            </span>
            All services
          </Link>
          <p className="eyebrow mt-8">
            <span className="text-accent">{service.code}</span> · {group.label}
          </p>
          <h1 className="display-serif mt-4 max-w-[20ch] text-[clamp(2.25rem,5vw,3.75rem)]">{detail.h1}</h1>
          <p className="mt-5 max-w-[60ch] text-[1.0625rem] text-muted">{detail.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {detail.tags.map((t) => (
              <li key={t} className="rounded-full bg-hush px-3 py-1 text-sm font-medium text-ink-2">
                {t}
              </li>
            ))}
          </ul>
          <a
            href={site.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9375rem] font-medium text-white transition-colors hover:bg-ink-2"
          >
            Discuss your project
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 [&_svg]:h-4 [&_svg]:w-4">
              <ArrowIcon />
            </span>
          </a>
        </div>

        {/* Article */}
        <article className="max-w-[68ch] border-t border-line pt-14">
          <Body blocks={detail.body} />
        </article>

        {/* FAQ */}
        <section className="mt-20 max-w-[68ch]">
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">Common questions</h2>
          <div className="mt-6 border-t border-line">
            {detail.faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-xl leading-none text-faint transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 text-[1.0625rem] leading-[1.7] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <ServiceCta service={service.title} />

        {/* Also in this group */}
        <section className="mt-20">
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">Also in {group.label}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {siblings.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.id}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(30,36,48,0.45)]"
                >
                  <span className="text-sm font-semibold tracking-[0.04em] text-accent">{s.code}</span>
                  <span className="mt-3 flex items-start justify-between gap-4 text-[1.125rem] font-semibold tracking-[-0.02em]">
                    {s.title}
                    <span className="mt-1 text-faint transition-transform duration-300 group-hover:translate-x-0.5 [&_svg]:h-4 [&_svg]:w-4">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Footer />
      </Container>
    </Shell>
  );
}
