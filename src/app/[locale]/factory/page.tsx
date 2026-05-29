import contentData from '@/data/content.json';

export default function FactoryPage() {
  const { factory } = contentData;

  return (
    <div style={{ padding: "80px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>{factory.title}</h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 800, margin: "0 auto 48px" }}>
          {factory.subtitle}
        </p>

        {/* Factory Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 64 }}>
          <div style={{ background: "#1e3a5f", color: "#fff", padding: 32, borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{factory.info.area}</div>
            <div style={{ fontSize: 14, marginTop: 8, opacity: 0.8 }}>Factory Area</div>
          </div>
          <div style={{ background: "#fff", padding: 32, borderRadius: 12, textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#1e3a5f" }}>{factory.info.experience}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>Experience</div>
          </div>
          <div style={{ background: "#fff", padding: 32, borderRadius: 12, textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#1e3a5f" }}>{factory.info.employees}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>Employees</div>
          </div>
          <div style={{ background: "#fff", padding: 32, borderRadius: 12, textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#1e3a5f" }}>{factory.info.exports}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>Export Markets</div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#555", marginBottom: 64, textAlign: "center", maxWidth: 900, margin: "0 auto 64px" }}>
          {factory.description}
        </p>

        {/* Production Process */}
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 48, color: "#1e3a5f" }}>Production Process</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {factory.process.map((item) => (
            <div key={item.step} style={{ background: "#fff", padding: 28, borderRadius: 12, border: "1px solid #e5e7eb", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#e5e7eb", marginBottom: 12 }}>{item.step}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e3a5f", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
