export default function Factory() {
  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Our Factory</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>20,000 sqm production facility with advanced technology</p>

        {/* Production Process */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 48, border: "1px solid #e5e7eb", marginBottom: 40 }}>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: "#1e3a5f", marginBottom: 32, textAlign: "center" }}>Production Process</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { step: "1", name: "Virgin HDPE", desc: "100% raw material" },
              { step: "2", name: "Drawing", desc: "Fiber extrusion" },
              { step: "3", name: "Threading", desc: "Needle threading" },
              { step: "4", name: "Knitting", desc: "Warp knitting process" },
              { step: "5", name: "Quality Testing", desc: "Strict inspection" },
              { step: "6", name: "Rolling", desc: "Final rolling" },
              { step: "7", name: "Packaging", desc: "Custom packaging" },
              { step: "8", name: "Loading Container", desc: "Global shipping" },
            ].map((process) => (
              <div key={process.step} style={{ textAlign: "center", padding: 24, background: "#f9fafb", borderRadius: 12, border: "1px solid #e5e7eb" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2563eb", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, margin: "0 auto 12px", fontSize: 18 }}>{process.step}</div>
                <div style={{ fontWeight: 600, color: "#1e3a5f", fontSize: 14, marginBottom: 4 }}>{process.name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{process.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Factory Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { title: "Factory Area", value: "20,000 m²", icon: "🏭" },
            { title: "Location", value: "Zhanjia Industrial Park, Jinan, China", icon: "📍" },
            { title: "Export Markets", value: "50+ Countries Worldwide", icon: "🌍" },
            { title: "Certifications", value: "BSCI & ISO14001", icon: "✅" },
            { title: "Production Capacity", value: "Custom Orders Welcome", icon: "⚙️" },
            { title: "Export Regions", value: "North America, Europe, Middle East, Asia, Africa", icon: "🚢" },
          ].map((info) => (
            <div key={info.title} style={{ background: "#fff", padding: 28, borderRadius: 12, border: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 16 }}>
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
