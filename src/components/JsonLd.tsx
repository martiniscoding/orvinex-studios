/**
 * schema.org structured data. Several nodes are emitted as one @graph with a
 * single top-level @context: the canonical form, and the one naive readers
 * (browser extensions, some crawlers) expect. "<" is escaped so content can
 * never close the tag.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data.map((node) =>
          Object.fromEntries(Object.entries(node).filter(([key]) => key !== "@context")),
        ),
      }
    : data;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}
