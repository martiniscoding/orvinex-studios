import { finalNote, founder, site } from "@/content/site";
import { Signature } from "@/components/art/Covers";
import { Pill } from "@/components/ui/Bits";
import { CallIcon, MessageIcon } from "@/components/Icons";

export default function FinalNote() {
  return (
    <section>
      <div className="max-w-[62ch] space-y-6 text-[clamp(1.0625rem,1.9vw,1.375rem)] leading-[1.55] text-ink-2">
        {finalNote.paragraphs.map((p) => (
          <p key={p.text.slice(0, 24)}>
            {p.text}
            {p.marked && <span className="marker">{p.marked}</span>}
            {p.after}
          </p>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
        <div>
          <Signature className="h-14 w-auto text-ink" />
          <p className="mt-3 text-[0.9375rem] font-medium">{founder.name}</p>
          <p className="text-[0.8125rem] text-muted">{founder.role}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Pill href={finalNote.cta.href} tone="ink">
            <CallIcon />
            {finalNote.cta.label}
          </Pill>
          <Pill href={`mailto:${site.email}`}>
            <MessageIcon />
            Send a message
          </Pill>
        </div>
      </div>
    </section>
  );
}
