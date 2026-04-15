export default function FactoryPage() {
  return (
    <div style={{ padding: "80px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Our Factory</h1>
        
        {/* Factory Blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ border: "2px dashed #ccc", padding: 60, minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
              <span style={{ color: "#999" }}>Factory Block {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
