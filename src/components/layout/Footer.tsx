"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: About */}
          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Company Profile</a></li>
              <li><a href="#">Factory Introduction</a></li>
              <li><a href="#">Certifications</a></li>
            </ul>
          </div>

          {/* Column 2: Products */}
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><a href="#">HDPE Safety Net</a></li>
              <li><a href="#">Shade Net</a></li>
              <li><a href="#">Anti-hail Net</a></li>
              <li><a href="#">Olive Net</a></li>
              <li><a href="#">Bird Net</a></li>
              <li><a href="#">Privacy Screen</a></li>
            </ul>
          </div>

          {/* Column 3: Applications */}
          <div className="footer-col">
            <h4>Applications</h4>
            <ul>
              <li><a href="#">Construction</a></li>
              <li><a href="#">Agriculture</a></li>
              <li><a href="#">Sports</a></li>
              <li><a href="#">Dust Cover</a></li>
            </ul>
          </div>

          {/* Column 4: Solutions */}
          <div className="footer-col">
            <h4>Solutions</h4>
            <ul>
              <li><a href="#">Custom Logo Printing</a></li>
              <li><a href="#">Custom Specifications</a></li>
            </ul>
          </div>

          {/* Column 5: Blog */}
          <div className="footer-col">
            <h4>Blog</h4>
            <ul>
              <li><a href="#">Industry News</a></li>
              <li><a href="#">Company Updates</a></li>
              <li><a href="#">Technical Articles</a></li>
            </ul>
          </div>

          {/* Column 6: Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>Tel: +86 156 2876 4579</li>
              <li>Email: sales@nettingmanufacturer.com</li>
              <li>Address: Shandong, China</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>Copyright © 2024 NettingManufacturer. All Rights Reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1e3a5f;
          color: #ffffff;
          padding: 60px 24px 24px;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        .footer-col h4 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #fbbf24;
        }

        .footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .footer-col li {
          margin-bottom: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-col a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-col a:hover {
          color: #fbbf24;
        }

        .footer-bottom {
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .footer-bottom p {
          margin: 0;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </footer>
  );
}
