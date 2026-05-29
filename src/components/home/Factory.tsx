"use client";

import { useState, useEffect, useCallback } from "react";

const images = [
  {
    src: "/images/factory/jiacheng-factory-panorama.jpg",
    webp: "/images/factory/jiacheng-factory-panorama.webp",
    alt: "Panoramic exterior view of Jiacheng Netting HDPE plastic netting manufacturing facility in Zhanjia Industrial Park Jinan Shandong China with container loading area and packaged net rolls for export",
    width: 1920,
    height: 464,
    label: "Factory Exterior",
  },
  {
    src: "/images/factory/jiacheng-warehouse-hdpe-netting-rolls.jpg",
    webp: "/images/factory/jiacheng-warehouse-hdpe-netting-rolls.webp",
    alt: "Interior warehouse at Jiacheng Netting storing finished HDPE plastic netting rolls organized on racks ready for bulk wholesale export to construction and agriculture markets",
    width: 2250,
    height: 1125,
    label: "Finished Goods Warehouse",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-1.jpg",
    webp: "/images/factory/jiacheng-warp-knitting-production-line-1.webp",
    alt: "Advanced Karl Mayer warp knitting machines producing high-strength HDPE plastic nets for construction safety debris netting and agricultural shade netting applications",
    width: 1440,
    height: 1080,
    label: "Warp Knitting Lines",
  },
  {
    src: "/images/factory/jiacheng-warp-knitting-production-line-2.jpg",
    webp: "/images/factory/jiacheng-warp-knitting-production-line-2.webp",
    alt: "Skilled technicians operating multiple warp knitting production lines in Jiacheng Netting\u0027s 20,000 square meter manufacturing workshop for custom HDPE netting orders",
    width: 1440,
    height: 1080,
    label: "Production Floor",
  },
  {
    src: "/images/factory/jiacheng-colored-hdpe-netting-products.jpg",
    webp: "/images/factory/jiacheng-colored-hdpe-netting-products.webp",
    alt: "Wide range of custom colored HDPE warp-knitted netting products including red construction safety nets, blue shade nets, green privacy screens, and olive harvest nets",
    width: 1920,
    height: 248,
    label: "Product Variety",
  },
];

function getSrcSet(basePath: string, name: string, ext: string) {
  return `${basePath}/640w-${name}.${ext} 640w, ${basePath}/960w-${name}.${ext} 960w, ${basePath}/1200w-${name}.${ext} 1200w, ${basePath}/${name}.${ext} 1920w`;
}

export default function Factory() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const img = images[current];

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "start",
          }}
        >
          {/* Left: Image Carousel */}
          <div>
            <div
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                background: "#fff",
                aspectRatio: "16 / 9",
              }}
            >
              {/* Main Image with WebP + srcSet */}
              <picture>
                <source
                  type="image/webp"
                  srcSet={getSrcSet("/images/factory", img.src.split("/").pop()!.replace(".jpg", ""), "webp")}
                  sizes="(max-width: 1200px) 50vw, 560px"
                />
                <img
                  src={img.src}
                  srcSet={getSrcSet("/images/factory", img.src.split("/").pop()!.replace(".jpg", ""), "jpg")}
                  sizes="(max-width: 1200px) 50vw, 560px"
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </picture>

              {/* Navigation Arrows */}
              <button
                onClick={prev}
                aria-label="Previous factory photo"
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(0,0,0,0.4)",
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}
              >
                &#8249;
              </button>
              <button
                onClick={next}
                aria-label="Next factory photo"
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(0,0,0,0.4)",
                  color: "#fff",
                  fontSize: 20,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                }}
              >
                &#8250;
              </button>

              {/* Slide Counter */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 16,
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 12,
                  backdropFilter: "blur(4px)",
                }}
              >
                {current + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
              {images.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`View ${item.label}`}
                  style={{
                    width: 64,
                    height: 44,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: i === current ? "2px solid #2563eb" : "2px solid transparent",
                    padding: 0,
                    cursor: "pointer",
                    opacity: i === current ? 1 : 0.6,
                    transition: "opacity 0.2s",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    width={64}
                    height={44}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Factory Highlights */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
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
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "18px 20px",
                  background: "#fff",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: "#1e3a5f", fontSize: 16, marginBottom: 4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Factory Info Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginTop: 56,
          }}
        >
          {[
            { title: "Factory Area", value: "20,000 m²", icon: "🏭" },
            { title: "Location", value: "Zhanjia Industrial Park, Jinan, China", icon: "📍" },
            { title: "Export Markets", value: "50+ Countries Worldwide", icon: "🌍" },
            { title: "Certifications", value: "BSCI & NFPA-701 Certificate", icon: "✅" },
            { title: "Production Capacity", value: "Custom Orders Welcome", icon: "⚙️" },
            { title: "Export Regions", value: "North America, Europe, Middle East, Asia, Africa", icon: "🚢" },
          ].map((info) => (
            <div
              key={info.title}
              style={{
                background: "#fff",
                padding: 28,
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 28 }}>{info.icon}</span>
              <div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>{info.title}</div>
                <div style={{ fontWeight: 600, color: "#1e3a5f", fontSize: 14 }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
