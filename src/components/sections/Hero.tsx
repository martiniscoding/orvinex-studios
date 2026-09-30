import { hero } from "@/content/site";
import { Container } from "@/components/Shell";

/**
 * Full-bleed hero: a white panel with a field of small dots fills the screen
 * under the nav, with the proof, headline, pitch and calls to action centred
 * on it.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex h-[calc(100svh-72px)] min-h-[560px] items-center justify-center overflow-hidden bg-card"
    >
      <div aria-hidden="true" className="hero-dots" />

      <Container className="flex flex-col items-center py-[clamp(2.5rem,8vh,5rem)] text-center">
        <p className="proof-card relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-line bg-card/80 py-1.5 pr-3.5 pl-2.5 text-[0.8125rem] font-medium text-ink-2 shadow-[0_8px_24px_-16px_rgba(30,36,48,0.35)] backdrop-blur-md">
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span>
            {hero.proof.before}{" "}
            <strong className="proof-figure font-semibold">{hero.proof.figure}</strong>{" "}
            {hero.proof.after}
          </span>
        </p>

        <h1
          data-hero-head
          className="mt-[clamp(1.75rem,4.5vh,2.75rem)] font-hero text-[clamp(2.5rem,min(6.6vw,8.5vh),5.5rem)] font-normal leading-[1.12] tracking-[-0.01em] text-balance text-ink"
        >
          {hero.headline.map((line, i) => (
            <span key={line} className="block sm:whitespace-nowrap">
              {line.split(hero.accent).map((part, j) =>
                j === 0 ? (
                  part
                ) : (
                  <span key={j}>
                    <span className="text-accent">{hero.accent}</span>
                    {part}
                  </span>
                ),
              )}
              {i === hero.headline.length - 1 && <span className="text-accent">.</span>}
            </span>
          ))}
        </h1>

        <p
          data-hero-sub
          className="mt-[clamp(1.5rem,3.5vh,2.25rem)] max-w-[44ch] text-[clamp(0.9375rem,2vh,1.125rem)] font-medium leading-[1.75] text-ink-2"
        >
          {hero.sub}
        </p>

        <div
          data-hero-cta
          className="mt-[clamp(2rem,5vh,3rem)] flex flex-wrap justify-center gap-4"
        >
          <a
            href={hero.primary.href}
            className="group inline-flex items-center gap-3 rounded-[10px] bg-ink px-6 py-3.5 text-[0.9375rem] font-medium text-white transition-colors duration-300 hover:bg-ink-2"
          >
            {hero.primary.label}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" />
            </svg>
          </a>
          <a
            href={hero.secondary.href}
            className="inline-flex items-center rounded-[10px] border border-line bg-card/70 px-6 py-3.5 text-[0.9375rem] font-medium text-ink backdrop-blur-sm transition-colors duration-300 hover:border-ink/30 hover:bg-hush"
          >
            {hero.secondary.label}
          </a>
        </div>
      </Container>
    </section>
  );
}
