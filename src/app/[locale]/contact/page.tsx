// 联系页 - 仅框架
export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <h1>Contact Us</h1>
        <p>Get In Touch</p>
      </section>

      <section className="contact-section">
        <div className="contact-info">Contact Info</div>
        <div className="contact-form">Contact Form</div>
      </section>

      <style jsx>{`
        .page-header { background: #1e3a5f; padding: 80px 24px; text-align: center; }
        .page-header h1 { color: #fff; font-size: 48px; margin: 0; }
        .page-header p { color: rgba(255,255,255,0.8); font-size: 18px; margin: 12px 0 0 0; }
        
        .contact-section { padding: 60px 24px; background: #fff; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1200px; margin: 0 auto; }
        .contact-info { background: #f8fafc; border-radius: 8px; padding: 40px; color: #666; }
        .contact-form { background: #f8fafc; border-radius: 8px; padding: 40px; color: #666; }
      `}</style>
    </>
  );
}
