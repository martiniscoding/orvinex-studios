import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders post bodies.
 *
 * react-markdown builds React elements rather than an HTML string, and raw
 * HTML in the source is escaped unless rehype-raw is added — which it
 * deliberately is not. That keeps a compromised or careless post from putting
 * script tags on the page.
 *
 * Element styles are declared here rather than through a typography plugin so
 * the prose matches the site's own scale instead of a generic one.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-[16px] leading-[1.75] text-white/75">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // The page already renders the post title as its h1. A `#` heading
          // in the body would make a second one, which muddies the document
          // outline crawlers build, so it is demoted to h2.
          h1: ({ children }) => (
            <h2 className="mt-12 font-display text-[24px] font-bold tracking-tight text-white">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 font-display text-[24px] font-bold tracking-tight text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-9 font-display text-[19px] font-semibold tracking-tight text-white">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mt-5">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
              {...(href?.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-primary/60">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-5 marker:text-white/40">
              {children}
            </ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-primary/50 pl-5 text-white/60">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            // react-markdown gives fenced blocks a language- class and inline
            // code none, which is the only reliable way to tell them apart.
            const fenced = Boolean(className);
            if (fenced) {
              return (
                <code className="block font-mono text-[13.5px] leading-relaxed text-white/85">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[13.5px] text-white/90">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mt-6 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0b0b11] p-4">
              {children}
            </pre>
          ),
          hr: () => <hr className="mt-10 border-white/[0.08]" />,
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={typeof src === "string" ? src : ""}
              alt={alt ?? ""}
              className="mt-6 w-full rounded-xl border border-white/[0.08]"
            />
          ),
          table: ({ children }) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-[14.5px]">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-white/[0.12] px-3 py-2 text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-white/[0.06] px-3 py-2 align-top">
              {children}
            </td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
