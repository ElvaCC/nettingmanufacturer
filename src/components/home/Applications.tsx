export default function Applications() {
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
          Applications
        </h2>
        {/* Applications Grid - 框架占位 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ border: "2px dashed #ccc", padding: 40, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#999" }}>Application {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
