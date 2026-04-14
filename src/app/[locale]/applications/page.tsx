// 应用场景页 - 仅包含内容，Header/Footer 由 layout 提供
const applications = [
  { name: "Construction", desc: "Safety debris netting for building sites and scaffolding" },
  { name: "Agriculture", desc: "Crop protection, greenhouse shading, and orchard netting" },
  { name: "Sports", desc: "Trampoline enclosures, sports facility netting" },
  { name: "Dust Cover", desc: "Site dust control and containment solutions" },
];

export default function ApplicationsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Applications</h1>
          <p>Comprehensive Solutions for Multiple Industries</p>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="apps-section">
        <div className="container">
          <div className="apps-grid">
            {applications.map((app, index) => (
              <a key={index} href={`/applications/${index}`} className="app-card">
                <div className="app-image">
                  <span>Application Image</span>
                </div>
                <div className="app-content">
                  <h3>{app.name}</h3>
                  <p>{app.desc}</p>
                  <span className="read-more">LEARN MORE +</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-header {
          background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
          padding: 80px 24px;
          text-align: center;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .page-header h1 {
          font-size: 48px;
          color: #ffffff;
          margin: 0 0 12px 0;
        }

        .page-header p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        .apps-section {
          padding: 60px 0;
          background: #f8fafc;
        }

        .apps-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (min-width: 768px) {
          .apps-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .app-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .app-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .app-image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
        }

        .app-content {
          padding: 20px;
        }

        .app-content h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 8px 0;
        }

        .app-content p {
          font-size: 14px;
          color: #666;
          margin: 0 0 12px 0;
          line-height: 1.5;
        }

        .read-more {
          font-size: 13px;
          color: #2563eb;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
