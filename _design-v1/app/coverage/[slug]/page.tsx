import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { QuoteForm } from "@/components/quote-form";
import {
  ButtonLink,
  CheckList,
  Container,
  Eyebrow,
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
      <section className="relative isolate overflow-hidden bg-ink-900">
        <Image
          src={line.heroImage}
          alt={line.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/50" />
        <Container className="relative py-20 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
            <Link href="/coverage" className="hover:text-white">
              Coverage
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-slate-200">{line.navLabel}</span>
          </nav>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            {line.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {line.summary}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/quote?coverage=${line.slug}`}>
              Quote {line.navLabel.toLowerCase()} coverage
            </ButtonLink>
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
          <SectionHeading
            eyebrow="What it covers"
            title={`Inside a ${line.navLabel.toLowerCase()} policy`}
            intro="Every policy is built from parts. These are the ones we will walk through with you before anything is signed."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {line.covers.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-ink-900">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-slate-50">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Image
              src={line.secondaryImage}
              alt={line.secondaryImageAlt}
              width={900}
              height={600}
              className="rounded-2xl object-cover shadow-lg"
            />
            <div>
              <SectionHeading
                eyebrow="Why work with us"
                title="What you get with Elite Auto Insurance"
              />
              <div className="mt-8">
                <CheckList items={line.highlights} />
              </div>
              <p className="mt-8 font-semibold text-brand-700">
                Se Habla Español
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Common questions"
                title={`${line.navLabel} insurance FAQ`}
              />
              <dl className="mt-10 space-y-8">
                {line.faqs.map((faq) => (
                  <div key={faq.q}>
                    <dt className="text-lg font-bold text-ink-900">{faq.q}</dt>
                    <dd className="mt-2 leading-relaxed text-slate-600">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div id="quote" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <Eyebrow>Free quote</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold text-ink-900">
                Request {line.navLabel.toLowerCase()} coverage
              </h2>
              <p className="mt-3 text-slate-600">
                A licensed agent will compare carriers and follow up. No
                obligation.
              </p>
              <div className="mt-8">
                <QuoteForm defaultCoverage={line.slug} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-slate-200 pt-14 sm:pt-16 lg:pt-16">
        <Container>
          <h2 className="text-2xl font-bold text-ink-900">Other coverage</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/coverage/${item.slug}`}
                  className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
