import contentData from '@/data/content.json';

export default function ProductsPage() {
  const { products } = contentData;

  return (
    <div style={{ padding: "80px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Our Products</h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 800, margin: "0 auto 48px" }}>
          Made of 100% Virgin HDPE — Fire-Retardant &bull; UV-Treated &bull; Customizable Colors &amp; Specs
        </p>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {products.map((product) => (
            <div key={product.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", transition: "box-shadow 0.3s", cursor: "pointer" }}>
              {/* Product Image Placeholder */}
              <div style={{ height: 180, background: "linear-gradient(135deg, #1e3a5f15, #2563eb15)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #1e3a5f" }}>
                <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.6, color: "#1e3a5f" }}>{product.name}</span>
              </div>
              {/* Product Info */}
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: "#1e3a5f", marginBottom: 12 }}>{product.name}</h3>
                {product.nameZh && (
                  <p style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>{product.nameZh}</p>
                )}
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#555", marginBottom: 16 }}>{product.description}</p>

                {/* Specs */}
                {product.specs && product.specs.length > 0 && (
                  <div style={{ marginBottom: 16 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "#1e3a5f", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Key Specifications</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {product.specs.map((spec, idx) => (
                        <span key={idx} style={{ fontSize: 11, background: "#f0f4ff", color: "#1e3a5f", padding: "4px 10px", borderRadius: 4, fontWeight: 500 }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "#1e3a5f", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Applications</h4>
                    <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8, color: "#555" }}>
                      {product.applications.slice(0, 4).map((app, idx) => (
                        <li key={idx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
