import contentData from '@/data/content.json';

export default function Products() {
  const { products } = contentData;

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Our Products</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>Made of 100% Virgin HDPE — Fire-Retardant &bull; UV-Treated &bull; Customizable Colors &amp; Specs</p>

        {/* Products Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {products.map((product) => (
            <div key={product.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", transition: "box-shadow 0.3s", cursor: "pointer" }}>
              {/* Product Image Placeholder */}
              <div style={{ height: 160, background: "linear-gradient(135deg, #1e3a5f08, #2563eb08)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "3px solid #1e3a5f" }}>
                <span style={{ fontSize: 14, fontWeight: 600, opacity: 0.6, color: "#1e3a5f" }}>{product.name}</span>
              </div>
              {/* Product Info */}
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1e3a5f", marginBottom: 8 }}>{product.name}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "#666", marginBottom: 12 }}>{product.description ? product.description.substring(0, 120) + "..." : ""}</p>
                {product.specs && product.specs.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {product.specs.slice(0, 3).map((spec, idx) => (
                      <span key={idx} style={{ fontSize: 11, background: "#f0f4ff", color: "#1e3a5f", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>
                        {spec.split(":")[0]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="/products" style={{ display: "inline-block", padding: "12px 32px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
            View All Products &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
