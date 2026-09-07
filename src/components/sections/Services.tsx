import { services } from "@/content/site";

/** 5.9 — deliberately quiet after the pinned sequences. Scannable reference. */
export default function Services() {
  return (
    <section id="services" className="plumb-pad border-t border-ink/10 py-20 md:py-24">
      <h2 className="label text-slate">05 — Services</h2>

      <ul className="mt-10 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <li key={service.title} className="group bg-paper p-6 transition-colors duration-200 hover:bg-chalk">
            <p className="label text-slate">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="display mt-4 text-md">{service.title}</h3>
            <p className="mt-2 max-w-[34ch] text-sm text-slate">{service.body}</p>
            <span
              aria-hidden="true"
              className="mt-5 block h-px w-8 bg-brass transition-all duration-300 group-hover:w-16"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
