// 解决方案页 - 仅包含内容，Header/Footer 由 layout 提供
const solutions = [
  {
    title: "Custom Logo Printing",
    desc: "Add your brand logo to our HDPE netting products for better brand recognition.",
    features: ["Custom colors", "Logo printing", "OEM packaging"]
  },
  {
    title: "Custom Specifications",
    desc: "We can produce netting according to your specific size, weight, and material requirements.",
    features: ["Custom sizes", "Custom mesh", "Special materials"]
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Solutions</h1>
          <p>Customized Services for Your Business</p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="solutions-section">
        <div className="container">
          <div className="solutions-grid">
            {solutions.map((solution, index) => (
              <div key={index} className="solution-card">
                <div className="solution-image">
                  <span>Solution Image</span>
                </div>
                <div className="solution-content">
                  <h3>{solution.title}</h3>
                  <p>{solution.desc}</p>
                  <ul className="features-list">
                    {solution.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <a href="/contact" className="btn-primary">Get Quote →</a>
                </div>
              </div>
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

        .solutions-section {
          padding: 60px 0;
          background: #f8fafc;
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 768px) {
          .solutions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .solution-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
        }

        .solution-image {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
        }

        .solution-content {
          padding: 32px;
        }

        .solution-content h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 16px 0;
        }

        .solution-content p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
          margin: 0 0 20px 0;
        }

        .features-list {
          list-style: none;
          margin: 0 0 24px 0;
          padding: 0;
        }

        .features-list li {
          padding: 8px 0;
          font-size: 15px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .features-list li:before {
          content: "✓";
          color: #2563eb;
          font-weight: bold;
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
      `}</style>
    </>
  );
}
