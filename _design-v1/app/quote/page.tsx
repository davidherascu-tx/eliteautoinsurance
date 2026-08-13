import type { Metadata } from "next";
import Image from "next/image";

import { QuoteForm } from "@/components/quote-form";
import {
  ClockIcon,
  Container,
  Eyebrow,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui";
import { coverageLines, locations, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Insurance Quote",
  description: `Request a free, no-obligation insurance quote from ${site.name}. Auto, property, commercial, boat, umbrella and life coverage in Houston. Se habla español.`,
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
      <section className="bg-ink-900 py-14 text-white">
        <Container>
          <Eyebrow>Free quote</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Tell us what you need covered
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Fill out the form and a licensed agent will compare carriers for
            you. No obligation, no pressure — and if you would rather talk it
            through, call{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-brand-300 hover:text-white"
            >
              {site.phone}
            </a>
            .
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <QuoteForm defaultCoverage={defaultCoverage} />
            </div>
          </div>

          <aside className="space-y-8 lg:col-span-2">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/talk_to_experts.jpg"
                alt="Licensed agents taking calls at Elite Auto Insurance"
                width={1024}
                height={683}
                className="h-56 w-full object-cover"
              />
            </div>

            <div className="rounded-2xl bg-brand-50 p-6">
              <h2 className="text-lg font-bold text-ink-900">
                Prefer to talk to someone?
              </h2>
              <ul className="mt-4 space-y-3 text-slate-700">
                <li>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-3 font-semibold text-brand-700 hover:text-brand-800"
                  >
                    <PhoneIcon className="size-5" />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-3 hover:text-brand-700"
                  >
                    <MailIcon className="size-5 text-brand-600" />
                    {site.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-brand-700">
                Se Habla Español
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-ink-900">
                Three Houston-area offices
              </h2>
              <ul className="mt-5 space-y-6">
                {locations.map((location) => (
                  <li key={location.id} className="text-sm">
                    <p className="flex items-start gap-2 font-semibold text-ink-900">
                      <PinIcon className="mt-0.5 size-4 shrink-0 text-brand-600" />
                      <span>
                        {location.street}
                        <br />
                        {location.city}, {location.state} {location.zip}
                      </span>
                    </p>
                    <p className="mt-2 flex items-start gap-2 text-slate-600">
                      <ClockIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />
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
          </aside>
        </div>
      </Container>
    </>
  );
}
