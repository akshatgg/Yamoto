import type { MetadataRoute } from "next";
import { seo, site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f3f2f2",
    theme_color: "#201e1d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
