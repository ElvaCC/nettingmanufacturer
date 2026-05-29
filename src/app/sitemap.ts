import { MetadataRoute } from "next";
import { locales } from "@/app/i18n";
import contentData from "@/data/content.json";

const baseUrl = "https://www.nettingmanufacturer.com";

const routes = [
  { path: "", priority: 1.0, changefreq: "weekly" as const },
  { path: "products", priority: 0.9, changefreq: "weekly" as const },
  { path: "about", priority: 0.7, changefreq: "monthly" as const },
  { path: "factory", priority: 0.7, changefreq: "monthly" as const },
  { path: "contact", priority: 0.8, changefreq: "monthly" as const },
];

const productSlugs = contentData.products.map((p) => p.id);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Root domain
  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Static routes per locale
  locales.forEach((locale) => {
    routes.forEach((route) => {
      if (locale === "en" && route.path === "") return; // skip duplicate
      const url = route.path
        ? `${baseUrl}/${locale}/${route.path}`
        : `${baseUrl}/${locale}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changefreq,
        priority: route.priority,
      });
    });

    // Product detail pages
    productSlugs.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  });

  return entries;
}
