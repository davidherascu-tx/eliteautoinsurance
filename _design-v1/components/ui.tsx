import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  className = "",
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${
          tone === "dark" ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            tone === "dark" ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";

const buttonVariants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50",
  outline:
    "border border-white/40 text-white hover:border-white hover:bg-white/10",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link
      {...props}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    />
  );
}

export function CheckList({
  items,
  tone = "light",
}: {
  items: readonly string[];
  tone?: "light" | "dark";
}) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <CheckIcon
            className={`mt-1 size-5 shrink-0 ${
              tone === "dark" ? "text-brand-300" : "text-brand-600"
            }`}
          />
          <span className={tone === "dark" ? "text-slate-300" : "text-slate-700"}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.25 7.33a1 1 0 0 1-1.427-.006l-3.75-3.83a1 1 0 1 1 1.43-1.4l3.037 3.103 6.54-6.61a1 1 0 0 1 1.414-.001Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293a.75.75 0 0 1-.912.247 12.06 12.06 0 0 1-5.432-5.432.75.75 0 0 1 .247-.912l1.293-.97c.363-.271.527-.734.417-1.173L8.862 3.102A1.125 1.125 0 0 0 7.77 2.25H6.398a2.25 2.25 0 0 0-2.25 2.25v.75" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-9.6 5.76a1.5 1.5 0 0 1-1.55 0L1.5 8.67Z" />
      <path d="M22.5 6.91V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.16l10.37 6.22a.75.75 0 0 0 .77 0L22.5 6.91Z" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.35a.75.75 0 0 0 .92 0c3.63-2.8 7.29-7.02 7.29-11.6a7.75 7.75 0 1 0-15.5 0c0 4.58 3.66 8.8 7.29 11.6ZM12 13.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .28.16.54.41.67l4 2a.75.75 0 1 0 .68-1.34l-3.59-1.8V6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
