// 首页 - 仅框架，无内容填充
import type { Metadata } from "next";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import type { Locale } from "@/app/i18n";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Products from "@/components/home/Products";
import Applications from "@/components/home/Applications";
import Factory from "@/components/home/Factory";
import Blog from "@/components/home/Blog";
import Contact from "@/components/home/Contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Home page inherits the full localized metadata (title/description/OG)
  // with a keyword-rich description targeting HDPE netting buyer intent.
  const base = getLocalizedMetadata(locale as Locale);
  return {
    ...base,
    description:
      "Shandong Jiacheng is a factory-direct HDPE warp knitted netting manufacturer. Construction safety nets, debris nets, scaffolding nets, shade nets, anti-hail nets, olive nets, anti-bird nets & privacy screens for bulk export.",
  };
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Products />
      <Applications />
      <Factory />
      <Blog />
      <Contact />
    </main>
  );
}
