export default function ApplicationsPage() {
  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Applications</h1>
        
        {/* Applications Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ border: "2px dashed #ccc", padding: 40, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
              <span style={{ color: "#999" }}>Application {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
