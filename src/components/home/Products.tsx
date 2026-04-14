"use client";

const products = [
  { name: "HDPE Safety Net", desc: "Construction debris netting" },
  { name: "Shade Net", desc: "UV protection for agriculture" },
  { name: "Anti-hail Net", desc: "Crop protection netting" },
  { name: "Olive Net", desc: "Olive harvest collection net" },
  { name: "Bird Net", desc: "Garden & orchard protection" },
  { name: "Privacy Screen", desc: "Fence privacy screen" },
];

export default function Products() {
  return (
    <section className="products">
      <div className="container">
        <div className="section-header">
          <h2>Product Series</h2>
          <p>Professional HDPE Netting Solutions for Various Applications</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <a key={index} href="#" className="product-card">
              <div className="product-image">
                <span>Product {index + 1}</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.desc}</p>
                <span className="read-more">READ MORE +</span>
              </div>
            </a>
          ))}
        </div>

        <div className="section-footer">
          <a href="/products" className="btn-primary">View All Products →</a>
        </div>
      </div>

      <style jsx>{`
        .products {
          padding: 80px 24px;
          background: #f8fafc;
        }

        .container {
          max-width: 1400px;
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

        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (min-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .product-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .product-image {
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
        }

        .product-info {
          padding: 20px;
        }

        .product-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 8px 0;
        }

        .product-info p {
          font-size: 14px;
          color: #666;
          margin: 0 0 12px 0;
        }

        .read-more {
          font-size: 13px;
          color: #2563eb;
          font-weight: 600;
        }

        .section-footer {
          text-align: center;
          margin-top: 40px;
        }

        .btn-primary {
          display: inline-block;
          padding: 14px 32px;
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
    </section>
  );
}
