// 首页 - 仅框架，无内容填充
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Hero Section</h1>
          <p>Hero Banner</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us Section</h2>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2>Products Section</h2>
      </section>

      {/* Applications Section */}
      <section className="applications-section">
        <h2>Applications Section</h2>
      </section>

      {/* Factory Section */}
      <section className="factory-section">
        <h2>Our Factory Section</h2>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <h2>Blog Section</h2>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Section</h2>
      </section>

      <style jsx>{`
        .hero-section { min-height: 60vh; background: #1e3a5f; padding: 60px 24px; text-align: center; }
        .hero-content h1 { color: #fff; font-size: 48px; }
        .hero-content p { color: rgba(255,255,255,0.8); font-size: 20px; }
        
        section { padding: 60px 24px; }
        section h2 { font-size: 36px; color: #1e3a5f; text-align: center; }
        
        .about-section { background: #fff; }
        .products-section { background: #f8fafc; }
        .applications-section { background: #fff; }
        .factory-section { background: #f8fafc; }
        .blog-section { background: #fff; }
        .contact-section { background: #f8fafc; }
      `}</style>
    </>
  );
}
