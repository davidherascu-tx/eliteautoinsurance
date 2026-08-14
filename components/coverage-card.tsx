import Image from "next/image";
import Link from "next/link";

import { CoverageIcon } from "@/components/icons";
import { ArrowIcon } from "@/components/ui";
import type { CoverageLine } from "@/lib/site";

export function CoverageCard({ line }: { line: CoverageLine }) {
  return (
    <Link
      href={`/coverage/${line.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-400/30 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-brand-900/40"
    >
      {/* Tall enough that a square source photo still reads as a full scene
          and a 3:2 one is barely cropped */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={line.heroImage}
          alt={line.heroImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Fades the photo into the card so the icon reads cleanly over it */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/45 to-navy-900/10" />
      </div>

      {/* z-10 keeps the badge above the positioned image block that precedes it */}
      <div className="relative z-10 -mt-9 flex justify-center">
        <span className="flex size-18 items-center justify-center rounded-full border border-brand-400/25 bg-navy-850 text-brand-300 shadow-xl shadow-black/40 transition-all duration-500 group-hover:scale-110 group-hover:border-brand-400/50 group-hover:text-brand-200">
          <CoverageIcon slug={line.slug} className="size-9" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-7 pb-8 pt-5">
        <h3 className="text-xl font-bold text-white">{line.name}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-slate-400">
          {line.cardText}
        </p>
        {/*
          Revealed on hover or keyboard focus. Devices without hover always show
          it, so touch users are not left without the affordance.
        */}
        <span className="mt-6 inline-flex translate-y-1 items-center justify-center gap-2 text-sm font-semibold text-brand-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          Learn more
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}
