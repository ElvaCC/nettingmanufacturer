"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1e3a5f", color: "#fff", padding: "60px 24px 24px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Footer Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
          {/* About */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>About Us</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/about" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Company Profile</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/factory" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Factory</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/certifications" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Certifications</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Products</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/products" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>HDPE Safety Net</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/products" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Shade Net</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/products" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Anti-hail Net</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/products" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Bird Net</Link></li>
            </ul>
          </div>

          {/* Applications */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Applications</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/applications" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Construction</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/applications" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Agriculture</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/applications" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Sports</Link></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Solutions</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/solutions" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Custom Logo</Link></li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/solutions" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>Custom Specs</Link></li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Blog</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}><Link href="/blog" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>News</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>Tel: +86 156 2876 4579</li>
              <li style={{ marginBottom: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>sales@nettingmanufacturer.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Copyright © 2024 NettingManufacturer. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
