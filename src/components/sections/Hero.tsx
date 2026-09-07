import { hero } from "@/content/site";
import { Pill } from "@/components/ui/Bits";
import { ArrowIcon, CallIcon, WorkIcon } from "@/components/Icons";
import { frameArt } from "@/components/art/Frames";

/* On the marker, faint (2.44:1) and coral-deep (2.71:1) both fall under the
   3:1 needed for large text, so the dim tone steps up to muted and the accent
   to the deeper coral. */
const headlineTone: Record<string, string> = {
  ink: "text-ink",
  dim: "text-muted",
  accent: "text-coral-ink",
};

/* The headline lands first, then the marker goes over it. */
const SWEEP_START = 1.05;
const SWEEP_STEP = 0.16;

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
        {hero.headline.map((part, i) => (
          <span
            key={part.text}
            className={`hero-mark ${headlineTone[part.tone]}`}
            style={{ animationDelay: `${SWEEP_START + i * SWEEP_STEP}s` }}
          >
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

      {/* Where kree8 runs a showreel, there is no video here — so the feature
          block is the studio's own work, not a poster frame for nothing. */}
      <div
        data-hero-card
        className="mt-14 overflow-hidden rounded-[var(--radius-panel)] bg-gradient-to-br from-sun/45 via-coral/25 to-mint/35 p-3 shadow-[0_30px_60px_-40px_rgba(44,30,74,0.45)]"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {["ui", "brand", "site"].map((id, i) => (
            <div
              key={id}
              className={`overflow-hidden rounded-[18px] bg-card p-2 ${i === 0 ? "sm:col-span-2" : ""}`}
            >
              {frameArt[id]}
            </div>
          ))}
        </div>
        <p className="flex items-center justify-between px-3 py-4 text-sm text-ink-2">
          Brand, interface and the page that sells it — from one person.
          <span className="text-faint">
            <ArrowIcon />
          </span>
        </p>
      </div>
    </section>
  );
}
