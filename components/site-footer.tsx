import Image from "next/image";
import Link from "next/link";

import { CoverageIcon } from "@/components/icons";
import { Container, MailIcon, PhoneIcon, PinIcon } from "@/components/ui";
import { coverageLines, locations, mapsUrl, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/5 bg-navy-950">
      <div
        aria-hidden="true"
        className="glow left-1/2 top-0 size-[36rem] -translate-x-1/2 -translate-y-1/2 bg-brand-600/10"
      />

      <Container className="relative py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${site.name} home`}>
              <Image
                src="/eliteautoinsurance_logo.png"
                alt={site.name}
                width={352}
                height={150}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-slate-400">
              An independent agency serving {site.areaServed}. We shop multiple
              carriers so you do not have to.
            </p>
            <p className="mt-5 inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-300">
              Se Habla Español
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-brand-300"
              >
                <PhoneIcon className="size-5 text-brand-400" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
              >
                <MailIcon className="size-5 text-brand-400" />
                {site.email}
              </a>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="size-5 text-brand-400"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                </svg>
                Follow us on Facebook
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Coverage
            </h3>
            <ul className="mt-6 space-y-3">
              {coverageLines.map((line) => (
                <li key={line.slug}>
                  <Link
                    href={`/coverage/${line.slug}`}
                    className="group inline-flex items-center gap-3 text-slate-400 transition-colors hover:text-white"
                  >
                    <CoverageIcon
                      slug={line.slug}
                      className="size-5 text-brand-400/70 transition-colors group-hover:text-brand-300"
                    />
                    {line.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Company
            </h3>
            <ul className="mt-6 space-y-3 text-slate-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About the agency
                </Link>
              </li>
              <li>
                <Link href="/quote" className="transition-colors hover:text-white">
                  Request a quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Offices &amp; hours
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Our offices
            </h3>
            {/* Stacked rather than three-across: the column is too narrow for
                side-by-side cards, which wrapped the ZIP onto its own line */}
            <ul className="mt-6 space-y-3">
              {locations.map((location) => (
                <li key={location.id}>
                  <a
                    href={mapsUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 transition-colors hover:border-brand-400/30 hover:bg-white/[0.06]"
                  >
                    <span className="flex min-w-0 items-start gap-3">
                      <PinIcon className="mt-0.5 size-5 shrink-0 text-brand-400" />
                      <span className="text-sm leading-relaxed text-slate-300">
                        {location.street}
                        <br />
                        <span className="whitespace-nowrap">
                          {location.city}, {location.state} {location.zip}
                        </span>
                      </span>
                    </span>
                    <span className="whitespace-nowrap text-sm font-semibold text-white transition-colors group-hover:text-brand-300">
                      {location.phone}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/5 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>
            Coverage descriptions are summaries only. Actual terms are governed
            by the issued policy.
          </p>
        </div>
      </Container>
    </footer>
  );
}
