import Image from "next/image";
import Link from "next/link";

import { CoverageCard } from "@/components/coverage-card";
import {
  ButtonLink,
  CheckList,
  ClockIcon,
  Container,
  Eyebrow,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { coverageLines, locations, mapsUrl, site } from "@/lib/site";

const reasons = [
  {
    title: "We shop, you choose",
    text: "As an independent agency we compare multiple carriers on your behalf instead of selling you one company's product.",
  },
  {
    title: "Every line under one roof",
    text: "Auto, property, commercial, boat, umbrella and life — one agent who knows your whole picture, not six separate call centers.",
  },
  {
    title: "Se Habla Español",
    text: "Hablamos su idioma. Todo el proceso, desde la cotización hasta el reclamo, se puede hacer en español.",
  },
  {
    title: "Local offices, real people",
    text: "Three Houston-area locations you can walk into. Ask for your agent by name and actually get them.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we cover"
            title="We're covering all the insurance fields"
            intro="Six lines of coverage, quoted across multiple carriers by agents who live and work in Houston."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coverageLines.map((line) => (
              <CoverageCard key={line.slug} line={line} />
            ))}
          </div>
        </Container>
      </Section>

      <WhyUs />
      <HowItWorks />
      <LocationsPreview />
      <CtaBanner />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      <Image
        src="/shield.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/40" />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-600/20 px-4 py-1.5 text-sm font-semibold text-brand-200 ring-1 ring-brand-400/30">
            Se Habla Español
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Insurance that actually covers Houston
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            {site.name} is an independent agency writing auto, property,
            commercial, boat, umbrella and life coverage. We compare carriers
            for you and explain the difference in plain language.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote">Get a free quote</ButtonLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <PhoneIcon className="size-5" />
              {site.phone}
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8">
            <div>
              <dt className="text-3xl font-bold text-white">6</dt>
              <dd className="mt-1 text-sm text-slate-400">Lines of coverage</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">3</dt>
              <dd className="mt-1 text-sm text-slate-400">Houston-area offices</dd>
            </div>
            <div>
              <dt className="text-3xl font-bold text-white">2</dt>
              <dd className="mt-1 text-sm text-slate-400">Languages spoken</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="border-b border-slate-200 bg-slate-50">
      <Container className="grid gap-6 py-8 sm:grid-cols-3">
        <a
          href={site.phoneHref}
          className="flex items-center gap-3 text-slate-700 hover:text-brand-700"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600/10">
            <PhoneIcon className="size-5 text-brand-600" />
          </span>
          <span>
            <span className="block text-sm text-slate-500">Call us</span>
            <span className="font-semibold">{site.phone}</span>
          </span>
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex items-center gap-3 text-slate-700 hover:text-brand-700"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600/10">
            <MailIcon className="size-5 text-brand-600" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-slate-500">Email us</span>
            <span className="block truncate font-semibold">{site.email}</span>
          </span>
        </a>
        <Link
          href="/contact"
          className="flex items-center gap-3 text-slate-700 hover:text-brand-700"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600/10">
            <PinIcon className="size-5 text-brand-600" />
          </span>
          <span>
            <span className="block text-sm text-slate-500">Visit us</span>
            <span className="font-semibold">3 Houston-area offices</span>
          </span>
        </Link>
      </Container>
    </div>
  );
}

function WhyUs() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <Image
              src="/policy_benefits.jpg"
              alt="An Elite Auto Insurance agent reviewing a policy with clients"
              width={900}
              height={600}
              className="rounded-2xl object-cover shadow-lg"
            />
            <div className="absolute -bottom-6 -right-4 hidden rounded-xl bg-brand-600 px-6 py-5 text-white shadow-xl sm:block">
              <p className="text-2xl font-bold">Independent</p>
              <p className="text-sm text-brand-100">agency, not a call center</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why Elite Auto"
              title="An agent on your side of the table"
              intro="Carriers change their appetite and their rates constantly. Our job is to keep track of that so your policy still makes sense at renewal."
            />
            <dl className="mt-10 space-y-7">
              {reasons.map((reason) => (
                <div key={reason.title}>
                  <dt className="text-lg font-bold text-ink-900">
                    {reason.title}
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-slate-600">
                    {reason.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell us what you drive, own or run",
      text: "Send the quote form or call the office. It takes a few minutes and there is no credit card involved.",
    },
    {
      number: "02",
      title: "We shop the carriers",
      text: "A licensed agent compares coverage and price across the companies we represent, then explains the real differences.",
    },
    {
      number: "03",
      title: "You pick, we handle the rest",
      text: "Same-day proof of insurance, SR-22 filings and certificates of insurance — issued and sent while you wait.",
    },
  ];

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, no runaround"
          align="center"
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="relative rounded-2xl border border-slate-200 p-8">
              <span className="text-4xl font-bold text-brand-200">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink-900">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <ButtonLink href="/quote">Start my quote</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

function LocationsPreview() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <SectionHeading
          eyebrow="Find us"
          title="Three offices across the Houston area"
          intro="Walk in, call, or send the form — whichever is easiest for you."
          align="center"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-lg font-bold text-ink-900">
                {location.name}
              </h3>
              <address className="mt-4 flex items-start gap-3 not-italic text-slate-600">
                <PinIcon className="mt-1 size-5 shrink-0 text-brand-600" />
                <span>
                  {location.street}
                  <br />
                  {location.city}, {location.state} {location.zip}
                </span>
              </address>
              <a
                href={location.phoneHref}
                className="mt-4 inline-flex items-center gap-3 font-semibold text-brand-700 hover:text-brand-800"
              >
                <PhoneIcon className="size-5" />
                {location.phone}
              </a>
              <div className="mt-4 flex items-start gap-3 text-sm text-slate-600">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-slate-400" />
                <div>
                  {location.hours.map((entry) => (
                    <p key={entry.days}>
                      <span className="font-medium text-ink-900">
                        {entry.days}
                      </span>
                      : {entry.time}
                    </p>
                  ))}
                </div>
              </div>
              <a
                href={mapsUrl(location)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
              >
                Get directions
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-brand-700">
      <Container className="py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>
              <span className="text-brand-200">Ready when you are</span>
            </Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Get a free quote today
            </h2>
            <p className="mt-4 text-lg text-brand-100">
              Send us a few details and a licensed agent will compare carriers
              and get back to you. No obligation, and no pressure to switch.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote" variant="secondary">
                Request a quote
              </ButtonLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                <PhoneIcon className="size-5" />
                {site.phone}
              </a>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-8 ring-1 ring-white/20">
            <h3 className="text-lg font-bold text-white">
              What you get either way
            </h3>
            <div className="mt-5">
              <CheckList
                tone="dark"
                items={[
                  "A side-by-side comparison you can actually read",
                  "Discounts checked and applied before you see the price",
                  "An agent who answers the phone at renewal, not just at signup",
                  "Todo el proceso disponible en español",
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
