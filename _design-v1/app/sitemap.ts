import type { MetadataRoute } from "next";

import { coverageLines, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/coverage", priority: 0.9 },
    { path: "/quote", priority: 0.9 },
    { path: "/contact", priority: 0.7 },
    { path: "/about", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
    ...coverageLines.map((line) => ({
      url: `${site.url}/coverage/${line.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
