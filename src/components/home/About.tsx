"use client";

export default function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="section-header">
          <h2>About Us</h2>
          <p>Professional HDPE Netting Manufacturer Since 2010</p>
        </div>

        <div className="about-content">
          {/* Left: Image placeholder */}
          <div className="about-image">
            <div className="image-placeholder">
              <span>About Us Image</span>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="about-text">
            <h3>We are a leading manufacturer of HDPE plastic netting products</h3>
            <p>
              With over 14 years of experience, we specialize in producing high-quality 
              HDPE safety nets, shade nets, anti-hail nets, olive nets, bird nets, and privacy 
              screens. Our products are exported to more than 50 countries worldwide.
            </p>

            {/* Product List */}
            <div className="product-list">
              <h4>Our Main Products:</h4>
              <ul>
                <li>Safety Debris Netting</li>
                <li>Shade Net</li>
                <li>Anti-hail Net</li>
                <li>Olive Harvest Net</li>
                <li>Bird Netting</li>
                <li>Privacy Fence Screen</li>
              </ul>
            </div>

            {/* Stats */}
            <div className="stats">
              <div className="stat-item">
                <span className="stat-number">14+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Countries Served</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
            </div>

            <a href="/about" className="btn-secondary">Learn More About Us →</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          padding: 80px 24px;
          background: #ffffff;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
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

        .about-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .about-content {
            grid-template-columns: 1fr 1fr;
            gap: 60px;
          }
        }

        .about-image {
          order: 2;
        }

        @media (min-width: 1024px) {
          .about-image {
            order: 1;
          }
        }

        .image-placeholder {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 16px;
        }

        .about-text {
          order: 1;
        }

        @media (min-width: 1024px) {
          .about-text {
            order: 2;
          }
        }

        .about-text h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 20px 0;
        }

        .about-text p {
          font-size: 16px;
          color: #555;
          line-height: 1.8;
          margin: 0 0 24px 0;
        }

        .product-list {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .product-list h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 12px 0;
        }

        .product-list ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .product-list li {
          font-size: 14px;
          color: #555;
          padding: 6px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .product-list li:before {
          content: "✓";
          color: #2563eb;
          font-weight: bold;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        .stat-item {
          text-align: center;
          padding: 16px;
          background: #eff6ff;
          border-radius: 8px;
        }

        .stat-number {
          display: block;
          font-size: 32px;
          font-weight: 700;
          color: #2563eb;
        }

        .stat-label {
          font-size: 13px;
          color: #666;
        }

        .btn-secondary {
          display: inline-block;
          padding: 12px 24px;
          border: 2px solid #2563eb;
          color: #2563eb;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: #2563eb;
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
