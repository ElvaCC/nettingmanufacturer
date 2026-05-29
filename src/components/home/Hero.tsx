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
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
        {/* Title + Subtitle */}
        <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.5px", color: "#1e3a5f", marginBottom: 12, textAlign: "center" }}>
          {hero.title}
        </h1>
        <p style={{ fontSize: 17, maxWidth: 720, margin: "0 auto 32px", lineHeight: 1.65, color: "#64748b", textAlign: "center" }}>
          {hero.subtitle}
        </p>

        {/* Factory Photo — WebP with srcSet + JPG fallback for SEO & PageSpeed */}
        <picture>
          <source
            type="image/webp"
            srcSet="/images/factory/640w-jiacheng-factory-hero.webp 640w, /images/factory/960w-jiacheng-factory-hero.webp 960w, /images/factory/1200w-jiacheng-factory-hero.webp 1200w, /images/factory/jiacheng-factory-hero.webp 1920w"
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 100vw, (max-width: 1200px) 100vw, 1200px"
          />
          <img
            src="/images/factory/jiacheng-factory-hero.jpg"
            srcSet="/images/factory/640w-jiacheng-factory-hero.jpg 640w, /images/factory/960w-jiacheng-factory-hero.jpg 960w, /images/factory/1200w-jiacheng-factory-hero.jpg 1200w, /images/factory/jiacheng-factory-hero.jpg 1920w"
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 100vw, (max-width: 1200px) 100vw, 1200px"
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
