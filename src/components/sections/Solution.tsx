import { site, solution } from "@/content/site";
import { frameArt } from "@/components/art/Frames";
import { Mark } from "@/components/Icons";

function Pin({ kind }: { kind: string }) {
  if (kind === "tape") {
    return (
      <span
        aria-hidden="true"
        className="absolute -top-3.5 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-2 rounded-[2px] bg-sun/55 shadow-[inset_0_0_0_1px_rgba(44,30,74,0.08)]"
      />
    );
  }
  if (kind === "clip") {
    return (
      <span aria-hidden="true" className="absolute -top-5 left-8">
        <svg width="22" height="46" viewBox="0 0 22 46" fill="none">
          <path
            d="M11 43V9a6 6 0 1 1 12 0v28a4 4 0 0 1-8 0V13"
            stroke="var(--color-faint)"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform="translate(-6 0)"
          />
        </svg>
      </span>
    );
  }
  const colour = kind === "green" ? "var(--color-mint-deep)" : "var(--color-coral)";
  return (
    <span aria-hidden="true" className="absolute -top-3 left-1/2 -translate-x-1/2">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="11" r="8" fill={colour} />
        <circle cx="10" cy="8" r="2.6" fill="#fff" opacity=".55" />
        <path d="M13 18v6" stroke="var(--color-faint)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Solution() {
  return (
    <section>
      <p className="flex flex-wrap items-center gap-3 text-[clamp(1.375rem,2.6vw,2rem)] font-semibold">
        {solution.lead}
        <span className="inline-flex items-center gap-2">
          <Mark size={30} />
          <span className="phudu text-[1.15em] leading-none">{site.name}</span>
        </span>
      </p>

      <div className="mt-14 grid gap-y-14 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-8">
        {solution.frames.map((frame, i) => (
          <figure
            key={frame.id}
            data-polaroid={i}
            data-rotate={frame.rotate}
            className={`relative mx-auto w-full max-w-[320px] rounded-[6px] bg-card p-3 pb-12 shadow-[0_16px_36px_-22px_rgba(44,30,74,0.6)] ${
              i === 1 ? "lg:mt-10" : i === 3 ? "lg:-mt-6" : ""
            }`}
            style={{ transform: `rotate(${frame.rotate}deg)` }}
          >
            <Pin kind={frame.pin} />
            <div className="overflow-hidden rounded-[3px]">{frameArt[frame.id]}</div>
            <figcaption className="absolute inset-x-3 bottom-3 flex items-end justify-between">
              <span className="font-hand text-[1.35rem] leading-none text-ink-2">
                {frame.caption}
              </span>
              <span className="eyebrow text-[0.625rem]">{frame.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
