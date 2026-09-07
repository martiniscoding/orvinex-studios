import { problem } from "@/content/site";

/**
 * 5.5 — the pinned narrative. Pinning is native `position: sticky`, so with
 * JavaScript off or reduced motion on the beats simply read as one stacked
 * block. The stack is sized to fit a single viewport at every breakpoint;
 * step 5 dims the beats you have not reached yet.
 */
export default function Problem() {
  return (
    <section
      id="problem"
      aria-label="The gap"
      data-problem
      className="relative"
      style={{ height: "240vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
        <div className="plumb-pad">
          <h2 className="label text-slate">{problem.eyebrow}</h2>
          <div className="mt-10 space-y-1.5 md:space-y-2.5">
            {problem.beats.map((beat, i) => (
              <div key={beat} className="overflow-hidden">
                <p
                  data-beat={i}
                  className="display text-pretty text-[clamp(1.375rem,3.4vw,2.5rem)] leading-[1.14]"
                >
                  {beat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
