export default function Blog() {
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Latest News & Updates</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>Stay updated with our latest products and industry insights</p>

        {/* Blog Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { title: "HDPE Safety Net Standards & Certifications Explained", date: "2024-03-15", category: "Industry News" },
            { title: "How to Choose the Right Shade Net for Your Project", date: "2024-02-28", category: "Guide" },
            { title: "Our New Production Line is Now Operational", date: "2024-02-10", category: "Company Update" },
            { title: "Anti-Hail Nets: Protecting Crops from Severe Weather", date: "2024-01-20", category: "Agriculture" },
            { title: "Exporting to Europe: BSCI Compliance Requirements", date: "2024-01-05", category: "Business" },
            { title: "Custom Logo Printing Service Now Available", date: "2023-12-18", category: "New Feature" },
          ].map((post) => (
            <article key={post.title} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", transition: "box-shadow 0.3s" }}>
              {/* Image Placeholder */}
              <div style={{ height: 180, background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 14, opacity: 0.4 }}>{post.category}</span>
              </div>
              {/* Content */}
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{post.category}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e3a5f", lineHeight: 1.5, minHeight: 48 }}>{post.title}</h3>
                <time style={{ display: "block", marginTop: 16, fontSize: 13, color: "#999" }}>{post.date}</time>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="/blog" style={{ display: "inline-block", padding: "12px 32px", background: "#2563eb", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 600 }}>
            Read All Articles →
          </a>
        </div>
      </div>
    </section>
  );
}
