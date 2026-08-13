import Link from "next/link";

import { ButtonLink, Container } from "@/components/ui";
import { coverageLines, site } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="py-24 text-center sm:py-32">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
        We couldn&rsquo;t find that page
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
        The link may be out of date. Try one of our coverage pages, or call us
        at{" "}
        <a
          href={site.phoneHref}
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          {site.phone}
        </a>
        .
      </p>

      <ul className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
        {coverageLines.map((line) => (
          <li key={line.slug}>
            <Link
              href={`/coverage/${line.slug}`}
              className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {line.navLabel}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
