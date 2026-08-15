import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  ArrowIcon,
  ButtonLink,
  ClockIcon,
  Container,
  Glow,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { locations, mapsUrl, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Office Hours",
  description: `Call ${site.phone} or visit one of our three Houston-area offices. Addresses, phone numbers and open hours for ${site.name}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come see us, or just pick up the phone"
        intro={`Three offices across ${site.areaServed}. Se habla español at every location.`}
        image={{
          src: "/talk_to_experts.jpg",
          alt: "Licensed agents taking calls at Elite Auto Insurance",
        }}
        actions={
          <>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500"
            >
              <PhoneIcon className="size-5" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
            >
              <MailIcon className="size-5 text-brand-400" />
              Email us
            </a>
          </>
        }
      />

      <Section className="border-y border-white/5 bg-navy-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our offices"
              title="Locations and open hours"
              intro="Hours differ slightly by office — check before you drive over, or call ahead and we will have your paperwork ready."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {locations.map((location, index) => (
              <Reveal key={location.id} variant="up" delay={index * 110}>
                <div
                  id={location.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/30"
                >
                  <div className="relative overflow-hidden border-b border-white/8 bg-gradient-to-br from-brand-700/50 to-navy-850 px-7 py-6">
                    <div
                      aria-hidden="true"
                      className="glow -right-8 -top-8 size-32 bg-brand-400/20"
                    />
                    <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
                      Location {index + 1}
                    </p>
                    <h3 className="relative mt-1.5 text-lg font-bold text-white">
                      {location.name}
                    </h3>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <address className="flex items-start gap-3 not-italic text-slate-300">
                      <PinIcon className="mt-0.5 size-5 shrink-0 text-brand-400" />
                      <span>
                        {location.street}
                        <br />
                        {location.city}, {location.state} {location.zip}
                      </span>
                    </address>

                    <a
                      href={location.phoneHref}
                      className="mt-6 inline-flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-brand-300"
                    >
                      <PhoneIcon className="size-5 text-brand-400" />
                      {location.phone}
                    </a>

                    <div className="mt-7 border-t border-white/8 pt-6">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        <ClockIcon className="size-4" />
                        Open hours
                      </p>
                      <dl className="mt-5 space-y-2.5">
                        {location.hours.map((entry) => (
                          <div
                            key={entry.days}
                            className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm"
                          >
                            <dt className="font-medium text-slate-300">
                              {entry.days}
                            </dt>
                            <dd className="text-slate-400">{entry.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <a
                      href={mapsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-brand-300 hover:text-brand-200"
                    >
                      Get directions
                      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden">
        <Glow className="left-1/2 top-0 size-[30rem] -translate-x-1/2 bg-brand-600/12" />
        <Container className="relative">
          <Reveal variant="scale">
            <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur sm:p-14 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  Would you rather send it in writing?
                </h2>
                <p className="mt-5 leading-relaxed text-slate-400">
                  Use the quote form and a licensed agent will follow up by
                  phone, text or email — whichever you pick. You can also
                  message us on{" "}
                  <a
                    href={site.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-300 hover:text-brand-200"
                  >
                    Facebook
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <ButtonLink href="/quote">
                  Request a quote
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <MailIcon className="size-5 text-brand-400" />
                  Email us
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
