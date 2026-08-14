import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CoverageIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import {
  ArrowIcon,
  ButtonLink,
  CheckList,
  Container,
  Eyebrow,
  Glow,
  PhoneIcon,
  Section,
  SectionHeading,
} from "@/components/ui";
import { coverageLines, getCoverageLine, site } from "@/lib/site";

export function generateStaticParams() {
  return coverageLines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const line = getCoverageLine(slug);

  if (!line) {
    return { title: "Coverage not found" };
  }

  return {
    title: line.name,
    description: line.summary,
    alternates: { canonical: `/coverage/${line.slug}` },
    openGraph: {
      title: `${line.name} | ${site.name}`,
      description: line.summary,
      images: [{ url: line.heroImage }],
    },
  };
}

export default async function CoverageLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = getCoverageLine(slug);

  if (!line) {
    notFound();
  }

  const others = coverageLines.filter((item) => item.slug !== line.slug);

  return (
    <>
      <PageHero
        eyebrow={line.name}
        icon={<CoverageIcon slug={line.slug} className="size-4" />}
        breadcrumb={{
          href: "/coverage",
          label: "Coverage",
          current: line.navLabel,
        }}
        title={line.headline}
        intro={line.summary}
        image={{ src: line.heroImage, alt: line.heroImageAlt }}
        actions={
          <>
            <ButtonLink href={`/quote?coverage=${line.slug}`}>
              Quote {line.navLabel.toLowerCase()} coverage
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

      <Section className="border-y border-white/5 bg-navy-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What it covers"
              title={`Inside a ${line.navLabel.toLowerCase()} policy`}
              intro="Every policy is built from parts. These are the ones we will walk through with you before anything is signed."
            />
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {line.covers.map((item, index) => (
              <Reveal key={item.title} variant="up" delay={index * 70}>
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/25 hover:bg-white/[0.06]">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal variant="left">
              <div className="relative mx-auto w-full max-w-[32rem]">
                <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                  {/* Same 3:2 frame as the hero: crop rather than stretch a
                      source photo with a different ratio. */}
                  <Image
                    src={line.secondaryImage}
                    alt={line.secondaryImageAlt}
                    width={900}
                    height={600}
                    sizes="(min-width: 1024px) 32rem, 100vw"
                    className="aspect-3/2 w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal variant="right">
                <SectionHeading
                  eyebrow="Why work with us"
                  title="What you get with Elite Auto Insurance"
                />
              </Reveal>
              <Reveal variant="right" delay={120}>
                <div className="mt-10">
                  <CheckList items={line.highlights} />
                </div>
                <p className="mt-9 inline-flex rounded-full border border-brand-400/20 bg-brand-500/10 px-4 py-1.5 text-sm font-semibold text-brand-300">
                  Se Habla Español
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="relative overflow-hidden border-t border-white/5 bg-navy-950">
        <Glow className="-left-20 top-1/3 size-[28rem] bg-brand-600/12" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Common questions"
                  title={`${line.navLabel} insurance FAQ`}
                />
              </Reveal>
              <dl className="mt-12 space-y-8">
                {line.faqs.map((faq, index) => (
                  <Reveal key={faq.q} variant="up" delay={index * 90}>
                    <div className="border-l-2 border-brand-500/30 pl-6">
                      <dt className="text-lg font-bold text-white">{faq.q}</dt>
                      <dd className="mt-2 leading-relaxed text-slate-400">
                        {faq.a}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>

            <Reveal variant="right" delay={100}>
              <div
                id="quote"
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 backdrop-blur sm:p-9"
              >
                <Eyebrow>Free quote</Eyebrow>
                <h2 className="mt-5 text-2xl font-bold text-white">
                  Request {line.navLabel.toLowerCase()} coverage
                </h2>
                <p className="mt-3 text-slate-400">
                  A licensed agent will compare carriers and follow up. No
                  obligation.
                </p>
                <div className="mt-8">
                  <QuoteForm defaultCoverage={line.slug} />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold text-white">Other coverage</h2>
            <ul className="mt-7 flex flex-wrap gap-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/coverage/${item.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-brand-500/10 hover:text-white"
                  >
                    <CoverageIcon
                      slug={item.slug}
                      className="size-5 text-brand-400"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
