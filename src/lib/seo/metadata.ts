import { Metadata } from "next";
import { locales, type Locale } from '@/app/i18n';

const defaultMetadata = {
  title: {
    default: "Netting Manufacturer | HDPE Netting Solutions",
    template: "%s | Netting Manufacturer",
  },
  description: "Leading manufacturer of industrial HDPE netting solutions for construction, agriculture, and commercial applications worldwide.",
  keywords: ["HDPE netting", "construction mesh", "dust cover nets", "shade nets", "manufacturer"],
  authors: [{ name: "Netting Manufacturer" }],
  creator: "Netting Manufacturer",
  publisher: "Netting Manufacturer",
  metadataBase: "https://www.nettingmanufacturer.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nettingmanufacturer.com",
    siteName: "Netting Manufacturer",
    title: "Netting Manufacturer | HDPE Netting Solutions",
    description: "Industrial HDPE netting solutions for global markets.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Netting Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Netting Manufacturer | HDPE Netting Solutions",
    description: "Industrial HDPE netting solutions for global markets.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

const localizedMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "HDPE Netting Solutions for Global Construction",
    description: "Premium industrial HDPE netting products including construction mesh, dust covers, shade nets. Factory direct with worldwide shipping.",
  },
  es: {
    title: "Soluciones de Mallas HDPE para Construcción Global",
    description: "Mallas industriales HDPE premium incluyendo mallas de construcción, cubiertas anti-polvo, redes de sombra.",
  },
  ru: {
    title: "Решения HDPE сеток для мирового строительства",
    description: "Промышленные HDPE сетки премиум-класса: строительные сетки, пылезащита, теневые сетки.",
  },
  ar: {
    title: "حلول شبكات HDPE للبناء العالمي",
    description: "شبكات HDPE الصناعية الفاخرة تشمل شبكات البناء وأغطية الغبار والشبكات الظلية.",
  },
};

export function getLocalizedMetadata(locale: Locale): Metadata {
  const localized = localizedMetadata[locale] || localizedMetadata.en;
  return {
    ...defaultMetadata,
    title: {
      ...defaultMetadata.title,
      default: localized.title,
    },
    description: localized.description,
    alternates: {
      canonical: `https://www.nettingmanufacturer.com/${locale}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `https://www.nettingmanufacturer.com/${loc}`])
      ),
    },
  };
}

export function generateHreflang(): string {
  return locales
    .map((locale) => {
      const url = locale === "en" 
        ? "https://www.nettingmanufacturer.com" 
        : `https://www.nettingmanufacturer.com/${locale}`;
      return `<${url}>; rel="alternate"; hreflang="${locale}"`;
    })
    .join("\n");
}
