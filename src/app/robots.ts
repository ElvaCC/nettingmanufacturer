import { SITE_URL, SITE_INDEXABLE } from "@/lib/site-config";

export default function robots() {
  // Not publicly launched yet: block every crawler and stop advertising the sitemap.
  // The domain still works normally for you and your customers.
  if (!SITE_INDEXABLE) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/"],
        },
      ],
    };
  }

  // Live: allow crawling of public pages, keep the internal areas out of the index.
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
