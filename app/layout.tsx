import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { structuredData } from "./structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const title =
  "Orvinex | Custom Software, Mobile & AI Development Agency";

const description =
  "Orvinex Software Solutions is a software development agency building custom software, web and mobile applications, and AI products for clients worldwide. Based in India, serving globally.";

export const metadata: Metadata = {
  metadataBase: new URL("https://orvinex.store"),
  title: {
    default: title,
    template: "%s | Orvinex",
  },
  description,
  keywords: [
    "software development agency",
    "custom software development",
    "mobile app development",
    "AI product development",
    "web application development",
    "SaaS development",
    "offshore software development",
    "Orvinex",
  ],
  authors: [{ name: "Orvinex Software Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orvinex.store",
    siteName: "Orvinex",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-background font-sans text-white">
        {/* Escaping `<` prevents a literal `</script>` in any future data
            field from terminating the tag early. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
