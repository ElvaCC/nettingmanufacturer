// SEO Schema configurations for structured data

import { SITE_URL } from "@/lib/site-config";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shandong Jiacheng Chemical Fiber Products Co., Ltd.",
  "alternateName": "Jiacheng Netting",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "description": "Professional manufacturer of HDPE warp knitting plastic nets. Construction safety nets, shade nets, hail nets, olive nets, bird nets, privacy screens, and more.",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 100,
    "maxValue": 249
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zhanjia Industrial Park, Zhenglu Town, Shanghe County",
    "addressLocality": "Jinan",
    "addressRegion": "Shandong",
    "postalCode": "251600",
    "addressCountry": "CN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "Netfactory01@factory-jc.com",
    "contactType": "sales",
    "availableLanguage": ["English", "Spanish", "Russian", "Arabic", "Chinese"]
  },
  "areaServed": "Worldwide",
  "knowsLanguage": ["English", "Spanish", "Russian", "Arabic", "Chinese"],
  "sameAs": []
};

export const generateProductSchema = (product: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  sku?: string;
  price?: string;
  currency?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": product.brand || "Jiacheng Netting"
  },
  "sku": product.sku,
  "mpn": product.sku,
  "manufacturer": {
    "@type": "Organization",
    "name": "Shandong Jiacheng Chemical Fiber Products Co., Ltd."
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": product.currency || "USD",
    "price": product.price,
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Jiacheng Netting"
    }
  }
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Jiacheng Netting - HDPE Netting Manufacturer",
  "url": SITE_URL,
  "description": "Professional manufacturer of HDPE warp knitting plastic nets. Construction safety nets, shade nets, hail nets, olive nets, bird nets, and more.",
  "publisher": {
    "@type": "Organization",
    "name": "Shandong Jiacheng Chemical Fiber Products Co., Ltd.",
    "url": SITE_URL
  },
  "inLanguage": ["en", "es", "ru", "ar"]
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
