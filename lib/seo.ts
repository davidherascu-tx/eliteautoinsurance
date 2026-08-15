import type { Metadata } from "next";

import { site } from "@/lib/site";

/**
 * Default social card, used by every page without a more relevant picture.
 *
 * It lives in public/ rather than as an app/opengraph-image.png file
 * convention: that convention injects itself into the *layout's* openGraph, and
 * any page defining its own `openGraph` (which they all do, for og:url) would
 * replace it and end up with no image at all.
 */
export const socialImage = {
  url: "/og-card.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — independent Houston insurance agency covering auto, property, commercial, trucking, boat, umbrella and life.`,
};

/**
 * Builds a page's metadata.
 *
 * Next merges metadata *shallowly*: a page that defines `openGraph` replaces
 * the layout's `openGraph` entirely, and a page that omits it inherits the home
 * page's og:title and og:url verbatim. Either way the social card ends up wrong
 * unless every page restates the shared fields, so they live here instead of
 * being copy-pasted into each route.
 *
 * `path` is the route's own path ("/about"), used for both the canonical link
 * and og:url. Pass `images` only when a page has a more relevant picture than
 * the site-wide card in app/opengraph-image.png.
 */
export function pageMetadata({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path: string;
  images?: { url: string; alt: string }[];
}): Metadata {
  // og:title does not go through the layout's title template, so spell it out.
  const socialTitle = `${title} | ${site.name}`;
  const cards = images ?? [socialImage];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: `${site.url}${path}`,
      title: socialTitle,
      description,
      images: cards,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: cards.map((image) => image.url),
    },
  };
}
