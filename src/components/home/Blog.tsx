'use client';

import { useContent } from '@/context/ContentContext';

export default function Blog() {
  const { blog } = useContent();

  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Latest News & Updates</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>Stay updated with our latest products and industry insights</p>

        {/* Blog Grid */}
        {blog && blog.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {blog.map((post: any) => (
              <article key={post.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb", transition: "box-shadow 0.3s" }}>
                {/* Image Placeholder */}
                <div style={{ height: 180, background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 14, opacity: 0.4 }}>{post.category}</span>
                </div>
                {/* Content */}
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{post.category}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1e3a5f", lineHeight: 1.5, minHeight: 48 }}>{post.title}</h3>
                  {post.excerpt && <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginTop: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{post.excerpt}</p>}
                  <time style={{ display: "block", marginTop: 16, fontSize: 13, color: "#999" }}>{post.date}</time>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#999", padding: "40px 0" }}>No blog posts yet. Add some in the Admin Panel.</p>
        )}
      </div>
    </section>
  );
}
