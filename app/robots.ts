import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Not pages: the quote action's diagnostics endpoint has nothing to index.
      disallow: "/api/",
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
