export default function ProductsPage() {
  return (
    <div style={{ padding: "80px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Our Products</h1>
        
        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ border: "2px dashed #ccc", padding: 40, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
              <span style={{ color: "#999" }}>Product {i}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
