import type { MetadataRoute } from "next";
import { landingPages } from "@/lib/landing-pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Service pages carry the commercial intent, so they rank just under home;
    // area pages a notch below.
    ...landingPages.map((page) => ({
      url: `${site.url}/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: page.kind === "service" ? 0.8 : 0.7,
    })),
    {
      url: `${site.url}/services`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${site.url}/signup`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];
}
