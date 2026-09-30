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
        {/* The proof, as if marked up by hand: plain type, with the figure
            ringed in a pen stroke that draws itself. */}
        <p className="text-[clamp(0.9375rem,2.1vh,1.125rem)] leading-[2.1] font-medium text-ink-2 sm:leading-normal">
          <span className="block sm:inline">{hero.proof.before}</span>{" "}
          {/* Kept on one line so the ring never splits from its sentence. */}
          <span className="whitespace-nowrap">
          <strong className="relative mx-[0.55em] inline-block text-[1.5em] leading-none font-bold tracking-[-0.03em] text-ink">
            {hero.proof.figure}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 60"
              preserveAspectRatio="none"
              className="pointer-events-none absolute top-[-38%] left-[-22%] h-[176%] w-[144%] -rotate-2 overflow-visible text-accent"
            >
              <path
                className="proof-ring"
                pathLength={1}
                d="M14 34C10 14 44 5 70 6c28 1 44 12 40 27-4 17-40 23-66 20C20 50 6 40 12 26 16 16 34 9 54 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.25"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </strong>{" "}
          {hero.proof.after}
          </span>
        </p>

        <h1
          data-hero-head
          className="mt-[clamp(1.75rem,4.5vh,2.75rem)] font-sans text-[clamp(2.5rem,min(7.2vw,10vh),6.25rem)] font-bold leading-[1.04] tracking-[-0.04em] text-balance text-ink"
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
          className="mt-[clamp(1.5rem,3.5vh,2.25rem)] max-w-[46ch] text-[clamp(1rem,2.3vh,1.3125rem)] font-medium leading-[1.75] text-ink-2"
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
