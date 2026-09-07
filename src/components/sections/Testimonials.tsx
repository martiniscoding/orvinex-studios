import { testimonials } from "@/content/site";

/**
 * DEMO_CONTENT. Written for a fictional studio, and there are no photographs,
 * so no stock headshots stand in for people who do not exist.
 */
export default function Testimonials() {
  return (
    <section>
      <ul className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li
            key={t.name}
            className="flex flex-col justify-between rounded-[var(--radius-card)] bg-card p-7"
          >
            <blockquote className="text-[1.0625rem] leading-[1.55] text-ink-2">
              {t.quote}
            </blockquote>
            <footer className="mt-7 flex items-center gap-3 border-t border-line pt-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-hush text-sm font-semibold text-ink-2"
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span>
                <span className="block text-sm font-medium">{t.name}</span>
                <span className="block text-[0.8125rem] text-muted">{t.role}</span>
              </span>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
