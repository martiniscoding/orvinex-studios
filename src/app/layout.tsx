import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import ClientMotion from "@/components/ClientMotion";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/content/site";
import "./globals.css";

const ICON_VERSION = 2;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Orvinex | Custom Software, Mobile & AI Development Agency",
  description:
    "Orvinex builds custom software, web and mobile apps, and AI products for companies worldwide. One senior team from first line of code to launch.",
  openGraph: {
    title: "Orvinex",
    description: "Design and development for products that dominate their market.",
    type: "website",
    locale: "en_GB",
  },
  /* Served from /public with a version query, not from src/app, so a changed
     logo gets a new URL. Browsers cache tab icons by URL and ignore reloads;
     bump ICON_VERSION whenever the icon files change. */
  icons: {
    icon: [
      { url: `/favicon.ico?v=${ICON_VERSION}`, sizes: "any" },
      { url: `/icon.png?v=${ICON_VERSION}`, type: "image/png", sizes: "512x512" },
    ],
    shortcut: `/favicon.ico?v=${ICON_VERSION}`,
    apple: { url: `/apple-icon.png?v=${ICON_VERSION}`, sizes: "180x180" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ClientMotion />
        {children}
      </body>
    </html>
  );
}
