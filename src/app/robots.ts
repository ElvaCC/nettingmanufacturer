export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    // Uncomment the line below when ready to go live
    // sitemap: "https://www.nettingmanufacturer.com/sitemap.xml",
  };
}
