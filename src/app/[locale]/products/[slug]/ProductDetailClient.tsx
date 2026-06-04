'use client';

import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';

interface ProductDetailClientProps {
  slug: string;
  locale: string;
}

export default function ProductDetailClient({ slug, locale }: ProductDetailClientProps) {
  const { products, contact } = useContent();
  const product = products.find((p) => p.id === slug);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Unified image list
  const allImages: string[] = [
    ...(product?.images || []),
    ...((product as any)?.appImages?.slice(0, 3) || []),
  ];
  const currentSrc = allImages[currentImgIndex] || '';

  // Sticky inquiry bar appears after scrolling past hero
  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  const business = (contact as any)?.business || (window as any).__business || null;

  // Quick spec badges extracted from specs array
  const quickSpecs = (product.specs || []).slice(0, 4).map((s: string) => {
    const val = s.includes(':') ? s.split(':')[1].trim() : s;
    return val.length > 22 ? val.slice(0, 22) + '...' : val;
  });

  return (
    <>
      {/* ===== HERO ===== */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2440 100%)', color: '#fff', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            <span>Jiacheng Netting</span>
            <span>BSCI & NFPA-701 Certified</span>
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 }}>{product.name}</h1>
          <p style={{ fontSize: 15, opacity: 0.7, lineHeight: 1.6, maxWidth: 680 }}>
            {product.description?.slice(0, 120)}...
          </p>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, alignItems: 'start' }}>

          {/* ─── LEFT COLUMN ─── */}
          <div>
            {/* Image Gallery */}
            {currentSrc ? (
              <div
                style={{
                  borderRadius: 16, overflow: 'hidden', background: '#fff',
                  border: '1px solid #e5e7eb', marginBottom: 16, cursor: 'zoom-in',
                  position: 'relative',
                }}
              >
                <img
                  src={currentSrc}
                  alt={product.name}
                  style={{
                    width: '100%', height: 440, objectFit: 'cover', display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 11, backdropFilter: 'blur(4px)' }}>
                  {currentImgIndex + 1} / {allImages.length}
                </div>
              </div>
            ) : (
              <div style={{ borderRadius: 16, height: 440, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', marginBottom: 16, fontSize: 15 }}>
                No Image Available
              </div>
            )}

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setCurrentImgIndex(i)}
                    style={{
                      borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
                      border: currentImgIndex === i ? '3px solid #2563eb' : '2px solid #e5e7eb',
                      transition: 'border-color 0.15s, transform 0.15s',
                      transform: currentImgIndex === i ? 'scale(1.06)' : 'scale(1)',
                    }}
                  >
                    <img src={img} alt={`${product.name} ${i + 1}`} style={{ width: 88, height: 66, objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            )}

            {/* ── Description ── */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Product Description</h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: '#555', margin: 0 }}>{product.description}</p>
            </div>

            {/* ── Applications ── */}
            {product.applications && product.applications.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Application Scenarios</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {product.applications.map((app: string, idx: number) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#555', padding: '10px 14px', background: '#f8fafc', borderRadius: 10, border: '1px solid #f0f2f5' }}>
                      <span style={{ color: '#10b981', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>&#10003;</span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Detailed Spec Table ── */}
            {product.specs && product.specs.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Detailed Specifications</h2>
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                  {product.specs.map((spec: string, idx: number) => {
                    const [label, value] = spec.includes(':') ? spec.split(':').map((s: string) => s.trim()) : [spec, 'Yes'];
                    const isLast = idx === product.specs.length - 1;
                    return (
                      <div key={idx} style={{
                        display: 'flex', justifyContent: 'space-between',
                        padding: '14px 20px',
                        background: idx % 2 === 0 ? '#fff' : '#fafbfc',
                        borderBottom: isLast ? 'none' : '1px solid #f0f2f5',
                        fontSize: 14,
                      }}>
                        <span style={{ color: '#888', fontWeight: 500 }}>{label}</span>
                        <span style={{ color: '#1e3a5f', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value || 'Yes'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Packaging & Logistics ── */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e5e7eb', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Packaging & Logistics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '📦', label: 'MOQ', value: '1,000 sqm (negotiable)' },
                  { icon: '🏋️', label: 'Packing', value: 'Rolls in woven bags / pallet packing' },
                  { icon: '⏱️', label: 'Lead Time', value: '15-20 working days' },
                  { icon: '🚢', label: 'FOB Port', value: 'Qingdao, China' },
                  { icon: '💳', label: 'Payment', value: 'T/T, L/C, Western Union' },
                  { icon: '🎨', label: 'Customization', value: 'Size, color, GSM, mesh, logo, label' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 14, background: '#f8fafc', borderRadius: 10 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, color: '#888', fontWeight: 500, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: '#333', fontWeight: 600 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Why Choose Us ── */}
            <div style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2440 100%)', borderRadius: 16, padding: 32, color: '#fff', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Why Choose Jiacheng Netting</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { icon: '🏭', title: '20,000m² Factory', desc: 'Direct from manufacturer, no middleman markup' },
                  { icon: '⚙️', title: 'Advanced Equipment', desc: '65+ warp knitting machines, Karl Mayer technology' },
                  { icon: '✅', title: 'BSCI & NFPA-701', desc: 'Internationally audited, fire-retardant certified' },
                  { icon: '🌍', title: '50+ Countries', desc: 'Trusted by importers and contractors worldwide' },
                  { icon: '🎨', title: 'Full Customization', desc: 'Any size, color, GSM, mesh density, logo printing' },
                  { icon: '📦', title: 'Free Samples', desc: 'Free product samples available, freight collect' },
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN (Sticky Sidebar) ─── */}
          <div style={{ position: 'sticky', top: 80 }}>
            {/* Quick Spec Tags */}
            {quickSpecs.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {quickSpecs.map((spec: string, idx: number) => (
                  <span key={idx} style={{
                    fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 6,
                    background: idx % 2 === 0 ? '#eef2ff' : '#f0fdf4',
                    color: idx % 2 === 0 ? '#3730a3' : '#166534',
                    border: `1px solid ${idx % 2 === 0 ? '#c7d2fe' : '#bbf7d0'}`,
                  }}>
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Card */}
            <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, color: '#fff', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Get a Free Quote</h3>
              <p style={{ fontSize: 13, opacity: 0.75, marginBottom: 20, lineHeight: 1.6 }}>
                Custom sizes, colors, certifications & OEM/ODM available. Reply within 2 hours.
              </p>
              <a
                href={`mailto:${email}?subject=Quote Request: ${encodeURIComponent(product.name)}`}
                style={{ display: 'block', width: '100%', padding: '14px 0', background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center', boxSizing: 'border-box', marginBottom: 10 }}
              >
                &#9993; Email Quote Request
              </a>
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Could you send me a quote?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', padding: '14px 0', background: '#25d366', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center', boxSizing: 'border-box', marginBottom: 10 }}
              >
                &#128172; WhatsApp Us
              </a>
              <a
                href="/files/product-catalog.pdf"
                download
                style={{ display: 'block', width: '100%', padding: '12px 0', background: 'rgba(255,255,255,0.15)', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, textAlign: 'center', boxSizing: 'border-box' }}
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
                  <span>&#127981;</span> BSCI &amp; NFPA-701 Certified
                </div>
              </div>
            </div>

            {/* Compact Specs Overview */}
            {product.specs && product.specs.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Quick Specs</h2>
                {product.specs.slice(0, 6).map((spec: string, idx: number) => {
                  const [label, value] = spec.includes(':') ? spec.split(':').map((s: string) => s.trim()) : [spec, ''];
                  return (
                    <div key={idx} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '8px 0',
                      borderBottom: idx < Math.min(product.specs.length, 6) - 1 ? '1px solid #f3f4f6' : 'none',
                      fontSize: 13,
                    }}>
                      <span style={{ color: '#888', fontWeight: 500 }}>{label}</span>
                      <span style={{ color: '#333', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value || 'Yes'}</span>
                    </div>
                  );
                })}
                {product.specs.length > 6 && (
                  <p style={{ fontSize: 12, color: '#aaa', marginTop: 8, fontStyle: 'italic' }}>+{product.specs.length - 6} more specs below</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===== RELATED PRODUCTS ===== */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f', marginBottom: 24 }}>You May Also Like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
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
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 13 }}>No image</div>
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

      {/* ===== STICKY BOTTOM INQUIRY BAR ===== */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
        background: '#fff', borderTop: '1px solid #e5e7eb',
        padding: '12px 24px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <span style={{ fontSize: 14, color: '#555', fontWeight: 500 }}>
          Interested in <strong style={{ color: '#1e3a5f' }}>{product.name}</strong>?
        </span>
        <a
          href={`mailto:${email}?subject=Quote Request: ${encodeURIComponent(product.name)}`}
          style={{ display: 'inline-block', padding: '10px 24px', background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14 }}
        >
          Get Free Quote
        </a>
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', padding: '10px 24px', background: '#25d366', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14 }}
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
