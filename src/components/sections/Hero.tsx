import Image from "next/image";
import { hero } from "@/content/site";
import { Container } from "@/components/Shell";

/**
 * Full-bleed hero: the painting fills the screen under the nav, and the proof,
 * headline, pitch and calls to action sit centred over it on a soft tint.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex h-[calc(100svh-72px)] min-h-[560px] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Faded into the ink behind it so the painting sets the mood and the
          copy carries the page. */}
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="-z-20 object-cover opacity-50"
      />
      {/* A box with the photo's own aspect ratio, covering the section the
          same way object-cover does, so the headlight stays pinned to the
          train at any screen size. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-[2133/1200] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
      >
        <span className="train-lamp absolute top-[56.1%] left-[19.46%] w-[0.6%] aspect-[1.35]" />
        <span className="train-headlight absolute top-[55.8%] left-[20.6%]" />
        <span className="train-lamp absolute top-[56%] left-[21.9%] w-[1.05%] aspect-[2]" />
        <span className="train-lamp absolute top-[62.3%] left-[19.22%] w-[0.55%] aspect-square !rounded-full" />
        <span className="train-lamp absolute top-[62.35%] left-[22.27%] w-[0.55%] aspect-square !rounded-full" />
        {/* The two streaks painted across the sky, each with a bright head
            racing down its length. Measured on the photo: start point, length
            as a share of its width, and angle. */}
        <span
          className="sky-streak"
          style={{ left: "43%", top: "0%", width: "38.2%", rotate: "157.4deg", animationDelay: "0.4s" }}
        />
        <span
          className="sky-streak"
          style={{ left: "82.25%", top: "10.5%", width: "17.2%", rotate: "156.3deg", animationDelay: "3.2s" }}
        />
      </div>
      <Stars />
      {/* Darkens the middle, where the copy sits, and leaves the edges of the
          painting bright. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(20,24,32,0.55),rgba(20,24,32,0.15)_75%)]"
      />

      <Container className="flex flex-col items-center py-[clamp(2.5rem,8vh,5rem)] text-center">
        <p className="proof-card relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/25 bg-ink/35 py-1.5 pr-3.5 pl-2.5 text-[0.8125rem] font-medium text-white/90 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md">
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
          className="mt-[clamp(1.75rem,4.5vh,2.75rem)] font-hero text-[clamp(2.5rem,min(6.6vw,8.5vh),5.5rem)] font-normal leading-[1.12] tracking-[-0.01em] text-balance text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]"
        >
          {hero.headline.map((line, i) => (
            <span key={line} className="block sm:whitespace-nowrap">
              {line.split(hero.accent).map((part, j) =>
                j === 0 ? (
                  part
                ) : (
                  <span key={j}>
                    <span className="text-[#ff3b2f]">{hero.accent}</span>
                    {part}
                  </span>
                ),
              )}
              {i === hero.headline.length - 1 && <span className="text-[#ff3b2f]">.</span>}
            </span>
          ))}
        </h1>

        <p
          data-hero-sub
          className="mt-[clamp(1.5rem,3.5vh,2.25rem)] max-w-[44ch] text-[clamp(0.9375rem,2vh,1.125rem)] font-medium leading-[1.75] text-white"
        >
          {hero.sub}
        </p>

        <div
          data-hero-cta
          className="mt-[clamp(2rem,5vh,3rem)] flex flex-wrap justify-center gap-4"
        >
          <a
            href={hero.primary.href}
            className="group inline-flex items-center gap-3 rounded-[10px] bg-white px-6 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 hover:bg-white/90"
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
            className="inline-flex items-center rounded-[10px] border border-white/40 px-6 py-3.5 text-[0.9375rem] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70 hover:bg-white/10"
          >
            {hero.secondary.label}
          </a>
        </div>
      </Container>
    </section>
  );
}

/* A seeded generator, so the sky is identical on every render and build. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(7);
const r2 = (n: number) => Math.round(n * 100) / 100;

/* Pin-prick stars, weighted towards the top where the sky is. */
const dots = Array.from({ length: 50 }, () => {
  const size = rand() < 0.85 ? 1 + rand() * 1.2 : 2 + rand() * 1;
  return {
    left: r2(rand() * 100),
    top: r2(Math.pow(rand(), 1.4) * 55),
    size: r2(size),
    delay: r2(rand() * 6),
    duration: r2(3 + rand() * 4),
    glow: size > 1.8,
  };
});

/* A handful of four-point sparkles for the soft glints. */
const sparkles = [
  { left: 12, top: 14, size: 12, delay: 0.4 },
  { left: 84, top: 10, size: 15, delay: 2.1 },
  { left: 63, top: 28, size: 9, delay: 3.6 },
  { left: 30, top: 36, size: 10, delay: 1.3 },
];

/** Faint white stars that twinkle over the painting's sky. */
function Stars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {dots.map((d, i) => (
        <span
          key={i}
          data-twinkle
          className="absolute rounded-full bg-white"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            boxShadow: d.glow ? "0 0 6px 1px rgba(255,255,255,0.55)" : undefined,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <svg
          key={i}
          data-twinkle
          viewBox="0 0 24 24"
          className="absolute text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: "5s",
          }}
        >
          <path
            fill="currentColor"
            d="M12 0c.6 6.2 1.6 10.4 12 12-10.4 1.6-11.4 5.8-12 12-.6-6.2-1.6-10.4-12-12C10.4 10.4 11.4 6.2 12 0Z"
          />
        </svg>
      ))}
    </div>
  );
}
