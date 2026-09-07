import { problem } from "@/content/site";

/**
 * The naming moment: one word, each letter on its own key cap, tilted a
 * little. Caps animate in on scrub; with reduced motion they are simply there.
 */
const capHues = [
  "bg-coral/25",
  "bg-sun/35",
  "bg-mint/25",
  "bg-sky/25",
  "bg-grape/20",
];

export default function Problem() {
  return (
    <section data-problem className="py-4">
      <p className="max-w-[60ch] text-[clamp(1.125rem,2.1vw,1.5rem)] leading-[1.5] text-ink-2">
        {problem.lead}
      </p>

      <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-4 text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold">
        <span className="mr-1">{problem.prefix}</span>
        <span className="sr-only">{problem.word}</span>
        {problem.word.split("").map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            data-cap={i}
            aria-hidden="true"
            className={`inline-flex h-[clamp(2.25rem,4.4vw,3.25rem)] w-[clamp(2rem,3.9vw,2.9rem)] items-center justify-center rounded-[12px] text-ink shadow-[0_5px_0_0_rgba(44,30,74,0.12),0_10px_18px_-10px_rgba(44,30,74,0.45)] ${capHues[i % capHues.length]}`}
            style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (3.5 + ((i * 2) % 4))}deg)` }}
          >
            {letter}
          </span>
        ))}
      </p>

      <ul className="mt-12 space-y-2 text-[clamp(1.125rem,2.1vw,1.5rem)] text-ink-2">
        {problem.bullets.map((b) => (
          <li key={b}>— {b}</li>
        ))}
      </ul>

      <p className="mt-12 max-w-[46ch] text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.4]">
        {problem.close.before}
        <span className="marker">{problem.close.marked}</span>
        {problem.close.after}
      </p>
    </section>
  );
}
