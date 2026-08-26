/**
 * Emits a JSON-LD block.
 *
 * Escaping `<` stops a literal `</script>` inside any data field — a post
 * title, say — from terminating the tag early and injecting markup.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
