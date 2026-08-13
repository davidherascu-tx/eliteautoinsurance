import Image from "next/image";
import Link from "next/link";

import type { CoverageLine } from "@/lib/site";

export function CoverageCard({ line }: { line: CoverageLine }) {
  return (
    <Link
      href={`/coverage/${line.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={line.heroImage}
          alt={line.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
        <h3 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white">
          {line.name}
        </h3>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 leading-relaxed text-slate-600">{line.cardText}</p>
        <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-700">
          Learn more
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h9.19L9.72 6.03a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
