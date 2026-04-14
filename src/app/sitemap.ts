import { MetadataRoute } from "next";
import { locales } from "@/app/i18n";

const baseUrl = "https://www.nettingmanufacturer.com";

// Define routes for each locale
const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" as const },
  { path: "products", priority: 0.9, changefreq: "weekly" as const },
  { path: "about", priority: 0.7, changefreq: "monthly" as const },
  { path: "cases", priority: 0.7, changefreq: "monthly" as const },
  { path: "contact", priority: 0.8, changefreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add root domain
  sitemapEntries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Add locale-specific routes
  locales.forEach((locale) => {
    routes.forEach((route) => {
      if (locale === "en" && route.path === "") {
        // Skip duplicate root URL for English
        return;
      }
      const url = route.path
        ? `${baseUrl}/${locale}/${route.path}`
        : `${baseUrl}/${locale}`;
      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changefreq,
        priority: route.priority,
      });
    });
  });

  return sitemapEntries;
}
