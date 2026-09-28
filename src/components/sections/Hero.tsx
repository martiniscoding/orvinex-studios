import Image from "next/image";
import { hero } from "@/content/site";
import { Pill } from "@/components/ui/Bits";
import { CallIcon, WorkIcon } from "@/components/Icons";
import { Container } from "@/components/Shell";

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-[88svh] items-end overflow-hidden">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        quality={62}
        sizes="100vw"
        className="-z-20 object-cover"
      />

      {/* Two scrims. The vertical one seats the type; the horizontal one keeps
          the protection on the left, so the painting stays vivid on the right
          instead of the whole frame going flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/60 via-ink/20 to-transparent"
      />

      <Container className="pt-36 pb-16 lg:pb-24">
        <p data-hero-eyebrow className="eyebrow !text-white/70">
          {hero.credibility}
        </p>

        <h1
          data-hero-head
          className="hero-type mt-6 max-w-[16ch] text-[clamp(2.5rem,6.4vw,5rem)] text-white"
        >
          {hero.headline.map((part) => (
            <span key={part.text} className={part.tone === "dim" ? "text-white/75" : "text-white"}>
              {part.text}{" "}
            </span>
          ))}
        </h1>

        <p data-hero-sub className="mt-7 max-w-[54ch] text-[1.0625rem] text-white/80">
          {hero.sub}
        </p>

        <div data-hero-cta className="mt-9 flex flex-wrap gap-3">
          <Pill href={hero.primary.href}>
            <CallIcon />
            {hero.primary.label}
          </Pill>
          <a
            href={hero.secondary.href}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/35 px-5 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-white/10"
          >
            <WorkIcon />
            {hero.secondary.label}
          </a>
        </div>
      </Container>

      {/* The nav watches this to know when it has left the image. */}
      <span data-hero-end aria-hidden="true" className="absolute bottom-0 h-px w-full" />
    </section>
  );
}
