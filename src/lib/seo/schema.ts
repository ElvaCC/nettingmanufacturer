// SEO Schema configurations for structured data

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Netting Manufacturer",
  "url": "https://www.nettingmanufacturer.com",
  "logo": "https://www.nettingmanufacturer.com/logo.png",
  "description": "Leading manufacturer of industrial HDPE netting solutions for construction, agriculture, and commercial applications.",
  "foundingDate": "2008",
  "founders": [
    {
      "@type": "Person",
      "name": "Company Founder"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CN",
    "addressRegion": "Hebei",
    "addressLocality": "Shijiazhuang"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-XXX-XXXX-XXXX",
    "contactType": "sales",
    "availableLanguage": ["English", "Spanish", "Russian", "Arabic", "Chinese"]
  },
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
    "name": product.brand || "Netting Manufacturer"
  },
  "sku": product.sku,
  "mpn": product.sku,
  "offers": {
    "@type": "Offer",
    "priceCurrency": product.currency || "USD",
    "price": product.price,
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Netting Manufacturer"
    }
  }
});

export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Netting Manufacturer",
  "url": "https://www.nettingmanufacturer.com",
  "description": "Industrial HDPE netting solutions for global construction and agriculture markets.",
  "publisher": {
    "@type": "Organization",
    "name": "Netting Manufacturer",
    "url": "https://www.nettingmanufacturer.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.nettingmanufacturer.com/products?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
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
