import type { MetadataRoute } from "next";

import { coverageLines, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stamped when the site is built, which is when its content can have changed.
  const lastModified = new Date();

  const staticRoutes = [
    // Trailing slash so this matches the home page's canonical exactly.
    { path: "/", priority: 1 },
    { path: "/coverage", priority: 0.9 },
    { path: "/quote", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/about", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...coverageLines.map((line) => ({
      url: `${site.url}/coverage/${line.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
