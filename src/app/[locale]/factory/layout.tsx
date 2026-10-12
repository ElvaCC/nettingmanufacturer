import { Metadata } from "next";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/app/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = getLocalizedMetadata(locale as Locale, "/factory");
  return { alternates: base.alternates };
}

export default function FactoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
