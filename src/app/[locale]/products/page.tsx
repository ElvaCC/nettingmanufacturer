'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';

// Product category definitions for anchor navigation
const CATEGORIES = [
  { id: 'construction', label: 'Construction Safety', emoji: '🏗️', productIds: ['debris-net', 'square-net', 'mesh-tarp'] },
  { id: 'shade', label: 'Shade & Sun Protection', emoji: '☀️', productIds: ['tape-shade-net', 'shade-sail'] },
  { id: 'agriculture', label: 'Agriculture & Harvest', emoji: '🌾', productIds: ['anti-hail-net', 'olive-net', 'weed-barrier'] },
  { id: 'protection', label: 'Protection & Barrier', emoji: '🛡️', productIds: ['privacy-screen', 'anti-bee-net', 'anti-bird-net'] },
];

export default function ProductsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { products, contact } = useContent();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const email = contact?.email || 'Netfactory01@factory-jc.com';

  // Group products by category
  const getProductsByCategory = (categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    if (!cat) return [];
    return products.filter(p => cat.productIds.includes(p.id));
  };

  // Extract top 3 spec keywords for badge display
  const getSpecBadges = (specs: string[]) => {
    if (!specs || specs.length === 0) return [];
    return specs.slice(0, 3).map(spec => {
      const value = spec.includes(':') ? spec.split(':')[1].trim() : spec;
      return value;
    });
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Hero Header */}
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12 }}>Our Products</h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
            Made of 100% Virgin HDPE — Fire-Retardant · UV-Treated · Customizable Colors &amp; Specs · OEM/ODM Welcome
          </p>
          {/* Download Catalog Button */}
          <a
            href="/files/product-catalog.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 24,
              padding: '12px 28px',
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.4)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <span style={{ fontSize: 18 }}>📄</span>
            Download Product Catalog (PDF)
          </a>
        </div>
      </div>

      {/* Category Anchor Navigation */}
      <div style={{
        position: 'sticky',
        top: 64,
        zIndex: 20,
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 0 }}>
          {/* "All" button */}
          <button
            onClick={() => { setActiveCategory(null); document.getElementById('products-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            style={{
              padding: '14px 20px',
              border: 'none',
              borderBottom: activeCategory === null ? '3px solid #2563eb' : '3px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: activeCategory === null ? 700 : 500,
              color: activeCategory === null ? '#2563eb' : '#666',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            All Products
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              style={{
                padding: '14px 20px',
                border: 'none',
                borderBottom: activeCategory === cat.id ? '3px solid #2563eb' : '3px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: activeCategory === cat.id ? 700 : 500,
                color: activeCategory === cat.id ? '#2563eb' : '#666',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ marginRight: 4 }}>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products List by Category */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <div id="products-top" />

        {CATEGORIES.map(cat => {
          const catProducts = getProductsByCategory(cat.id);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat.id} id={`cat-${cat.id}`} style={{ marginBottom: 64, scrollMarginTop: 130 }}>
              {/* Category Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e3a5f', margin: 0 }}>{cat.label}</h2>
                <div style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
                <span style={{ fontSize: 13, color: '#aaa' }}>{catProducts.length} product{catProducts.length > 1 ? 's' : ''}</span>
              </div>

              {/* Product Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} email={email} locale={locale} getSpecBadges={getSpecBadges} />
                ))}
              </div>
            </div>
          );
        })}

        {/* CTA */}
        <div style={{ marginTop: 16, padding: 48, background: '#1e3a5f', borderRadius: 16, textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Can&apos;t find what you need?</h2>
          <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 15 }}>We offer OEM/ODM customization. Tell us your requirements and we&apos;ll make it.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${email}`} style={{ display: 'inline-block', padding: '14px 36px', background: '#fff', color: '#1e3a5f', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16 }}>
              Contact Us for Custom Order
            </a>
            <a href="/files/product-catalog.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 36px', background: 'transparent', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, border: '1.5px solid rgba(255,255,255,0.4)' }}>
              📄 Download Catalog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Individual Product Card ─────────────────────────────────────────
function ProductCard({ product, email, getSpecBadges, locale }: {
  product: any;
  email: string;
  getSpecBadges: (specs: string[]) => string[];
  locale: string;
}) {
  const badges = getSpecBadges(product.specs || []);
  const detailHref = `/${locale}/products/${product.id}`;

  return (
    <div
      style={{
        textDecoration: 'none',
        display: 'block',
        background: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.25s, transform 0.25s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Product Image — links to detail page */}
      <a href={detailHref} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', height: 220, background: '#f0f4f8', overflow: 'hidden' }}>
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={`${product.name} - HDPE Netting Manufacturer | Jiacheng Factory Direct`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'contain', display: 'block', transition: 'transform 0.4s' }}
            />
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 14 }}>{product.name}</div>
          )}
          {/* Spec badges overlay */}
          {badges.length > 0 && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {badges.map((badge, idx) => (
                <span key={idx} style={{ fontSize: 11, background: 'rgba(255,255,255,0.9)', color: '#1e3a5f', padding: '2px 8px', borderRadius: 4, fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>

      {/* Product Info */}
      <div style={{ padding: 20 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e3a5f', marginBottom: 8, lineHeight: 1.3 }}>{product.name}</h3>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: '#666', marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
          {product.description || ''}
        </p>

        {/* Key specs as bullet list */}
        {(product.specs && product.specs.length > 0) && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, color: '#555', lineHeight: 1.9, marginBottom: 16 }}>
            {product.specs.slice(0, 3).map((spec: string, idx: number) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                <span style={{ color: '#2563eb', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                <span>{spec}</span>
              </li>
            ))}
            {product.specs.length > 3 && (
              <li style={{ color: '#aaa', fontSize: 11, fontStyle: 'italic', paddingLeft: 16 }}>+{product.specs.length - 3} more specs</li>
            )}
          </ul>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
          <a
            href={detailHref}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '8px 0', background: '#2563eb', color: '#fff',
              borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none'
            }}
          >
            View Details
          </a>
          <a
            href={`mailto:${email}?subject=Quote Request: ${product.name}`}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '8px 0', background: '#f0f4ff', color: '#2563eb',
              borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none'
            }}
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}
