import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FactorySection from "@/components/home/Factory";

export default function FactoryPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Header */}
        <section className="page-header">
          <div className="container">
            <h1>Our Factory</h1>
            <p>Professional Manufacturing Capabilities</p>
          </div>
        </section>

        {/* Factory Content */}
        <section className="factory-content">
          <div className="container">
            <div className="content-block">
              <div className="content-text">
                <h2>Production Capacity</h2>
                <p>Our factory covers an area of 50,000 square meters with 20+ advanced production lines...</p>
              </div>
              <div className="content-image">
                <span>Production Line Image</span>
              </div>
            </div>

            <div className="content-block reverse">
              <div className="content-text">
                <h2>Quality Control</h2>
                <p>We implement strict 7-step quality control process to ensure every product meets international standards...</p>
              </div>
              <div className="content-image">
                <span>Quality Control Image</span>
              </div>
            </div>

            <div className="content-block">
              <div className="content-text">
                <h2>Certifications</h2>
                <p>Our products are certified by SGS, BSCI, NFPA701 and other international organizations...</p>
              </div>
              <div className="content-image">
                <span>Certifications Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Factory Stats */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">50,000m²</span>
                <span className="stat-label">Factory Area</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Production Lines</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Employees</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Containers/Year</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .page-header {
          background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
          padding: 80px 24px;
          text-align: center;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
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

        .factory-content {
          padding: 60px 24px;
          background: #ffffff;
        }

        .content-block {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 60px;
        }

        @media (min-width: 768px) {
          .content-block {
            grid-template-columns: 1fr 1fr;
          }

          .content-block.reverse {
            direction: rtl;
          }

          .content-block.reverse > * {
            direction: ltr;
          }
        }

        .content-text h2 {
          font-size: 28px;
          font-weight: 700;
          color: #1e3a5f;
          margin: 0 0 16px 0;
        }

        .content-text p {
          font-size: 16px;
          color: #555;
          line-height: 1.8;
          margin: 0;
        }

        .content-image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
        }

        .stats-section {
          padding: 60px 24px;
          background: #f8fafc;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .stat-item {
          text-align: center;
          padding: 32px;
          background: #ffffff;
          border-radius: 12px;
        }

        .stat-number {
          display: block;
          font-size: 36px;
          font-weight: 700;
          color: #2563eb;
        }

        .stat-label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-top: 8px;
        }
      `}</style>
    </>
  );
}
