import { services } from "@/content/site";

export default function Services() {
  return (
    <section>
      <p className="eyebrow">What I do</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.title}
            className="group rounded-[var(--radius-card)] bg-card p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <h3 className="phudu text-[1.125rem] leading-none">{service.title}</h3>
            <p className="mt-3 text-[0.9375rem] text-muted">{service.body}</p>
            <span
              aria-hidden="true"
              className="mt-5 block h-1 w-8 rounded-full bg-line transition-all duration-300 group-hover:w-14 group-hover:bg-accent"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
