"use client";

import { useState, useEffect, useCallback } from "react";

interface FactoryImage {
  src: string;
  alt: string;
  label: string;
  objectPosition: string;
}

/**
 * Layout — Magazine Editorial Grid
 *
 *  ┌─────────────────────────────┬───────────────┐
 *  │  ① Factory Panorama (60%)    │  ② Workshop   │
 *  │  cover, left 3/5            │  (top-right)  │
 *  │                             ├───────────────┤
 *  │  row-span 2                 │  ③ Product    │
 *  │                             │  close-up     │
 *  └─────────────────────────────┴───────────────┘
 *  ├─────────────────────────────────────────────┤
 *  │  ④ Warehouse (full-width strip)             │
 *  └─────────────────────────────────────────────┘
 *
 *  gap: 16px | border-radius: 8px | hover scale(1.02)
 */
const images: FactoryImage[] = [
  {
    src: "/images/factory/jiacheng-factory-panorama.jpg",
    alt: "Panoramic aerial view of Jiacheng Netting HDPE plastic netting manufacturing facility in Zhanjia Industrial Park, Jinan, Shandong, China — 20,000 m² production base with factory buildings, container loading area, and packaged net rolls for global export",
    label: "Factory Exterior — 20,000 m² Base",
    objectPosition: "center center",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-2.jpg",
    alt: "Interior view of Jiacheng Netting's clean production workshop with skilled technicians operating advanced warp knitting lines for custom HDPE plastic netting manufacturing",
    label: "Clean Workshop",
    objectPosition: "center top",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-1.jpg",
    alt: "Close-up of Karl Mayer warp knitting machines weaving high-strength HDPE plastic net products for construction safety and agricultural shade applications",
    label: "Warp Knitting in Action",
    objectPosition: "center left",
  },
  {
    src: "/images/factory/jiacheng-warehouse-hdpe-netting-rolls.jpg",
    alt: "Bulk warehouse at Jiacheng Netting storing large volumes of finished HDPE plastic netting rolls on industrial racks ready for wholesale container export",
    label: "Bulk Warehouse & Ready for Export",
    objectPosition: "center center",
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

  const openLightbox = useCallback((i: number) => setLightbox(i), []);

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

        {/* ═══════════════════════════════════════════
           Magazine Editorial Grid
           ═══════════════════════════════════════════ */}
        <div className="factory-editorial">
          {/* ① Panorama — left 60%, spans 2 rows */}
          <div
            className="factory-editorial-item factory-editorial-hero"
            onClick={() => openLightbox(0)}
            role="button"
            tabIndex={0}
            aria-label="View factory exterior panorama — click to enlarge"
            onKeyDown={(e) => { if (e.key === "Enter") openLightbox(0); }}
          >
            <picture>
              <source type="image/webp" srcSet={images[0].src.replace(".jpg", ".webp")} />
              <img
                src={images[0].src}
                alt={images[0].alt}
                loading="eager"
                decoding="async"
                style={{ objectPosition: images[0].objectPosition }}
              />
            </picture>
            <div className="factory-editorial-overlay">
              <div className="factory-editorial-label">{images[0].label}</div>
              <svg className="factory-editorial-zoom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>

          {/* ② Workshop — top-right */}
          <div
            className="factory-editorial-item"
            onClick={() => openLightbox(1)}
            role="button"
            tabIndex={0}
            aria-label="View production workshop — click to enlarge"
            onKeyDown={(e) => { if (e.key === "Enter") openLightbox(1); }}
          >
            <picture>
              <source type="image/webp" srcSet={images[1].src.replace(".jpg", ".webp")} />
              <img
                src={images[1].src}
                alt={images[1].alt}
                loading="eager"
                decoding="async"
                style={{ objectPosition: images[1].objectPosition }}
              />
            </picture>
            <div className="factory-editorial-overlay">
              <div className="factory-editorial-label">{images[1].label}</div>
              <svg className="factory-editorial-zoom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>

          {/* ③ Product close-up — bottom-right */}
          <div
            className="factory-editorial-item"
            onClick={() => openLightbox(2)}
            role="button"
            tabIndex={0}
            aria-label="View warp knitting production close-up — click to enlarge"
            onKeyDown={(e) => { if (e.key === "Enter") openLightbox(2); }}
          >
            <picture>
              <source type="image/webp" srcSet={images[2].src.replace(".jpg", ".webp")} />
              <img
                src={images[2].src}
                alt={images[2].alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: images[2].objectPosition }}
              />
            </picture>
            <div className="factory-editorial-overlay">
              <div className="factory-editorial-label">{images[2].label}</div>
              <svg className="factory-editorial-zoom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>

          {/* ④ Warehouse — full-width bottom strip */}
          <div
            className="factory-editorial-item factory-editorial-strip"
            onClick={() => openLightbox(3)}
            role="button"
            tabIndex={0}
            aria-label="View bulk warehouse — click to enlarge"
            onKeyDown={(e) => { if (e.key === "Enter") openLightbox(3); }}
          >
            <picture>
              <source type="image/webp" srcSet={images[3].src.replace(".jpg", ".webp")} />
              <img
                src={images[3].src}
                alt={images[3].alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: images[3].objectPosition }}
              />
            </picture>
            <div className="factory-editorial-overlay">
              <div className="factory-editorial-label">{images[3].label}</div>
              <svg className="factory-editorial-zoom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
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
           Magazine Editorial Grid
           ═══════════════════════════════════════════ */
        .factory-editorial {
          display: grid;
          grid-template-columns: 3fr 2fr;
          grid-template-rows: 1fr 1fr auto;
          gap: 16px;
        }

        .factory-editorial-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: zoom-in;
          background: #e5e7eb;
        }

        /* ① Hero — left 60%, spans 2 rows */
        .factory-editorial-hero {
          grid-column: 1;
          grid-row: 1 / 3;
          min-height: 380px;
        }

        /* ② Workshop — top-right */
        /* ③ Product — bottom-right: auto placement */

        /* ④ Warehouse — full-width bottom */
        .factory-editorial-strip {
          grid-column: 1 / -1;
          grid-row: 3;
          min-height: 220px;
          max-height: 320px;
        }

        /* Image inside cell */
        .factory-editorial-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .factory-editorial-item:hover img {
          transform: scale(1.02);
        }

        /* Overlay */
        .factory-editorial-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 14px 16px;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .factory-editorial-item:hover .factory-editorial-overlay {
          opacity: 1;
        }
        .factory-editorial-label {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .factory-editorial-zoom {
          color: #fff;
          filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4));
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
          .factory-editorial {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
          }
          .factory-editorial-hero {
            grid-column: 1 / -1;
            grid-row: 1;
            min-height: 280px;
          }
          .factory-editorial-strip {
            grid-column: 1 / -1;
            grid-row: 4;
            min-height: 180px;
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
          .factory-editorial {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .factory-editorial-hero {
            grid-column: 1;
            grid-row: auto;
            min-height: 200px;
          }
          .factory-editorial-strip {
            grid-column: 1;
            grid-row: auto;
            min-height: 160px;
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
