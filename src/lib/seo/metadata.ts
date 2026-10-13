import { Metadata } from "next";
import { locales, type Locale } from "@/app/i18n";
import { SITE_URL } from "@/lib/site-config";

const defaultMetadata = {
  title: {
    default: "Jiacheng Netting | Professional HDPE Netting Manufacturer",
    template: "%s | Jiacheng Netting",
  },
  description: "Factory-direct manufacturer of HDPE warp knitted plastic nets. Construction safety nets, debris nets, scaffolding nets, shade nets, hail nets, olive nets, bird nets and privacy screens for bulk export.",
  keywords: [
    "HDPE netting manufacturer",
    "construction safety net",
    "scaffolding debris net",
    "shade net",
    "hail net",
    "olive net",
    "bird net",
    "privacy screen",
    "weed barrier fabric",
    "China netting factory",
    "warp knitting plastic net",
  ],
  authors: [{ name: "Shandong Jiacheng Chemical Fiber Products Co., Ltd." }],
  creator: "Shandong Jiacheng Chemical Fiber Products Co., Ltd.",
  publisher: "Shandong Jiacheng Chemical Fiber Products Co., Ltd.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Jiacheng Netting",
    title: "Jiacheng Netting | Professional HDPE Netting Manufacturer",
    description: "Factory-direct manufacturer of HDPE netting for construction, agriculture and shade applications.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jiacheng Netting - HDPE Netting Manufacturer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiacheng Netting | Professional HDPE Netting Manufacturer",
    description: "Factory-direct manufacturer of HDPE netting for construction, agriculture and shade applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localizedMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Professional HDPE Netting Manufacturer",
    description: "Jiacheng Netting manufactures HDPE construction safety nets, debris nets, shade nets, hail nets, olive nets, bird nets, privacy screens and more. Factory-direct pricing for bulk export.",
  },
  es: {
    title: "Fabricante Profesional de Mallas HDPE",
    description: "Jiacheng Netting fabrica mallas HDPE de seguridad para construcción, redes de escombros, redes de sombra, redes contra granizo, redes de aceitunas, redes antipájaros y más. Precios directos de fábrica.",
  },
  ru: {
    title: "Профессиональный Производитель HDPE Сеток",
    description: "Jiacheng Netting производит HDPE строительные защитные сетки, сетки от мусора, теневые сетки, сети от града, сети для маслин, сетки от птиц и другое. Прямые заводские цены.",
  },
  ar: {
    title: "مصنّع شبكات HDPE المحترف",
    description: "شركة Jiacheng Netting تصنع شبكات HDPE للبناء وشبكات الحطام وشبكات الظل وشبكات الحماية من البرد وشبكات الزيتون وشبكات الطيور والمزيد. أسعار المصنع المباشرة للتصدير بالجملة.",
  },
};

export function getLocalizedMetadata(locale: Locale, path?: string): Metadata {
  const localized = localizedMetadata[locale] || localizedMetadata.en;
  const basePath = `/${locale}${path || ""}`;
  return {
    ...defaultMetadata,
    title: {
      ...defaultMetadata.title,
      default: localized.title,
    },
    description: localized.description,
    alternates: {
      canonical: `${SITE_URL}${basePath}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `${SITE_URL}/${loc}${path || ""}`])
      ),
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: localized.title,
      description: localized.description,
      url: `${SITE_URL}${basePath}`,
      locale: locale === "ar" ? "ar_SA" : locale === "es" ? "es_ES" : locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}
