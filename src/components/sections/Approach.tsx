import { approach } from "@/content/site";
import AlignmentToggle from "./AlignmentToggle";

export default function Approach() {
  return (
    <section id="approach" className="plumb-pad py-20 md:py-28">
      <p className="label text-slate">{approach.eyebrow}</p>

      <div className="mt-8 grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
        <div>
          <h2 className="display text-[clamp(2.25rem,6vw,4.4375rem)]">{approach.title}</h2>
          <div className="mt-8 max-w-[58ch] space-y-5 text-base text-slate md:text-md">
            {approach.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <AlignmentToggle />
      </div>
    </section>
  );
}
