export default function Factory() {
  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
          Our Factory
        </h2>
        {/* Factory Blocks - 框架占位 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ border: "2px dashed #ccc", padding: 60, minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#999" }}>Factory Block {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
