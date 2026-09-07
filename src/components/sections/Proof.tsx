import { proof } from "@/content/site";

/**
 * 5.3 — the client-logo marquee is cut: this studio has no logos it can
 * honestly show. The marquee pattern survives as a capability ticker, and the
 * proof is a single checkable line instead of a wall of grey rectangles.
 */
export default function Proof() {
  const track = [...proof.ticker, ...proof.ticker];

  return (
    <section aria-labelledby="proof-heading" className="border-y border-ink/10 bg-chalk">
      <h2 id="proof-heading" className="sr-only">
        What the studio does
      </h2>
      <p className="plumb-pad max-w-[62ch] py-10 text-base md:text-md">{proof.line}</p>

      <div className="group relative overflow-hidden border-t border-ink/10 py-4">
        <div
          data-marquee
          className="flex w-max items-center gap-10 will-change-transform"
        >
          {track.map((item, i) => (
            <span key={`${item}-${i}`} className="label flex items-center gap-10 text-slate">
              {item}
              <span aria-hidden="true" className="text-brass">
                ◆
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
