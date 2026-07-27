import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/rss/showcase"],
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.sentinelnews.com.au/sitemap.xml",
    host: "https://www.sentinelnews.com.au",
  };
}
