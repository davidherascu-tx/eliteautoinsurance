"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { coverageLines, site } from "@/lib/site";
import { Container, MailIcon, PhoneIcon } from "@/components/ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-ink-900 text-slate-200">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-sm">
          <span className="font-semibold text-brand-300">
            Se Habla Español
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <MailIcon className="size-4" />
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 font-semibold hover:text-white"
            >
              <PhoneIcon className="size-4" />
              {site.phone}
            </a>
          </div>
        </Container>
      </div>

      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="shrink-0" aria-label={`${site.name} home`}>
          <Image
            src="/eliteautoinsurance_logo.png"
            alt={site.name}
            width={350}
            height={150}
            priority
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/" active={isActive("/")}>
            Home
          </NavLink>
          <CoverageMenu active={isActive("/coverage")} />
          <NavLink href="/about" active={isActive("/about")}>
            About
          </NavLink>
          <NavLink href="/contact" active={isActive("/contact")}>
            Contact
          </NavLink>
          <Link
            href="/quote"
            className="ml-3 rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink-900 ring-1 ring-slate-200 lg:hidden"
        >
          <span className="sr-only">
            {open ? "Close main menu" : "Open main menu"}
          </span>
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="size-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="size-6"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 lg:hidden"
          // Any link inside navigates away, so close the panel with it
          onClick={() => setOpen(false)}
        >
          <Container className="space-y-1 py-4">
            <MobileLink href="/">Home</MobileLink>
            <MobileLink href="/coverage">All Coverage</MobileLink>
            <div className="space-y-1 border-l-2 border-brand-100 pl-4">
              {coverageLines.map((line) => (
                <MobileLink key={line.slug} href={`/coverage/${line.slug}`}>
                  {line.navLabel}
                </MobileLink>
              ))}
            </div>
            <MobileLink href="/about">About</MobileLink>
            <MobileLink href="/contact">Contact</MobileLink>
            <Link
              href="/quote"
              className="mt-3 block rounded-lg bg-brand-600 px-4 py-3 text-center font-semibold text-white"
            >
              Get a Quote
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-lg px-4 py-2 font-medium transition-colors ${
        active
          ? "text-brand-700"
          : "text-slate-700 hover:bg-slate-50 hover:text-brand-700"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-700"
    >
      {children}
    </Link>
  );
}

function CoverageMenu({ active }: { active: boolean }) {
  return (
    <div className="group relative">
      <Link
        href="/coverage"
        className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 font-medium transition-colors ${
          active
            ? "text-brand-700"
            : "text-slate-700 hover:bg-slate-50 hover:text-brand-700"
        }`}
      >
        Coverage
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="size-4"
        >
          <path
            fillRule="evenodd"
            d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="overflow-hidden rounded-xl bg-white py-2 shadow-lg ring-1 ring-slate-200">
          {coverageLines.map((line) => (
            <Link
              key={line.slug}
              href={`/coverage/${line.slug}`}
              className="block px-4 py-2.5 text-slate-700 hover:bg-brand-50 hover:text-brand-700"
            >
              {line.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
