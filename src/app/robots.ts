import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search engines and AI assistants (GPTBot, PerplexityBot and others) are all welcome:
    // being cited in AI answers is part of the local-search strategy.
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
