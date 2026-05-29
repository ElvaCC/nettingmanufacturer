import { notFound } from 'next/navigation';
import Link from 'next/link';
import contentData from '@/data/content.json';

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

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const getPath = (href: string) => `/${locale}${href}`;
  const product = contentData.products.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '12px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888' }}>
          <Link href={getPath("/")} style={{ color: '#2563eb', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href={getPath("/products")} style={{ color: '#2563eb', textDecoration: 'none' }}>Products</Link>
          <span>›</span>
          <span style={{ color: '#333' }}>{product.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: '#1e3a5f', color: '#fff', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Jiacheng Netting</p>
          <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8 }}>{product.name}</h1>
          {(product as any).nameZh && (
            <p style={{ fontSize: 16, opacity: 0.7 }}>{(product as any).nameZh}</p>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 40, alignItems: 'start' }}>
          {/* Left: Images */}
          <div>
            {/* Main image */}
            {product.images && product.images.length > 0 ? (
              <div style={{ borderRadius: 16, overflow: 'hidden', background: '#fff', border: '1px solid #e5e7eb', marginBottom: 16 }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
                />
              </div>
            ) : (
              <div style={{ borderRadius: 16, height: 420, background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', marginBottom: 16 }}>
                No image
              </div>
            )}

            {/* Thumbnail row */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {product.images.slice(1).map((img, i) => (
                  <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                    <img src={img} alt={`${product.name} ${i + 2}`} style={{ width: 90, height: 70, objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
                {(product as any).appImages && (product as any).appImages.slice(0, 2).map((img: string, i: number) => (
                  <div key={`app-${i}`} style={{ borderRadius: 8, overflow: 'hidden', border: '2px solid #e5e7eb' }}>
                    <img src={img} alt={`${product.name} application`} style={{ width: 90, height: 70, objectFit: 'cover', display: 'block' }} />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div style={{ marginTop: 32, background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Product Description</h2>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: '#555' }}>{product.description}</p>
            </div>

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div style={{ marginTop: 24, background: '#fff', borderRadius: 12, padding: 28, border: '1px solid #e5e7eb' }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Applications</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {product.applications.map((app, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: '#555', lineHeight: 1.6 }}>
                      <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                      {app}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Specs + CTA */}
          <div style={{ position: 'sticky', top: 80 }}>
            {/* Specifications Card */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb', marginBottom: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 20 }}>Specifications</h2>
              {product.specs && product.specs.map((spec, idx) => {
                const [label, value] = spec.includes(':') ? spec.split(':').map(s => s.trim()) : [spec, ''];
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx < product.specs.length - 1 ? '1px solid #f3f4f6' : 'none', fontSize: 14 }}>
                    <span style={{ color: '#888', fontWeight: 500 }}>{label}</span>
                    <span style={{ color: '#333', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value || '—'}</span>
                  </div>
                );
              })}
            </div>

            {/* Quote CTA */}
            <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 28, color: '#fff' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Get a Free Quote</h3>
              <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 20, lineHeight: 1.6 }}>
                Contact us for custom sizes, colors, certifications and OEM/ODM services.
              </p>
              <a
                href={`mailto:Netfactory@factory-jc.com?subject=Quote Request: ${product.name}`}
                style={{ display: 'block', width: '100%', padding: '14px 0', background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center', boxSizing: 'border-box', marginBottom: 12 }}
              >
                ✉ Email Quote Request
              </a>
              <a
                href="https://wa.me/8613800000000"
                style={{ display: 'block', width: '100%', padding: '14px 0', background: '#25d366', color: '#fff', textDecoration: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, textAlign: 'center', boxSizing: 'border-box' }}
              >
                💬 WhatsApp
              </a>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: 13, opacity: 0.8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span>📧</span> Netfactory@factory-jc.com
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🏭</span> BSCI & NFPA-701 Certificate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f', marginBottom: 24 }}>Other Products</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {contentData.products
              .filter((p) => p.id !== slug)
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={getPath(`/products/${p.id}`)}
                  style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s' }}
                >
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ height: 160, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: 13 }}>No image</div>
                  )}
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#1e3a5f', margin: 0 }}>{p.name}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
