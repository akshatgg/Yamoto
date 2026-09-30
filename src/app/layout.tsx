import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { seo, site } from "@/config/site";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: seo.title,
  description: seo.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `Yamoto wheel alignment bay in ${site.area}, ${site.city}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  category: "automotive",
  other: {
    "geo.region": site.address.regionCode,
    "geo.placename": `${site.area}, ${site.city}`,
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#201e1d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={archivo.variable}>
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
