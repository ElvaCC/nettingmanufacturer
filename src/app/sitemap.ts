import { MetadataRoute } from "next";
import { locales } from "@/app/i18n";

const baseUrl = "https://www.nettingmanufacturer.com";

const staticPages = [
  "",
  "/products",
  "/about",
  "/cases",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}${locale === "en" ? "" : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === "" ? 1 : 0.8,
    }))
  );

  return pages;
}
