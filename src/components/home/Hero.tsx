'use client';

import { useParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';

export default function Hero() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const getPath = (href: string) => `/${locale}${href}`;
  const { hero } = useContent();

  return (
    <section style={{ background: "#fff" }}>
      {/* Text + Image in 1200px container, matching site width */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* Title + Subtitle */}
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.5px", color: "#1e3a5f", marginBottom: 12, textAlign: "center" }}>
          {hero.title}
        </h1>
        <p style={{ fontSize: 17, maxWidth: 720, margin: "0 auto 32px", lineHeight: 1.65, color: "#64748b", textAlign: "center" }}>
          {hero.subtitle}
        </p>

        {/* Key Highlights — Exporting to 50+ Countries | 21+ Years Experience */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 48px",
            padding: "18px 32px",
            borderTop: "1px solid #e5e7eb",
            borderBottom: "1px solid #e5e7eb",
            maxWidth: 760,
          }}
        >
          <span
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "#1e3a5f",
              letterSpacing: "0.4px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {hero.highlight || "Exporting to 50+ Countries | 21+ Years of Manufacturing Experience"}
          </span>
        </div>

        {/* Factory Photo — WebP with JPG fallback */}
        <picture>
          <source
            type="image/webp"
            srcSet="/images/factory/jiacheng-factory-hero.webp"
          />
          <img
            src="/images/factory/jiacheng-factory-hero.jpg"
            alt="Exterior view of Shandong Jiacheng Chemical Fiber Products Co., Ltd. facility, a leading HDPE netting manufacturer in China, showing a shipping container truck being loaded with finished netting rolls ready for bulk export and direct factory supply"
            width={1920}
            height={1322}
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: 12,
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
          />
        </picture>
      </div>
    </section>
  );
}
