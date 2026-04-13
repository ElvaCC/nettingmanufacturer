import { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import { organizationSchema, generateWebsiteSchema } from "@/lib/seo/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getLocalizedMetadata(locale as any);
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...organizationSchema,
            ...generateWebsiteSchema(),
          }),
        }}
      />
      <ProductGrid locale={locale} />
    </>
  );
}
