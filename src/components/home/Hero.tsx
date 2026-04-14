"use client";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background placeholder */}
      <div className="hero-bg">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        {/* Left: Main content */}
        <div className="hero-left">
          <h1 className="hero-title">
            Professional HDPE Netting
            <br />
            <span className="highlight">Manufacturer & Exporter</span>
          </h1>
          <p className="hero-subtitle">
            High-quality Safety Net, Shade Net, Anti-hail Net, Olive Net, Bird Net and more
          </p>
        </div>

        {/* Right: Featured Products */}
        <div className="hero-right">
          <div className="featured-products">
            <h3>Featured Products</h3>
            <ul className="product-tags">
              <li>Safety Debris Netting</li>
              <li>Shade Net</li>
              <li>Anti-hail Net</li>
              <li>Olive Harvest Net</li>
              <li>Bird Netting</li>
              <li>Privacy Screen Fence</li>
            </ul>
            <a href="#" className="btn-primary">View All Products →</a>
          </div>
        </div>
      </div>

      {/* Bottom: Core Advantages */}
      <div className="hero-advantages">
        <div className="advantage-item">
          <div className="advantage-icon">🏭</div>
          <div className="advantage-text">Factory Direct</div>
        </div>
        <div className="advantage-item">
          <div className="advantage-icon">✓</div>
          <div className="advantage-text">ISO Certified</div>
        </div>
        <div className="advantage-item">
          <div className="advantage-icon">🚢</div>
          <div className="advantage-text">Global Shipping</div>
        </div>
        <div className="advantage-item">
          <div className="advantage-icon">24</div>
          <div className="advantage-text">24/7 Support</div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23ffffff" fill-opacity="0.05" width="100" height="100"/></svg>');
          background-size: 20px 20px;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          flex: 1;
        }

        @media (min-width: 1024px) {
          .hero-content {
            grid-template-columns: 1.5fr 1fr;
            padding: 80px 24px;
          }
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-title {
          font-size: 36px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 0 0 20px 0;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 48px;
          }
        }

        .highlight {
          color: #fbbf24;
        }

        .hero-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          line-height: 1.6;
        }

        .hero-right {
          display: flex;
          align-items: center;
        }

        .featured-products {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 24px;
          width: 100%;
        }

        .featured-products h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 16px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #2563eb;
        }

        .product-tags {
          list-style: none;
          margin: 0 0 20px 0;
          padding: 0;
        }

        .product-tags li {
          padding: 10px 0;
          color: #333;
          font-size: 15px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .product-tags li:before {
          content: "→";
          color: #2563eb;
        }

        .product-tags li:last-child {
          border-bottom: none;
        }

        .btn-primary {
          display: inline-block;
          padding: 12px 24px;
          background: #2563eb;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #1d4ed8;
        }

        .hero-advantages {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 20px 24px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }

        @media (min-width: 768px) {
          .hero-advantages {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .advantage-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .advantage-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #ffffff;
          font-weight: 700;
        }

        .advantage-text {
          color: #ffffff;
          font-weight: 600;
          font-size: 15px;
        }
      `}</style>
    </section>
  );
}
