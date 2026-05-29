export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: "https://www.nettingmanufacturer.com/sitemap.xml",
  };
}
