import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Member and staff pages have nothing for a crawler. /thank-you is only
      // meaningful after a submission; indexed, searchers could land on a
      // "conversion" page directly.
      disallow: ["/account", "/admin", "/auth/", "/thank-you"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
