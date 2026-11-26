'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContent } from '@/context/ContentContext';

// Application categories mapped to real product ids (from content.json)
// Mirrors the category→product mapping used on the Products page.
const APPLICATION_PRODUCTS: Record<string, string[]> = {
  'Construction Safety': ['debris-net', 'debris-netting', 'mesh-tarp'],
  'Agriculture': ['anti-hail-net', 'olive-net', 'anti-bee-net', 'anti-bird-net', 'weed-barrier'],
  'Shade Solutions': ['tape-shade-net', 'shade-sail'],
  'Privacy Screen': ['privacy-screen'],
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

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
    <div style={{ padding: "80px 24px 96px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#0B4C8E" }}>
          Applications
        </h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, maxWidth: 620, margin: "0 auto 56px" }}>
          Serving construction, agriculture, and diverse industries worldwide with premium HDPE netting solutions
        </p>

        <div className="app-list">
          {(applications && applications.length > 0 ? applications : []).map((app: any, i: number) => {
            const related = getRelatedProducts(app.name);
            const items: string[] = app.items || [];
            const heading: string = app.name || `Category ${i + 1}`;

            return (
              <section key={i} id={slugify(heading)} className="app-card" aria-labelledby={`app-h-${i}`}>
                <div className="app-body">
                  <h2 id={`app-h-${i}`} style={{ fontSize: 24, fontWeight: 700, color: "#0B4C8E", margin: "0 0 6px" }}>
                    {heading}
                  </h2>
                  <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 0 20px" }}>
                    {related.length} matching product{related.length === 1 ? '' : 's'} · HDPE warp-knitted
                  </p>

                  {items.length > 0 ? (
                    <div className="rgrid-auto" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 210px), 1fr))", gap: 10 }}>
                      {items.map((item: string, j: number) => (
                        <div key={j} style={{
                          display: "flex", alignItems: "center", gap: 10, fontSize: 14,
                          color: "#475569", padding: "11px 14px", background: "#f8fafc",
                          borderRadius: 10, border: "1px solid #eef2f6",
                        }}>
                          <span style={{ color: "#10b981", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#94a3b8", fontStyle: "italic" }}>No items listed yet.</p>
                  )}

                  {related.length > 0 && (
                    <div style={{ marginTop: 22 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                        {related.map((p: any) => (
                          <Link
                            key={p.id}
                            href={`/${locale}/products/${p.id}`}
                            style={{
                              display: "inline-block", padding: "8px 16px", background: "#fff",
                              border: "1px solid #dbe3ec", borderRadius: 8, color: "#0B4C8E",
                              textDecoration: "none", fontSize: 13, fontWeight: 600,
                            }}
                          >
                            {p.name} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {app.image && (
                  <figure className="app-media-wrap" style={{ margin: 0 }}>
                    <div className="app-media">
                      <Image
                        src={app.image}
                        alt={app.imageAlt || heading}
                        fill
                        sizes="(max-width: 900px) 100vw, 520px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    {app.caption && <figcaption className="app-caption">{app.caption}</figcaption>}
                  </figure>
                )}
              </section>
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
