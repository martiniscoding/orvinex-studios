import { defaultSchema } from "rehype-sanitize";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

/**
 * What an author may paste into an article or service body.
 *
 * The threat model is narrow — only signed-in staff write content — but raw
 * HTML would turn a stolen admin password from "they read the leads" into
 * "they run script in every visitor's browser". The allowlist removes that
 * escalation rather than relying on nobody making a mistake.
 *
 * Everything not named here is stripped, including <script>, <style>, every
 * on* handler and javascript: URLs, which the default schema already refuses.
 */
export const contentSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "iframe",
    "video",
    "source",
    "figure",
    "figcaption",
    "details",
    "summary",
    "kbd",
    "mark",
    "abbr",
    "small",
    "u",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "className", "id"],
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowFullScreen",
      "loading",
      "referrerPolicy",
      "frameBorder",
    ],
    video: ["src", "poster", "controls", "muted", "loop", "playsInline", "width", "height", "preload"],
    source: ["src", "type"],
    img: [...(defaultSchema.attributes?.img ?? []), "loading", "decoding", "width", "height"],
    a: [...(defaultSchema.attributes?.a ?? []), "target", "rel"],
    td: [...(defaultSchema.attributes?.td ?? []), "colSpan", "rowSpan"],
    th: [...(defaultSchema.attributes?.th ?? []), "colSpan", "rowSpan", "scope"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["https"],
    href: ["http", "https", "mailto", "tel"],
  },
};

/**
 * Hosts an <iframe> may point at.
 *
 * An open iframe is a redressing and tracking surface, and the only reason
 * anyone asks for one here is to embed a video.
 */
const EMBED_HOSTS = [
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "player.vimeo.com",
  "www.loom.com",
  "loom.com",
];

function hostOf(url: string) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

/**
 * Applies the rules that keep pasted markup from costing search rankings.
 *
 * All three are Core Web Vitals or document-outline problems rather than
 * security ones, which is why they live here instead of in the schema:
 *
 * 1. An embed that loads eagerly competes with the article for bandwidth and
 *    pushes out LCP. A YouTube player is heavier than everything else on the
 *    page combined.
 * 2. An iframe with no reserved space shifts the layout when it arrives, which
 *    is measured directly as CLS.
 * 3. A pasted <h1> gives the page a second one and muddies the outline a
 *    crawler builds. Markdown `#` is already demoted for the same reason.
 */
export function rehypeContentGuards() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "h1") {
        node.tagName = "h2";
        return;
      }

      if (node.tagName === "iframe") {
        const src = String(node.properties?.src ?? "");
        const host = hostOf(src);

        // Drop anything not on the embed allowlist rather than render it.
        if (!host || !EMBED_HOSTS.includes(host)) {
          if (parent && typeof index === "number") {
            parent.children.splice(index, 1);
          }
          return;
        }

        // Rebuilt rather than spread over: the wrapper below sizes the frame,
        // so any width/height/frameBorder the author pasted has to go.
        node.properties = {
          src,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          allow:
            "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowFullScreen: true,
          title: node.properties?.title ?? "Embedded video",
          className: ["absolute", "inset-0", "h-full", "w-full"],
        };

        // Reserve 16:9 before the player arrives, so nothing moves.
        const wrapper: Element = {
          type: "element",
          tagName: "div",
          properties: {
            className: [
              "relative",
              "mt-6",
              "aspect-video",
              "w-full",
              "overflow-hidden",
              "rounded-xl",
              "border",
              "border-white/[0.08]",
              "bg-black",
            ],
          },
          children: [node],
        };
        if (parent && typeof index === "number") {
          parent.children[index] = wrapper;
        }
        return;
      }

      if (node.tagName === "video") {
        node.properties = {
          ...node.properties,
          preload: "metadata",
          controls: true,
          className: ["mt-6", "w-full", "rounded-xl", "border", "border-white/[0.08]"],
        };
      }
    });
  };
}
