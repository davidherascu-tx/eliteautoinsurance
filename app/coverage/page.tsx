import type { Metadata } from "next";

import { CoverageCard } from "@/components/coverage-card";
import { ShieldIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  ArrowIcon,
  ButtonLink,
  Container,
  PhoneIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { coverageLines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insurance Coverage",
  description:
    "Auto, property, commercial, trucking, boat, umbrella and life insurance from an independent Houston agency. Compare carriers and get a free quote.",
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        icon={<ShieldIcon className="size-4" />}
        title={<>We&rsquo;re covering all the insurance fields</>}
        intro="Seven lines of coverage written through multiple carriers. Pick the one you need — or ask us to review everything at once and look for bundle discounts."
        image={{
          src: "/shield.jpg",
          alt: "Hands protecting a shield icon representing home, auto and business coverage",
        }}
        actions={
          <>
            <ButtonLink href="/quote">
              Get a free quote
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
            >
              <PhoneIcon className="size-5 text-brand-400" />
              {site.phone}
            </a>
          </>
        }
      />

      <Section className="border-t border-white/5 bg-navy-950">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coverageLines.map((line, index) => (
              <Reveal key={line.slug} variant="up" delay={index * 90}>
                <CoverageCard line={line} />
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" delay={100}>
            <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-brand-700/40 via-navy-850 to-navy-850 p-10 text-center sm:p-14">
              <SectionHeading
                title="Not sure which policies you need?"
                intro="That is a normal place to start. Tell us what you own and what you do for a living, and we will map out what makes sense — including the coverage you can safely skip."
                align="center"
              />
              <div className="mt-10">
                <ButtonLink href="/quote">
                  Talk to an agent
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
