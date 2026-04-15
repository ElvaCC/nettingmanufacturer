export default function About() {
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>About Us</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 700, margin: "0 auto 48px" }}>
          Shandong Jiacheng Chemical Fiber Products Co., Ltd
        </p>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          {/* Left - Company Introduction */}
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1e3a5f", marginBottom: 20 }}>Company Profile</h3>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 16 }}>
              SHANDONG JIACHENG CHEMICAL FIBER PRODUCTS CO., LTD is a professional and leading manufacturer engaged in the production, research, development and sales of high-performance warp knitting plastic nets.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555", marginBottom: 16 }}>
              Our factory is located in Zhanjia Industrial Park, Zhangqiu County, Jinan City, Shandong Province China, covering an area of approximately 20,000 square meters and equipped with modern production equipment and a top-notch technical team.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#555" }}>
              We focus on the production of plastic nets, including construction safety nets, hail net, shade nets, shade sails, olive nets, bird nets privacy screen, weed barrier fabric, wind barrier nets, aquaculture nets and other warp knitting products.
            </p>

            {/* Certifications */}
            <div style={{ marginTop: 30, display: "flex", gap: 24, flexWrap: "wrap" }}>
              <div style={{ padding: "12px 20px", background: "#f3f4f6", borderRadius: 8, fontWeight: 600, color: "#1e3a5f" }}>✓ BSCI Certified</div>
              <div style={{ padding: "12px 20px", background: "#f3f4f6", borderRadius: 8, fontWeight: 600, color: "#1e3a5f" }}>✓ ISO14001</div>
              <div style={{ padding: "12px 20px", background: "#f3f4f6", borderRadius: 8, fontWeight: 600, color: "#1e3a5f" }}>✓ NFPA 701 Method II</div>
            </div>
          </div>

          {/* Right - Product Categories */}
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1e3a5f", marginBottom: 20 }}>Our Product Range</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { name: "Debris Netting", desc: "100% virgin HDPE, NFPA 701" },
                { name: "Scaffolding Net", desc: "Fire-Retardant, 1/8\" mesh" },
                { name: "Mesh Tarp / Shade Net", desc: "Brass grommets, UV-treated" },
                { name: "Tape Shade Net", desc: "30%-95% shade rate, waterproof" },
                { name: "Shade Sail", desc: "UV-stabilizing, 95% UV block" },
                { name: "Anti Hail / Drape Net", desc: "UV treated & protected" },
                { name: "Olive Net", desc: "Collect walnuts, hazelnuts, plums" },
                { name: "Privacy Net", desc: "90% visibility blockage" },
                { name: "Anti Bee / Bird Net", desc: "UV-stabilized, acid resistant" },
                { name: "Weed Barrier Fabric", desc: "Polypropylene, water & air permeable" },
              ].map((product) => (
                <div key={product.name} style={{ padding: "14px 18px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fafbfc" }}>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", fontSize: 14 }}>{product.name}</div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{product.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
