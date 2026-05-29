"use client";

import { useState, useEffect, useCallback } from "react";

interface FactoryImage {
  src: string;
  alt: string;
  label: string;
  objectPosition: string;
  /** Per-image aspect ratio to prevent stretching/blurring */
  aspectRatio: string;
  /** "cover" fills container but may crop; "contain" shows full image with padding */
  objectFit: "cover" | "contain";
}

const images: FactoryImage[] = [
  {
    src: "/images/factory/jiacheng-factory-panorama.jpg",
    alt: "Panoramic exterior view of Jiacheng Netting HDPE plastic netting manufacturing facility in Zhanjia Industrial Park Jinan Shandong China with container loading area and packaged net rolls for export",
    label: "Factory Exterior",
    objectPosition: "center",
    aspectRatio: "4 / 1",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-warehouse-hdpe-netting-rolls.jpg",
    alt: "Interior warehouse at Jiacheng Netting storing finished HDPE plastic netting rolls organized on racks ready for bulk wholesale export to construction and agriculture markets",
    label: "Finished Goods Warehouse",
    objectPosition: "center",
    aspectRatio: "2 / 1",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-1.jpg",
    alt: "Advanced Karl Mayer warp knitting machines producing high-strength HDPE plastic nets for construction safety debris netting and agricultural shade netting applications",
    label: "Warp Knitting Lines",
    objectPosition: "center",
    aspectRatio: "4 / 3",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-2.jpg",
    alt: "Skilled technicians operating multiple warp knitting production lines in Jiacheng Netting's 20,000 square meter manufacturing workshop for custom HDPE netting orders",
    label: "Production Floor",
    objectPosition: "center top",
    aspectRatio: "4 / 3",
    objectFit: "cover",
  },
  {
    src: "/images/factory/jiacheng-colored-hdpe-netting-products.jpg",
    alt: "Wide range of custom colored HDPE warp-knitted netting products including red construction safety nets, blue shade nets, green privacy screens, and olive harvest nets",
    label: "Product Variety",
    aspectRatio: "8 / 1",
    objectFit: "cover",
    objectPosition: "center",
  },
];

export default function Factory() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const img = images[current];
  const webpSrc = img.src.replace(".jpg", ".webp");

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section Header */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>
          Our Factory
        </h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>
          20,000 m² production facility with advanced technology
        </p>

        {/* Two-Column Layout */}
        <div className="factory-grid">
          {/* Left: Image Carousel */}
          <div>
            {/* Carousel Container — aspect ratio adapts per image */}
            <div
              className="factory-carousel"
              style={{ aspectRatio: img.aspectRatio }}
            >
              {/* WebP with JPG fallback */}
              <picture>
                <source type="image/webp" srcSet={webpSrc} />
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="factory-carousel-img"
                  style={{
                    objectPosition: img.objectPosition,
                    objectFit: img.objectFit,
                  }}
                />
              </picture>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                aria-label="Previous factory photo"
                className="factory-carousel-arrow factory-carousel-arrow-left"
              >
                &#8249;
              </button>
              <button
                onClick={next}
                aria-label="Next factory photo"
                className="factory-carousel-arrow factory-carousel-arrow-right"
              >
                &#8250;
              </button>

              {/* Slide Counter */}
              <div className="factory-carousel-counter">
                {current + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="factory-thumbnails">
              {images.map((item, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`View ${item.label}`}
                  className={`factory-thumb ${i === current ? "factory-thumb-active" : ""}`}
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={item.src.replace(".jpg", ".webp")}
                    />
                    <img
                      src={item.src}
                      alt={item.label}
                      width={64}
                      height={48}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Factory Highlights */}
          <div className="factory-highlights">
            <h3 style={{ fontSize: 28, fontWeight: 700, color: "#1e3a5f", marginBottom: 8 }}>
              Why Choose Jiacheng Netting
            </h3>

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
        </div>

        {/* Bottom: Factory Info Grid */}
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

      {/* Scoped Styles */}
      <style jsx>{`
        /* ── Two-Column Layout ── */
        .factory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        /* ── Carousel Container — aspect ratio is set inline per image ── */
        .factory-carousel {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          background: #e5e7eb;
          transition: aspect-ratio 0.3s ease;
        }

        /* ── Main Image ── */
        .factory-carousel-img {
          display: block;
          width: 100%;
          height: 100%;
          image-rendering: auto;
        }

        /* ── Navigation Arrows ── */
        .factory-carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background: rgba(0, 0, 0, 0.4);
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
          transition: background 0.2s;
        }
        .factory-carousel-arrow:hover {
          background: rgba(0, 0, 0, 0.6);
        }
        .factory-carousel-arrow-left {
          left: 12px;
        }
        .factory-carousel-arrow-right {
          right: 12px;
        }

        /* ── Slide Counter ── */
        .factory-carousel-counter {
          position: absolute;
          bottom: 12px;
          right: 16px;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 12px;
          backdrop-filter: blur(4px);
        }

        /* ── Thumbnail Strip ── */
        .factory-thumbnails {
          display: flex;
          gap: 10px;
          margin-top: 14px;
          justify-content: center;
        }
        .factory-thumb {
          width: 64px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          padding: 0;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s, border-color 0.2s;
          background: none;
        }
        .factory-thumb:hover {
          opacity: 0.85;
        }
        .factory-thumb-active {
          border-color: #2563eb;
          opacity: 1;
        }
        .factory-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* ── Right Panel ── */
        .factory-highlights {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .factory-highlight-card {
          display: flex;
          gap: 16px;
          padding: 18px 20px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }
        .factory-highlight-title {
          font-weight: 700;
          color: #1e3a5f;
          font-size: 16px;
          margin-bottom: 4px;
        }
        .factory-highlight-desc {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        /* ── Bottom Info Grid ── */
        .factory-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 56px;
        }
        .factory-info-card {
          background: #fff;
          padding: 28px;
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

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .factory-grid {
            grid-template-columns: 1fr;
          }
          .factory-info-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .factory-info-grid {
            grid-template-columns: 1fr;
          }
          .factory-thumbnails {
            gap: 6px;
          }
          .factory-thumb {
            width: 48px;
            height: 36px;
          }
        }
      `}</style>
    </section>
  );
}
