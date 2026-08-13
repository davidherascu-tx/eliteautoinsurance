import type { Metadata } from "next";

import { CoverageCard } from "@/components/coverage-card";
import {
  ButtonLink,
  Container,
  Eyebrow,
  PhoneIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { coverageLines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance Coverage",
  description:
    "Auto, property, commercial, boat, umbrella and life insurance from an independent Houston agency. Compare carriers and get a free quote.",
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  return (
    <>
      <section className="bg-ink-900 py-16 text-white">
        <Container>
          <Eyebrow>Coverage</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            We&rsquo;re covering all the insurance fields
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Six lines of coverage written through multiple carriers. Pick the
            one you need — or ask us to review everything at once and look for
            bundle discounts.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote">Get a free quote</ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <PhoneIcon className="size-5" />
              {site.phone}
            </a>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coverageLines.map((line) => (
              <CoverageCard key={line.slug} line={line} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50 pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
            <SectionHeading
              title="Not sure which policies you need?"
              intro="That is a normal place to start. Tell us what you own and what you do for a living, and we will map out what makes sense — including the coverage you can safely skip."
              align="center"
            />
            <div className="mt-8">
              <ButtonLink href="/quote">Talk to an agent</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
