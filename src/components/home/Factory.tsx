"use client";

import { useState, useEffect, useCallback } from "react";

interface FactoryImage {
  src: string;
  alt: string;
  label: string;
  /** "full" spans all columns, "normal" takes 1 grid slot */
  span: "full" | "normal";
  objectPosition: string;
  objectFit: "cover" | "contain";
}

/**
 * Layout plan (Masonry Grid):
 *
 *  Row 1: [     Image 1 — Panorama (4:1) full width     ]
 *  Row 2: [ Img 2 (4:3) ] [ Img 3 (2:1) ] [ Img 4 (4:3) ]
 *  Row 3: [     Image 5 — Products (8:1) full width      ]
 *
 *  Each image preserves its original aspect ratio — zero cropping.
 *  Ultra-wide images become "signature strips" across the full width.
 */
const images: FactoryImage[] = [
  {
    src: "/images/factory/jiacheng-factory-panorama.jpg",
    alt: "Panoramic exterior view of Jiacheng Netting HDPE plastic netting manufacturing facility in Zhanjia Industrial Park Jinan Shandong China with container loading area and packaged net rolls for export",
    label: "Factory Exterior",
    span: "full",
    objectPosition: "center center",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-2.jpg",
    alt: "Skilled technicians operating multiple warp knitting production lines in Jiacheng Netting's 20,000 square meter manufacturing workshop for custom HDPE netting orders",
    label: "Production Floor",
    span: "normal",
    objectPosition: "center top",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-warehouse-hdpe-netting-rolls.jpg",
    alt: "Interior warehouse at Jiacheng Netting storing finished HDPE plastic netting rolls organized on racks ready for bulk wholesale export to construction and agriculture markets",
    label: "Finished Goods Warehouse",
    span: "normal",
    objectPosition: "center center",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-1.jpg",
    alt: "Advanced Karl Mayer warp knitting machines producing high-strength HDPE plastic nets for construction safety debris netting and agricultural shade netting applications",
    label: "Warp Knitting Lines",
    span: "normal",
    objectPosition: "center left",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-colored-hdpe-netting-products.jpg",
    alt: "Wide range of custom colored HDPE warp-knitted netting products including red construction safety nets, blue shade nets, green privacy screens, and olive harvest nets",
    label: "Product Variety",
    span: "full",
    objectPosition: "center center",
    objectFit: "cover",
  },
];

export default function Factory() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => ((i ?? 0) + 1) % images.length);
      if (e.key === "ArrowLeft") setLightbox((i) => ((i ?? 0) - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>
          Our Factory
        </h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>
          20,000 m&sup2; production facility with advanced technology
        </p>

        {/* ── Masonry Photo Grid ── */}
        <div className="factory-masonry">
          {images.map((item, i) => {
            const webpSrc = item.src.replace(".jpg", ".webp");
            return (
              <div
                key={i}
                className={`factory-masonry-item${item.span === "full" ? " factory-masonry-full" : ""}`}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.label} — click to enlarge`}
                onKeyDown={(e) => { if (e.key === "Enter") setLightbox(i); }}
              >
                <picture>
                  <source type="image/webp" srcSet={webpSrc} />
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: item.objectFit,
                      objectPosition: item.objectPosition,
                      display: "block",
                    }}
                  />
                </picture>

                {/* Hover overlay with label + zoom icon */}
                <div className="factory-masonry-overlay">
                  <div className="factory-masonry-label">{item.label}</div>
                  <svg className="factory-masonry-zoom" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Factory Highlights (3-column grid) ── */}
        <div className="factory-highlights-grid">
          {[
            {
              icon: "⚙️",
              title: "Advanced Warp Knitting Lines",
              desc: "Multiple Karl Mayer & Liba warp knitting machines with 60+ needles per inch for high-strength HDPE netting.",
            },
            {
              icon: "🏭",
              title: "20,000 m² Workshop",
              desc: "Spacious production and warehousing facility in Zhanjia Industrial Park, Jinan, Shandong.",
            },
            {
              icon: "👷",
              title: "Skilled QC Team",
              desc: "Experienced quality inspectors conducting tensile strength, UV-aging, and flame-retardant tests on every batch.",
            },
            {
              icon: "✅",
              title: "BSCI & NFPA-701 Certified",
              desc: "Audited social compliance and fire-retardant certification for construction and public safety projects.",
            },
            {
              icon: "📦",
              title: "OEM / ODM Available",
              desc: "Custom colors, mesh sizes, roll widths, and private-label packaging tailored to your market needs.",
            },
            {
              icon: "🌍",
              title: "Export to 50+ Countries",
              desc: "Serving construction contractors, agricultural wholesalers, and distributors across 5 continents.",
            },
          ].map((item) => (
            <div key={item.title} className="factory-highlight-card">
              <span style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</span>
              <div>
                <div className="factory-highlight-title">{item.title}</div>
                <div className="factory-highlight-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom: Factory Info Grid ── */}
        <div className="factory-info-grid">
          {[
            { title: "Factory Area", value: "20,000 m²", icon: "🏭" },
            { title: "Location", value: "Zhanjia Industrial Park, Jinan, China", icon: "📍" },
            { title: "Export Markets", value: "50+ Countries Worldwide", icon: "🌍" },
            { title: "Certifications", value: "BSCI & NFPA-701 Certificate", icon: "✅" },
            { title: "Production Capacity", value: "Custom Orders Welcome", icon: "⚙️" },
            { title: "Export Regions", value: "North America, Europe, Middle East, Asia, Africa", icon: "🚢" },
          ].map((info) => (
            <div key={info.title} className="factory-info-card">
              <span style={{ fontSize: 28 }}>{info.icon}</span>
              <div>
                <div className="factory-info-title">{info.title}</div>
                <div className="factory-info-value">{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {lightbox !== null && (
        <div
          className="factory-lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Factory photo viewer"
        >
          <div className="factory-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="factory-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">&#10005;</button>

            {(() => {
              const lb = images[lightbox];
              return (
                <picture>
                  <source type="image/webp" srcSet={lb.src.replace(".jpg", ".webp")} />
                  <img src={lb.src} alt={lb.alt} className="factory-lightbox-img" />
                </picture>
              );
            })()}

            <div className="factory-lightbox-label">{images[lightbox].label}</div>

            <button className="factory-lightbox-arrow factory-lightbox-arrow-left" onClick={() => setLightbox((lightbox - 1 + images.length) % images.length)} aria-label="Previous">&#8249;</button>
            <button className="factory-lightbox-arrow factory-lightbox-arrow-right" onClick={() => setLightbox((lightbox + 1) % images.length)} aria-label="Next">&#8250;</button>

            <div className="factory-lightbox-counter">{lightbox + 1} / {images.length}</div>
          </div>
        </div>
      )}

      {/* Scoped Styles */}
      <style jsx>{`
        /* ═══════════════════════════════════════════
           Masonry Photo Grid
           ═══════════════════════════════════════════ */
        .factory-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        /* Full-width items span all 3 columns */
        .factory-masonry-full {
          grid-column: 1 / -1;
        }

        /* Each masonry cell */
        .factory-masonry-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: zoom-in;
          background: #e5e7eb;
          min-height: 180px;
        }

        /* Full-width items: preserve original aspect ratio */
        .factory-masonry-full img {
          aspect-ratio: auto;
          max-height: 500px;
          object-fit: cover;
        }

        /* Normal items: preserve natural height from aspect ratio */
        .factory-masonry-item:not(.factory-masonry-full) img {
          aspect-ratio: auto;
        }

        /* ── Hover overlay ── */
        .factory-masonry-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 16px 18px;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .factory-masonry-item:hover .factory-masonry-overlay {
          opacity: 1;
        }

        .factory-masonry-label {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .factory-masonry-zoom {
          color: #fff;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.3));
          flex-shrink: 0;
        }

        /* ═══════════════════════════════════════════
           Highlights Grid (3-column)
           ═══════════════════════════════════════════ */
        .factory-highlights-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 48px;
        }
        .factory-highlight-card {
          display: flex;
          gap: 14px;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .factory-highlight-title {
          font-weight: 700;
          color: #1e3a5f;
          font-size: 15px;
          margin-bottom: 4px;
        }
        .factory-highlight-desc {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
        }

        /* ═══════════════════════════════════════════
           Bottom Info Grid
           ═══════════════════════════════════════════ */
        .factory-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .factory-info-card {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .factory-info-title {
          font-size: 13px;
          color: #888;
          margin-bottom: 2px;
        }
        .factory-info-value {
          font-weight: 600;
          color: #1e3a5f;
          font-size: 14px;
        }

        /* ═══════════════════════════════════════════
           Lightbox
           ═══════════════════════════════════════════ */
        .factory-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: lb-fade-in 0.2s ease;
        }
        @keyframes lb-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .factory-lightbox-content {
          position: relative;
          width: 100%;
          max-width: 1400px;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .factory-lightbox-img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 8px;
          display: block;
        }
        .factory-lightbox-label {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          color: #ccc;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
        }
        .factory-lightbox-close {
          position: absolute;
          top: -48px;
          right: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .factory-lightbox-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .factory-lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .factory-lightbox-arrow:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .factory-lightbox-arrow-left { left: -70px; }
        .factory-lightbox-arrow-right { right: -70px; }
        .factory-lightbox-counter {
          position: absolute;
          top: -44px;
          left: 0;
          color: #999;
          font-size: 13px;
        }

        /* ═══════════════════════════════════════════
           Responsive
           ═══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .factory-masonry {
            grid-template-columns: repeat(2, 1fr);
          }
          .factory-masonry-full img {
            max-height: 360px;
          }
          .factory-highlights-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .factory-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .factory-lightbox-arrow-left { left: 10px; }
          .factory-lightbox-arrow-right { right: 10px; }
          .factory-lightbox-overlay { padding: 60px 20px 20px; }
        }
        @media (max-width: 600px) {
          .factory-masonry {
            grid-template-columns: 1fr;
          }
          .factory-masonry-full img {
            max-height: 240px;
          }
          .factory-highlights-grid {
            grid-template-columns: 1fr;
          }
          .factory-info-grid {
            grid-template-columns: 1fr;
          }
          .factory-lightbox-arrow-left { left: 4px; }
          .factory-lightbox-arrow-right { right: 4px; }
          .factory-lightbox-content { max-width: 100%; }
        }
      `}</style>
    </section>
  );
}
