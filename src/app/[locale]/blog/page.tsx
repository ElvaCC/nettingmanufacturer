// 博客页 - 仅框架
export default function BlogPage() {
  return (
    <>
      <section className="page-header">
        <h1>Blog</h1>
        <p>Blog Articles</p>
      </section>

      <section className="blog-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="blog-card">
            <div className="image-placeholder">Image</div>
            <div className="content-placeholder">Blog Content</div>
          </div>
        ))}
      </section>

      <style jsx>{`
        .page-header { background: #1e3a5f; padding: 80px 24px; text-align: center; }
        .page-header h1 { color: #fff; font-size: 48px; margin: 0; }
        .page-header p { color: rgba(255,255,255,0.8); font-size: 18px; margin: 12px 0 0 0; }
        
        .blog-grid { padding: 60px 24px; background: #f8fafc; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .blog-card { background: #fff; border-radius: 8px; overflow: hidden; }
        .image-placeholder { aspect-ratio: 16/9; background: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
        .content-placeholder { padding: 20px; color: #666; }
      `}</style>
    </>
  );
}
