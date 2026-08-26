import type { MetadataRoute } from "next";
import { landingPageSlugs } from "@/lib/landing-pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Landing pages carry the commercial intent, so they rank just under home.
    ...landingPageSlugs.map((slug) => ({
      url: `${site.url}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/signup`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];
}
