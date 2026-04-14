"use client";

const advantages = [
  "20+ Advanced Production Lines",
  "Professional R&D Team",
  "Strict 7-Step Quality Control",
  "SGS, BSCI, NFPA701 Certified",
];

export default function Factory() {
  return (
    <section className="factory">
      <div className="container">
        <div className="factory-content">
          {/* Left: Images Grid */}
          <div className="factory-images">
            <div className="main-image">
              <span>Factory Main Image</span>
            </div>
            <div className="sub-images">
              <div className="sub-image">
                <span>Production Line</span>
              </div>
              <div className="sub-image">
                <span>Quality Control</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="factory-text">
            <h2>Our Factory</h2>
            <p>
              Located in Shandong Province, China, our factory covers an area of 
              50,000 square meters with 20+ advanced production lines.
            </p>

            <ul className="advantages-list">
              {advantages.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <a href="/factory" className="btn-primary">Visit Our Factory →</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .factory {
          padding: 80px 24px;
          background: #1e3a5f;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .factory-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .factory-content {
            grid-template-columns: 1.2fr 1fr;
            gap: 60px;
          }
        }

        .factory-images {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .main-image {
          aspect-ratio: 16/9;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }

        .sub-images {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .sub-image {
          aspect-ratio: 16/9;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        .factory-text {
          color: #ffffff;
        }

        .factory-text h2 {
          font-size: 36px;
          font-weight: 700;
          margin: 0 0 20px 0;
        }

        .factory-text p {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 30px 0;
        }

        .advantages-list {
          list-style: none;
          margin: 0 0 30px 0;
          padding: 0;
        }

        .advantages-list li {
          padding: 12px 0;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .advantages-list li:before {
          content: "✓";
          color: #fbbf24;
          font-weight: bold;
        }

        .advantages-list li:last-child {
          border-bottom: none;
        }

        .btn-primary {
          display: inline-block;
          padding: 14px 32px;
          background: #fbbf24;
          color: #1e3a5f;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #f59e0b;
        }
      `}</style>
    </section>
  );
}
