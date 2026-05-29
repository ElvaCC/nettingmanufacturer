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
      {/* Full Factory Photo — completely uncovered, fully displayed */}
      <img
        src="/images/factory/jiacheng-factory-hero.jpg"
        alt="JIACHENG NETTING factory exterior and HDPE netting production line in Jinan Shandong China with container loading and warp knitting machines"
        width={1920}
        height={800}
        loading="eager"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />

      {/* Content below image — solid background, no overlay */}
      <div style={{
        background: "#1e3a5f",
        color: "#fff",
        textAlign: "center",
        padding: "56px 24px 64px",
      }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.5px", color: "#fff" }}>
          {hero.title}
        </h1>
        <p style={{ fontSize: 17, marginBottom: 36, maxWidth: 680, margin: "0 auto 36px", lineHeight: 1.65, color: "#cbd5e1" }}>
          {hero.subtitle}
        </p>

        {/* Stats Row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 40 }}>
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
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
          <a href={getPath("/products")} style={{ display: "inline-block", padding: "14px 36px", background: "#fbbf24", color: "#1e3a5f", textDecoration: "none", borderRadius: 10, fontWeight: 700, fontSize: 15 }}>
            {hero.cta2}
          </a>
          <a href={getPath("/contact")} style={{ display: "inline-block", padding: "14px 36px", background: "transparent", color: "#fff", textDecoration: "none", borderRadius: 10, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,0.5)" }}>
            {hero.cta1}
          </a>
        </div>

        {/* Factory Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 50, background: "#162d4a", border: "1px solid #334155" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 500 }}>Real Factory · Jinan, China · BSCI & ISO14001 Certified</span>
        </div>
      </div>
    </section>
  );
}
