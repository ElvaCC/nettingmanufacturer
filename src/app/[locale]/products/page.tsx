// 产品页 - 仅包含内容，Header/Footer 由 layout 提供
const products = [
  { name: "HDPE Safety Net", slug: "hdpe-safety-net", desc: "High-quality construction safety debris netting" },
  { name: "Shade Net", slug: "shade-net", desc: "UV protection shade netting for agriculture" },
  { name: "Anti-hail Net", slug: "anti-hail-net", desc: "Crop protection anti-hail netting" },
  { name: "Olive Net", slug: "olive-net", desc: "Olive harvest collection net" },
  { name: "Bird Net", slug: "bird-net", desc: "Garden and orchard bird protection net" },
  { name: "Privacy Screen", slug: "privacy-screen", desc: "Fence privacy screen netting" },
];

export default function ProductsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Products</h1>
          <p>Professional HDPE Netting Solutions</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <a key={product.slug} href={`/products/${product.slug}`} className="product-card">
                <div className="product-image">
                  <span>Product Image</span>
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <span className="read-more">READ MORE +</span>
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
          max-width: 1400px;
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

        .products-section {
          padding: 60px 0;
          background: #f8fafc;
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
      `}</style>
    </>
  );
}
