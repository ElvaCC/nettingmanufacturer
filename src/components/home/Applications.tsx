'use client';

import { useContent } from '@/context/ContentContext';

export default function Applications() {
  const { applications } = useContent();

  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Applications</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>Serving construction, agriculture, sports & more industries worldwide</p>

        {/* Applications Grid */}
        {applications && applications.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {applications.map((app: any) => (
              <div key={app.name} style={{ background: "#f9fafb", borderRadius: 12, padding: 28, border: "1px solid #e5e7eb" }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1e3a5f", marginBottom: 16 }}>{app.name}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {(app.items || []).map((item: string) => (
                    <li key={item} style={{ padding: "8px 0", borderBottom: "1px solid #e5e7eb", fontSize: 13, color: "#555" }}>
                      ✓ {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>No application categories configured.</p>
        )}
      </div>
    </section>
  );
}
