export default function About() {
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
          About Us
        </h2>
        {/* Content Grid - 框架 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Left - 框架占位 */}
          <div style={{ border: "2px dashed #ccc", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#999" }}>About Content Left</span>
          </div>
          {/* Right - 框架占位 */}
          <div style={{ border: "2px dashed #ccc", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#999" }}>About Content Right</span>
          </div>
        </div>
      </div>
    </section>
  );
}
