'use client';

import { useParams } from 'next/navigation';
import contentData from '@/data/content.json';

export default function Hero() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const getPath = (href: string) => `/${locale}${href}`;
  const { hero } = contentData;

  return (
    <section
      style={{
        position: "relative",
        minHeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Full-screen Background Image */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}>
        <img
          src="/images/factory/jiacheng-factory-hero.jpg"
          alt="JIACHENG NETTING factory exterior and HDPE netting production line in Jinan Shandong China with container loading and warp knitting machines"
          width={1920}
          height={800}
          loading="eager"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Dark Overlay for readability */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, rgba(15,30,60,0.85) 0%, rgba(20,50,120,0.75) 40%, rgba(37,99,235,0.6) 100%)",
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 880,
        margin: "0 auto",
        padding: "80px 24px 80px",
        textAlign: "center",
        color: "#fff",
      }}>
        <h1 style={{ fontSize: 46, fontWeight: 800, marginBottom: 20, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
          {hero.title}
        </h1>
        <p style={{ fontSize: 18, marginBottom: 36, opacity: 0.92, maxWidth: 650, margin: "0 auto 36px", lineHeight: 1.65 }}>
          {hero.subtitle}
        </p>

        {/* Stats Row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#fbbf24" }}>21+</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Years Experience</div>
          </div>
          <div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#fbbf24" }}>50+</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Countries Served</div>
          </div>
          <div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "#fbbf24" }}>20,000m²</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Factory Area</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <a href={getPath("/products")} style={{ display: "inline-block", padding: "15px 38px", background: "#fbbf24", color: "#1e3a5f", textDecoration: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, boxShadow: "0 4px 14px rgba(251,191,36,0.35)" }}>
            {hero.cta2}
          </a>
          <a href={getPath("/contact")} style={{ display: "inline-block", padding: "15px 38px", background: "rgba(255,255,255,0.12)", color: "#fff", textDecoration: "none", borderRadius: 10, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,0.4)", backdropFilter: "blur(4px)" }}>
            {hero.cta1}
          </a>
        </div>

        {/* Factory Badge */}
        <div style={{ marginTop: 44, display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 50, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px rgba(74,222,128,0.5)" }} />
          <span style={{ fontSize: 13, opacity: 0.9, fontWeight: 500 }}>Real Factory · Jinan, China · BSCI & ISO14001 Certified</span>
        </div>
      </div>
    </section>
  );
}
