'use client';

import contentData from '@/data/content.json';

export default function About() {
  const { about } = contentData;

  // Split description by double newlines to create paragraphs
  const paragraphs = about.description.split('\n\n');

  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>
          {about.title}
        </h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 700, margin: "0 auto 48px" }}>
          {about.subtitle}
        </p>

        {/* Company Profile - Full Width */}
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1e3a5f", marginBottom: 24, textAlign: "center" }}>
            Company Profile
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {paragraphs.map((para, idx) => (
              <p key={idx} style={{ fontSize: 15, lineHeight: 1.8, color: "#555", margin: 0 }}>
                {para}
              </p>
            ))}
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {about.features.map((feature, index) => (
              <div
                key={index}
                style={{
                  padding: "12px 24px",
                  background: "#f3f4f6",
                  borderRadius: 8,
                  fontWeight: 600,
                  color: "#1e3a5f",
                  fontSize: 14,
                }}
              >
                ✓ {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
