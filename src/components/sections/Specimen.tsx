import { Signature } from "@/components/art/Covers";

/**
 * 5.4 — no showreel and no photography exist, so the feature block is the
 * studio's own type specimen: the most honest large visual a studio without a
 * shot list has, and an argument for the typography rather than a stand-in.
 */
export default function Specimen() {
  return (
    <section aria-labelledby="specimen-heading" className="plumb-pad py-20 md:py-28">
      <h2 id="specimen-heading" className="sr-only">
        Type specimen
      </h2>
      <div
        data-specimen
        className="relative overflow-hidden border border-ink/15 bg-ink px-6 py-14 text-paper md:px-14 md:py-20"
      >
        <div aria-hidden="true" className="absolute inset-y-0 left-6 w-px bg-paper/20 md:left-14" />

        <p className="label text-paper/65">Plumbline — Fraunces 900 / Archivo 500</p>

        <p className="display mt-8 text-[clamp(3rem,13vw,11rem)] leading-[0.85]">
          Plumb,
          <br />
          <span style={{ fontVariationSettings: '"WONK" 1' }}>not</span>{" "}
          <span className="text-brass">decorated</span>
        </p>

        <div className="mt-12 grid gap-8 border-t border-paper/15 pt-8 md:grid-cols-3">
          <p className="text-sm text-paper/70">
            Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww
            Xx Yy Zz 0123456789
          </p>
          <p className="text-sm text-paper/70">
            Optical size 144 for display, 9 for the annotations. The WONK axis is
            used exactly once on this page, and it is not here.
          </p>
          <div>
            <Signature className="h-14 w-auto text-paper" />
          </div>
        </div>
      </div>
    </section>
  );
}
