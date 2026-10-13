'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';

// Application categories mapped to real product ids (from content.json)
// Mirrors the category→product mapping used on the Products page.
const APPLICATION_PRODUCTS: Record<string, string[]> = {
  'Construction Safety': ['debris-net', 'square-net', 'mesh-tarp'],
  'Agriculture': ['anti-hail-net', 'olive-net', 'anti-bee-net', 'anti-bird-net', 'weed-barrier'],
  'Shade Solutions': ['tape-shade-net', 'shade-sail'],
  'Privacy Screen': ['privacy-screen'],
};

export default function ApplicationsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { applications, products } = useContent();

  const getRelatedProducts = (appName: string) => {
    const ids = APPLICATION_PRODUCTS[appName] || [];
    return ids
      .map((id) => products.find((p: any) => p.id === id))
      .filter(Boolean);
  };

  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#0B4C8E" }}>
          Applications
        </h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48, maxWidth: 600, margin: "0 auto 48px" }}>
          Serving construction, agriculture, and diverse industries worldwide with premium HDPE netting solutions
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {(applications && applications.length > 0 ? applications : []).map((app: any, i: number) => {
            const related = getRelatedProducts(app.name);
            return (
              <div key={i} style={{ background: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #e5e7eb" }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0B4C8E", marginBottom: 16 }}>
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

                {related.length > 0 && (
                  <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #e5e7eb" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#6b7280", margin: "0 0 10px" }}>
                      Related products:
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {related.map((p: any) => (
                        <Link
                          key={p.id}
                          href={`/${locale}/products/${p.id}`}
                          style={{
                            display: "inline-block",
                            padding: "8px 16px",
                            background: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            color: "#0B4C8E",
                            textDecoration: "none",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {p.name} →
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
