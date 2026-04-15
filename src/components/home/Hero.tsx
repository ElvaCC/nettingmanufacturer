export default function Hero() {
  return (
    <section style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)", padding: "100px 24px", minHeight: 500, display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", color: "#fff" }}>
        {/* Main Title */}
        <h1 style={{ fontSize: 48, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>
          Professional HDPE Plastic Netting<br />Manufacturer Since 2005
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 20, marginBottom: 40, opacity: 0.9, maxWidth: 700, margin: "0 auto 40px" }}>
          Shandong Jiacheng Chemical Fiber Products Co., Ltd — Leading manufacturer of high-performance warp knitting plastic nets for construction, agriculture, and more.
        </p>

        {/* Key Advantages */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginTop: 60 }}>
          <div style={{ textAlign: "center", padding: "20px 30px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#fbbf24" }}>20+</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>Years Experience</div>
          </div>
          <div style={{ textAlign: "center", padding: "20px 30px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#fbbf24" }}>50+</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>Countries Served</div>
          </div>
          <div style={{ textAlign: "center", padding: "20px 30px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#fbbf24" }}>BSCI</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>Certified</div>
          </div>
          <div style={{ textAlign: "center", padding: "20px 30px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12 }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#fbbf24" }}>ISO</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>14001 Certified</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ marginTop: 50, display: "flex", justifyContent: "center", gap: 16 }}>
          <a href="/products" style={{ display: "inline-block", padding: "14px 36px", background: "#fbbf24", color: "#1e3a5f", textDecoration: "none", borderRadius: 8, fontWeight: 600, fontSize: 16 }}>
            View Products
          </a>
          <a href="/contact" style={{ display: "inline-block", padding: "14px 36px", background: "transparent", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, border: "2px solid #fff" }}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
