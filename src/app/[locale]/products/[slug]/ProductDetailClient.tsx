'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useContent } from '@/context/ContentContext';
import StickyInquiryBar from '@/components/layout/StickyInquiryBar';

interface ProductDetailClientProps {
  slug: string;
  locale: string;
}

const EXPORT_COUNTRIES = [
  { name: 'Saudi Arabia', flag: '\uD83C\uDDF8\uD83C\uDDE6' },
  { name: 'UAE',          flag: '\uD83C\uDDE6\uD83C\uDDEA' },
  { name: 'Qatar',        flag: '\uD83C\uDDF6\uD83C\uDDE6' },
  { name: 'Kuwait',       flag: '\uD83C\uDDF0\uD83C\uDDFC' },
  { name: 'Spain',        flag: '\uD83C\uDDEA\uD83C\uDDF8' },
  { name: 'Italy',        flag: '\uD83C\uDDEE\uD83C\uDDF9' },
];

const DEFAULT_FAQ = [
  { q: 'What is HDPE debris netting?', a: 'HDPE debris netting is a lightweight, high-strength knitted mesh made from 100% virgin HDPE. It is used on construction sites to contain falling debris, dust, and tools while allowing airflow and light penetration.' },
  { q: 'How long does UV protection last?', a: 'Our HDPE nets are UV-stabilized for 3-5 years of outdoor exposure depending on climate conditions. We use premium UV additives that meet NFPA 701 fire-retardant standards.' },
  { q: 'What GSM is suitable for scaffolding?', a: 'For scaffolding enclosure and debris containment, we recommend 80-120 GSM density. Heavier GSM (120+) is ideal for high-wind areas and demolition sites requiring maximum durability.' },
  { q: 'What is the MOQ?', a: 'Standard MOQ is 500 sqm per specification. For trial orders and new product testing, we can negotiate smaller quantities. Contact us for flexible starting options.' },
  { q: 'Can you provide OEM labels & packaging?', a: 'Yes, we offer full OEM/ODM services including custom logo printing, private label packaging, barcode stickers, and branded polybag wrapping. MOQ for OEM packaging is 1000 sqm.' },
  { q: 'Can you provide free samples?', a: 'Yes, we provide free samples of any product. Samples are available in A4 size or small cut pieces. Freight is collect (you pay shipping). Sample lead time: 3-5 working days.' },
];

const DELIVERY_DEMO = [
  { product: 'Shade Net',         month: 'May',    dest: 'UAE',         img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=400&fit=crop' },
  { product: 'Debris Netting',    month: 'April',  dest: 'Saudi Arabia',img: 'https://images.unsplash.com/photo-1566576912321-b58dd7a258b7?w=500&h=400&fit=crop' },
  { product: 'Olive Net',         month: 'March',  dest: 'Spain',       img: 'https://images.unsplash.com/photo-1581092162384-8987c1d6472d?w=500&h=400&fit=crop' },
  { product: 'Privacy Screen',    month: 'Feb',    dest: 'Kuwait',      img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500&h=400&fit=crop' },
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
  const sinceYear = 2005;
  const yearsExp = new Date().getFullYear() - sinceYear;

  const allImages = product.images || [];
  const currentSrc = allImages[currentImgIndex] || '';
  const detailImages = (product as any).detailImages || [];
  const deliveryRecords = (product as any).deliveryRecords || [];
  const packagingOpts = (product as any).packagingOptions || [];
  const projectCases = (product as any).projectCases || [];

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

  const altText = (ctx: string) =>
    `${product.name} - ${ctx}`;

  const quoteSubject = encodeURIComponent(`Quote Request: ${product.name}`);
  const sampleSubject = encodeURIComponent(`Free Sample Request: ${product.name}`);

  return (
    <>
      <StickyInquiryBar email={email} whatsapp={whatsapp} productName={product.name} />

      {/* ===== HERO BANNER ===== */}
      <section style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2440 100%)', color: '#fff', padding: '20px 24px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 12, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            <span>Jiacheng Netting</span><span style={{ opacity: 0.4 }}>|</span><span>BSCI &amp; NFPA-701 Certified</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 3vw, 30px)', fontWeight: 800, marginBottom: 6, lineHeight: 1.15 }}>{product.name}</h1>
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
                        border: currentImgIndex === i ? '2px solid #2563eb' : '2px solid #e5e7eb',
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
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Product Detail Close-ups</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                    {detailImages.map((img: string, i: number) => (
                      <div key={i} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1/1', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                        <Image src={img} alt={altText(`detail close-up ${i + 1} - mesh and edge`)} fill sizes="(max-width: 768px) 50vw, 33vw" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                      </div>
                    ))}
                  </div>
                  {/* Hardcoded machinery weaving image slot */}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '16/9', background: '#e5e7eb', border: '1px solid #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', gap: 8 }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>Advanced Weaving Machinery</span>
                      <span style={{ fontSize: 11 }}>Add production workshop photo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT COLUMN: Key Specs + CTA (sticky) ─── */}
          <div style={{ position: 'sticky', top: 90 }}>
            {/* MODULE 3: Key Specifications & CTA */}
            <p style={{ fontSize: 14, color: '#4b5563', lineHeight: 1.6, marginBottom: 16, fontWeight: 500 }}>
              Professional HDPE netting direct from China BSCI certified factory. Custom sizes &amp; colors available.
            </p>

            {/* Key Spec Tags */}
            {(product.specs || []).slice(0, 6).length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20, fontSize: 13 }}>
                {(product.specs || []).slice(0, 6).map((spec: string, i: number) => {
                  const val = spec.includes(':') ? spec.split(':').slice(1).join(':').trim() : spec;
                  return (
                    <div key={i} style={{
                      padding: '9px 14px', borderRadius: 8, fontWeight: 600,
                      background: i % 2 === 0 ? '#eef2ff' : '#f0fdf4',
                      color: i % 2 === 0 ? '#3730a3' : '#166534',
                      border: `1px solid ${i % 2 === 0 ? '#c7d2fe' : '#bbf7d0'}`,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span style={{ flexShrink: 0 }}>&#10003;</span>
                      {val.length > 40 ? val.slice(0, 40) + '...' : val}
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTA Card with dual buttons */}
            <div style={{ background: '#1e3a5f', borderRadius: 14, padding: 24, color: '#fff' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>Get Factory Price</h3>
              <p style={{ fontSize: 12, opacity: 0.75, marginBottom: 6, lineHeight: 1.5 }}>
                OEM/ODM &amp; custom specifications available. Reply within 2 hours.
              </p>
              <p style={{ fontSize: 11, opacity: 0.5, marginBottom: 14, fontStyle: 'italic' }}>
                Need to check quality before ordering? Request a Free Sample.
              </p>
              {/* Dual buttons: Request Quote + Request Free Sample */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <a href={`mailto:${email}?subject=${quoteSubject}`} style={{
                  flex: 1, padding: '12px 0', background: '#2563eb', color: '#fff',
                  textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13,
                  textAlign: 'center', transition: 'background 0.15s',
                }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1d4ed8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#2563eb'; }}>
                  &#9993; Request Quote
                </a>
                <a href={`mailto:${email}?subject=${sampleSubject}`} style={{
                  flex: 1, padding: '12px 0', background: '#f59e0b', color: '#fff',
                  textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13,
                  textAlign: 'center', transition: 'background 0.15s',
                }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#d97706'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f59e0b'; }}>
                    Request Free Sample
                </a>
              </div>
              <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Could you send me a quote?`)}`}
                target="_blank" rel="noopener noreferrer" style={{
                  display: 'block', width: '100%', padding: '11px 0', background: '#25d366',
                  color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700,
                  fontSize: 13, textAlign: 'center', marginBottom: 8,
                }}>WhatsApp Us</a>
              <a href={(product as any).catalogUrl || '/files/product-catalog.pdf'} download style={{
                display: 'block', width: '100%', padding: '10px 0',
                background: 'rgba(255,255,255,0.12)', color: '#fff',
                textDecoration: 'none', borderRadius: 8, fontWeight: 600, fontSize: 13, textAlign: 'center',
              }}>&#128196; Download Product Catalog</a>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 4: Why Choose Jiacheng
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#f8fafc', borderRadius: 14, padding: '36px 32px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', marginBottom: 20, textAlign: 'center' }}>
              Why Choose Jiacheng
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="why-grid">
              {[
                { icon: '\u2699\uFE0F', title: `${yearsExp}+ Years Experience`, desc: 'Founded in 2005, we have been manufacturing HDPE netting for over 18 years with continuous innovation.' },
                { icon: '\u2705', title: 'BSCI & NFPA-701 Certified', desc: 'All products meet international safety standards. Third-party audited social compliance and fire-retardant certified.' },
                { icon: '\uD83C\uDFED', title: '20,000 m\u00B2 Factory', desc: 'State-of-the-art production facility with 65+ warp knitting machines. Massive capacity for bulk orders.' },
                { icon: '\uD83C\uDF0D', title: 'Export to 50+ Countries', desc: 'Trusted by contractors and distributors across Middle East, Europe, Americas, and Africa.' },
                { icon: '\uD83D\uDCE6', title: 'OEM/ODM Available', desc: 'Custom colors, mesh sizes, roll widths, and private-label packaging tailored to your market.' },
                { icon: '\uD83D\uDCCB', title: 'Factory Direct Pricing', desc: 'No middlemen. Get competitive wholesale pricing directly from the source manufacturer.' },
                { icon: '\uD83D\uDD0D', title: 'Strict Quality Control', desc: 'Every batch undergoes tensile strength, UV-aging, and flame-retardant testing before shipment.', qcImg: true },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, padding: 16, background: '#fff', borderRadius: 10, border: '1px solid #e5e7eb', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#1e3a5f', fontSize: 14, marginBottom: 3 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                  {(item as any).qcImg && (
                    <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '1/1', background: '#e5e7eb', border: '1px solid #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', gap: 6, marginTop: 4 }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>
                      <span style={{ fontSize: 11, fontWeight: 600 }}>QC Inspection Photo</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 5: Export Markets (Country Tags)
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 14 }}>Export Markets</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>
              We have established supply partnerships with importers and distributors across the following markets:
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {EXPORT_COUNTRIES.map((c) => (
                <div key={c.name} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '10px 18px', background: '#f8fafc',
                  borderRadius: 24, border: '1px solid #e5e7eb',
                  fontSize: 14, fontWeight: 600, color: '#1e3a5f',
                }}>
                  <span style={{ fontSize: 20 }}>{c.flag}</span>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 6: Structured Product Description (h3 subheadings)
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 18 }}>Product Description</h2>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8, marginTop: 4 }}>Overview</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
              {product.description?.slice(0, 250)}
            </p>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Material &amp; UV Protection</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', marginBottom: 16 }}>
              Manufactured from 100% virgin high-density polyethylene (HDPE) with UV-stabilizing compound treatment. All products meet NFPA 701 fire-retardant standards. UV protection rating: 3-5 years outdoor exposure depending on climate conditions. Material resists degradation from sunlight, moisture, and temperature variations.
            </p>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Customization Options</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', margin: 0 }}>
              Available in custom colors (Pantone match), mesh sizes, roll widths, and GSM densities. OEM/ODM services include private label packaging, custom logo printing, barcode stickers, and branded polybag wrapping. Minimum customization order: 1,000 sqm. Contact our sales team for specifications and lead time.
            </p>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 7: Detailed Specifications Table (3 columns)
            ════════════════════════════════════════════ */}
        {product.specs && product.specs.length > 0 && (
          <div className="section-gap">
            <div style={{ background: '#fff', borderRadius: 14, padding: '28px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 18 }}>Detailed Specifications</h2>
              <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid #e5e7eb' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#1e3a5f', color: '#fff' }}>
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
                          <td style={{ padding: '12px 18px', color: '#1e3a5f', fontWeight: 600, width: '36%', verticalAlign: 'top' }}>{value}</td>
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
            MODULE 8: Download Center
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#f8fafc', borderRadius: 14, padding: '32px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 8 }}>Download Product Catalog</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20, maxWidth: 500, margin: '0 auto 20px' }}>
              Get our full product catalog with detailed specifications, packaging options, and pricing guidelines.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={(product as any).catalogUrl || '/files/product-catalog.pdf'} download style={{
                padding: '12px 32px', background: '#1e3a5f', color: '#fff',
                textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14,
              }}>&#128196; Download PDF Catalog</a>
              <a href={`mailto:${email}?subject=${encodeURIComponent(`Catalog Request: ${product.name}`)}`} style={{
                padding: '12px 32px', background: '#2563eb', color: '#fff',
                textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14,
              }}>&#9993; Request by Email</a>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 9: Applications & Project Cases
            ════════════════════════════════════════════ */}
        {((product.applications && product.applications.length > 0) || projectCases.length > 0) && (
          <div className="section-gap">
            <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Applications &amp; Project Cases</h2>
              {product.applications && product.applications.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: projectCases.length > 0 ? 20 : 0 }}>
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
                        <p style={{ fontWeight: 600, fontSize: 13, color: '#1e3a5f', margin: 0 }}>{c.title || ''}</p>
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
            MODULE 10: Packaging Options
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 14 }}>Packaging Options</h2>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 18, lineHeight: 1.5 }}>
              We offer flexible packaging solutions to suit different order volumes and distribution channels. Custom labeling and branding available for wholesale clients.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="pkg-grid">
              {[
                { icon: '\uD83D\uDCE6', label: 'Standard Roll Packing', desc: 'Each roll wrapped in woven polypropylene bag with product spec sticker. Standard for bulk export orders.' },
                { icon: '\uD83C\uDFF7\uFE0F', label: 'OEM Custom Labeling & Color Cards', desc: 'Private label branding, custom color cards, barcode stickers, and polybag printing. MOQ: 1,000 sqm.' },
                { icon: '\uD83E\uDDF1', label: 'Fumigation-Free Pallet Packing', desc: 'Rolls stacked on pallets, stretch-wrapped for container loading. IPPC-certified heat-treated pallets.' },
              ].map((item, i) => (
                <div key={i} style={{
                  borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb',
                  background: '#fff', transition: 'box-shadow 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  <div style={{ position: 'relative', aspectRatio: '4/3', background: '#e5e7eb', borderBottom: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', gap: 8 }}>
                    <span style={{ fontSize: 36 }}>{item.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>Click to add photo</span>
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 700, color: '#1e3a5f', fontSize: 14, marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {(packagingOpts.length > 0) && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 14 }} className="pkg-grid">
                {packagingOpts.map((opt: any, i: number) => (
                  <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                    {opt.image && (
                      <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f9fafb' }}>
                        <Image src={opt.image} alt={altText(`packaging option ${i + 1}`)} fill sizes="(max-width: 768px) 50vw, 25vw" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                      </div>
                    )}
                    <div style={{ padding: '10px 14px' }}>
                      <p style={{ fontWeight: 600, fontSize: 13, color: '#1e3a5f', margin: 0 }}>{opt.label || ''}</p>
                      {opt.desc && <p style={{ fontSize: 12, color: '#666', margin: '4px 0 0' }}>{opt.desc}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 11: Latest Deliveries & Container Loading (static cards, no animation)
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Latest Deliveries &amp; Container Loading</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }} className="delivery-grid">
              {(deliveryRecords.length > 0 ? deliveryRecords : [
                { month: 'April', product: 'Safety Debris Netting', dest: 'Saudi Arabia', img: '' },
                { month: 'March', product: 'Construction Debris Netting', dest: 'UAE, Dubai', img: '' },
                { month: 'February', product: 'Olive Net / Harvest Net', dest: 'Spain', img: '' },
              ]).slice(0, 3).map((d: any, i: number) => (
                <div key={i} style={{
                  borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb',
                  background: '#fff', transition: 'box-shadow 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  {/* Month/Destination tag */}
                  <div style={{
                    position: 'absolute', top: 10, left: 10, zIndex: 2,
                    background: '#1e3a5f', color: '#fff', padding: '4px 10px',
                    borderRadius: 6, fontSize: 11, fontWeight: 600,
                  }}>
                    Latest: {d.month} &rarr; {d.dest}
                  </div>
                  {/* Image or placeholder */}
                  {d.img ? (
                    <div style={{ position: 'relative', aspectRatio: '4/3', background: '#f9fafb' }}>
                      <Image src={d.img} alt={altText(`delivery ${i + 1} - ${d.product} to ${d.dest}`)} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'contain', background: '#f9fafb' }} />
                    </div>
                  ) : (
                    <div style={{ position: 'relative', aspectRatio: '4/3', background: '#e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', gap: 8 }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{d.month} - {d.product}</span>
                      <span style={{ fontSize: 11 }}>to {d.dest}</span>
                    </div>
                  )}
                  <div style={{ padding: '12px 16px' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>
                      {d.month} Delivery: {d.product} to {d.dest}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 12: Technical & Business FAQ (collapsible)
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <div style={{ background: '#fff', borderRadius: 14, padding: '28px 32px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 18 }}>Frequently Asked Questions</h2>
            {(product as any).faq && (product as any).faq.length > 0 ? (
              (product as any).faq.map((item: any, i: number) => (
                <details key={i} style={{ marginBottom: 8, borderBottom: '1px solid #f0f2f5', paddingBottom: 8 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#1e3a5f', fontSize: 14, padding: '8px 0' }}>{item.q}</summary>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: '4px 0 8px', paddingLeft: 4 }}>{item.a}</p>
                </details>
              ))
            ) : (
              DEFAULT_FAQ.map((item, i) => (
                <details key={i} style={{ marginBottom: 8, borderBottom: '1px solid #f0f2f5', paddingBottom: 8 }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#1e3a5f', fontSize: 14, padding: '8px 0' }}>{item.q}</summary>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, margin: '4px 0 8px', paddingLeft: 4 }}>{item.a}</p>
                </details>
              ))
            )}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MODULE 13: Related Products
            ════════════════════════════════════════════ */}
        <div className="section-gap">
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Related Products</h2>
          <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {products
              .filter((p: any) => p.id !== slug)
              .slice(0, 4)
              .map((p: any) => (
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
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>{p.name}</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* ===== RESPONSIVE CSS ===== */}
      <style dangerouslySetInnerHTML={{ __html: `
        .section-gap { margin-top: 40px; }
        @media (max-width: 768px) {
          .section-gap { margin-top: 28px; }
          .why-grid { grid-template-columns: 1fr !important; }
          .pkg-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .product-hero-grid { grid-template-columns: 1fr !important; }
          .product-hero-grid > div:last-child { position: static !important; order: -1; }
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) { .related-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 769px) and (max-width: 1024px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        body { padding-bottom: 60px; }
        details summary::-webkit-details-marker { color: #2563eb; }
        details[open] summary { color: #1e3a5f; }
      `}} />
    </>
  );
}
