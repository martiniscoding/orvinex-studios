import Image from "next/image";

/** A modern iPhone drawn in CSS: titanium rail, black bezel, Dynamic Island.
    Sized in container units, so the parent needs `@container`. */
export default function IPhone({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] h-[86%] rounded-[5.2cqw] bg-gradient-to-b from-[#3a3d42] to-[#1c1d20] p-[0.45cqw] shadow-[0_22px_40px_-18px_rgba(30,36,48,0.6)] ${className}`}
    >
      {/* Side buttons */}
      <span aria-hidden="true" className="absolute top-[22%] -left-[0.35cqw] h-[7%] w-[0.4cqw] rounded-l-sm bg-[#2a2c30]" />
      <span aria-hidden="true" className="absolute top-[31%] -left-[0.35cqw] h-[11%] w-[0.4cqw] rounded-l-sm bg-[#2a2c30]" />
      <span aria-hidden="true" className="absolute top-[27%] -right-[0.35cqw] h-[15%] w-[0.4cqw] rounded-r-sm bg-[#2a2c30]" />

      <div className="relative h-full w-full rounded-[4.8cqw] bg-black p-[0.9cqw]">
        <div className="relative h-full w-full overflow-hidden rounded-[4cqw] bg-black">
          <Image src={src} alt={alt} fill sizes="200px" className="object-cover object-top" />
          <span
            aria-hidden="true"
            className="absolute top-[2.2%] left-1/2 h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-black"
          />
        </div>
      </div>
    </div>
  );
}

/** Every screen of an app, each in its own phone, centred side by side. */
export function PhoneGroup({ screens, alt }: { screens: string[]; alt: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[5cqw] bg-gradient-to-br from-panel via-hush to-line">
      {screens.map((src, i) => (
        <IPhone
          key={src}
          src={src}
          alt={alt && `${alt}, screen ${i + 1}`}
          className={`transition-transform duration-700 ease-[var(--ease-out-soft)] ${
            screens.length > 1
              ? i % 2
                ? "translate-y-[4%] group-hover:translate-y-[8%] group-hover:rotate-2"
                : "-translate-y-[4%] group-hover:-translate-y-[8%] group-hover:-rotate-2"
              : "group-hover:scale-[1.04]"
          }`}
        />
      ))}
    </div>
  );
}
