import type { Metadata } from "next";
import Image from "next/image";

import { CoverageIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  ArrowIcon,
  ButtonLink,
  CheckList,
  Container,
  Glow,
  PhoneIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { pageMetadata } from "@/lib/seo";
import { coverageLines, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Our Agency",
  description: `${site.name} is an independent agency serving the Greater Houston area, with three offices and agents who speak English and Spanish.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="An independent agency built around Houston"
        intro="We are not tied to a single insurance company. That means when a carrier raises rates or tightens coverage, we can move you instead of defending them."
        image={{
          src: "/policy_handshake.jpg",
          alt: "Agent and client shaking hands over a signed policy",
        }}
        actions={
          <ButtonLink href="/quote">
            Get a free quote
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
        }
      />

      <Section className="border-y border-white/5 bg-navy-950">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Our approach"
                  title="Coverage explained before it is sold"
                  intro="Most people find out what their policy actually does at the worst possible moment. We would rather have that conversation now, while there is still time to fix the gaps."
                />
              </Reveal>

              <Reveal delay={110}>
                <div className="mt-8 space-y-5 leading-relaxed text-slate-400">
                  <p>
                    {site.name} writes every major personal and commercial line
                    — auto, property, commercial, trucking, boat, umbrella and
                    life — through a range of carriers. Having all of it under
                    one roof means one agent can see where your coverage
                    overlaps, where it leaves a hole, and where you are paying
                    twice for the same protection.
                  </p>
                  <p>
                    We serve {site.areaServed} from three offices, and the whole
                    process is available in English or Spanish. Walk in, call,
                    or send the quote form — whichever fits your day.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-11">
                  <CheckList
                    items={[
                      "Independent — we represent you, not one carrier",
                      "All seven lines of coverage handled by one agent",
                      "Se habla español, de la cotización al reclamo",
                      "Same-day proof of insurance, SR-22s and certificates",
                      "Coverage reviewed at renewal, not just at signup",
                    ]}
                  />
                </div>
              </Reveal>
            </div>

            <Reveal variant="right" delay={120}>
              <div className="relative mx-auto w-full max-w-md">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-6 bottom-0 top-10 rounded-3xl bg-gradient-to-b from-brand-600/25 to-transparent blur-2xl"
                />
                <Image
                  src="/agency_woman.png"
                  alt="Licensed insurance agent at Elite Auto Insurance"
                  width={545}
                  height={768}
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="relative h-auto w-full"
                />
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                <p className="text-lg leading-relaxed text-slate-200">
                  &ldquo;Tell me what you own and how you make a living. I will
                  tell you what actually needs covering — and what does
                  not.&rdquo;
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
                  Licensed agent, {site.name}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we write"
              title="Every line of coverage, one agency"
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coverageLines.map((line, index) => (
              <Reveal key={line.slug} variant="up" delay={index * 80}>
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20">
                    <CoverageIcon slug={line.slug} className="size-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {line.name}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    {line.cardText}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden border-t border-white/5 bg-navy-950">
        <Glow className="left-1/2 top-0 size-[32rem] -translate-x-1/2 bg-brand-600/15" />
        <Container className="relative text-center">
          <Reveal variant="scale">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&rsquo;s look at your coverage together
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
              Bring your current declarations page and we will tell you honestly
              whether you can do better.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/quote">
                Get a free quote
                <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
              >
                <PhoneIcon className="size-5 text-brand-400" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
