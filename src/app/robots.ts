import { SITE_URL } from "@/lib/site-config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
