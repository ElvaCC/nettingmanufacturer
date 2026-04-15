"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1e3a5f", color: "#fff", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Footer Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 40 }}>
          {/* Company */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>JIACHENG <span style={{ color: "#fbbf24" }}>NETTING</span></div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
              Shandong Jiacheng Chemical Fiber Products Co., Ltd — Professional manufacturer of HDPE plastic netting since 2005.
            </p>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>✓ BSCI Certified • ✓ ISO14001</div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Products</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Debris Netting", "Scaffolding Net", "Shade Net / Tarp", "Tape Shade Net", "Shade Sail", "Anti Hail / Drape Net"].map((item) => (
                <li key={item} style={{ marginBottom: 8, fontSize: 13 }}><Link href="/products" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* More Products */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>More Products</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Olive Net", "Privacy Screen Net", "Anti Bee/Bird Net", "Weed Barrier Fabric", "Wind Barrier Nets", "Aquaculture Nets"].map((item) => (
                <li key={item} style={{ marginBottom: 8, fontSize: 13 }}><Link href="/products" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>📍 Zhanjia Industrial Park, Jinan, China</li>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>📧 Netfactory@factory-jc.com</li>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>🌐 www.nettingfactory.com</li>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>📱 +86 156 2876 4579 (WeChat/WhatsApp)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} Shandong Jiacheng Chemical Fiber Products Co., Ltd. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <Link href="/products" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Products</Link>
            <Link href="/factory" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Factory</Link>
            <Link href="/contact" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
