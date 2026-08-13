"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CoverageIcon } from "@/components/icons";
import { ArrowIcon, Container, PhoneIcon } from "@/components/ui";
import { coverageLines, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    // rAF so the initial read happens after the effect body, not inside it
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock background scrolling while the full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4 sm:py-6"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "py-2.5 shadow-xl shadow-black/25"
              : "py-3.5 shadow-lg shadow-black/15"
          }`}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className="shrink-0 transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src="/eliteautoinsurance_logo.png"
              alt={site.name}
              width={352}
              height={150}
              priority
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-9" : "h-10 sm:h-12"
              }`}
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
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 xl:inline-flex"
            >
              <PhoneIcon className="size-4 text-brand-400" />
              {site.phone}
            </a>
            <Link
              href="/quote"
              className="hidden rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 sm:inline-flex"
            >
              Get a Quote
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 text-navy-900 transition-colors hover:bg-slate-100 lg:hidden"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="size-5"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
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
      className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "text-brand-700" : "text-slate-600 hover:text-navy-900"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-4 bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </Link>
  );
}

function CoverageMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        // Only close once focus has actually left the whole menu
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <Link
        href="/coverage"
        aria-expanded={open}
        // Navigating away should dismiss the panel, not leave it hanging open
        onClick={() => setOpen(false)}
        className={`relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          active ? "text-brand-700" : "text-slate-600 hover:text-navy-900"
        }`}
      >
        Coverage
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
        <span
          className={`absolute inset-x-4 bottom-0.5 h-0.5 rounded-full bg-brand-600 transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />
      </Link>

      <div
        className={`absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4 transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {/* Dark panel so the menu reads as its own layer, not an extension
            of the white bar it drops out of */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900 p-2 shadow-2xl shadow-black/50 ring-1 ring-black/20">
          <div className="grid grid-cols-2 gap-1">
            {coverageLines.map((line) => (
              <Link
                key={line.slug}
                href={`/coverage/${line.slug}`}
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                className="group/item flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.07]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/12 text-brand-300 ring-1 ring-brand-400/20 transition-colors group-hover/item:bg-brand-500/25 group-hover/item:text-brand-200">
                  <CoverageIcon slug={line.slug} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-white">
                    {line.navLabel}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">
                    {line.menuText}
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/coverage"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.12]"
          >
            See all coverage
            <ArrowIcon className="size-4 text-brand-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-navy-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="sr-only">Close menu</span>
      </button>

      <div
        className={`absolute inset-x-0 top-0 max-h-dvh overflow-y-auto bg-white px-5 pb-10 pt-6 transition-transform duration-500 ease-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Image
            src="/eliteautoinsurance_logo.png"
            alt={site.name}
            width={352}
            height={150}
            className="h-10 w-auto"
          />
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="rounded-full border border-slate-200 p-2.5 text-navy-900"
          >
            <span className="sr-only">Close menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-5"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Every control inside navigates or dials, so close the panel with it */}
        <nav className="mt-8" onClick={onClose}>
          <MobileLink href="/" open={open}>
            Home
          </MobileLink>

          <p className="mb-3 mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Coverage
          </p>
          <div className="grid grid-cols-2 gap-2">
            {coverageLines.map((line) => (
              <Link
                key={line.slug}
                href={`/coverage/${line.slug}`}
                tabIndex={open ? 0 : -1}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-navy-900"
              >
                <CoverageIcon slug={line.slug} className="size-5 text-brand-600" />
                {line.navLabel}
              </Link>
            ))}
          </div>

          <div className="mt-7 space-y-1">
            <MobileLink href="/coverage" open={open}>
              All coverage
            </MobileLink>
            <MobileLink href="/about" open={open}>
              About
            </MobileLink>
            <MobileLink href="/contact" open={open}>
              Contact
            </MobileLink>
          </div>

          <Link
            href="/quote"
            tabIndex={open ? 0 : -1}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-600/25"
          >
            Get a Quote
            <ArrowIcon className="size-4" />
          </Link>
          <a
            href={site.phoneHref}
            tabIndex={open ? 0 : -1}
            className="mt-3 flex items-center justify-center gap-2 rounded-full border border-slate-200 px-6 py-3.5 font-semibold text-navy-900"
          >
            <PhoneIcon className="size-4 text-brand-600" />
            {site.phone}
          </a>
          <p className="mt-6 text-center text-sm font-semibold text-brand-700">
            Se Habla Español
          </p>
        </nav>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  open,
  children,
}: {
  href: string;
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      tabIndex={open ? 0 : -1}
      className="block rounded-xl px-3 py-3 text-lg font-medium text-navy-900 transition-colors hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}
