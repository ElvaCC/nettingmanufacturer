"use client";

import { useState, useEffect, useCallback } from "react";

interface FactoryImage {
  src: string;
  alt: string;
  label: string;
  objectPosition: string;
  /** "full" = spans all columns, "half" = takes 1 grid slot in 2-col row */
  span: "full" | "half";
  /** Native aspect ratio so the container matches — prevents object-fit:cover from cropping */
  aspectRatio: string;
}

/**
 * Layout — Striped Editorial Grid
 *
 *  Row 1: [  ① Factory Exterior Panorama — full width (3.48:1)  ]
 *  Row 2: [  ② Karl Mayer Machines  ] [  ③ Workshop Wide Angle   ]
 *  Row 3: [  ④ Colorful Net Production — full width (7.73:1)     ]
 *  Row 4: [  ⑤ Warehouse Stacked Rolls — full width (2.69:1)   ]
 *
 *  gap: 16px | border-radius: 8px | hover: scale(1.02)
 *  Ultra-wide images become "signature strips" at full width — zero cropping.
 */
const images: FactoryImage[] = [
  {
    src: "/images/factory/jiacheng-factory-exterior-panorama.jpg",
    alt: "Exterior panoramic view of Jiacheng Netting HDPE plastic netting manufacturing facility in Zhanjia Industrial Park Jinan Shandong China showing factory buildings and packaged net rolls ready for bulk export",
    label: "Factory Exterior — 20,000 m\u00B2 Manufacturing Base",
    objectPosition: "center center",
    span: "full",
    aspectRatio: "1885 / 541",
  },
  {
    src: "/images/factory/jiacheng-workshop-karl-mayer-machines.jpg",
    alt: "Advanced warp knitting production lines with Karl Mayer machines manufacturing HDPE nets inside Jiacheng Netting clean 20,000 square meter workshop",
    label: "Karl Mayer Warp Knitting Lines",
    objectPosition: "center center",
    span: "half",
    aspectRatio: "4 / 3",
  },
  {
    src: "/images/factory/jiacheng-workshop-wide-angle-production.jpg",
    alt: "Wide angle view of Jiacheng Netting modern production workshop showing multiple warp knitting machines and skilled workers for custom HDPE netting",
    label: "Production Workshop",
    objectPosition: "center center",
    span: "half",
    aspectRatio: "4 / 3",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-colorful-nets.jpg",
    alt: "Karl Mayer warp knitting machines producing custom colored HDPE plastic netting in green, blue, red, black, and white at Jiacheng Netting factory for construction debris netting, agricultural shade netting, and privacy screen bulk orders",
    label: "Custom Colored HDPE Netting Production",
    objectPosition: "center center",
    span: "full",
    aspectRatio: "2007 / 287",
  },
  {
    src: "/images/factory/jiacheng-warehouse-hdpe-netting-rolls-stacked.jpg",
    alt: "Large scale warehouse at Jiacheng Netting with thousands of finished HDPE netting rolls stacked on racks ready for container shipment and wholesale export",
    label: "Bulk Inventory — Ready for Global Export",
    objectPosition: "center center",
    span: "full",
    aspectRatio: "2250 / 837",
  },
];

export default function Factory() {
  const [lightbox, setLightbox] = useState<number | null>(null);

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
           Photo Grid — Striped Layout
           ═══════════════════════════════════════════ */}
        <div className="factory-grid">
          {images.map((item, i) => (
            <div
              key={i}
              className={`factory-grid-item${item.span === "full" ? " factory-grid-full" : ""}`}
              style={{ aspectRatio: item.aspectRatio }}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.label} — click to enlarge`}
              onKeyDown={(e) => { if (e.key === "Enter") openLightbox(i); }}
            >
              <picture>
                <source type="image/webp" srcSet={item.src.replace(".jpg", ".webp")} />
                <img
                  src={item.src}
                  alt={item.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  style={{ objectPosition: item.objectPosition }}
                />
              </picture>
              <div className="factory-grid-overlay">
                <div className="factory-grid-label">{item.label}</div>
                <svg className="factory-grid-zoom" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* ── Factory Highlights (3-column) ── */}
        <div className="factory-highlights-grid">
          {[
            { icon: "\u2699\uFE0F", title: "Advanced Warp Knitting Lines", desc: "Multiple Karl Mayer & Liba warp knitting machines with 60+ needles per inch for high-strength HDPE netting." },
            { icon: "\uD83C\uDFED", title: "20,000 m\u00B2 Workshop", desc: "Spacious production and warehousing facility in Zhanjia Industrial Park, Jinan, Shandong." },
            { icon: "\uD83D\uDC77", title: "Skilled QC Team", desc: "Experienced quality inspectors conducting tensile strength, UV-aging, and flame-retardant tests on every batch." },
            { icon: "\u2705", title: "BSCI & NFPA-701 Certified", desc: "Audited social compliance and fire-retardant certification for construction and public safety projects." },
            { icon: "\uD83D\uDCE6", title: "OEM / ODM Available", desc: "Custom colors, mesh sizes, roll widths, and private-label packaging tailored to your market needs." },
            { icon: "\uD83C\uDF0D", title: "Export to 50+ Countries", desc: "Serving construction contractors, agricultural wholesalers, and distributors across 5 continents." },
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
            { title: "Factory Area", value: "20,000 m\u00B2", icon: "\uD83C\uDFED" },
            { title: "Production Capacity", value: "Custom Orders Welcome", icon: "\u2699\uFE0F" },
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
           Photo Grid — Striped Layout
           ═══════════════════════════════════════════ */
        .factory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .factory-grid-item {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: zoom-in;
          background: #e5e7eb;
          min-height: 200px;
        }

        /* Full-width items span both columns */
        .factory-grid-full {
          grid-column: 1 / -1;
        }

        /* Image inside cell */
        .factory-grid-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .factory-grid-item:hover img {
          transform: scale(1.02);
        }

        /* Hover overlay */
        .factory-grid-overlay {
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
        .factory-grid-item:hover .factory-grid-overlay {
          opacity: 1;
        }
        .factory-grid-label {
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .factory-grid-zoom {
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
          grid-template-columns: repeat(2, 1fr);
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
          .factory-grid {
            grid-template-columns: 1fr 1fr;
          }
          .factory-grid-full {
            grid-column: 1 / -1;
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
          .factory-grid {
            grid-template-columns: 1fr;
          }
          .factory-grid-full {
            grid-column: 1;
          }
          .factory-grid-item {
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
