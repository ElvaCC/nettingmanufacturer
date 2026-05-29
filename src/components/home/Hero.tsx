'use client';

import { useParams } from 'next/navigation';
import contentData from '@/data/content.json';

export default function Hero() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const getPath = (href: string) => `/${locale}${href}`;
  const { hero } = contentData;

  return (
    <section style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding: "0", minHeight: 560 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap" }}>
        {/* Left: Text Content */}
        <div style={{ flex: "1 1 480px", padding: "80px 24px", color: "#fff" }}>
          <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: 18, marginBottom: 36, opacity: 0.9, maxWidth: 520, lineHeight: 1.6 }}>
            {hero.subtitle}
          </p>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#fbbf24" }}>21+</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Years Experience</div>
            </div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#fbbf24" }}>50+</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Countries Served</div>
            </div>
            <div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#fbbf24" }}>20,000m²</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Factory Area</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href={getPath("/products")} style={{ display: "inline-block", padding: "14px 32px", background: "#fbbf24", color: "#1e3a5f", textDecoration: "none", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
              {hero.cta2}
            </a>
            <a href={getPath("/contact")} style={{ display: "inline-block", padding: "14px 32px", background: "transparent", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 600, fontSize: 15, border: "2px solid rgba(255,255,255,0.5)" }}>
              {hero.cta1}
            </a>
          </div>
        </div>

        {/* Right: Factory Photo */}
        <div style={{ flex: "1 1 420px", padding: "40px 24px 40px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>
            <img
              src="/images/factory/hdpe-netting-production-line.jpg"
              alt="JIACHENG NETTING HDPE plastic netting production line with advanced warp knitting machines manufacturing construction safety nets and shade nets in Jinan, China"
              width={520}
              height={390}
              loading="eager"
              style={{ width: "100%", height: "auto", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", objectFit: "cover" }}
            />
            {/* Badge overlay */}
            <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(30,58,95,0.9)", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, backdropFilter: "blur(4px)" }}>
              🏭 Real Factory · Jinan, China
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
