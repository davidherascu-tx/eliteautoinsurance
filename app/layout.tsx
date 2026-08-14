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

export const viewport = {
  themeColor: "#111d32",
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
      // globals.css sets `scroll-behavior: smooth` for in-page anchors. Next 16
      // no longer overrides that during route changes unless this attribute is
      // present, which left new pages opening at the old scroll position.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/*
        Browser extensions (ColorZilla, Grammarly, password managers) inject
        their own attributes onto <body> before React hydrates, which React
        reports as a hydration mismatch. Nothing here renders differently on the
        server and client, so this only silences that extension noise — and only
        for <body>'s own attributes, not for anything inside it.
      */}
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-navy-900 font-sans"
      >
        <SiteHeader />
        <main className="flex-1 pt-24 sm:pt-28">{children}</main>
        <SiteFooter />
        <StructuredData />
      </body>
    </html>
  );
}
