"use client";

export default function Contact() {
  return (
    <section className="contact">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>Let&apos;s Work Together</p>
        </div>

        <div className="contact-content">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <h3>Get in Touch</h3>
            
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <strong>Tel/WeChat:</strong>
                <p>+86 156 2876 4579</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <strong>Email:</strong>
                <p>sales@nettingmanufacturer.com</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>Address:</strong>
                <p>Shandong Province, China</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <a href="#" className="social-icon">f</a>
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">𝕏</a>
              <a href="#" className="social-icon">▶</a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="contact-form">
            <h3>Send us a message</h3>
            <form>
              <div className="form-group">
                <label>Name *</label>
                <input type="text" placeholder="Your Name" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="+1 234 567 890" />
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea rows={5} placeholder="Your inquiry..."></textarea>
              </div>

              <button type="submit" className="btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact {
          padding: 80px 24px;
          background: #ffffff;
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

        .contact-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 1024px) {
          .contact-content {
            grid-template-columns: 1fr 1.5fr;
            gap: 60px;
          }
        }

        .contact-info {
          background: #f8fafc;
          padding: 32px;
          border-radius: 12px;
        }

        .contact-info h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 24px 0;
        }

        .info-item {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #eff6ff;
          border-radius: 8px;
        }

        .info-item strong {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }

        .info-item p {
          margin: 0;
          font-size: 16px;
          color: #1e3a5f;
          font-weight: 500;
        }

        .social-links {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          background: #1e3a5f;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 14px;
          font-weight: bold;
          transition: background 0.2s;
        }

        .social-icon:hover {
          background: #2563eb;
        }

        .contact-form {
          background: #ffffff;
          padding: 32px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .contact-form h3 {
          font-size: 24px;
          font-weight: 600;
          color: #1e3a5f;
          margin: 0 0 24px 0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #2563eb;
        }

        .form-group textarea {
          resize: vertical;
        }

        .btn-primary {
          width: 100%;
          padding: 14px 32px;
          background: #2563eb;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #1d4ed8;
        }
      `}</style>
    </section>
  );
}
