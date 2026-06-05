'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';

interface ProductDetailClientProps {
  slug: string;
  locale: string;
}

const COLOR_SWATCHES = [
  { name: 'Green', hex: '#16a34a' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Black', hex: '#1f2937' },
  { name: 'White', hex: '#f9fafb' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Orange', hex: '#ea580c' },
];

export default function ProductDetailClient({ slug, locale }: ProductDetailClientProps) {
  const { products, contact } = useContent();
  const product = products.find((p) => p.id === slug);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

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

  // === Data helpers ===
  const allImages = product.images || [];
  const currentSrc = allImages[currentImgIndex] || '';
  const productionImages = (product as any).productionImages || [];
  const packagingImages = (product as any).packagingImages || [];

  const parseSpec = (spec: string): [string, string] => {
    if (spec.includes(':')) {
      const idx = spec.indexOf(':');
      return [spec.slice(0, idx).trim(), spec.slice(idx + 1).trim()];
    }
    return [spec, 'Yes'];
  };

  const altText = (context: string) =>
    `${product.name} - ${context} | Jiacheng Netting Manufacturer`;

  return (
    <>
      {/* SECTION 1: HERO VISUAL ZONE */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2440 100%)', color: '#fff', padding: '24px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            <span>Jiacheng Netting</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>BSCI &amp; NFPA-701 Certified</span>
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 800, marginBottom: 6, lineHeight: 1.15 }}>{product.name}</h1>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40, alignItems: 'start' }} className="product-hero-grid">

          {/* ─── LEFT: GALLERY ─── */}
          <div>
            {/* Main Image — fixed 4:3 aspect ratio */}
            {currentSrc ? (
              <div style={{
                position: 'relative', borderRadius: 16, overflow: 'hidden',
                background: '#f9fafb', border: '1px solid #e5e7eb',
                marginBottom: 16, aspectRatio: '4/3',
              }}>
                <Image
                  src={currentSrc}
                  alt={altText('Close-up Product Photo')}
                  fill
                  sizes="(max-width: 900px) 100vw, 66vw"
                  priority
                  style={{ objectFit: 'contain', display: 'block', background: '#f9fafb' }}
                />
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
                borderRadius: 16, aspectRatio: '4/3',
                background: '#f3f4f6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: '#aaa', fontSize: 15, marginBottom: 16,
              }}>
                No Image Available
              </div>
            )}

            {/* Thumbnails — larger at w-20 h-20 */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 36 }}>
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImgIndex(i)}
                    style={{
                      borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                      width: 80, height: 80, flexShrink: 0,
                      border: currentImgIndex === i ? '2px solid #2563eb' : '2px solid #e5e7eb',
                      transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                      transform: currentImgIndex === i ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: currentImgIndex === i ? '0 0 0 3px #bfdbfe' : 'none',
                      opacity: currentImgIndex === i ? 1 : 0.75,
                    }}
                  >
                    <Image
                      src={img}
                      alt={altText(`Thumbnail ${i + 1}`)}
                      width={80}
                      height={80}
                      style={{ objectFit: 'contain', display: 'block', background: '#f9fafb' }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ── Product Description ── */}
            <div className="detail-section-card" style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 14 }}>Product Description</h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: '#555', margin: 0, whiteSpace: 'pre-line' }}>
                {product.description}
              </p>
            </div>

            {/* ── Specifications Table ── */}
            {product.specs && product.specs.length > 0 && (
              <div className="detail-section-card" style={{ marginBottom: 28 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 18 }}>Detailed Specifications</h2>
                <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                    <thead>
                      <tr style={{ background: '#1e3a5f', color: '#fff' }}>
                        <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>Parameter</th>
                        <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.specs.map((spec: string, idx: number) => {
                        const [label, value] = parseSpec(spec);
                        return (
                          <tr key={idx} style={{
                            background: idx % 2 === 0 ? '#fff' : '#f8fafc',
                            borderBottom: idx < product.specs.length - 1 ? '1px solid #f0f2f5' : 'none',
                          }}>
                            <td style={{ padding: '14px 20px', color: '#6b7280', fontWeight: 500, width: '35%' }}>{label}</td>
                            <td style={{ padding: '14px 20px', color: '#1e3a5f', fontWeight: 600 }}>{value || 'Yes'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT: CLEAN CONVERSION SIDEBAR ─── */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
                Professional HDPE netting direct from China BSCI certified factory. Custom sizes &amp; colors available.
              </p>

              {/* Spec Highlight Tags */}
              {(product.specs || []).slice(0, 6).length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {(product.specs || []).slice(0, 6).map((spec: string, idx: number) => {
                    const val = spec.includes(':') ? spec.split(':').slice(1).join(':').trim() : spec;
                    const shortVal = val.length > 28 ? val.slice(0, 28) + '...' : val;
                    return (
                      <div key={idx} style={{
                        fontSize: 13, fontWeight: 600, padding: '10px 14px', borderRadius: 8,
                        background: idx % 2 === 0 ? '#eef2ff' : '#f0fdf4',
                        color: idx % 2 === 0 ? '#3730a3' : '#166534',
                        border: `1px solid ${idx % 2 === 0 ? '#c7d2fe' : '#bbf7d0'}`,
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>&#10003;</span>
                        {shortVal}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Color Swatches */}
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 10 }}>Available Colors:</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {COLOR_SWATCHES.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(i)}
                      title={c.name}
                      style={{
                        width: 32, height: 32, borderRadius: '50%', border: 'none',
                        background: c.hex,
                        cursor: 'pointer', flexShrink: 0,
                        outline: selectedColor === i ? `3px solid #2563eb` : 'none',
                        outlineOffset: 2,
                        boxShadow: selectedColor === i ? `0 0 0 1px #fff, 0 0 0 4px #2563eb` : '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'outline 0.15s, box-shadow 0.15s, transform 0.15s',
                        transform: selectedColor === i ? 'scale(1.12)' : 'scale(1)',
                      }}
                      onMouseEnter={e => { if (selectedColor !== i) (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
                      onMouseLeave={e => { if (selectedColor !== i) (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>{COLOR_SWATCHES[selectedColor].name} — In Stock</p>
              </div>
            </div>

            {/* CTA Card — Clean: only 3 buttons */}
            <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, color: '#fff' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Get Factory Price</h3>
              <p style={{ fontSize: 13, opacity: 0.75, marginBottom: 20, lineHeight: 1.6 }}>
                Custom sizes, colors, certifications &amp; OEM/ODM available. Reply within 2 hours.
              </p>
              <a href={`mailto:${email}?subject=Quote Request: ${encodeURIComponent(product.name)}`} style={{
                display: 'block', width: '100%', padding: '14px 0',
                background: '#2563eb', color: '#fff', textDecoration: 'none',
                borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center',
                boxSizing: 'border-box', marginBottom: 10, transition: 'background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1d4ed8'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2563eb'; }}>
                &#9993; Email Quote Request
              </a>
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Could you send me a quote?`)}`}
                target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', width: '100%', padding: '14px 0',
                  background: '#25d366', color: '#fff', textDecoration: 'none',
                  borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center',
                  boxSizing: 'border-box', marginBottom: 10, transition: 'background 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1fb855'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#25d366'; }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff" /></svg> WhatsApp Us</span>
              </a>
              <a href="/files/product-catalog.pdf" download style={{
                display: 'block', width: '100%', padding: '12px 0',
                background: 'rgba(255,255,255,0.15)', color: '#fff',
                textDecoration: 'none', borderRadius: 8, fontWeight: 600,
                fontSize: 14, textAlign: 'center', boxSizing: 'border-box',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}>
                &#128196; Download Catalog
              </a>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SECTION 2: MANUFACTURING CAPACITY ZONE
            ════════════════════════════════════════════ */}
        {productionImages.length > 0 && (
          <div className="detail-section-gap">
            <div style={{ background: '#f8fafc', borderRadius: 16, padding: '48px 40px' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f', marginBottom: 8, textAlign: 'center' }}>
                Advanced Manufacturing Capacity
              </h2>
              <p style={{ fontSize: 15, color: '#6b7280', textAlign: 'center', marginBottom: 36, maxWidth: 600, margin: '0 auto 36px' }}>
                State-of-the-art warp knitting production lines and rigorous quality control at every stage
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="manufacturing-grid">
                {productionImages.map((img: string, idx: number) => (
                  <div key={idx} style={{
                    position: 'relative', borderRadius: 12, overflow: 'hidden',
                    aspectRatio: '4/3', background: '#fff', border: '1px solid #e5e7eb',
                    transition: 'transform 0.35s, box-shadow 0.35s', cursor: 'zoom-in',
                  }}
                    className="manufacturing-card"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <Image src={img} alt={altText(`Production Process ${idx + 1} - Manufacturing Workshop`)} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px" style={{ objectFit: 'contain', display: 'block', background: '#fff' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            SECTION 3: PACKAGING AND SHIPPING ZONE
            ════════════════════════════════════════════ */}
        {packagingImages.length > 0 && (
          <div className="detail-section-gap">
            <div style={{ padding: '48px 0' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f', marginBottom: 8, textAlign: 'center' }}>
                Strict Packaging &amp; Container Loading
              </h2>
              <p style={{ fontSize: 15, color: '#6b7280', textAlign: 'center', marginBottom: 36, maxWidth: 600, margin: '0 auto 36px' }}>
                Professional packaging and timely container shipment ensure your order arrives in perfect condition
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="packaging-grid">
                {packagingImages.map((img: string, idx: number) => (
                  <div key={idx} style={{
                    position: 'relative', borderRadius: 14, overflow: 'hidden',
                    aspectRatio: '16/9', background: '#fff', border: '1px solid #e5e7eb',
                    transition: 'transform 0.35s, box-shadow 0.35s', cursor: 'zoom-in',
                  }}
                    className="packaging-card"
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.015)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                    <Image src={img} alt={altText(`Packaging & Shipping ${idx + 1} - Container Loading`)} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'contain', display: 'block', background: '#fff' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Application Scenarios ── */}
        {product.applications && product.applications.length > 0 && (
          <div className="detail-section-gap">
            <div className="detail-section-card">
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Application Scenarios</h2>
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
          </div>
        )}

        {/* ── Application Gallery ── */}
        {(product as any)?.appImages && (product as any).appImages.length > 0 && (
          <div className="detail-section-gap">
            <div className="detail-section-card">
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Application Gallery</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
                {(product as any).appImages.map((img: string, idx: number) => (
                  <div key={idx} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', position: 'relative', aspectRatio: '4/3' }}>
                    <Image src={img} alt={altText(`Application Scene ${idx + 1}`)} fill sizes="(max-width: 600px) 100vw, 200px" style={{ objectFit: 'contain', display: 'block', background: '#f8fafc' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Related Products ── */}
        <div className="detail-section-gap">
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1e3a5f', marginBottom: 24 }}>You May Also Like</h2>
          <div className="related-products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {products
              .filter((p: any) => p.id !== slug)
              .slice(0, 4)
              .map((p: any) => (
                <a key={p.id} href={getPath(`/products/${p.id}`)} style={{
                  background: '#fff', borderRadius: 12, overflow: 'hidden',
                  border: '1px solid #e5e7eb', textDecoration: 'none', display: 'block',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  {p.images && p.images[0] ? (
                    <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f8fafc' }}>
                      <Image src={p.images[0]} alt={`${p.name} - Related Product | Jiacheng Netting Manufacturer`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" style={{ objectFit: 'contain', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: '4/3', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 13 }}>No image</div>
                  )}
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>{p.name}</p>
                    <p style={{ fontSize: 12, color: '#888', margin: '4px 0 0', lineHeight: 1.4 }}>{p.description?.slice(0, 60)}...</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* ===== RESPONSIVE CSS ===== */}
      <style dangerouslySetInnerHTML={{ __html: `
        .detail-section-card {
          background: #fff; border-radius: 16px; padding: 28px 32px;
          border: 1px solid #e5e7eb;
        }
        .detail-section-gap { margin-top: 48px; }
        @media (max-width: 768px) {
          .manufacturing-grid { grid-template-columns: 1fr !important; }
          .packaging-grid { grid-template-columns: 1fr !important; }
          .detail-section-gap { margin-top: 32px; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .manufacturing-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .product-hero-grid { grid-template-columns: 1fr !important; }
          .product-hero-grid > div:last-child { position: static !important; order: -1; }
          .related-products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .related-products-grid { grid-template-columns: 1fr !important; }
        }
        html { scroll-behavior: smooth; }
      `}} />
    </>
  );
}
