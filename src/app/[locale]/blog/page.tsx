// 博客页 - 仅包含内容，Header/Footer 由 layout 提供
const blogPosts = [
  { title: "How to Choose the Right Shade Net", date: "2024-12-15", excerpt: "Learn about the key factors..." },
  { title: "Benefits of Anti-hail Nets", date: "2024-12-10", excerpt: "Protect your fruit orchards..." },
  { title: "Safety Standards for Debris Netting", date: "2024-12-05", excerpt: "Understanding safety requirements..." },
  { title: "HDPE vs PVC Netting", date: "2024-11-28", excerpt: "Compare material differences..." },
  { title: "Installation Tips for Safety Nets", date: "2024-11-20", excerpt: "Professional installation guide..." },
  { title: "Maintenance of Shade Nets", date: "2024-11-15", excerpt: "Extend the lifespan of your nets..." },
];

export default function BlogPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Blog</h1>
          <p>Industry Insights and Company Updates</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <a key={index} href={`/blog/${index}`} className="blog-card">
                <div className="blog-image">
                  <span>Blog Image</span>
                </div>
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
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

        .blog-section {
          padding: 60px 0;
          background: #f8fafc;
        }

        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .blog-card {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
        }

        .blog-image {
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          font-size: 14px;
        }

        .blog-content {
          padding: 24px;
        }

        .blog-date {
          font-size: 13px;
          color: #2563eb;
          font-weight: 600;
        }

        .blog-content h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 8px 0 12px 0;
          line-height: 1.4;
        }

        .blog-content p {
          font-size: 14px;
          color: #666;
          margin: 0 0 16px 0;
          line-height: 1.6;
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
