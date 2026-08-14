import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import {
  ClockIcon,
  Container,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Section,
} from "@/components/ui";
import { coverageLines, locations, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Insurance Quote",
  description: `Request a free, no-obligation insurance quote from ${site.name}. Auto, property, commercial, trucking, boat, umbrella and life coverage in Houston. Se habla español.`,
  alternates: { canonical: "/quote" },
};

const validSlugs = new Set(coverageLines.map((line) => line.slug));

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ coverage?: string }>;
}) {
  const { coverage } = await searchParams;
  const defaultCoverage =
    coverage && validSlugs.has(coverage) ? coverage : undefined;

  return (
    <>
      <PageHero
        eyebrow="Free quote"
        title="Tell us what you need covered"
        intro="Fill out the form and a licensed agent will compare carriers for you. No obligation, no pressure — and if you would rather talk it through, just call."
        image={{
          src: "/policy_pen.jpg",
          alt: "Signing an insurance policy at the agent's desk",
        }}
      />

      <Section className="border-t border-white/5 bg-navy-950 pt-14 sm:pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-14">
            <Reveal variant="up" className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur sm:p-9">
                <QuoteForm defaultCoverage={defaultCoverage} />
              </div>
            </Reveal>

            <aside className="space-y-6 lg:col-span-2">
              <Reveal variant="right" delay={100}>
                <div className="rounded-2xl border border-brand-400/20 bg-gradient-to-br from-brand-700/40 to-navy-850 p-7">
                  <h2 className="text-lg font-bold text-white">
                    Prefer to talk to someone?
                  </h2>
                  <div className="mt-5 space-y-4">
                    <a
                      href={site.phoneHref}
                      className="flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-brand-200"
                    >
                      <PhoneIcon className="size-5 text-brand-300" />
                      {site.phone}
                    </a>
                    <a
                      href={`mailto:${site.email}`}
                      className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white"
                    >
                      <MailIcon className="size-5 text-brand-300" />
                      <span className="truncate">{site.email}</span>
                    </a>
                  </div>
                  <p className="mt-6 inline-flex rounded-full border border-brand-400/25 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-200">
                    Se Habla Español
                  </p>
                </div>
              </Reveal>

              <Reveal variant="right" delay={180}>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                  <h2 className="text-lg font-bold text-white">
                    Three Houston-area offices
                  </h2>
                  <ul className="mt-6 space-y-6">
                    {locations.map((location) => (
                      <li
                        key={location.id}
                        className="border-l-2 border-brand-500/30 pl-5 text-sm"
                      >
                        <p className="flex items-start gap-2 font-semibold text-white">
                          <PinIcon className="mt-0.5 size-4 shrink-0 text-brand-400" />
                          <span>
                            {location.street}
                            <br />
                            {location.city}, {location.state} {location.zip}
                          </span>
                        </p>
                        <p className="mt-3 flex items-start gap-2 text-slate-400">
                          <ClockIcon className="mt-0.5 size-4 shrink-0 text-slate-600" />
                          <span>
                            {location.hours.map((entry) => (
                              <span key={entry.days} className="block">
                                {entry.days}: {entry.time}
                              </span>
                            ))}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
