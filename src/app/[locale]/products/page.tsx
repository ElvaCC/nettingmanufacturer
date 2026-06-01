'use client';

import { useContent } from '@/context/ContentContext';

export default function ProductsPage() {
  const { products } = useContent();

  return (
    <div style={{ background: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "#1e3a5f", color: "#fff", padding: "64px 24px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Our Products</h1>
          <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 700, margin: "0 auto" }}>
            Made of 100% Virgin HDPE — Fire-Retardant · UV-Treated · Customizable Colors &amp; Specs · OEM/ODM Welcome
          </p>
        </div>
      </div>

      {/* Products List */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {products.map((product, index) => (
            <div key={product.id} id={product.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "grid", gridTemplateColumns: index % 2 === 0 ? "380px 1fr" : "1fr 380px", minHeight: 320 }}>
                
                {/* Image Column */}
                {index % 2 === 0 ? (
                  <div style={{ position: "relative", background: "#f0f4f8" }}>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 14 }}>{product.name}</div>
                    )}
                  </div>
                ) : null}

                {/* Content Column */}
                <div style={{ padding: 36 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div>
                      <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1e3a5f", marginBottom: 4 }}>{product.name}</h2>
                      {product.nameZh && <p style={{ fontSize: 14, color: "#888" }}>{product.nameZh}</p>}
                    </div>
                    <a href="mailto:Netfactory01@factory-jc.com" style={{ flexShrink: 0, marginLeft: 16, padding: "10px 20px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }}>
                      Get Quote
                    </a>
                  </div>

                  <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 24 }}>{product.description}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                    {/* Specs */}
                    {product.specs && product.specs.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Specifications</h4>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 13, color: "#555", lineHeight: 2 }}>
                          {product.specs.map((spec, idx) => (
                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                              <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>✓</span>
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Applications */}
                    {product.applications && product.applications.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Applications</h4>
                        <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 13, color: "#555", lineHeight: 2 }}>
                          {product.applications.map((app, idx) => (
                            <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                              <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0 }}>•</span>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Additional Images */}
                  {product.images && product.images.length > 1 && (
                    <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
                      {product.images.slice(1, 3).map((img, idx) => (
                        <img key={idx} src={img} alt={`${product.name} ${idx + 2}`} style={{ width: 80, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #e5e7eb" }} />
                      ))}
                      {product.appImages && product.appImages.slice(0, 2).map((img, idx) => (
                        <img key={`app-${idx}`} src={img} alt={`${product.name} application`} style={{ width: 80, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #e5e7eb" }} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Column (right side for even index) */}
                {index % 2 !== 0 ? (
                  <div style={{ position: "relative", background: "#f0f4f8" }}>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 14 }}>{product.name}</div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, padding: 48, background: "#1e3a5f", borderRadius: 16, textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Can&apos;t find what you need?</h2>
          <p style={{ opacity: 0.85, marginBottom: 28, fontSize: 15 }}>We offer OEM/ODM customization. Tell us your requirements and we&apos;ll make it.</p>
          <a href="mailto:Netfactory01@factory-jc.com" style={{ display: "inline-block", padding: "14px 36px", background: "#fff", color: "#1e3a5f", textDecoration: "none", borderRadius: 8, fontWeight: 700, fontSize: 16 }}>
            Contact Us for Custom Order →
          </a>
        </div>
      </div>
    </div>
  );
}
