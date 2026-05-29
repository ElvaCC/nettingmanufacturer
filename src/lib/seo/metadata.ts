import { Metadata } from "next";
import { locales, type Locale } from "@/app/i18n";

const defaultMetadata = {
  title: {
    default: "Jiacheng Netting | Professional HDPE Netting Manufacturer Since 2005",
    template: "%s | Jiacheng Netting",
  },
  description: "Professional manufacturer of HDPE warp knitting plastic nets since 2005. Construction safety nets, shade nets, hail nets, olive nets, bird nets, privacy screens. BSCI & NFPA-701 certified. Factory direct, export to 50+ countries.",
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
  metadataBase: new URL("https://www.nettingmanufacturer.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nettingmanufacturer.com",
    siteName: "Jiacheng Netting",
    title: "Jiacheng Netting | Professional HDPE Netting Manufacturer Since 2005",
    description: "Professional manufacturer of HDPE netting since 2005. BSCI & NFPA-701 certified. Export to 50+ countries.",
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
    title: "Jiacheng Netting | Professional HDPE Netting Manufacturer Since 2005",
    description: "Professional manufacturer of HDPE netting since 2005. BSCI & NFPA-701 certified. Export to 50+ countries.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localizedMetadata: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Professional HDPE Netting Manufacturer Since 2005",
    description: "Jiacheng Netting manufactures HDPE construction safety nets, shade nets, hail nets, olive nets, bird nets, privacy screens, and more. BSCI & NFPA-701 certified, export to 50+ countries. Factory direct pricing.",
  },
  es: {
    title: "Fabricante Profesional de Mallas HDPE Desde 2005",
    description: "Jiacheng Netting fabrica mallas HDPE de seguridad para construcción, redes de sombra, redes contra granizo, redes de aceitunas, redes antipájaros y más. Certificado BSCI y NFPA-701, exportación a más de 50 países.",
  },
  ru: {
    title: "Профессиональный Производитель HDPE Сеток с 2005 Года",
    description: "Jiacheng Netting производит HDPE строительные защитные сетки, теневые сетки, сети от града, сети для маслин, сетки от птиц и другое. Сертификаты BSCI и NFPA-701, экспорт в более чем 50 стран.",
  },
  ar: {
    title: "مصنّع شبكات HDPE المحترف منذ 2005",
    description: "شركة Jiacheng Netting تصنع شبكات HDPE للبناء وشبكات الظل وشبكات الحماية من البرد وشبكات الزيتون وشبكات الطيور والمزيد. حاصلة على شهادات BSCI و NFPA-701، تصدير إلى أكثر من 50 دولة.",
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
      canonical: `https://www.nettingmanufacturer.com${basePath}`,
      languages: Object.fromEntries(
        locales.map((loc) => [loc, `https://www.nettingmanufacturer.com/${loc}${path || ""}`])
      ),
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: localized.title,
      description: localized.description,
      url: `https://www.nettingmanufacturer.com${basePath}`,
      locale: locale === "ar" ? "ar_SA" : locale === "es" ? "es_ES" : locale === "ru" ? "ru_RU" : "en_US",
    },
  };
}
