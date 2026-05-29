'use client';

import { useParams } from 'next/navigation';
import contentData from '@/data/content.json';

export default function Products() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const getPath = (href: string) => `/${locale}${href}`;
  const { products } = contentData;

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Our Products</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 800, margin: "0 auto 48px" }}>Made of 100% Virgin HDPE — Fire-Retardant &bull; UV-Treated &bull; Customizable Colors &amp; Specs</p>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {products.slice(0, 9).map((product) => (
            <a key={product.id} href={getPath(`/products#${product.id}`)} style={{ textDecoration: "none", display: "block", background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", transition: "box-shadow 0.3s", cursor: "pointer" }}>
              {/* Product Image */}
              <div style={{ height: 180, background: "#f0f4f8", overflow: "hidden", borderBottom: "3px solid #1e3a5f" }}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.5, color: "#1e3a5f" }}>{product.name}</span>
                  </div>
                )}
              </div>
              {/* Product Info */}
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e3a5f", marginBottom: 6 }}>{product.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#666", marginBottom: 12 }}>
                  {product.description ? product.description.substring(0, 100) + "..." : ""}
                </p>
                {product.specs && product.specs.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {product.specs.slice(0, 2).map((spec, idx) => (
                      <span key={idx} style={{ fontSize: 11, background: "#f0f4ff", color: "#1e3a5f", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>
                        {spec.split(":")[0]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href={getPath("/products")} style={{ display: "inline-block", padding: "12px 32px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
            View All Products &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
