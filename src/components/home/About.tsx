'use client';

import contentData from '@/data/content.json';

export default function About() {
  const { about, products } = contentData;
  
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>{about.title}</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 700, margin: "0 auto 48px" }}>
          {about.subtitle}
        </p>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Left - Company Introduction */}
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1e3a5f", marginBottom: 20 }}>Company Profile</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 16 }}>
              {about.description}
            </p>

            {/* Certifications */}
            <div style={{ marginTop: 30, display: "flex", gap: 24, flexWrap: "wrap" }}>
              {about.features.map((feature, index) => (
                <div key={index} style={{ padding: "12px 20px", background: "#f3f4f6", borderRadius: 8, fontWeight: 600, color: "#1e3a5f" }}>✓ {feature}</div>
              ))}
            </div>
          </div>

          {/* Right - Product Categories */}
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1e3a5f", marginBottom: 20 }}>Our Product Range</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {products.slice(0, 10).map((product) => (
                <div key={product.id} style={{ padding: "14px 18px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fafbfc" }}>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", fontSize: 14 }}>{product.name}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{product.description.substring(0, 40)}...</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
