import Image from "next/image";
import { founder } from "@/content/site";

/** About the founder: portrait on one side, the story on the other. */
export default function Founder() {
  return (
    <section id="founder" className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_1fr] lg:gap-16">
      <div className="rounded-[var(--radius-panel)] bg-hush p-2">
        <div className="relative aspect-[1598/1538] overflow-hidden rounded-[calc(var(--radius-panel)-6px)] bg-card">
          <Image
            src={founder.photo}
            alt={founder.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 flex flex-col rounded-2xl border border-white/20 bg-black/35 px-4 py-2.5 text-white backdrop-blur-md">
            <span className="text-sm font-semibold">{founder.badge[0]}</span>
            <span className="text-[0.8125rem] text-white/75">{founder.badge[1]}</span>
          </span>
        </div>
      </div>

      <div>
        <h2 className="display-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] text-balance">
          {founder.title}
        </h2>
        <p className="mt-6 text-[1.125rem] font-semibold">{founder.name}</p>
        <p className="mt-1 text-[0.9375rem] text-muted">
          {founder.role} | {founder.school}
        </p>
        <p className="mt-6 max-w-[52ch] text-[1.0625rem] leading-[1.6] text-muted">{founder.body}</p>
        <blockquote className="mt-8 max-w-[52ch] border-l-2 border-accent pl-5 text-[1.0625rem] leading-[1.6] text-ink-2 italic">
          “{founder.quote}”
        </blockquote>
      </div>
    </section>
  );
}
