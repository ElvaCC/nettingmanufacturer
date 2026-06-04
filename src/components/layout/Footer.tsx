"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContent } from "@/context/ContentContext";

export default function Footer() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const getPath = (href: string) => `/${locale}${href}`;
  const { footer, contact, products } = useContent();
  
  return (
    <footer style={{ background: "#1e3a5f", color: "#fff", padding: "60px 24px 30px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Footer Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 40 }}>
          {/* Company */}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>{footer.company} <span style={{ color: "#fbbf24" }}>NETTING</span></div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>
              {footer.tagline || "Professional manufacturer of HDPE plastic netting since 2005."}
            </p>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{footer.certifications || "✓ BSCI Certified • ✓ NFPA-701 Certificate • 21+ Years Experience"}</div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Products</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {products.slice(0, 6).map((item) => (
                <li key={item.id} style={{ marginBottom: 8, fontSize: 13 }}><Link href={getPath("/products")} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{item.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* More Products */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>More Products</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {products.slice(6, 12).map((item) => (
                <li key={item.id} style={{ marginBottom: 8, fontSize: 13 }}><Link href={getPath("/products")} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{item.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "#fbbf24" }}>Contact Us</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>📍 {contact.address}</li>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>📧 {contact.email}</li>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>📧 {contact.email}</li>
              <li style={{ marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>💬 WhatsApp: {contact.whatsapp} <span style={{ margin: "0 6px", opacity: 0.4 }}>|</span> WeChat: {contact.wechat || "Netfactory01"}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            {footer.copyright}
          </p>
          <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
            <Link href={getPath("/")} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <Link href={getPath("/products")} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Products</Link>
            <Link href={getPath("/factory")} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Factory</Link>
            <Link href={getPath("/contact")} style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
