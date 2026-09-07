import type { Metadata } from "next";
import { archivo, fraunces } from "@/lib/fonts";
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
    <html lang="en" className={`${fraunces.variable} ${archivo.variable}`}>
      <head>
        {/* Decides before first paint whether the page animates at all, so
            motion start states never flash for reduced-motion visitors, and
            never strand content if the motion layer fails to boot. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;" +
              "var d=document.documentElement;d.classList.add('motion');" +
              "setTimeout(function(){if(!d.hasAttribute('data-motion-ready'))d.classList.remove('motion');},2500);}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <ClientMotion />
        {children}
      </body>
    </html>
  );
}
