export default function SolutionsPage() {
  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Solutions</h1>
        
        {/* Solutions Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ border: "2px dashed #ccc", padding: 60, minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
              <span style={{ color: "#999" }}>Solution {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
