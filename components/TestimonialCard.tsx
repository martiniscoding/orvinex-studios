import { initials, type Testimonial } from "@/lib/testimonial";

/**
 * One review card.
 *
 * Shared by the landing page and the admin editor's preview so that what the
 * client arranges is literally the component the visitor sees — a second,
 * approximate copy in the editor drifts the moment either side is restyled.
 *
 * No hooks, so it renders on the server for the site and inside the client
 * editor alike.
 */
export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-surface">
      <blockquote className="flex-1 text-[14.5px] leading-relaxed text-white/85">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
        {item.photo ? (
          // Not next/image: these are data URLs written by the admin panel,
          // which the optimiser cannot fetch or cache.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.photo}
            alt=""
            loading="lazy"
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#6d4aff] text-[13px] font-semibold text-white">
            {initials(item.name)}
          </span>
        )}

        <span className="leading-tight">
          <span className="block text-[14px] font-semibold text-white">
            {item.name}
          </span>
          {item.role && (
            <span className="block text-[12.5px] text-muted">{item.role}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
