import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductShowcase from "@/components/home/ProductShowcase";
import CTASection from "@/components/home/CTASection";
import NewsSection from "@/components/home/NewsSection";
import Footer from "@/components/layout/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Hero locale={locale} />
      <Features locale={locale} />
      <ProductShowcase locale={locale} />
      <NewsSection locale={locale} />
      <CTASection locale={locale} />
    </NextIntlClientProvider>
  );
}
