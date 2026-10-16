'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import InquiryModal from '@/components/forms/InquiryModal';
import { SITE_URL } from '@/lib/site-config';
import { getCategoryByProductId, getRelatedProductIds } from '@/data/product-categories';
import { getLocalizedProduct } from '@/lib/product-i18n';

interface ProductDetailClientProps {
  slug: string;
  locale: string;
}

const DEFAULT_FAQ = [
  // ── Technical FAQs ──
  { q: 'What is HDPE debris netting?', a: 'HDPE debris netting is a lightweight, high-strength knitted mesh made from 100% virgin HDPE. It is used on construction sites to contain falling debris, dust, and tools while allowing airflow and light penetration.' },
  { q: 'How long does UV protection last?', a: 'Our HDPE nets are UV-stabilized for extended outdoor service. Actual lifespan depends on climate, exposure, and mesh density — please contact us with your application and we will recommend the right UV treatment.' },
  { q: 'What GSM is suitable for scaffolding?', a: 'For scaffolding enclosure and debris containment, we typically recommend 80-120 GSM density. Heavier GSM is ideal for high-wind areas and demolition sites requiring maximum durability.' },
  { q: 'What mesh size blocks debris?', a: 'Common mesh sizes range from 1/16" (fine) to 1/4" (standard). For most construction scaffolding, 1/8" opening provides optimal debris containment while allowing airflow.' },
  { q: 'What is the difference between knitted and woven netting?', a: 'Knitted netting is more flexible, lightweight, and resistant to unraveling when cut. Woven netting is heavier and more rigid. Our HDPE debris nets are knitted for superior flexibility and job-site durability.' },
  { q: 'Is HDPE netting recyclable?', a: 'Yes, 100% virgin HDPE netting is fully recyclable. We recommend checking local recycling guidelines for disposal.' },
  { q: 'What temperature range can HDPE netting withstand?', a: 'HDPE netting remains flexible across a wide temperature range and does not become brittle in cold weather, making it suitable for winter construction projects in cold climates.' },
  { q: 'Does the netting meet fire safety standards?', a: 'Fire-retardant options are available. Please contact us with your project\u2019s fire code requirements and we will confirm the applicable standard and certification for your market.' },
  // ── Business FAQs ──
  { q: 'What is the MOQ?', a: 'MOQ depends on the product, specification, and color. Contact us with your requirements and we will confirm the minimum order quantity for your specific needs, including flexible trial-order options.' },
  { q: 'Can you provide OEM labels & packaging?', a: 'Yes, we offer OEM/ODM services including custom logo printing, private label packaging, barcode stickers, and branded polybag wrapping. Please contact us to discuss your labeling and packaging requirements.' },
  { q: 'Can you provide samples?', a: 'Sample availability and terms vary by product. Contact us with the product you are interested in and we will confirm sample options, sizes, and shipping arrangements.' },
  { q: 'How long does shipping take?', a: 'Production lead time and shipping duration depend on the product, quantity, and destination. Contact us for a confirmed lead time and delivery schedule for your order.' },
  { q: 'What payment methods do you accept?', a: 'We support common international trade payment methods. Contact us to agree on the payment terms that work best for both parties.' },
  { q: 'Do you offer after-sales support?', a: 'Yes, our sales team provides ongoing support after shipment, including tracking updates, loading photos, and documentation for customs clearance.' },
  { q: 'What if the product does not meet specifications?', a: 'We inspect each batch before shipment and stand behind our product quality. Please contact us to discuss our quality assurance and after-sales terms in detail.' },
];

export default function ProductDetailClient({ slug, locale }: ProductDetailClientProps) {
  const { products, contact } = useContent();
  const product = products.find((p: any) => p.id === slug);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

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
  // NOTE: founding year pending verification. Once confirmed, restore a
  // "+N Years Experience" badge by computing (current year - founding year).

  const allImages = product.images || [];
  const currentSrc = allImages[currentImgIndex] || '';
  const detailImages = (product as any).detailImages || [];
  const deliveryRecords = (product as any).deliveryRecords || [];
  const packagingOpts = (product as any).packagingOptions || [];
  const projectCases = (product as any).projectCases || [];
  const faqItems = (product as any).faq || [];

  // Localized display fields — fall back to English when no translation exists.
  const localizedProduct = getLocalizedProduct(product, locale);
  const displayName = localizedProduct.name || product.name;
  const displayDescription = localizedProduct.description || product.description || '';

  // Related products: use-case relevance first, then the same series.
  // Never padded with unrelated products just to fill the grid.
  const relatedProducts = getRelatedProductIds(
    slug,
    products.map((p: any) => p.id),
    4
  )
    .map((id) => products.find((p: any) => p.id === id))
    .filter(Boolean) as any[];

  // "How To Choose…" selection guide is DATA-DRIVEN. With no verified
  // per-product data the whole module is skipped — generic scaffolding advice
  // is never shown for unrelated products.
  const selectionGuide: any = (product as any).selectionGuide;
  const selectionRows: any[] = Array.isArray(selectionGuide?.rows) ? selectionGuide.rows : [];
  const guideRows = selectionRows.slice(0, 8);
  const selectionCols: string[] =
    Array.isArray(selectionGuide?.columns) && selectionGuide.columns.length === 3
      ? selectionGuide.columns
      : ['Weight / Density', 'Recommended Applications', 'Key Features'];

  // (The former "Product Quick Facts" derivation lived here. It was removed
  //  together with its duplicate table — the sticky Key Spec Tags in the right
  //  column now present the same field-name + value summary.)

  const parseSpec = (spec: string): [string, string, string] => {
    // Format: "Parameter: Value" or "Parameter: Value | Options"
    const parts = spec.split('|').map(s => s.trim());
    const first = parts[0] || '';
    const options = parts[1] || '';
    const idx = first.indexOf(':');
    if (idx > 0) {
      return [first.slice(0, idx).trim(), first.slice(idx + 1).trim(), options || '-'];
    }
    return [first, 'Yes', options || '-'];
  };

  const altText = (ctx: string) => {
    const material = product.specs?.find((s: string) => s.toLowerCase().includes('material'))?.split(':')?.[1]?.trim() || 'HDPE';
    const usage = product.applications?.[0] || 'industrial netting';
    return `${product.name} - ${ctx} - ${material} ${usage}`;
  };

  return (
    <>
      {/* ===== HERO BANNER ===== */}
      <section style={{ background: 'linear-gradient(135deg, #0B4C8E 0%, #0f2440 100%)', color: '#fff', padding: '20px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            <span>Jiacheng Netting</span><span style={{ opacity: 0.4 }}>|</span><span>HDPE Netting Manufacturer</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 800, marginBottom: 6, lineHeight: 1.15, color: '#fff' }}>{displayName}</h1>
        </div>
      </section>

      {/* ===== MAIN GRID: LEFT (Gallery + Detail Images) + RIGHT (Specs + CTA) ===== */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 36, alignItems: 'start' }} className="product-hero-grid">

          {/* ─── LEFT COLUMN ─── */}
          <div>
            {/* MODULE 1: Product Gallery */}
            {currentSrc && (
              <>
                <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#f9fafb', border: '1px solid #e5e7eb', marginBottom: 14, aspectRatio: '4/3' }}>
                  <Image src={currentSrc} alt={altText('main product photo')} fill sizes="(max-width: 900px) 100vw, 66vw" priority style={{ objectFit: 'contain', display: 'block', background: '#f9fafb' }} />
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '3px 9px', borderRadius: 5, fontSize: 11 }}>
                    {currentImgIndex + 1} / {allImages.length}
                  </div>
                </div>
                {allImages.length > 1 && (
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
                    {allImages.map((img: string, i: number) => (
                      <div key={i} onClick={() => setCurrentImgIndex(i)} style={{
                        borderRadius: 10, overflow: 'hidden', cursor: 'pointer', width: 76, height: 76, flexShrink: 0,
                        border: currentImgIndex === i ? '2px solid #0B4C8E' : '2px solid #e5e7eb',
                        transition: 'border-color 0.2s, transform 0.2s',
                        transform: currentImgIndex === i ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: currentImgIndex === i ? '0 0 0 3px #bfdbfe' : 'none',
                        opacity: currentImgIndex === i ? 1 : 0.7,
                      }}>
                        <Image src={img} alt={altText(`thumbnail ${i + 1}`)} width={76} height={76} style={{ objectFit: 'contain', display: 'block', background: '#f9fafb' }} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* MODULE 2: Product Detail Images (micro mesh / edge close-ups) */}
            {detailImages.length > 0 && (
              <div className="section-gap">
                <div style={{ background: '#fff', borderRadius: 14, padding: '24px 28px', border: '1px solid #e5e7eb' }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 16 }}>Product Detail Close-ups</h2>
                  <div className="rgrid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                    {detailImages.map((img: string, i: number) => (
                      <div key={i} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1/1', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <Image src={img} alt={altText(`detail close-up ${i + 1} - mesh and edge`)} fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: Key Specs + CTA (sticky) ─── */}
          <div style={{ position: 'sticky', top: 90 }}>
            {/* MODULE 3: Key Specifications & CTA */}
            <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
              Professional HDPE netting direct from our China factory. Custom sizes &amp; colors available.
            </p>

            {/* Key Spec Tags — field name + value.
                This is the at-a-glance spec summary for buyers, and the block that
                AI answer engines extract most readily (GEO). */}
            {(product.specs || []).slice(0, 6).length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, fontSize: 13 }}>
                {(product.specs || []).slice(0, 6).map((spec: string, i: number) => {
                  const sep = spec.indexOf(':');
                  const label = sep > 0 ? spec.slice(0, sep).trim() : spec.trim();
                  const val = sep > 0 ? spec.slice(sep + 1).trim() : '';
                  return (
                    <div key={i} style={{
                      padding: '9px 14px', borderRadius: 8,
                      background: i % 2 === 0 ? '#eef2ff' : '#f0fdf4',
                      color: i % 2 === 0 ? '#3730a3' : '#166534',
                      border: `1px solid ${i % 2 === 0 ? '#c7d2fe' : '#bbf7d0'}`,
                      display: 'flex', alignItems: 'baseline', gap: 8, lineHeight: 1.45,
                    }}>
                      <span style={{ flexShrink: 0 }}>&#10003;</span>
                      <span style={{ fontWeight: 700, flexShrink: 0 }}>{label}{val ? ':' : ''}</span>
                      {val && <span style={{ fontWeight: 500, opacity: 0.92 }}>{val.length > 40 ? val.slice(0, 40) + '...' : val}</span>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA Card with single CTA button */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14, color: '#0B4C8E' }}>Get Factory Price</h3>
              <InquiryModal locale={locale} productName={displayName} trigger={
                <div style={{ width: '100%', padding: '14px 0', background: '#0E7A45', color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center', cursor: 'pointer', marginBottom: 14, transition: 'background 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0A5F36'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#0E7A45'; }}>
                  Request Quote or Free Sample
                </div>
              } />
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${displayName}. Could you send me a quote?`)}`}
                target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', width: '100%', padding: '12px 0', background: '#25d366',
                  color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700,
                  fontSize: 14, textAlign: 'center', marginBottom: 0,
                }}>WhatsApp Us</a>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 4: Why Choose Jiacheng
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#f8fafc', borderRadius: 14, padding: '36px 32px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0B4C8E', marginBottom: 20, textAlign: 'center' }}>
              Why Choose Jiacheng
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="why-grid">
              {[
                { icon: '\u2699\uFE0F', title: 'Experienced Manufacturer', desc: 'Long-standing HDPE netting manufacturing experience and continuous innovation.' },
                { icon: '\u2705', title: 'Quality-Focused Factory', desc: 'Products engineered to international safety standards. Contact us for available certifications.' },
                { icon: '\uD83C\uDFED', title: 'Modern Factory', desc: 'State-of-the-art warp knitting production facility with bulk capacity for large orders.' },
                { icon: '\uD83C\uDF0D', title: 'Global Export', desc: 'Trusted by contractors and distributors across the Middle East, Europe, Americas, and Africa.' },
                { icon: '\uD83D\uDCE6', title: 'OEM/ODM Available', desc: 'Custom colors, mesh sizes, roll widths, and private-label packaging tailored to your market.' },
                { icon: '\uD83D\uDCCB', title: 'Factory Direct Pricing', desc: 'No middlemen. Get competitive wholesale pricing directly from the source manufacturer.' },
                { icon: '\uD83D\uDD0D', title: 'Strict Quality Control', desc: `Every batch is inspected for tensile strength, UV aging, and flame retardancy before shipment.` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: 16, background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0B4C8E', fontSize: 14, marginBottom: 3 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: '#0B4C8E' }}>Who we work with:</strong>&nbsp; Construction contractors, building material importers, wholesalers &amp; distributors, and government &amp; infrastructure projects.
              </p>
              <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, margin: '8px 0 0' }}>
                <strong style={{ color: '#0B4C8E' }}>Export markets:</strong>&nbsp; Middle East, Europe, and North America. Contact us to confirm delivery to your region.
              </p>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            (Removed) Product Quick Facts table.
            It duplicated the Detailed Specifications table below. The same
            field-name + value summary now lives in the sticky right-column
            Key Spec Tags, so this separate block was removed to cut repetition.
            ──────────────────────────────────────────── */}

        {/* ============================================
            MODULE 6: Structured Product Description (h3 subheadings)
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B4C8E', marginBottom: 18 }}>Product Description</h2>
            {/* AI Overviews / Featured Snippet pure-fact definition */}
            <div style={{ background: '#f0f7ff', borderRadius: 8, padding: '14px 18px', marginBottom: 20, borderLeft: '4px solid #0B4C8E', fontSize: 14, lineHeight: 1.7, color: '#0B4C8E' }}>
              <strong style={{ display: 'block', marginBottom: 2, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, color: '#0B4C8E' }}>Quick Definition</strong>
              {displayName} is a {product.specs?.[0]?.includes('HDPE') ? 'knitted HDPE mesh netting' : 'specialized industrial netting'} designed for {product.applications?.[0] || 'industrial applications'}. Manufactured from {product.specs?.[0]?.split(':')?.[1] || 'premium materials'}.
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8, marginTop: 4 }}>Overview</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
              {displayDescription || product.description}
            </p>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Material &amp; UV Protection</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
              Manufactured from 100% virgin high-density polyethylene (HDPE) with UV-stabilizing compound treatment for extended outdoor service. Fire-retardant options are available on request. Actual UV lifespan depends on climate and exposure. Material resists degradation from sunlight, moisture, and temperature variations.
            </p>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Customization Options</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', margin: 0 }}>
              Available in custom colors (Pantone match), mesh sizes, roll widths, and GSM densities. OEM/ODM services include private label packaging, custom logo printing, barcode stickers, and branded polybag wrapping. Contact our sales team for minimum order quantities, specifications and lead time.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 7: Detailed Specifications Table (3 columns)
            ════════════════════════════════════════════ */}
        {product.specs && product.specs.length > 0 && (
          <div className="section-gap">
            <div style={{ background: '#fff', borderRadius: 14, padding: '28px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 18 }}>Detailed Specifications</h2>
              <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid #e5e7eb' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#0B4C8E', color: '#fff' }}>
                      <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Parameter</th>
                      <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Value</th>
                      <th style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((spec: string, idx: number) => {
                      const [label, value, options] = parseSpec(spec);
                      return (
                        <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: idx < product.specs.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                          <td style={{ padding: '12px 18px', color: '#6b7280', fontWeight: 500, width: '28%', verticalAlign: 'top' }}>{label}</td>
                          <td style={{ padding: '12px 18px', color: '#0B4C8E', fontWeight: 600, width: '36%', verticalAlign: 'top' }}>{value}</td>
                          <td style={{ padding: '12px 18px', color: '#6b7280', fontSize: 13, verticalAlign: 'top' }}>{options}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            
MODULE: How To Choose The Right Netting (Decision Matrix)
            ════════════════════════════════════════════ */}
        {guideRows.length > 0 && (
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 8 }}>
              How To Choose The Right {displayName.includes('Netting') ? 'Netting' : 'Product'}
            </h2>
            {selectionGuide?.intro && (
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 18, lineHeight: 1.5 }}>
                {selectionGuide.intro}
              </p>
            )}
            <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid #e5e7eb' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#0B4C8E', color: '#fff' }}>
                    {selectionCols.map((col, i) => (
                      <th key={i} style={{ padding: '12px 18px', textAlign: 'left', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guideRows.map((row, i) => (
                    <tr key={i} style={{ background: row.highlight ? '#fefce8' : i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: i < guideRows.length - 1 ? '1px solid #f0f2f5' : 'none' }}>
                      <td style={{ padding: '12px 18px', color: '#0B4C8E', fontWeight: 600, width: '22%' }}>{row.col1}</td>
                      <td style={{ padding: '12px 18px', color: '#555', width: '40%' }}>
                        {row.col2}
                        {row.highlight && <span style={{ display: 'inline-block', marginLeft: 8, padding: '2px 8px', background: '#f59e0b', color: '#fff', borderRadius: 10, fontSize: 10, fontWeight: 700, verticalAlign: 'middle' }}>{selectionGuide?.highlightLabel || 'Most Popular'}</span>}
                      </td>
                      <td style={{ padding: '12px 18px', color: '#555' }}>{row.col3}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
            {selectionGuide?.note && (
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginTop: 16, padding: '12px 16px', background: '#f0f7ff', borderRadius: 8, borderLeft: '4px solid #0B4C8E' }}>
                {selectionGuide.note}
              </p>
            )}
          </div>
        </div>
        )}

        {/* ════════════════════════════════════════════
            
MODULE 9: Applications & Project Cases
            ════════════════════════════════════════════ */}
        {((product.applications && product.applications.length > 0) || projectCases.length > 0) && (
          <div className="section-gap">
            <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 16 }}>Applications &amp; Project Cases</h2>
              {product.applications && product.applications.length > 0 && (
                <div className="rgrid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: projectCases.length > 0 ? 20 : 20 }}>
                  {product.applications.map((app: string, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555', padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1px solid #f0f2f5' }}>
                      <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              )}
              {projectCases.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
                  {projectCases.map((c: any, i: number) => (
                    <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                      {c.image && (
                        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#f9fafb' }}>
                          <Image src={c.image} alt={altText(`project case ${i + 1}`)} fill sizes="240px" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                        </div>
                      )}
                      <div style={{ padding: '12px 14px' }}>
                        <p style={{ fontWeight: 600, fontSize: 13, color: '#0B4C8E', margin: 0 }}>{c.title || ''}</p>
                        {c.description && <p style={{ fontSize: 12, color: '#666', margin: '4px 0 0' }}>{c.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            
MODULE 10: Packaging Options (defensive: hidden when no image data)
            ════════════════════════════════════════════ */}
        {packagingOpts.length >= 1 && (
          <div className="section-gap">
            <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 14 }}>Packaging Options</h2>
              <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 18, lineHeight: 1.5 }}>
                We offer flexible packaging solutions to suit different order volumes and distribution channels. Custom labeling and branding available for wholesale clients.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="pkg-grid">
                {packagingOpts.slice(0, 6).map((opt: any, i: number) => (
                  <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                    {opt.image ? (
                      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f9fafb' }}>
                        <Image src={opt.image} alt={altText(`packaging ${i + 1} - ${opt.label || ''}`)} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                      </div>
                    ) : null}
                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#0B4C8E', fontSize: 14, marginBottom: 4 }}>{opt.label || ''}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{opt.desc || ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            
MODULE 11: Latest Deliveries & Container Loading (defensive: hidden when no image data)
            ════════════════════════════════════════════ */}
        {deliveryRecords.length >= 1 && (
          <div className="section-gap" id="recent-shipments">
            <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 16 }}>Latest Deliveries &amp; Container Loading</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="delivery-grid">
                {deliveryRecords.slice(0, 6).map((d: any, i: number) => (
                  <div key={i} style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
                    {d.img ? (
                      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f9fafb' }}>
                        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2, background: '#0B4C8E', color: '#fff', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                          {d.month} &rarr; {d.dest}
                        </div>
                        <Image src={d.img} alt={altText(`delivery ${i + 1} - ${d.product} to ${d.dest}`)} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                      </div>
                    ) : null}
                    <div style={{ padding: '12px 16px' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0B4C8E', margin: 0 }}>{d.month} Delivery: {d.product} to {d.dest}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            MODULE 8: Conversion Banner + Download Center
            ════════════════════════════════════════════ */}
        <div className="section-gap" id="conversion-banner">
          <div style={{ background: 'linear-gradient(135deg, #0B4C8E 0%, #0f2440 100%)', borderRadius: 14, padding: '36px', color: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'center' }} className="conversion-grid">
              {/* Left: Copy + CTA */}
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, lineHeight: 1.3, color: '#fff' }}>Ready to Start Your Project?</h2>
                <p style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.6, marginBottom: 20 }}>
                  Send us your specifications, quantity and destination port — we will reply with a tailored factory-direct quotation.
                </p>
                <InquiryModal locale={locale} productName={displayName} trigger={
                  <button
                    style={{ padding: '14px 28px', background: '#0E7A45', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
                  >Send Inquiry →</button>
                } />
                <p style={{ fontSize: 11, opacity: 0.5, margin: '14px 0 0' }}>Include mesh size, weight, UV or fire-retardant requirements, quantity and destination port for a faster quotation.</p>
              </div>
              {/* Right: download buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <p style={{ fontSize: 13, opacity: 0.7, margin: 0, fontWeight: 600 }}>Or download for offline review:</p>
                <a href={(product as any).catalogUrl || '/files/product-catalog.pdf'} download style={{
                  display: 'block', padding: '14px 0', background: 'rgba(255,255,255,0.15)', color: '#fff',
                  textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>&#128196; Download Product Catalog (PDF)</a><p style={{ fontSize: 11, opacity: 0.6, margin: "8px 0 0", lineHeight: 1.5 }}>&#10003; Full Product Range &nbsp;|&nbsp; &#10003; Technical Specifications &nbsp;|&nbsp; &#10003; Container Loading Capacity &nbsp;|&nbsp; &#10003; OEM Service Guide</p>
                <a href={`mailto:${email}?subject=${encodeURIComponent(`Catalog Request: ${product.name}`)}`} style={{
                  display: 'block', padding: '14px 0', background: '#0B4C8E', color: '#fff',
                  textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, textAlign: 'center',
                }}>&#9993; Request Catalog by Email</a>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            
MODULE 12: Technical & Business FAQ (collapsible)
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0B4C8E', marginBottom: 18 }}>Frequently Asked Questions</h2>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0B4C8E', marginBottom: 10, marginTop: 4 }}>&#128295; Technical &amp; Specifications Q&amp;A</h3>
            {((product as any).faq && (product as any).faq.length > 0 ? (product as any).faq : DEFAULT_FAQ.slice(0, 8)).map((item: any, i: number) => (
              <details key={i} style={{ marginBottom: 8, borderBottom: '1px solid #f0f2f5', paddingBottom: 8 }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#0B4C8E', fontSize: 14, padding: '8px 0' }}>{item.q}</summary>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: '4px 0 8px', paddingLeft: 4 }}>{item.a}</p>
              </details>
            ))}
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0B4C8E', marginBottom: 10, marginTop: 16 }}>&#128230; Commercial &amp; Logistics Q&amp;A</h3>
            {DEFAULT_FAQ.slice(8).map((item, i) => (
              <details key={i} style={{ marginBottom: 8, borderBottom: '1px solid #f0f2f5', paddingBottom: 8 }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#0B4C8E', fontSize: 14, padding: '8px 0' }}>{item.q}</summary>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: '4px 0 8px', paddingLeft: 4 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            
MODULE 13: Related Products
            ════════════════════════════════════════════ */}
        {relatedProducts.length > 0 && (
        <div className="section-gap">
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0B4C8E', marginBottom: 20 }}>Related Products</h2>
          <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {relatedProducts.map((p: any) => (
                <a key={p.id} href={getPath(`/products/${p.id}`)} style={{
                  background: '#fff', borderRadius: 10, overflow: 'hidden',
                  border: '1px solid #e5e7eb', textDecoration: 'none', display: 'block',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>
                  {p.images && p.images[0] ? (
                    <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f8fafc' }}>
                      <Image src={p.images[0]} alt={`${p.name} - related product`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw" style={{ objectFit: 'contain', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: '4/3', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 12 }}>No image</div>
                  )}
                  <div style={{ padding: '12px 14px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0B4C8E', margin: 0 }}>{getLocalizedProduct(p, locale).name}</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
        )}

        {/* (Removed) text-only cross-links that repeated the Related Products
            cards directly above. The same three product links are already
            present as the cards, so no internal link was lost. */}
        {/* Cross-link to Applications page (locale-aware) */}
        <div style={{ padding: '0', marginTop: 6, fontSize: 13, color: '#6b7280', lineHeight: 1.8 }}>
          <a href={getPath('/applications')} style={{ color: '#0B4C8E', textDecoration: 'underline', fontWeight: 600 }}>
            {locale === 'es' ? 'Explore las aplicaciones de redes' : locale === 'ru' ? 'Ознакомьтесь с областями применения' : locale === 'ar' ? 'استكشف تطبيقات الشباك' : 'Explore Netting Applications'}
          </a>
        </div>
      </div>

      {/* ===== Product Schema + BreadcrumbList + FAQPage + ItemList JSON-LD ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
                  { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/${locale}/products` },
                  { '@type': 'ListItem', position: 3, name: displayName, item: `${SITE_URL}/${locale}/products/${slug}` },
                ],
              },
              {
                '@type': 'Product',
                'name': displayName,
                'description': displayDescription.slice(0, 200),
                'brand': { '@type': 'Brand', 'name': 'Jiacheng Netting' },
                'manufacturer': { '@type': 'Organization', 'name': 'Shandong Jiacheng Chemical Fiber Products Co., Ltd.' },
                'category': getCategoryByProductId(slug)?.label || 'Industrial Netting',
                'offers': {
                  '@type': 'Offer',
                  'availability': 'https://schema.org/InStock',
                  'priceSpecification': {
                    '@type': 'PriceSpecification',
                    'description': 'Contact us for factory direct pricing. Price depends on quantity, specifications, and destination.',
                  },
                },
              },
              {
                '@type': 'FAQPage',
                'mainEntity': (faqItems.length > 0 ? [...faqItems, ...DEFAULT_FAQ.slice(8)] : DEFAULT_FAQ).map((item: any) => ({
                  '@type': 'Question',
                  'name': item.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': item.a },
                })),
              },
              {
                '@type': 'ItemList',
                'name': 'Related Products',
                'url': `${SITE_URL}/${locale}/products/${slug}`,
                'itemListOrder': 'http://schema.org/ItemListOrderDescending',
                'numberOfItems': relatedProducts.length,
                'itemListElement': relatedProducts.map((p: any, idx: number) => ({
                  '@type': 'ListItem',
                  'position': idx + 1,
                  'item': {
                    '@type': 'Product',
                    'name': getLocalizedProduct(p, locale).name,
                    'url': `${SITE_URL}/${locale}/products/${p.id}`,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* ===== RESPONSIVE CSS ===== */}
      <style dangerouslySetInnerHTML={{ __html: `
        .section-gap { margin-top: 40px; }
        @media (max-width: 768px) {
          .section-gap { margin-top: 28px; }
          .why-grid { grid-template-columns: 1fr !important; }
          .pkg-grid { grid-template-columns: 1fr !important; }
          .delivery-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .product-hero-grid { grid-template-columns: 1fr !important; }
          .conversion-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .delivery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) { .related-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 769px) and (max-width: 1024px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        body { padding-bottom: 60px; }
        details summary::-webkit-details-marker { color: #0B4C8E; }
        details[open] summary { color: #0B4C8E; }
      `}} />
    </>
  );
}
