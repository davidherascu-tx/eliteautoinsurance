import type { ComponentType } from "react";

type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M4 20v4.5a1 1 0 0 0 1 1h2.6a1 1 0 0 0 1-1V23h14.8v1.5a1 1 0 0 0 1 1H27a1 1 0 0 0 1-1V20" />
      <path d="M4 20v-4.2a3 3 0 0 1 .27-1.24l2.6-5.7A3 3 0 0 1 9.6 7h12.8a3 3 0 0 1 2.73 1.86l2.6 5.7A3 3 0 0 1 28 15.8V20a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3Z" />
      <path d="M5.2 15h21.6" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="22.5" cy="19" r="1.4" />
    </svg>
  );
}

export function HomeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M4 14.8 16 5l12 9.8" />
      <path d="M7 13v12a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 25 25V13" />
      <path d="M13 26.5v-7a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v7" />
      <path d="M23 9.5V6h3v6" />
    </svg>
  );
}

export function BuildingIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M5 27h22" />
      <path d="M7 27V8.5A1.5 1.5 0 0 1 8.5 7h9A1.5 1.5 0 0 1 19 8.5V27" />
      <path d="M19 27V14h5.5A1.5 1.5 0 0 1 26 15.5V27" />
      <path d="M10.5 11h5M10.5 15h5M10.5 19h5M22 18h1.5M22 22h1.5" />
      <path d="M12.5 27v-3.5h3V27" />
    </svg>
  );
}

export function BoatIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M4 23.5c1.6 0 1.6 1.5 3.2 1.5s1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5" />
      <path d="M6.5 19.5h19l-2.3 4H8.8l-2.3-4Z" />
      <path d="M16 17V4.5" />
      <path d="M16 6.5 23 16h-7" />
      <path d="M14 9.5 9 16h5" />
    </svg>
  );
}

export function UmbrellaIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M4 17a12 12 0 0 1 24 0c-1.7-1.6-3.1-1.6-4.8 0-1.7-1.6-3.1-1.6-4.8 0-1.7-1.6-3.1-1.6-4.8 0-1.7-1.6-3.1-1.6-4.8 0Z" />
      <path d="M16 17v7.5a3 3 0 0 0 6 0" />
      <path d="M16 5V3" />
    </svg>
  );
}

export function LifeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M16 27S5 20.6 5 13.4A5.9 5.9 0 0 1 16 10a5.9 5.9 0 0 1 11 3.4C27 20.6 16 27 16 27Z" />
      <path d="M6.5 16.5h5l2-3 2.5 5.5 2.2-4 1.6 1.5h4.7" />
    </svg>
  );
}

export function ShieldIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} {...strokeProps}>
      <path d="M16 3.5 6 7.4v8.2c0 6.3 4.2 11.4 10 13.1 5.8-1.7 10-6.8 10-13.1V7.4L16 3.5Z" />
      <path d="m11.5 15.8 3.2 3.3 6-6.2" />
    </svg>
  );
}

export const coverageIcons: Record<string, ComponentType<IconProps>> = {
  auto: CarIcon,
  property: HomeIcon,
  commercial: BuildingIcon,
  boat: BoatIcon,
  umbrella: UmbrellaIcon,
  life: LifeIcon,
};

export function CoverageIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const Icon = coverageIcons[slug] ?? ShieldIcon;
  return <Icon className={className} />;
}
