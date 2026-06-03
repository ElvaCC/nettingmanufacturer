import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';
import contentData from '@/data/content.json';

// ISR: revalidate every 60 seconds so Vercel CDN picks up GitHub content changes
export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all products × locales
export async function generateStaticParams() {
  const locales = ['en', 'es', 'ru', 'ar'];
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const product of contentData.products) {
      params.push({ locale, slug: product.id });
    }
  }
  return params;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = contentData.products.find((p) => p.id === slug);
  if (!product) return {};

  const title = `${product.name} | Jiacheng Netting Manufacturer`;
  const description = product.description?.slice(0, 160) || `Professional ${product.name} from Jiacheng Netting - BSCI & NFPA-701 certified HDPE netting factory.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = contentData.products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888' }}>
          <a href={`/${locale}/`} style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span>›</span>
          <a href={`/${locale}/products`} style={{ color: '#2563eb', textDecoration: 'none' }}>Products</a>
          <span>›</span>
          <span style={{ color: '#333' }}>{product.name}</span>
        </div>
      </div>

      {/* Pass slug and locale to client component for dynamic rendering */}
      <ProductDetailClient slug={slug} locale={locale} />
    </div>
  );
}
