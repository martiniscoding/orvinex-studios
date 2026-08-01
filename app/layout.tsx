import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
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

const description =
  "Orvinex Software Solutions is a leading software company in Kolkata providing custom software development, website design, ERP solutions, and mobile app services.";

export const metadata: Metadata = {
  metadataBase: new URL("https://orvinex.store"),
  title: {
    default:
      "Orvinex | Best Software Company in Kolkata for Custom Digital Solutions",
    template: "%s | Orvinex",
  },
  description,
  keywords: [
    "software company in Kolkata",
    "custom software development",
    "mobile app development",
    "ERP solutions",
    "web application development",
    "SEO services Kolkata",
    "Orvinex",
  ],
  authors: [{ name: "Orvinex Software Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://orvinex.store",
    siteName: "Orvinex",
    title:
      "Orvinex | Best Software Company in Kolkata for Custom Digital Solutions",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvinex | Best Software Company in Kolkata",
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
      <body className="bg-background font-sans text-white">{children}</body>
    </html>
  );
}
