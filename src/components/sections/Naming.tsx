import { naming } from "@/content/site";

/**
 * 5.6 — the loudest moment on the page, and the only inverted band. Everything
 * either side of it is deliberately quiet so this lands.
 */
export default function Naming() {
  return (
    <section
      aria-labelledby="naming-word"
      data-naming
      className="relative bg-ink text-paper"
    >
      <div className="plumb-pad py-24 md:py-32">
        <p className="label text-paper/65">{naming.lead}</p>

        <h2
          id="naming-word"
          /* 13vw keeps all nine characters on one line at every width: the
             word is 5.6em wide at this weight and tracking. */
          className="display mt-10 flex flex-nowrap text-[13vw] leading-[0.86] tracking-[-0.045em]"
          style={{ fontVariationSettings: '"WONK" 1' }}
        >
          <span className="sr-only">{naming.word}</span>
          {naming.word.split("").map((letter, i) => (
            <span key={`${letter}-${i}`} aria-hidden="true" className="inline-block overflow-hidden">
              <span data-letter className="inline-block">
                {letter}
              </span>
            </span>
          ))}
        </h2>

        <p className="mt-12 max-w-[54ch] text-base text-paper/70 md:text-md">{naming.after}</p>
      </div>
    </section>
  );
}
