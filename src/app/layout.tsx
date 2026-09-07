import type { Metadata } from "next";
import { caveat, inter, phudu } from "@/lib/fonts";
import ClientMotion from "@/components/ClientMotion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://plumbline.studio"),
  title: "Plumbline — design for products that are better than they look",
  description:
    "A design studio for technical founders. Product UI, brand systems and launch sites for dev tools and B2B software.",
  openGraph: {
    title: "Plumbline",
    description: "Design for products that are better than they look.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${phudu.variable} ${caveat.variable}`}
      data-motion="on"
    >
      <head>
        {/* data-motion is rendered on the server (so hydration matches) and
            removed here, before first paint, for anyone who asked for reduced
            motion — or after 2.5s if the motion layer never reports ready, so
            a failed chunk can never strand hidden content. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document.documentElement;try{" +
              "if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.removeAttribute('data-motion');return;}" +
              "setTimeout(function(){if(!d.hasAttribute('data-motion-ready'))d.removeAttribute('data-motion');},2500);" +
              "}catch(e){d.removeAttribute('data-motion');}})();",
          }}
        />
      </head>
      <body>
        <div className="ambient" aria-hidden="true" />
        <ClientMotion />
        {children}
      </body>
    </html>
  );
}
