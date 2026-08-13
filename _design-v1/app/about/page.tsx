import type { Metadata } from "next";
import Image from "next/image";

import {
  ButtonLink,
  CheckList,
  Container,
  Eyebrow,
  PhoneIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { coverageLines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Agency",
  description: `${site.name} is an independent insurance agency serving ${site.areaServed}, with three offices and agents who speak English and Spanish.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-900 py-16 text-white">
        <Container>
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            An independent agency built around Houston drivers, homeowners and
            business owners
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            We are not tied to a single insurance company. That means when a
            carrier raises rates or tightens coverage, we can move you instead
            of defending them.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our approach"
                title="Coverage explained before it is sold"
                intro="Most people find out what their policy actually does at the worst possible moment. We would rather have that conversation now, while there is still time to fix the gaps."
              />
              <div className="mt-8 space-y-5 leading-relaxed text-slate-600">
                <p>
                  {site.name} writes every major personal and commercial line —
                  auto, property, commercial, boat, umbrella and life — through
                  a range of carriers. Having all of it under one roof means one
                  agent can see where your coverage overlaps, where it leaves a
                  hole, and where you are paying twice for the same protection.
                </p>
                <p>
                  We serve {site.areaServed} from three offices, and the whole
                  process is available in English or Spanish. Walk in, call, or
                  send the quote form — whichever fits your day.
                </p>
              </div>
              <div className="mt-10">
                <CheckList
                  items={[
                    "Independent — we represent you, not one carrier",
                    "All six lines of coverage handled by one agent",
                    "Se habla español, de la cotización al reclamo",
                    "Same-day proof of insurance, SR-22s and certificates",
                    "Coverage reviewed at renewal, not just at signup",
                  ]}
                />
              </div>
            </div>

            <div className="space-y-6">
              <Image
                src="/agency_woman.png"
                alt="Licensed insurance agent at Elite Auto Insurance"
                width={545}
                height={768}
                className="mx-auto w-full max-w-md rounded-2xl bg-slate-100 object-cover"
              />
              <div className="rounded-2xl bg-brand-50 p-7">
                <p className="text-lg font-semibold text-ink-900">
                  &ldquo;Tell me what you own and how you make a living. I will
                  tell you what actually needs covering — and what does
                  not.&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-brand-700">
                  Licensed agent, {site.name}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <SectionHeading
            eyebrow="What we write"
            title="Every line of coverage, one agency"
            align="center"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coverageLines.map((line) => (
              <div
                key={line.slug}
                className="rounded-2xl border border-slate-200 bg-white p-7"
              >
                <h3 className="text-lg font-bold text-ink-900">{line.name}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {line.cardText}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <section className="bg-brand-700 py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&rsquo;s look at your coverage together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            Bring your current declarations page and we will tell you honestly
            whether you can do better.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/quote" variant="secondary">
              Get a free quote
            </ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <PhoneIcon className="size-5" />
              {site.phone}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
