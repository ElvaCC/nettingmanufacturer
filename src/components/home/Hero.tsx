'use client';

import { useParams } from 'next/navigation';
import contentData from '@/data/content.json';

export default function Hero() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const getPath = (href: string) => `/${locale}${href}`;
  const { hero } = contentData;

  return (
    <section style={{ background: "#fff" }}>
      {/* Text + Image in 1200px container, matching site width */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 0" }}>
        {/* Title + Subtitle */}
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.5px", color: "#1e3a5f", marginBottom: 12, textAlign: "center" }}>
          {hero.title}
        </h1>
        <p style={{ fontSize: 17, maxWidth: 680, margin: "0 auto 32px", lineHeight: 1.65, color: "#64748b", textAlign: "center" }}>
          {hero.subtitle}
        </p>

        {/* Factory Photo — fits 1200px container, full display, no crop */}
        <img
          src="/images/factory/jiacheng-factory-hero.jpg"
          alt="Exterior view of Shandong Jiacheng Chemical Fiber Products Co., Ltd. facility, a leading HDPE netting manufacturer in China, showing a shipping container truck being loaded with finished netting rolls ready for bulk export and direct factory supply"
          width={1920}
          height={800}
          loading="eager"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 12,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
        />
      </div>

      {/* Stats + CTA strip — dark band below image */}
      <div style={{
        background: "#1e3a5f",
        color: "#fff",
        textAlign: "center",
        padding: "44px 24px 52px",
      }}>
        {/* Stats Row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#fbbf24" }}>21+</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Years Experience</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#fbbf24" }}>50+</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Countries Served</div>
          </div>
          <div>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#fbbf24" }}>20,000m²</div>
            <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4 }}>Factory Area</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
          <a href={getPath("/products")} style={{ display: "inline-block", padding: "13px 34px", background: "#fbbf24", color: "#1e3a5f", textDecoration: "none", borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
            {hero.cta2}
          </a>
          <a href={getPath("/contact")} style={{ display: "inline-block", padding: "13px 34px", background: "transparent", color: "#fff", textDecoration: "none", borderRadius: 10, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,0.5)" }}>
            {hero.cta1}
          </a>
        </div>

        {/* Factory Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 50, background: "#162d4a", border: "1px solid #334155" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 500 }}>Real Factory · Jinan, China · BSCI & ISO14001 Certified</span>
        </div>
      </div>
    </section>
  );
}
