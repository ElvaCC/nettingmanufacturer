import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';
import contentData from '@/data/content.json';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = contentData.products.find((p) => p.id === slug);
  if (!product) return {};

  const title = `${product.name} | Jiacheng Netting Manufacturer`;
  const description = product.description?.slice(0, 160) || `Professional ${product.name} from Jiacheng Netting - BSCI & NFPA-701 certified HDPE netting factory.`;
  const images = product.images?.map((img: string) => `https://www.nettingmanufacturer.com${img}`) || [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: images.length > 0 ? [images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = contentData.products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  // JSON-LD Product Schema for Google rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images?.map((img: string) => `https://www.nettingmanufacturer.com${img}`) || [],
    brand: {
      '@type': 'Brand',
      name: 'Jiacheng Netting',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Shandong Jiacheng Chemical Fiber Products Co., Ltd.',
      url: 'https://www.nettingmanufacturer.com',
    },
    ...(product.specs && {
      additionalProperty: product.specs.map((spec: string) => {
        const [name, value] = spec.includes(':') ? spec.split(':').map((s: string) => s.trim()) : [spec, ''];
        return { '@type': 'PropertyValue', name, value };
      }),
    }),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Jiacheng Netting',
      },
    },
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888' }}>
          <a href={`/${locale}/`} style={{ color: '#2563eb', textDecoration: 'none' }}>Home</a>
          <span style={{ color: '#ccc' }}>/</span>
          <a href={`/${locale}/products`} style={{ color: '#2563eb', textDecoration: 'none' }}>Products</a>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: '#333', fontWeight: 500 }}>{product.name}</span>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductDetailClient slug={slug} locale={locale} />
    </div>
  );
}
