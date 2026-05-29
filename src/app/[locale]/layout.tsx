import { locales, isRtlLocale, type Locale } from "@/app/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import { organizationSchema, generateWebsiteSchema } from "@/lib/seo/schema";
import { Metadata } from "next";

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

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const isRtl = isRtlLocale(locale as any);
  const messages = await getMessages();

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
          <Header locale={locale} />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
