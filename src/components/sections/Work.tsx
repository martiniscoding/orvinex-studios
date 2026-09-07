import { work } from "@/content/site";
import { coverArt } from "@/components/art/Covers";

/**
 * 5.10 — full-bleed rows rather than cards: four projects is too few for a
 * grid to look intentional. No case-study links, because those pages do not
 * exist. DEMO_CONTENT: invented projects and outcomes.
 */
export default function Work() {
  return (
    <section id="work" className="plumb-pad border-t border-ink/10 py-20 md:py-28">
      <h2 className="label text-slate">06 — Selected work</h2>

      <ul className="mt-12 space-y-16 md:space-y-24">
        {work.map((project, i) => (
          <li
            key={project.id}
            className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
              i % 2 === 1 ? "md:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="border border-ink/12 bg-chalk p-2.5">
              {coverArt[project.id]}
            </figure>
            <div>
              <div className="flex items-baseline gap-4">
                <h3 className="display text-xl">{project.client}</h3>
                <span className="label text-slate">{project.year}</span>
              </div>
              <p className="mt-2 text-base text-slate md:text-md">{project.what}</p>
              <dl className="mt-8 space-y-4 border-t border-ink/10 pt-6 text-sm">
                <div className="flex gap-6">
                  <dt className="label w-24 shrink-0 text-slate">Scope</dt>
                  <dd>{project.did}</dd>
                </div>
                <div className="flex gap-6">
                  <dt className="label w-24 shrink-0 text-slate">Outcome</dt>
                  <dd>{project.outcome}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
