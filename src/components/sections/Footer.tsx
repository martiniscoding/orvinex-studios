import { nav, site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="plumb-pad border-t border-ink/10 py-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="display text-md">{site.name}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate hover:text-ink">
              {item.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="text-sm text-slate hover:text-ink">
            Email
          </a>
        </nav>
        <p className="label text-slate">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
