import { frames } from "@/content/site";
import { frameArt } from "@/components/art/Frames";

/**
 * 5.7 — the pinned collage. Frames read as drawings pinned to a drafting
 * board: tape, pins, dimension callouts, deliberate rotation. Sticky does the
 * pinning; step 5 lands one frame per scroll beat.
 */
const placement = [
  { left: "0%", top: "2%", width: "27%", z: 1 },
  { left: "25%", top: "18%", width: "36%", z: 5 },
  { left: "68%", top: "0%", width: "26%", z: 2 },
  { left: "4%", top: "50%", width: "27%", z: 3 },
  { left: "58%", top: "45%", width: "30%", z: 4 },
];

function Tape() {
  return (
    <span
      aria-hidden="true"
      className="absolute -top-3 left-1/2 h-7 w-20 -translate-x-1/2 -rotate-3 bg-brass/35 mix-blend-multiply"
      style={{ boxShadow: "inset 0 0 0 1px rgba(21,25,27,0.08)" }}
    />
  );
}

function Pin() {
  return (
    <span aria-hidden="true" className="absolute -top-2 left-1/2 -translate-x-1/2">
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6" fill="var(--color-oxide)" />
        <circle cx="6" cy="6" r="2" fill="var(--color-chalk)" opacity="0.6" />
      </svg>
    </span>
  );
}

export default function Solution() {
  return (
    <section id="solution" aria-label="What you get" data-solution className="relative">
      {/* Mobile: an honest stacked column, no pinning. */}
      <div className="plumb-pad py-20 md:hidden">
        <h2 className="label text-slate">03 — What you get</h2>
        <div className="mt-10 space-y-12">
          {frames.map((frame) => (
            <figure key={frame.id} className="relative">
              <div
                className="relative border border-ink/15 bg-chalk p-3 shadow-[0_10px_30px_-18px_rgba(21,25,27,0.5)]"
                style={{ transform: `rotate(${frame.rotate * 0.5}deg)` }}
              >
                <Tape />
                {frameArt[frame.id]}
              </div>
              <figcaption className="mt-4">
                <p className="label">{frame.label}</p>
                <p className="mt-1 max-w-[38ch] text-sm text-slate">{frame.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Desktop: pinned board. */}
      <div data-board className="hidden md:block" style={{ height: "300vh" }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="plumb-pad pt-[calc(var(--nav-h)+40px)]">
            <h2 className="label text-slate">03 — What you get</h2>
          </div>

          {/* The absolutely-placed frames need their own positioning context
              inside the padding, not the padded box itself. */}
          <div className="plumb-pad mt-6">
            <div className="relative h-[calc(100svh-var(--nav-h)-150px)]">
            {frames.map((frame, i) => (
              <figure
                key={frame.id}
                data-frame={i}
                className="absolute"
                style={{
                  left: placement[i].left,
                  top: placement[i].top,
                  width: placement[i].width,
                  zIndex: placement[i].z,
                  transform: `rotate(${frame.rotate}deg)`,
                }}
              >
                <div className="relative border border-ink/15 bg-chalk p-2.5 shadow-[0_18px_40px_-24px_rgba(21,25,27,0.65)]">
                  {i % 2 === 0 ? <Tape /> : <Pin />}
                  {frameArt[frame.id]}
                </div>
                <figcaption className="mt-3 flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-px w-5 shrink-0 bg-brass" />
                  <span>
                    <span className="label block">{frame.label}</span>
                    <span className="mt-1 block max-w-[30ch] text-sm leading-snug text-slate">
                      {frame.note}
                    </span>
                  </span>
                </figcaption>
              </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
