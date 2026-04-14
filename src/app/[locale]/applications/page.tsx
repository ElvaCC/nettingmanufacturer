// 应用场景页 - 仅框架
export default function ApplicationsPage() {
  return (
    <>
      <section className="page-header">
        <h1>Applications</h1>
        <p>Industry Solutions</p>
      </section>

      <section className="apps-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="app-card">
            <div className="image-placeholder">Image</div>
            <div className="content-placeholder">Application Content</div>
          </div>
        ))}
      </section>

      <style jsx>{`
        .page-header { background: #1e3a5f; padding: 80px 24px; text-align: center; }
        .page-header h1 { color: #fff; font-size: 48px; margin: 0; }
        .page-header p { color: rgba(255,255,255,0.8); font-size: 18px; margin: 12px 0 0 0; }
        
        .apps-grid { padding: 60px 24px; background: #f8fafc; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .app-card { background: #fff; border-radius: 8px; overflow: hidden; }
        .image-placeholder { aspect-ratio: 4/3; background: #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
        .content-placeholder { padding: 20px; color: #666; }
      `}</style>
    </>
  );
}
