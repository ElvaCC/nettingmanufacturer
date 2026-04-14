"use client";

const applications = [
  { name: "Construction", desc: "Safety debris netting for building sites" },
  { name: "Agriculture", desc: "Crop protection and greenhouse shading" },
  { name: "Sports", desc: "Trampoline and sports facility netting" },
  { name: "Dust Cover", desc: "Site dust control and containment" },
];

export default function Applications() {
  return (
    <section className="applications">
      <div className="container">
        <div className="section-header">
          <h2>Applications</h2>
          <p>Comprehensive Solutions for Multiple Industries</p>
        </div>

        <div className="apps-grid">
          {applications.map((app, index) => (
            <a key={index} href="#" className="app-card">
              <div className="app-icon">
                <span>Icon {index + 1}</span>
              </div>
              <h3>{app.name}</h3>
              <p>{app.desc}</p>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .applications {
          padding: 80px 24px;
          background: #ffffff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: #1e3a5f;
          margin: 0 0 12px 0;
        }

        .section-header p {
          font-size: 18px;
          color: #666;
          margin: 0;
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
          text-align: center;
          padding: 32px 20px;
          background: #f8fafc;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .app-card:hover {
          background: #eff6ff;
          transform: translateY(-4px);
        }

        .app-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 12px;
        }

        .app-card h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 8px 0;
        }

        .app-card p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
