import Image from "next/image";
import Link from "next/link";

import { CoverageCard } from "@/components/coverage-card";
import { CoverageIcon, ShieldIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  ArrowIcon,
  ButtonLink,
  CheckList,
  ClockIcon,
  Container,
  Eyebrow,
  Glow,
  Highlight,
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
      <CoverageGrid />
      <WhyUs />
      <HowItWorks />
      <LocationsPreview />
      <CtaBanner />
    </>
  );
}

function Hero() {
  return (
    /*
     * shield.jpg's edges average #010203, so the background must reach pure
     * black before the photo begins or a faint seam shows along its edge.
     * The photo starts at ~54% across on desktop, so black lands at 50%; below
     * lg the layout stacks, so the sweep runs top-to-bottom instead.
     */
    <section className="relative -mt-24 overflow-hidden bg-[linear-gradient(180deg,#1d3358_0%,#15294a_16%,#0d1b31_30%,#040c18_42%,#000000_52%,#000000_100%)] pt-24 sm:-mt-28 sm:pt-28 lg:bg-[linear-gradient(90deg,#1d3358_0%,#16294a_12%,#0e1c33_24%,#071223_34%,#020710_44%,#000000_50%,#000000_100%)]">
      {/* Softens the step down into the next section's navy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-900"
      />

      <Container className="relative pb-10 pt-14 lg:pb-12 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div>
            <Reveal variant="up">
              <Eyebrow>
                <span className="size-1.5 rounded-full bg-brand-400" />
                Se Habla Español
              </Eyebrow>
            </Reveal>

            <Reveal variant="up" delay={80}>
              <h1 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Insurance that actually covers{" "}
                <Highlight>Houston</Highlight>
              </h1>
            </Reveal>

            <Reveal variant="up" delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
                {site.name} is an independent agency writing auto, property,
                commercial, boat, umbrella and life coverage. We compare
                carriers for you and explain the difference in plain language.
              </p>
            </Reveal>

            <Reveal variant="up" delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
              </div>
            </Reveal>

            {/* Coverage line chips with icons */}
            <Reveal variant="up" delay={320}>
              <ul className="mt-11 flex flex-wrap gap-2.5">
                {coverageLines.map((line) => (
                  <li key={line.slug}>
                    <Link
                      href={`/coverage/${line.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-brand-500/10 hover:text-white"
                    >
                      <CoverageIcon
                        slug={line.slug}
                        className="size-4 text-brand-400"
                      />
                      {line.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Image — fixed frame, natural aspect ratio, never stretched */}
          <Reveal variant="right" delay={200} className="relative mx-auto lg:mx-0">
            <div className="relative w-full max-w-[34rem]">
              {/* No frame, border or glow — the edges are feathered straight
                  into the black background */}
              <Image
                src="/shield.jpg"
                alt="Hands protecting a shield icon representing home, auto and business coverage"
                width={900}
                height={600}
                priority
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="blend-edges relative h-auto w-full"
              />

              {/* Floating stat card */}
              <div className="absolute bottom-2 left-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-navy-900/80 px-5 py-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:-left-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/25">
                  <ShieldIcon className="size-6" />
                </span>
                <span>
                  <span className="block text-xl font-bold leading-none text-white">
                    6 lines
                  </span>
                  <span className="mt-1 block text-xs text-slate-400">
                    of coverage, one agent
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Contact strip */}
        <Reveal variant="up" delay={120}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-3">
            <ContactTile
              href={site.phoneHref}
              icon={<PhoneIcon className="size-5" />}
              label="Call us"
              value={site.phone}
            />
            <ContactTile
              href={`mailto:${site.email}`}
              icon={<MailIcon className="size-5" />}
              label="Email us"
              value={site.email}
            />
            <ContactTile
              href="/contact"
              icon={<PinIcon className="size-5" />}
              label="Visit us"
              value="3 Houston-area offices"
              internal
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ContactTile({
  href,
  icon,
  label,
  value,
  internal = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  internal?: boolean;
}) {
  const inner = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20 transition-colors group-hover:bg-brand-500/20">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-widest text-slate-500">
          {label}
        </span>
        <span className="mt-1 block truncate font-semibold text-white">
          {value}
        </span>
      </span>
    </>
  );

  // Translucent so the strip sits on the hero gradient instead of cutting a
  // flat navy band across it
  const className =
    "group flex items-center gap-4 bg-white/[0.04] px-6 py-6 backdrop-blur-sm transition-colors hover:bg-white/[0.09]";

  return internal ? (
    <Link href={href} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

function CoverageGrid() {
  return (
    // Tighter top padding — the hero's contact strip already provides breathing
    // room above this section
    <Section className="pt-10 sm:pt-12 lg:pt-14">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we cover"
            title={
              <>
                We&rsquo;re covering all the{" "}
                <Highlight>insurance fields</Highlight>
              </>
            }
            intro="Six lines of coverage, quoted across multiple carriers by agents who live and work in Houston."
            align="center"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coverageLines.map((line, index) => (
            <Reveal key={line.slug} variant="up" delay={index * 90}>
              <CoverageCard line={line} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function WhyUs() {
  return (
    <Section className="relative overflow-hidden border-y border-white/5 bg-navy-950">
      <Glow className="-right-32 top-1/4 size-[30rem] bg-brand-600/12" />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="left">
            <div className="relative mx-auto w-full max-w-[32rem]">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                <Image
                  src="/policy_benefits.jpg"
                  alt="An Elite Auto Insurance agent reviewing a policy with clients"
                  width={900}
                  height={600}
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl border border-white/10 bg-brand-600 px-6 py-4 shadow-2xl shadow-brand-900/50">
                <p className="text-xl font-bold leading-none text-white">
                  Independent
                </p>
                <p className="mt-1.5 text-xs text-brand-100">
                  agency, not a call center
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal variant="right">
              <SectionHeading
                eyebrow="Why Elite Auto"
                title="An agent on your side of the table"
                intro="Carriers change their appetite and their rates constantly. Our job is to keep track of that so your policy still makes sense at renewal."
              />
            </Reveal>

            <dl className="mt-12 space-y-8">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} variant="right" delay={index * 90}>
                  <div className="border-l-2 border-brand-500/30 pl-6">
                    <dt className="text-lg font-bold text-white">
                      {reason.title}
                    </dt>
                    <dd className="mt-2 leading-relaxed text-slate-400">
                      {reason.text}
                    </dd>
                  </div>
                </Reveal>
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
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps, no runaround"
            align="center"
          />
        </Reveal>

        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} variant="up" delay={index * 110}>
              <li className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-all duration-500 hover:border-brand-400/25 hover:bg-white/[0.06]">
                <span className="block bg-gradient-to-br from-brand-300 to-brand-600 bg-clip-text text-5xl font-bold text-transparent">
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-400">
                  {step.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal variant="up" delay={120}>
          <div className="mt-14 text-center">
            <ButtonLink href="/quote">
              Start my quote
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function LocationsPreview() {
  return (
    <Section className="border-y border-white/5 bg-navy-950">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Find us"
            title="Three offices across the Houston area"
            intro="Walk in, call, or send the form — whichever is easiest for you."
            align="center"
          />
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {locations.map((location, index) => (
            <Reveal key={location.id} variant="up" delay={index * 110}>
              <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-brand-400/25">
                <h3 className="text-lg font-bold text-white">
                  {location.name}
                </h3>

                <address className="mt-5 flex items-start gap-3 not-italic text-slate-400">
                  <PinIcon className="mt-0.5 size-5 shrink-0 text-brand-400" />
                  <span>
                    {location.street}
                    <br />
                    {location.city}, {location.state} {location.zip}
                  </span>
                </address>

                <a
                  href={location.phoneHref}
                  className="mt-5 inline-flex items-center gap-3 font-semibold text-white transition-colors hover:text-brand-300"
                >
                  <PhoneIcon className="size-5 text-brand-400" />
                  {location.phone}
                </a>

                <div className="mt-5 flex items-start gap-3 text-sm text-slate-400">
                  <ClockIcon className="mt-0.5 size-5 shrink-0 text-slate-600" />
                  <div className="space-y-1">
                    {location.hours.map((entry) => (
                      <p key={entry.days}>
                        <span className="font-medium text-slate-300">
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
                  className="group mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-brand-300 hover:text-brand-200"
                >
                  Get directions
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function CtaBanner() {
  return (
    <Section>
      <Container>
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-700 via-brand-600 to-navy-800 p-10 sm:p-14">
            <div
              aria-hidden="true"
              className="glow -right-20 -top-20 size-96 bg-brand-300/25"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Get a free quote today
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-brand-100">
                  Send us a few details and a licensed agent will compare
                  carriers and get back to you. No obligation, and no pressure
                  to switch.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/quote" variant="light">
                    Request a quote
                    <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </ButtonLink>
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <PhoneIcon className="size-5" />
                    {site.phone}
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-navy-950/30 p-8 backdrop-blur">
                <h3 className="text-lg font-bold text-white">
                  What you get either way
                </h3>
                <div className="mt-6">
                  <CheckList
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
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
