export default function Products() {
  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Our Products</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>Made of 100% virgin HDPE — Fire-Retardant • UV-Treated • Customizable Colors & Specs</p>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { name: "Debris Netting", desc: "High density knitted polyethylene mesh netting (100% virgin HDPE), 1/4\" mesh hole opening, Fire-Retardant NFPA 701 Method II", color: "#ef4444" },
            { name: "Scaffolding Net", desc: "High density knitted polyethylene mesh (100% virgin HDPE), 1/8\", 7/16\" mesh hole opening, Fire-Retardant NFPA 701 Method II", color: "#1e3a5f" },
            { name: "Mesh Tarp / Shade Net", desc: "1/16\" mesh openings, brass grommets spaced every 2\" on all edges, double-stitched sides, UV-treated & protected", color: "#6b7280" },
            { name: "Tape Shade Net", desc: "Made of 100% virgin HDPE, 30%-95% shade rate, water-proof, UV-treated, Width: 1m-12m any length available", color: "#059669" },
            { name: "Shade Sail", desc: "100% virgin HDPE, UV-stabilizing compound to prevent drying/tearing/fading, heavy-duty double-layer reinforced stitched seams", color: "#2563eb" },
            { name: "Anti Hail / Drape Net", desc: "100% Virgin High Density Polyethylene(HDPE), Width: Max 12m, Length: Any length, UV treated & protected", color: "#d97706" },
            { name: "Olive Net", desc: "Made of 100% Virgin High Density Polyethylene(HDPE), Width: Max 12m, collect walnuts, hazelnuts, chestnuts and plums", color: "#047857" },
            { name: "Privacy Net", desc: "100% Virgin High Density Polyethylene(HDPE), Width: Max 12m, 90% VISIBILITY BLOCKAGE, heavy duty bindings", color: "#78350f" },
            { name: "Anti Bee / Bird Net", desc: "100% Virgin High Density Polyethylene(HDPE), Width: Max 12m, UV-stabilized, water and acid resistant", color: "#7c3aed" },
            { name: "Weed Barrier Fabric", desc: "Heavy-Duty Professional Grade Polypropylene Material, chemical free, durable, corrosion resistant, needle-punched fabric", color: "#374151" },
          ].map((product) => (
            <div key={product.name} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", transition: "box-shadow 0.3s" }}>
              {/* Product Image Placeholder */}
              <div style={{ height: 160, background: `linear-gradient(135deg, ${product.color}15, ${product.color}08)`, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid " + product.color }}>
                <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.6 }}>{product.name}</span>
              </div>
              {/* Product Info */}
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1e3a5f", marginBottom: 8 }}>{product.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#666" }}>{product.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="/products" style={{ display: "inline-block", padding: "12px 32px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
            View All Products →
          </a>
        </div>
      </div>
    </section>
  );
}
