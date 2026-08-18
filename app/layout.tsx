import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { readEnv } from "@/lib/env";
import { socialImage } from "@/lib/seo";
import { locations, site, type Location } from "@/lib/site";

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
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Houston Insurance Agency`,
    description: site.description,
    images: [socialImage.url],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search Console's "HTML tag" method. Read at build time, so adding the token
  // to the host needs a redeploy before Google can see it.
  verification: {
    google: readEnv("GOOGLE_SITE_VERIFICATION"),
  },
};

export const viewport = {
  themeColor: "#111d32",
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** "9:00am" -> "09:00". Returns null if the shape is not what we expect. */
function to24Hour(value: string) {
  const match = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(value.trim());
  if (!match) return null;

  const meridiem = match[3].toLowerCase();
  let hour = Number(match[1]) % 12;
  if (meridiem === "pm") hour += 12;

  return `${String(hour).padStart(2, "0")}:${match[2]}`;
}

/**
 * Turns the display hours in lib/site.ts ("Tuesday – Thursday", "9:00am – 5:00pm")
 * into schema.org openingHoursSpecification, so the offices can show opening
 * times in local search.
 *
 * The display strings stay the single source of truth. Anything that does not
 * parse is skipped rather than guessed at — publishing no hours is recoverable,
 * publishing wrong ones is not.
 */
function openingHours(location: Location) {
  const specs = [];

  for (const entry of location.hours) {
    const [open, close] = entry.time.split(/[–—-]/).map((part) => part.trim());
    const opens = open ? to24Hour(open) : null;
    const closes = close ? to24Hour(close) : null;
    if (!opens || !closes) continue;

    const [from, to] = entry.days.split(/[–—-]/).map((part) => part.trim());
    const start = DAYS.indexOf(from);
    if (start === -1) continue;

    const end = to ? DAYS.indexOf(to) : start;
    if (end === -1 || end < start) continue;

    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS.slice(start, end + 1),
      opens,
      closes,
    });
  }

  return specs;
}

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
      openingHoursSpecification: openingHours(location),
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
