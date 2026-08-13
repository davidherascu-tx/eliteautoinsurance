import Link from "next/link";

import { CoverageIcon } from "@/components/icons";
import { ArrowIcon, ButtonLink, Container, Glow } from "@/components/ui";
import { coverageLines, site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <Glow className="left-1/2 top-0 size-[32rem] -translate-x-1/2 bg-brand-600/18" />

      <Container className="relative py-24 text-center sm:py-32">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">
          404
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          We couldn&rsquo;t find that page
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
          The link may be out of date. Try one of our coverage pages, or call us
          at{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-brand-300 hover:text-brand-200"
          >
            {site.phone}
          </a>
          .
        </p>

        <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
          {coverageLines.map((line) => (
            <li key={line.slug}>
              <Link
                href={`/coverage/${line.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-medium text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-brand-500/10 hover:text-white"
              >
                <CoverageIcon slug={line.slug} className="size-5 text-brand-400" />
                {line.navLabel}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <ButtonLink href="/">
            Back to home
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
