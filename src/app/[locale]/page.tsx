// 首页 - 仅包含首页板块内容，Header/Footer 由 layout 提供
import About from "@/components/home/About";
import Products from "@/components/home/Products";
import Applications from "@/components/home/Applications";
import Factory from "@/components/home/Factory";
import Blog from "@/components/home/Blog";
import Contact from "@/components/home/Contact";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-content">
            <h1>Professional HDPE Netting Manufacturer</h1>
            <p>Leading manufacturer of safety nets, shade nets, anti-hail nets, and more</p>
            
            {/* Core Advantages Icons */}
            <div className="hero-icons">
              <div className="hero-icon">
                <span className="icon">🏭</span>
                <span>Factory Direct</span>
              </div>
              <div className="hero-icon">
                <span className="icon">✓</span>
                <span>ISO Certified</span>
              </div>
              <div className="hero-icon">
                <span className="icon">🚢</span>
                <span>Global Shipping</span>
              </div>
              <div className="hero-icon">
                <span className="icon">24/7</span>
                <span>Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <About />
      <Products />
      <Applications />
      <Factory />
      <Blog />
      <Contact />

      <style jsx>{`
        .hero-section {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
          position: relative;
        }

        .hero-bg {
          width: 100%;
          padding: 60px 24px;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 32px;
          }
        }

        .hero-content p {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 40px 0;
        }

        .hero-icons {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .hero-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #ffffff;
        }

        .hero-icon .icon {
          font-size: 32px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }

        .hero-icon span:last-child {
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}
