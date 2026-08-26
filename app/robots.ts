import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Member-only pages have nothing for a crawler and should not be indexed.
      disallow: ["/account", "/auth/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
