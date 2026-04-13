import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProductShowcase from "@/components/home/ProductShowcase";
import CTASection from "@/components/home/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Hero locale={locale} />
      <Features />
      <ProductShowcase locale={locale} />
      <CTASection locale={locale} />
    </NextIntlClientProvider>
  );
}
