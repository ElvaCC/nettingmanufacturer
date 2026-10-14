import type { Metadata } from 'next';
import { getLocalizedMetadata } from '@/lib/seo/metadata';
import type { Locale } from '@/app/i18n';
import { getCategoryBySlug } from '@/data/product-categories';
import CategoryLanding from '@/components/products/CategoryLanding';

export const revalidate = 60;

const CATEGORY_SLUG = 'agricultural-netting';
const CATEGORY_ID = 'agriculture';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const category = getCategoryBySlug(CATEGORY_SLUG);
  const base = getLocalizedMetadata(locale as Locale, `/products/${CATEGORY_SLUG}`);
  return {
    ...base,
    title: category?.label,
    description: category?.tagline,
    openGraph: {
      ...base.openGraph,
      title: `${category?.label} | Jiacheng Netting`,
      description: category?.tagline,
    },
  };
}

export default async function AgriculturalNettingPage({ params }: PageProps) {
  const { locale } = await params;
  return <CategoryLanding categoryId={CATEGORY_ID} locale={locale} />;
}
