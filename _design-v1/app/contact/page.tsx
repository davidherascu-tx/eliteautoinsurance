import type { Metadata } from "next";

import {
  ButtonLink,
  ClockIcon,
  Container,
  Eyebrow,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { locations, mapsUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Office Hours",
  description: `Call ${site.phone} or visit one of our three Houston-area offices. Addresses, phone numbers and open hours for ${site.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-900 py-16 text-white">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Come see us, or just pick up the phone
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Three offices across {site.areaServed}. Se habla español at every
            location.
          </p>

          <div className="mt-9 flex flex-wrap gap-6">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-3 text-lg font-semibold hover:text-brand-300"
            >
              <PhoneIcon className="size-5 text-brand-400" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-3 text-lg hover:text-brand-300"
            >
              <MailIcon className="size-5 text-brand-400" />
              {site.email}
            </a>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Our offices"
            title="Locations and open hours"
            intro="Hours differ slightly by office — check before you drive over, or call ahead and we will have your paperwork ready."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {locations.map((location, index) => (
              <div
                key={location.id}
                id={location.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="bg-brand-700 px-7 py-4 text-white">
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-200">
                    Location {index + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-bold">{location.name}</h3>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <address className="flex items-start gap-3 not-italic text-slate-700">
                    <PinIcon className="mt-1 size-5 shrink-0 text-brand-600" />
                    <span>
                      {location.street}
                      <br />
                      {location.city}, {location.state} {location.zip}
                    </span>
                  </address>

                  <a
                    href={location.phoneHref}
                    className="mt-5 inline-flex items-center gap-3 text-lg font-semibold text-brand-700 hover:text-brand-800"
                  >
                    <PhoneIcon className="size-5" />
                    {location.phone}
                  </a>

                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
                      <ClockIcon className="size-4" />
                      Open hours
                    </p>
                    <dl className="mt-4 space-y-2 text-slate-700">
                      {location.hours.map((entry) => (
                        <div
                          key={entry.days}
                          className="flex flex-wrap justify-between gap-x-4 gap-y-1"
                        >
                          <dt className="font-medium">{entry.days}</dt>
                          <dd className="text-slate-600">{entry.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <a
                    href={mapsUrl(location)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-6 font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Get directions <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="grid items-center gap-8 rounded-2xl bg-white p-8 shadow-sm sm:p-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                Would you rather send it in writing?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Use the quote form and a licensed agent will follow up by phone,
                text or email — whichever you pick. You can also message us on{" "}
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  Facebook
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <ButtonLink href="/quote">Request a quote</ButtonLink>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-50"
              >
                <MailIcon className="size-5" />
                Email us
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
