import "../globals.css";
import { locales, isRtlLocale, type Locale } from "@/app/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupplyStatement from "@/components/layout/SupplyStatement";
import FloatingContact from "@/components/layout/FloatingContact";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import { organizationSchema, generateWebsiteSchema } from "@/lib/seo/schema";
import { Metadata } from "next";
import { ContentProvider } from "@/context/ContentContext";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedMetadata(locale as Locale);
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering. `locale` comes from the route segment (a build-time
  // param), not from request headers — this is what keeps pages cacheable at the
  // CDN edge instead of being re-rendered per request.
  unstable_setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = isRtlLocale(locale as Locale);
  const jsonLd = [organizationSchema, generateWebsiteSchema()];

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <NextIntlClientProvider messages={messages}>
          <ContentProvider>
            <Header locale={locale} />
            <main className="flex-1 pt-16">{children}</main>
            <SupplyStatement variant="band" />
            <Footer />
            <FloatingContact />
          </ContentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
