import { nav, site } from "@/content/site";
import { Mark } from "@/components/Icons";

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
      <a href="#home" className="flex items-center gap-2.5">
        <Mark size={22} />
        <span className="phudu text-lg leading-none">{site.name}</span>
      </a>
      <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-muted">
        {nav
          .filter((n) => !n.soon)
          .map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
          Email
        </a>
      </nav>
      <p className="eyebrow">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
