// 联系页 - 仅包含内容，Header/Footer 由 layout 提供
import Contact from "@/components/home/Contact";

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Let&apos;s Work Together</p>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      <style jsx>{`
        .page-header {
          background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
          padding: 80px 24px;
          text-align: center;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
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
      `}</style>
    </>
  );
}
