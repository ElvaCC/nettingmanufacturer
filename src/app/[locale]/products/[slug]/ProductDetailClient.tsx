'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';

interface ProductDetailClientProps {
  slug: string;
  locale: string;
}

export default function ProductDetailClient({ slug, locale }: ProductDetailClientProps) {
  const { products, contact } = useContent();
  const product = products.find((p) => p.id === slug);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Unified image list: product images first, then application images
  const allImages: string[] = [
    ...(product?.images || []),
    ...((product as any)?.appImages?.slice(0, 3) || []),
  ];
  const currentSrc = allImages[currentImgIndex] || '';

  if (!product) {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', textAlign: 'center', color: '#888' }}>
        Product not found
      </div>
    );
  }

  const getPath = (href: string) => `/${locale}${href}`;
  const email = contact?.email || 'Netfactory01@factory-jc.com';
  const whatsapp = contact?.whatsapp || '8615628764579';

  // Quick spec badges extracted from specs array
  const quickSpecs = (product.specs || []).slice(0, 6).map((s: string) => {
    const val = s.includes(':') ? s.split(':').slice(1).join(':').trim() : s;
    return val.length > 28 ? val.slice(0, 28) + '...' : val;
  });

  // Extract label/value for spec table
  const parseSpec = (spec: string): [string, string] => {
    if (spec.includes(':')) {
      const idx = spec.indexOf(':');
      return [spec.slice(0, idx).trim(), spec.slice(idx + 1).trim()];
    }
    return [spec, 'Yes'];
  };

  // SEO Alt text helper
  const altText = (context: string) =>
    `${product.name} - ${context} - Jiacheng Netting HDPE Manufacturer Factory Photo`;

  // Scroll to contact form
  const scrollToContact = () => {
    if (typeof window !== 'undefined') {
      document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Responsive style helpers
  const isMobile = false; // We use CSS media queries instead

  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2440 100%)', color: '#fff', padding: '32px 24px 28px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            <span>Jiacheng Netting</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>BSCI &amp; NFPA-701 Certified</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{product.name}</h1>
          <p style={{ fontSize: 15, opacity: 0.7, lineHeight: 1.6, maxWidth: 700 }}>
            {product.description?.slice(0, 150)}
            {(product.description?.length || 0) > 150 ? '...' : ''}
          </p>
        </div>
      </div>

      {/* ===== MAIN CONTENT: LEFT-IMAGE RIGHT-TEXT ===== */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 36, alignItems: 'start' }} className="product-hero-grid">

          {/* ─── LEFT COLUMN: Image Gallery ─── */}
          <div>
            {/* Main Product Image */}
            {currentSrc ? (
              <div style={{
                position: 'relative', borderRadius: 16, overflow: 'hidden',
                background: '#f9fafb', border: '1px solid #e5e7eb',
                marginBottom: 16, height: 'clamp(280px, 40vw, 480px)',
              }}>
                <Image
                  src={currentSrc}
                  alt={altText(currentImgIndex < (product?.images || []).length ? 'Product Photo' : 'Application Scenario')}
                  fill
                  sizes="(max-width: 900px) 100vw, 700px"
                  priority={currentImgIndex === 0}
                  style={{ objectFit: 'contain', display: 'block', background: '#f9fafb' }}
                />
                {/* Image counter badge */}
                <div style={{
                  position: 'absolute', top: 12, right: 12,
                  background: 'rgba(0,0,0,0.6)', color: '#fff',
                  padding: '4px 10px', borderRadius: 6, fontSize: 11,
                  backdropFilter: 'blur(4px)',
                }}>
                  {currentImgIndex + 1} / {allImages.length}
                </div>
              </div>
            ) : (
              <div style={{
                borderRadius: 16, height: 'clamp(280px, 40vw, 480px)',
                background: '#f3f4f6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#aaa', marginBottom: 16, fontSize: 15,
              }}>
                No Image Available
              </div>
            )}

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImgIndex(i)}
                    style={{
                      borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
                      border: currentImgIndex === i
                        ? '2px solid #2563eb'
                        : '2px solid #e5e7eb',
                      transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                      transform: currentImgIndex === i ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: currentImgIndex === i ? '0 0 0 2px #bfdbfe' : 'none',
                      opacity: currentImgIndex === i ? 1 : 0.7,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1} - Jiacheng HDPE Netting Factory`}
                      width={90}
                      height={68}
                      style={{ objectFit: 'contain', display: 'block', background: '#f9fafb' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ── Product Description ── */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>
                Product Description
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: '#555', margin: 0, whiteSpace: 'pre-line' }}>
                {product.description}
              </p>
            </div>

            {/* ── Specifications Table (HTML Table with Zebra Stripes) ── */}
            {product.specs && product.specs.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>
                  Detailed Specifications
                </h2>
                <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: '#1e3a5f', color: '#fff' }}>
                        <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Parameter
                        </th>
                        <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Details
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specs.map((spec: string, idx: number) => {
                        const [label, value] = parseSpec(spec);
                        return (
                          <tr
                            key={idx}
                            style={{
                              background: idx % 2 === 0 ? '#fff' : '#f8fafc',
                              borderBottom: idx < product.specs.length - 1 ? '1px solid #f0f2f5' : 'none',
                            }}
                          >
                            <td style={{ padding: '14px 20px', color: '#6b7280', fontWeight: 500, width: '35%' }}>
                              {label}
                            </td>
                            <td style={{ padding: '14px 20px', color: '#1e3a5f', fontWeight: 600 }}>
                              {value || 'Yes'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Application Scenarios ── */}
            {product.applications && product.applications.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>
                  Application Scenarios
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {product.applications.map((app: string, idx: number) => (
                    <div key={idx} style={{
                      display: 'flex', alignItems: 'center', gap: 10, fontSize: 14,
                      color: '#555', padding: '12px 16px', background: '#f8fafc',
                      borderRadius: 10, border: '1px solid #f0f2f5',
                    }}>
                      <span style={{ color: '#10b981', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>&#10003;</span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Application Images Gallery ── */}
            {(product as any)?.appImages && (product as any).appImages.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>
                  Application Gallery
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                  {(product as any).appImages.map((img: string, idx: number) => (
                    <div key={idx} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative', height: 160 }}>
                      <Image
                        src={img}
                        alt={altText(`Application Scene ${idx + 1}`)}
                        fill
                        sizes="(max-width: 600px) 100vw, 200px"
                        style={{ objectFit: 'contain', display: 'block', background: '#f8fafc' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Packaging & Logistics ── */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>
                Packaging &amp; Logistics
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '🏋️', label: 'Packing', value: 'Rolls or Sheet in PE bag' },
                  { icon: '⏱️', label: 'Lead Time', value: '15-20 working days' },
                  { icon: '🚢', label: 'FOB Port', value: 'Qingdao, China' },
                  { icon: '💳', label: 'Payment', value: 'T/T, L/C, Western Union' },
                  { icon: '🎨', label: 'Customization', value: 'Size, color, GSM, mesh, logo, label' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: 14, background: '#f8fafc', borderRadius: 10,
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, color: '#888', fontWeight: 500, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: '#333', fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ─── RIGHT COLUMN: Sticky Sidebar ─── */}
          <div style={{ position: 'sticky', top: 80 }}>
            {/* Product Title */}
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1e3a5f', marginBottom: 8, lineHeight: 1.3 }}>
                {product.name}
              </h2>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>
                Professional HDPE netting direct from China BSCI certified factory. Custom sizes &amp; colors available.
              </p>

              {/* Quick Spec Tags Grid */}
              {quickSpecs.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                  {quickSpecs.map((spec: string, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: 12, fontWeight: 600, padding: '8px 12px', borderRadius: 8,
                        background: idx % 2 === 0 ? '#eef2ff' : '#f0fdf4',
                        color: idx % 2 === 0 ? '#3730a3' : '#166534',
                        border: `1px solid ${idx % 2 === 0 ? '#c7d2fe' : '#bbf7d0'}`,
                        display: 'flex', alignItems: 'center', gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>&#10003;</span>
                      {spec}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Contact Card */}
            <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, color: '#fff', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Get a Free Quote</h3>
              <p style={{ fontSize: 13, opacity: 0.75, marginBottom: 20, lineHeight: 1.6 }}>
                Custom sizes, colors, certifications &amp; OEM/ODM available. Reply within 2 hours.
              </p>
              <a
                href={`mailto:${email}?subject=Quote Request: ${encodeURIComponent(product.name)}`}
                style={{
                  display: 'block', width: '100%', padding: '14px 0',
                  background: '#2563eb', color: '#fff', textDecoration: 'none',
                  borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center',
                  boxSizing: 'border-box', marginBottom: 10,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1d4ed8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2563eb'; }}
              >
                &#9993; Email Quote Request
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Could you send me a quote?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', width: '100%', padding: '14px 0',
                  background: '#25d366', color: '#fff', textDecoration: 'none',
                  borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center',
                  boxSizing: 'border-box', marginBottom: 10,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1fb855'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#25d366'; }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg> WhatsApp Us</span>
              </a>
              <a
                href="/files/product-catalog.pdf"
                download
                style={{
                  display: 'block', width: '100%', padding: '12px 0',
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  textDecoration: 'none', borderRadius: 8, fontWeight: 600,
                  fontSize: 14, textAlign: 'center', boxSizing: 'border-box',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
              >
                &#128196; Download Catalog
              </a>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 13, opacity: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>&#9993;</span> {email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>&#128222;</span> WhatsApp: {whatsapp}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>&#127981;</span> BSCI Certified
                </div>
              </div>
            </div>

            {/* Compact Specs Overview */}
            {product.specs && product.specs.length > 0 && (
              <div style={{
                background: '#fff', borderRadius: 16, padding: 24,
                border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Quick Specs</h2>
                <div style={{ border: '1px solid #f0f2f5', borderRadius: 10, overflow: 'hidden' }}>
                  {product.specs.slice(0, 6).map((spec: string, idx: number) => {
                    const [label, value] = parseSpec(spec);
                    return (
                      <div key={idx} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: idx % 2 === 0 ? '#fff' : '#fafbfc',
                        borderBottom: idx < Math.min(product.specs.length, 6) - 1 ? '1px solid #f0f2f5' : 'none',
                        fontSize: 13,
                      }}>
                        <span style={{ color: '#888', fontWeight: 500 }}>{label}</span>
                        <span style={{ color: '#333', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value || 'Yes'}</span>
                      </div>
                    );
                  })}
                </div>
                {product.specs.length > 6 && (
                  <p style={{ fontSize: 12, color: '#aaa', marginTop: 8, fontStyle: 'italic' }}>
                    +{product.specs.length - 6} more specs below
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== RELATED PRODUCTS ===== */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f', marginBottom: 24 }}>You May Also Like</h2>
          <div className="related-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {products
              .filter((p) => p.id !== slug)
              .slice(0, 4)
              .map((p) => (
                <a
                  key={p.id}
                  href={getPath(`/products/${p.id}`)}
                  style={{
                    background: '#fff', borderRadius: 12, overflow: 'hidden',
                    border: '1px solid #e5e7eb', textDecoration: 'none', display: 'block',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {p.images && p.images[0] ? (
                    <div style={{ position: 'relative', height: 160, background: '#f8fafc' }}>
                      <Image
                        src={p.images[0]}
                        alt={`${p.name} - Jiacheng Netting HDPE Manufacturer`}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
                        style={{ objectFit: 'contain', display: 'block' }}
                      />
                    </div>
                  ) : (
                    <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 13 }}>
                      No image
                    </div>
                  )}
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0', lineHeight: 1.4 }}>
                      {p.description?.slice(0, 60)}...
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* ===== RESPONSIVE CSS (injected via style tag) ===== */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
          }
          .product-hero-grid > div:last-child {
            position: static !important;
            order: -1;
          }
          .related-products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .related-products-grid {
            grid-template-columns: 1fr !important;
          }
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
