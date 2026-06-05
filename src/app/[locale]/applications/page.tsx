'use client';

import { useContent } from '@/context/ContentContext';

export default function ApplicationsPage() {
  const { applications } = useContent();

  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>
          Applications
        </h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
          Serving construction, agriculture, and diverse industries worldwide with premium HDPE netting solutions
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {(applications && applications.length > 0 ? applications : []).map((app: any, i: number) => (
            <div key={i} style={{ background: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1e3a5f", marginBottom: 16 }}>
                {app.name || `Category ${i + 1}`}
              </h2>
              {(app.items && app.items.length > 0) ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
                  {app.items.map((item: string, j: number) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "center", gap: 10, fontSize: 14,
                      color: "#555", padding: "12px 16px", background: "#fff",
                      borderRadius: 10, border: "1px solid #f0f2f5",
                    }}>
                      <span style={{ color: "#10b981", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#94a3b8", fontStyle: "italic" }}>No items listed yet.</p>
              )}
            </div>
          ))}
          {(!applications || applications.length === 0) && (
            <div style={{ textAlign: "center", padding: 60, color: "#aaa" }}>
              No application categories yet. Add some from the admin panel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
