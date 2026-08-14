import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, Glow } from "@/components/ui";

/**
 * Page hero used on every inner page. The image sits in its own contained
 * frame beside the copy rather than behind it, so headline contrast never
 * depends on the photo.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  image,
  breadcrumb,
  icon,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  actions?: ReactNode;
  image?: { src: string; alt: string };
  breadcrumb?: { href: string; label: string; current: string };
  icon?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <Glow className="-left-40 -top-20 size-[32rem] bg-brand-600/18" />
      <Glow className="right-0 top-32 size-[24rem] bg-brand-500/10" />

      <Container className="relative py-14 lg:py-20">
        <div
          className={
            image
              ? "grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
              : "max-w-3xl"
          }
        >
          <div>
            {breadcrumb ? (
              <Reveal>
                <nav aria-label="Breadcrumb" className="mb-6 text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="text-slate-500 transition-colors hover:text-brand-300"
                  >
                    {breadcrumb.label}
                  </Link>
                  <span className="mx-2 text-slate-700" aria-hidden="true">
                    /
                  </span>
                  <span className="text-slate-300">{breadcrumb.current}</span>
                </nav>
              </Reveal>
            ) : null}

            <Reveal delay={40}>
              <Eyebrow>
                {icon ? <span className="text-brand-400">{icon}</span> : null}
                {eyebrow}
              </Eyebrow>
            </Reveal>

            <Reveal delay={110}>
              <h1 className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
                {title}
              </h1>
            </Reveal>

            {intro ? (
              <Reveal delay={180}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
                  {intro}
                </p>
              </Reveal>
            ) : null}

            {actions ? (
              <Reveal delay={250}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  {actions}
                </div>
              </Reveal>
            ) : null}
          </div>

          {image ? (
            <Reveal variant="right" delay={200} className="mx-auto lg:mx-0">
              <div className="relative w-full max-w-[30rem]">
                <div className="absolute -inset-4 rounded-[1.75rem] bg-gradient-to-br from-brand-500/20 via-transparent to-transparent blur-2xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-850 shadow-2xl shadow-black/50">
                  {/* Every hero shares one 3:2 frame, so a source photo that is
                      not 3:2 is cropped rather than stretched to fit it. */}
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={900}
                    height={600}
                    priority
                    sizes="(min-width: 1024px) 30rem, 100vw"
                    className="aspect-3/2 w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
