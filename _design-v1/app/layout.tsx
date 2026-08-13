import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { locations, site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Houston Insurance Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Houston insurance agency",
    "auto insurance Houston",
    "SR-22 Texas",
    "homeowners insurance Houston",
    "commercial insurance Houston",
    "boat insurance Texas",
    "seguros en Houston",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Houston Insurance Agency`,
    description: site.description,
  },
  alternates: {
    canonical: "/",
  },
};

/** Local business structured data so the three offices show up in local search. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": locations.map((location) => ({
      "@type": "InsuranceAgency",
      "@id": `${site.url}/#${location.id}`,
      name: site.name,
      url: site.url,
      image: `${site.url}/eliteautoinsurance_logo.png`,
      email: site.email,
      telephone: location.phone,
      sameAs: [site.facebook],
      address: {
        "@type": "PostalAddress",
        streetAddress: location.street,
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: location.zip,
        addressCountry: "US",
      },
      areaServed: site.areaServed,
      knowsLanguage: ["en", "es"],
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Data is authored in this repo, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <StructuredData />
      </body>
    </html>
  );
}
