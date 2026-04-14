"use client";

const blogPosts = [
  {
    date: "2024",
    title: "How to Choose the Right Shade Net for Your Crops",
    excerpt: "Learn about the key factors to consider when selecting shade nets for agricultural applications...",
  },
  {
    date: "2024",
    title: "Benefits of Using Anti-hail Nets for Fruit Orchards",
    excerpt: "Discover how anti-hail nets can protect your fruit trees and maximize your harvest yield...",
  },
  {
    date: "2024",
    title: "Safety Standards for Construction Debris Netting",
    excerpt: "Understanding the safety requirements and certifications for construction safety nets...",
  },
];

export default function Blog() {
  return (
    <section className="blog">
      <div className="container">
        <div className="section-header">
          <h2>News & Blog</h2>
          <p>Industry Insights and Company Updates</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <a key={index} href="#" className="blog-card">
              <div className="blog-image">
                <span>Blog {index + 1}</span>
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

        <div className="section-footer">
          <a href="/blog" className="btn-secondary">More Articles →</a>
        </div>
      </div>

      <style jsx>{`
        .blog {
          padding: 80px 24px;
          background: #f8fafc;
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

        .section-footer {
          text-align: center;
          margin-top: 40px;
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
