import "./globals.css";
import { headers } from "next/headers";
import { locales, isRtlLocale, type Locale } from "./i18n";
import { organizationSchema, generateWebsiteSchema } from "@/lib/seo/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolve the active locale from the header injected by next-intl middleware
  // (X-NEXT-INTL-LOCALE), so the single root <html> element carries the correct
  // lang + dir for all four languages. Falls back to "en" when absent.
  const headersList = headers();
  const localeHeader = headersList.get("x-next-intl-locale") as Locale | null;
  const locale: Locale =
    localeHeader && locales.includes(localeHeader) ? localeHeader : "en";

  const isRtl = isRtlLocale(locale);
  const jsonLd = [organizationSchema, generateWebsiteSchema()];

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background">{children}</body>
    </html>
  );
}
