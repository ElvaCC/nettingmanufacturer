'use client';

import { useContent } from '@/context/ContentContext';

export default function BlogPage() {
  const { blog } = useContent();

  return (
    <div style={{ padding: "80px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>
          Blog & News
        </h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
          Latest updates, guides and insights from the Jiacheng Netting team
        </p>

        {/* Blog Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {(blog && blog.length > 0 ? blog : []).map((post: any) => (
            <div
              key={post.id}
              style={{
                background: "#fff", borderRadius: 16, overflow: "hidden",
                border: "1px solid #e5e7eb", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ background: "#dbeafe", color: "#1e40af", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{post.category || "News"}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{post.date || ""}</span>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1e3a5f", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>{post.excerpt}</p>
              </div>
            </div>
          ))}
          {(!blog || blog.length === 0) && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 60, color: "#aaa" }}>
              No blog posts yet. Add some from the admin panel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
