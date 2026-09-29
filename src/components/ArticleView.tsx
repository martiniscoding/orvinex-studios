import Image from "next/image";
import Link from "next/link";
import ServiceCta from "@/components/sections/ServiceCta";
import { ArrowIcon } from "@/components/Icons";
import { formatDate, type Heading, type Post } from "@/lib/articles";
import { founder, serviceGroups, site } from "@/content/site";
import { prose } from "@/components/prose";

/**
 * An article as readers see it, from the breadcrumb to "Keep reading". Shared
 * by the public page and the admin preview, so the preview is exact.
 */

const allServices = serviceGroups.flatMap((g) => g.services);


function Toc({ items }: { items: Heading[] }) {
  return (
    <ol className="space-y-2.5 text-[0.9375rem]">
      {items.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
          <a href={`#${h.id}`} className="text-muted transition-colors hover:text-ink">
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function ArticleView({ post, related }: { post: Post; related: Post[] }) {
  const services = post.services
    .map((id) => allServices.find((s) => s.id === id))
    .filter((s) => s !== undefined);
  const byFounder = post.author === founder.name;

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">Home</Link>
          </li>
          <li aria-hidden="true" className="text-faint">/</li>
          <li>
            <Link href="/articles" className="transition-colors hover:text-ink">Articles</Link>
          </li>
          <li aria-hidden="true" className="text-faint">/</li>
          <li aria-current="page" className="line-clamp-1 text-ink-2">{post.title}</li>
        </ol>
      </nav>

      <header className="mt-8 max-w-[48rem]">
        <p className="eyebrow">
          {post.category}
          {post.draft && <span className="ml-3 rounded-full bg-mark px-2 py-0.5 text-xs text-ink normal-case">Draft</span>}
        </p>
        <h1 className="display-serif mt-4 text-[clamp(2.25rem,5vw,3.75rem)] text-balance">{post.title}</h1>
        <p className="mt-5 max-w-[60ch] text-[1.125rem] leading-[1.6] text-muted">{post.description}</p>

        <div className="mt-8 flex items-center gap-3">
          {byFounder && (
            <Image
              src={founder.photo}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
          )}
          <div className="text-sm">
            <p className="font-semibold text-ink">
              {byFounder ? <Link href="/#founder" rel="author">{post.author}</Link> : post.author}
            </p>
            <p className="text-muted">
              {post.updated !== post.date ? (
                <>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>
              ) : (
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              )}
              {" · "}
              {post.readingMinutes} min read
            </p>
          </div>
        </div>
      </header>

      {post.cover && (
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)] bg-hush">
          <Image
            src={post.cover}
            alt={post.coverAlt ?? ""}
            fill
            priority
            sizes="(min-width: 1152px) 1072px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 gap-12 border-t border-line pt-12 lg:grid-cols-[minmax(0,46rem)_minmax(0,1fr)] lg:gap-16">
        <div>
          {post.toc.length > 2 && (
            <details className="mb-10 rounded-[var(--radius-card)] border border-line p-5 lg:hidden">
              <summary className="cursor-pointer text-[0.9375rem] font-semibold">On this page</summary>
              <div className="mt-4">
                <Toc items={post.toc} />
              </div>
            </details>
          )}
          <article className={prose} dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faqs.length > 0 && (
            <section className="mt-16">
              <h2 id="faq" className="scroll-mt-28 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">
                Frequently asked questions
              </h2>
              <div className="mt-6 border-t border-line">
                {post.faqs.map((f) => (
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
          )}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-10">
            {post.toc.length > 2 && (
              <nav aria-label="On this page">
                <p className="mb-4 text-sm font-semibold text-ink">On this page</p>
                <Toc items={post.toc} />
              </nav>
            )}
            {services.length > 0 && (
              <div>
                <p className="mb-4 text-sm font-semibold text-ink">Related services</p>
                <ul className="space-y-2.5 text-[0.9375rem]">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link href={`/services/${s.id}`} className="text-muted transition-colors hover:text-accent">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <ServiceCta service={services[0]?.title ?? site.name} />

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.025em]">Keep reading</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/articles/${p.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-card p-6 transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(30,36,48,0.45)]"
                >
                  <span className="text-sm font-medium text-accent">{p.category}</span>
                  <span className="mt-3 flex flex-1 items-start justify-between gap-4 text-[1.125rem] leading-[1.35] font-semibold tracking-[-0.02em]">
                    {p.title}
                    <span className="mt-1 text-faint transition-transform duration-300 group-hover:translate-x-0.5 [&_svg]:h-4 [&_svg]:w-4">
                      <ArrowIcon />
                    </span>
                  </span>
                  <span className="mt-4 text-sm text-faint">{p.readingMinutes} min read</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
