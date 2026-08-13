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
    <section id={id} className={`py-20 sm:py-24 lg:py-28 ${className}`}>
      {children}
    </section>
  );
}

/** Blurred colour blob used to light up the dark background. */
export function Glow({
  className = "",
  color = "bg-brand-600/25",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`glow ${color} ${className}`}
    />
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-lg leading-relaxed text-slate-400">{intro}</p>
      ) : null}
    </div>
  );
}

/** Gradient-highlighted run of text, for use inside headings. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-brand-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400";

const buttonVariants = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/30",
  light:
    "bg-white text-navy-900 shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:bg-brand-100",
  ghost:
    "border border-white/15 bg-white/5 text-white backdrop-blur hover:border-white/30 hover:bg-white/10",
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

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h9.19L9.72 6.03a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-4">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 ring-1 ring-brand-400/30">
            <CheckIcon className="size-3.5 text-brand-300" />
          </span>
          <span className="leading-relaxed text-slate-300">{item}</span>
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
