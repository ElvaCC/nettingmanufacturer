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

        <div className="app-list">
          {(applications && applications.length > 0 ? applications : []).map((app: any, i: number) => {
            const related = getRelatedProducts(app.name);
            const gallery = Array.isArray(app.gallery) ? app.gallery.filter((g: any) => g?.image) : [];
            return (
              <article className="app-card" key={i}>
                <div className="app-body">
                  <h2 className="app-title">{app.name || `Category ${i + 1}`}</h2>

                  {app.intro && <p className="app-intro">{app.intro}</p>}

                  {(app.items && app.items.length > 0) ? (
                    <ul className="app-items">
                      {app.items.map((item: string, j: number) => (
                        <li key={j} className="app-item">
                          <span className="app-check" aria-hidden="true">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: "#94a3b8", fontStyle: "italic" }}>No items listed yet.</p>
                  )}

                  {related.length > 0 && (
                    <div className="app-related">
                      <p className="app-related-label">Related products:</p>
                      <div className="app-related-links">
                        {related.map((p: any) => (
                          <Link key={p.id} href={`/${locale}/products/${p.id}`} className="app-related-link">
                            {p.name} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {app.image && (
                  <div className="app-media-wrap">
                    <figure className="app-figure">
                      <div className="app-media">
                        <Image
                          src={app.image}
                          alt={app.imageAlt || app.name}
                          fill
                          sizes="(max-width: 900px) 100vw, 520px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      {app.caption && <figcaption className="app-caption">{app.caption}</figcaption>}
                    </figure>

                    {gallery.length > 0 && (
                      <div className="app-thumbs">
                        {gallery.map((g: any, k: number) => (
                          <div className="app-thumb" key={k}>
                            <Image
                              src={g.image}
                              alt={g.imageAlt || app.name}
                              fill
                              sizes="(max-width: 900px) 45vw, 250px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
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
