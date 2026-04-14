// 工厂页 - 仅框架
export default function FactoryPage() {
  return (
    <>
      <section className="page-header">
        <h1>Our Factory</h1>
        <p>Manufacturing Capabilities</p>
      </section>

      <section className="content-blocks">
        <div className="block">
          <div className="text-placeholder">Text Content</div>
          <div className="image-placeholder">Image</div>
        </div>
        <div className="block reverse">
          <div className="text-placeholder">Text Content</div>
          <div className="image-placeholder">Image</div>
        </div>
      </section>

      <style jsx>{`
        .page-header { background: #1e3a5f; padding: 80px 24px; text-align: center; }
        .page-header h1 { color: #fff; font-size: 48px; margin: 0; }
        .page-header p { color: rgba(255,255,255,0.8); font-size: 18px; margin: 12px 0 0 0; }
        
        .content-blocks { padding: 60px 24px; background: #fff; max-width: 1200px; margin: 0 auto; }
        .block { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 60px; }
        .block.reverse { direction: rtl; }
        .block.reverse > * { direction: ltr; }
        .text-placeholder { padding: 40px; background: #f8fafc; border-radius: 8px; color: #666; }
        .image-placeholder { aspect-ratio: 4/3; background: #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
      `}</style>
    </>
  );
}
