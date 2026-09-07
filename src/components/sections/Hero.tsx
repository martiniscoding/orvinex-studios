import { hero } from "@/content/site";
import { Cta } from "@/components/ui/Cta";

export default function Hero() {
  return (
    <section
      id="top"
      className="plumb-pad relative flex min-h-[100svh] flex-col justify-center pt-[var(--nav-h)] pb-16"
    >
      <p data-hero-credibility className="label flex items-center gap-3 text-slate">
        <span aria-hidden="true" className="h-px w-8 bg-brass" />
        {hero.credibility}
      </p>

      <h1 className="display mt-6 text-[clamp(2.75rem,10vw,9.25rem)]">
        {hero.headline.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <span
              data-hero-line
              className="block"
              style={{ animationDelay: `${0.08 + i * 0.085}s` }}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>

      <p data-hero-sub className="mt-8 max-w-[56ch] text-base text-slate md:text-md md:mt-10">
        {hero.sub}
      </p>

      <div data-hero-cta className="mt-10 flex flex-wrap items-center gap-4">
        <Cta href={hero.primary.href}>{hero.primary.label}</Cta>
        <Cta href={hero.secondary.href} variant="ghost">
          {hero.secondary.label}
          <span aria-hidden="true">→</span>
        </Cta>
      </div>
    </section>
  );
}
