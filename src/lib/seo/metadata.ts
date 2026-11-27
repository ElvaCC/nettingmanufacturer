import { Metadata } from "next";
import { locales, type Locale } from "@/app/i18n";
import { SITE_URL, SITE_INDEXABLE } from "@/lib/site-config";

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
  // Controlled by the single global switch in site-config.ts (SITE_INDEXABLE).
  // false → noindex, nofollow so search engines stay away until the site is ready.
  robots: SITE_INDEXABLE
    ? { index: true, follow: true }
    : { index: false, follow: false },
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

// 页面级 title / description，按路由 path 查表。
// 英文站定稿阶段只填英文；es/ru/ar 暂回退英文，翻译阶段再补。
// 未命中此表的路由仍用站点默认 title；已在各自 page.tsx 里显式覆盖的
// （solutions / cases / 产品分类页 / 产品详情页）不受影响。
const pageMetadata: Record<string, { title: string; description: string }> = {
  "/products": {
    title: "HDPE Netting Products",
    description:
      "Construction safety netting, debris netting, shade nets, hail nets, olive nets, bird nets and privacy screens, warp knitted in our own factory for bulk export.",
  },
  "/applications": {
    title: "Netting Applications by Industry",
    description:
      "How HDPE netting is used in construction, agriculture, horticulture and industrial screening, and which knitting structure suits each application.",
  },
  "/factory": {
    title: "Our Factory and Production Capacity",
    description:
      "Inside our HDPE netting factory in Shandong, China: 70 warp knitting machines and export capacity of up to 10 containers per week.",
  },
  "/blog": {
    title: "Netting Specifications and Buying Notes",
    description:
      "Notes for importers and distributors on HDPE netting specifications, knitting structures, UV requirements and export packaging.",
  },
  "/contact": {
    title: "Contact Us for a Factory Quotation",
    description:
      "Send your netting specification, quantity and destination port to get a factory-direct quotation from Shandong Jiacheng Chemical Fiber.",
  },
};

export function getLocalizedMetadata(locale: Locale, path?: string): Metadata {
  const localized = localizedMetadata[locale] || localizedMetadata.en;
  const basePath = `/${locale}${path || ""}`;
  const page = path ? pageMetadata[path] : undefined;
  const title = page?.title ?? localized.title;
  const description = page?.description ?? localized.description;
  return {
    ...defaultMetadata,
    title: {
      ...defaultMetadata.title,
      default: title,
    },
    description,
    alternates: {
      canonical: `${SITE_URL}${basePath}`,
      languages: {
        ...Object.fromEntries(
          locales.map((loc) => [loc, `${SITE_URL}/${loc}${path || ""}`])
        ),
        // Default language for users whose language we cannot detect.
        "x-default": `${SITE_URL}/en${path || ""}`,
      },
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${SITE_URL}${basePath}`,
      locale: locale === "ar" ? "ar_SA" : locale === "es" ? "es_ES" : locale === "ru" ? "ru_RU" : "en_US",
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
  };
}
