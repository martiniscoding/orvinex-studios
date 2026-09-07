import { closing, founder, site } from "@/content/site";
import { Signature } from "@/components/art/Covers";
import { Cta } from "@/components/ui/Cta";

/**
 * 5.13 + 5.14 — a solo studio, so this is a signed note rather than a team
 * grid, and no stock headshot stands in for a photo that does not exist.
 */
export default function Founder() {
  return (
    <section id="contact" className="plumb-pad border-t border-ink/10 py-20 md:py-28">
      <h2 className="label text-slate">09 — Who you get</h2>

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
        <div>
          <div className="space-y-5 max-w-[54ch] text-base text-slate md:text-md">
            {founder.note.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <Signature className="h-16 w-auto" />
            <p className="mt-3 text-sm font-medium">{founder.name}</p>
            <p className="label mt-1 text-slate">{founder.role}</p>
          </div>
        </div>

        <div className="border-t border-ink/10 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-16">
          <h2 className="display max-w-[16ch] text-[clamp(2rem,5vw,3.3125rem)]">
            {closing.title}
          </h2>
          <p className="mt-6 max-w-[46ch] text-base text-slate md:text-md">{closing.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Cta href={closing.cta.href}>{closing.cta.label}</Cta>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-slate underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
