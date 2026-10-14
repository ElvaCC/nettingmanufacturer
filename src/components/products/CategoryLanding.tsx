'use client';

import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import InquiryModal from '@/components/forms/InquiryModal';
import { getCategoryById } from '@/data/product-categories';

interface Props {
  categoryId: string;
  locale: string;
}

export default function CategoryLanding({ categoryId, locale }: Props) {
  const { products, contact } = useContent();
  const category = getCategoryById(categoryId);

  if (!category) return null;

  const email = contact?.email || 'Netfactory01@factory-jc.com';
  // Preserve the order defined in productIds
  const catProducts = category.productIds
    .map((id) => products.find((p: any) => p.id === id))
    .filter(Boolean);

  const detailHref = (id: string) => `/${locale}/products/${id}`;

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888' }}>
          <a href={`/${locale}/`} style={{ color: '#0B4C8E', textDecoration: 'none' }}>Home</a>
          <span style={{ color: '#ccc' }}>/</span>
          <a href={`/${locale}/products`} style={{ color: '#0B4C8E', textDecoration: 'none' }}>Products</a>
          <span style={{ color: '#ccc' }}>/</span>
          <span style={{ color: '#333', fontWeight: 500 }}>{category.label}</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0B4C8E 0%, #0f2440 100%)', color: '#fff', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 30, marginBottom: 10 }}>{category.emoji}</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.15, color: '#fff', marginBottom: 14 }}>
            {category.label}
          </h1>
          <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 780, margin: '0 auto', lineHeight: 1.7 }}>
            {category.tagline}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '44px 24px 0' }}>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: '#4b5563', maxWidth: 900 }}>{category.intro}</p>
      </div>

      {/* Product cards */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {catProducts.map((product: any) => (
            <div
              key={product.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <a href={detailHref(product.id)} style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ position: 'relative', height: 220, background: '#f0f4f8', overflow: 'hidden' }}>
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={`${product.name} - ${category.label} | Jiacheng Netting Manufacturer`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'contain', display: 'block' }}
                    />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 14 }}>{product.name}</div>
                  )}
                </div>
              </a>
              <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0B4C8E', marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#666', marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                  {product.description || ''}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                  <a href={detailHref(product.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0', background: '#0B4C8E', color: '#fff', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                    View Details
                  </a>
                  <InquiryModal locale={locale} productName={product.name} trigger={
                    <span style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0', background: '#f0f4ff', color: '#0B4C8E', borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                      Get Quote
                    </span>
                  } />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selection guide */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 44px' }}>
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '32px 28px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0B4C8E', marginBottom: 18 }}>
            How to choose within this range
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {category.selectionPoints.map((point, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, lineHeight: 1.7, color: '#4b5563' }}>
                <span style={{ color: '#0E7A45', fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ background: 'linear-gradient(135deg, #0B4C8E 0%, #0f2440 100%)', borderRadius: 16, padding: '44px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
            Request a quote for {category.label}
          </h2>
          <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 15, lineHeight: 1.7, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            Tell us the product, mesh, size and quantity — we will reply with factory-direct pricing.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <InquiryModal locale={locale} productName={category.label} trigger={
              <span style={{ display: 'inline-block', padding: '14px 36px', background: '#0E7A45', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
                Request Quote or Free Sample
              </span>
            } />
            <a href={`mailto:${email}?subject=${encodeURIComponent(`Quote Request: ${category.label}`)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', background: 'transparent', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, border: '1.5px solid rgba(255,255,255,0.4)' }}>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
