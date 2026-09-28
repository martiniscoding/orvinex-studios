import { hero } from "@/content/site";
import { Pill } from "@/components/ui/Bits";
import { CallIcon, WorkIcon } from "@/components/Icons";

const headlineTone: Record<string, string> = {
  ink: "text-ink",
  dim: "text-faint",
};

export default function Hero() {
  return (
    <section id="home" className="pt-6 lg:pt-10">
      <p data-hero-eyebrow className="eyebrow">
        {hero.credibility}
      </p>

      <h1
        data-hero-head
        className="hero-type mt-7 max-w-[15ch] text-[clamp(2.5rem,6.2vw,4.75rem)]"
      >
        {hero.headline.map((part) => (
          <span key={part.text} className={headlineTone[part.tone]}>
            {part.text}{" "}
          </span>
        ))}
      </h1>

      <p data-hero-sub className="mt-7 max-w-[58ch] text-[1.0625rem] text-muted">
        {hero.sub}
      </p>

      <div data-hero-cta className="mt-9 flex flex-wrap gap-3">
        <Pill href={hero.primary.href}>
          <CallIcon />
          {hero.primary.label}
        </Pill>
        <Pill href={hero.secondary.href}>
          <span className="text-faint">
            <WorkIcon />
          </span>
          {hero.secondary.label}
        </Pill>
      </div>

    </section>
  );
}
