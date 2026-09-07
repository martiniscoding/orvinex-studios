import { testimonials } from "@/content/site";

/**
 * 5.12 — DEMO_CONTENT. These are written for a fictional studio; there are no
 * photos, so no fake headshots either. For a real client with no real quotes,
 * delete this component and its entry in page.tsx rather than softening it.
 */
export default function Testimonials() {
  return (
    <section id="testimonials" className="plumb-pad border-t border-ink/10 py-20 md:py-24">
      <h2 className="label text-slate">08 — What clients said</h2>

      <ul className="mt-10 grid gap-px bg-ink/10 md:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.name} className="flex flex-col justify-between bg-chalk p-7">
            <blockquote className="text-base leading-snug md:text-md">
              <span aria-hidden="true" className="text-brass">
                “
              </span>
              {t.quote}
            </blockquote>
            <footer className="mt-8 border-t border-ink/10 pt-4">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="label mt-1 text-slate">
                {t.role}, {t.company}
              </p>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
