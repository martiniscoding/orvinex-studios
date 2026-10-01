/**
 * Shipped client work, from Orvinex (orvinex.store), the owner's other
 * company. Website shots live in /public/work (~2500×1450 hero captures,
 * shown 16:10 from the top); app screens, if any, live in /public/apps
 * (230×498 phone captures, `<slug>-<n>.webp`). Used by the home page marquee
 * and the /work page. A site without a `url` renders as a plain tile.
 */
export type Work =
  | { kind: "site"; slug: string; name: string; what: string; url?: string; src: string }
  | { kind: "app"; slug: string; name: string; what: string; screens: string[] };

/** The screenshot is /work/<slug>.png unless `file` names another one in /work. */
const site = (slug: string, name: string, what: string, url?: string, file = `${slug}.png`): Work => ({
  kind: "site",
  slug,
  name,
  what,
  url,
  src: `/work/${file}`,
});

export const works: Work[] = [
  site("jee-society", "JEE Society", "Student portal for JEE aspirants"),
  site("dexter", "Dexter", "AI architecture review platform"),
  site("a-star-coaching", "A Star Teaching", "Live classes and coaching portal"),
  site("calendia", "Calendia", "Booking platform and website builder"),
  site("jee-society-careers", "JEE Society Careers", "Hiring site for an edtech startup"),
  site("maa-kamakhya", "Maa Kamakhya Hardware", "Architectural hardware storefront", undefined, "mkh.png"),
  site("panini8", "Panini8", "Olympiad practice and mastery platform"),
  site("syamabala", "Syamabala", "Learning software for gifted students"),
  site("buildlabs", "Build Labs", "Portfolio site for a product design studio"),
];

export const workBySlug = (slug: string) => {
  const w = works.find((w) => w.slug === slug);
  if (!w) throw new Error(`Unknown work: ${slug}`);
  return w;
};
