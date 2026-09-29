import Link from "next/link";
import Shell, { Container } from "@/components/Shell";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

/**
 * A long-form legal document: breadcrumb, title, a boxed plain-English
 * summary, then the policy itself. The body is trusted static HTML from
 * `src/content/legal`, styled here through descendant selectors.
 */
export default function LegalPage({
  title,
  updated,
  summary,
  html,
}: {
  title: string;
  updated: string;
  summary: string;
  html: string;
}) {
  return (
    <Shell>
      <Container className="pb-4">
        <article className="mx-auto max-w-[46rem]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-faint">
                /
              </li>
              <li aria-current="page" className="text-ink-2">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="display-serif mt-6 text-[clamp(2.25rem,5vw,3.5rem)]">{title}</h1>
          <p className="mt-4 font-mono text-xs tracking-[0.08em] text-faint">Last updated {updated}</p>

          <div className="mt-8 rounded-2xl border border-accent/25 bg-accent/[0.05] p-6">
            <h2 className="text-base font-semibold text-ink">The short version</h2>
            <p
              className="mt-3 text-[15px] leading-relaxed text-ink-2 [&_strong]:font-semibold [&_strong]:text-ink"
              dangerouslySetInnerHTML={{ __html: summary }}
            />
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-flex max-w-full truncate text-sm font-medium text-accent transition-colors hover:text-accent-deep"
            >
              {site.email}
            </a>
          </div>

          <div
            className="pb-12 pt-4 text-base leading-[1.75] text-ink-2 [&_a]:break-all [&_a]:text-accent [&_a]:underline [&_a]:decoration-accent/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-accent [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:mt-9 [&_h3]:text-[19px] [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-ink [&_hr]:mt-10 [&_hr]:border-line [&_p]:mt-5 [&_strong]:font-semibold [&_strong]:text-ink [&_table]:mt-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-[14.5px] [&_td]:border-b [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_th]:border-b [&_th]:border-ink/20 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-ink [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_li]:marker:text-accent/60"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <Footer />
      </Container>
    </Shell>
  );
}
