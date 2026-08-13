import Image from "next/image";
import Link from "next/link";

import { coverageLines, locations, mapsUrl, site } from "@/lib/site";
import { Container, MailIcon, PhoneIcon, PinIcon } from "@/components/ui";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink-900 text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" aria-label={`${site.name} home`}>
              <Image
                src="/eliteautoinsurance_logo.png"
                alt={site.name}
                width={350}
                height={150}
                className="h-14 w-auto rounded bg-white p-2"
              />
            </Link>
            <p className="mt-5 text-sm leading-relaxed">
              An independent agency serving {site.areaServed}. We shop multiple
              carriers so you do not have to.
            </p>
            <p className="mt-4 font-semibold text-brand-300">
              Se Habla Español
            </p>
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-5"
              >
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
              </svg>
              Follow us on Facebook
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Coverage
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {coverageLines.map((line) => (
                <li key={line.slug}>
                  <Link
                    href={`/coverage/${line.slug}`}
                    className="hover:text-white"
                  >
                    {line.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About the agency
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-white">
                  Request a quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Offices &amp; hours
                </Link>
              </li>
            </ul>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <PhoneIcon className="size-4 text-brand-400" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <MailIcon className="size-4 text-brand-400" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Our offices
            </h3>
            <ul className="mt-5 space-y-5 text-sm">
              {locations.map((location) => (
                <li key={location.id}>
                  <a
                    href={mapsUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-2"
                  >
                    <PinIcon className="mt-0.5 size-4 shrink-0 text-brand-400" />
                    <span className="group-hover:text-white">
                      {location.street}
                      <br />
                      {location.city}, {location.state} {location.zip}
                      <br />
                      <span className="text-slate-400">{location.phone}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
