'use client';

import { useContent } from '@/context/ContentContext';
import { WHATSAPP_QR, WECHAT_QR } from '@/data/qr-codes';

export default function ContactPage() {
  const { contact } = useContent();

  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Contact Us</h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 64, maxWidth: 700, margin: "0 auto 64px" }}>
          Get in touch with our team for quotes, samples, and OEM/ODM inquiries. We respond within 24 hours.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 48 }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1e3a5f", marginBottom: 32 }}>Get In Touch</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Email */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#1e3a5f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✉</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>Email</div>
                  <a href={`mailto:${contact.email}`} style={{ color: "#2563eb", textDecoration: "none", fontSize: 15 }}>{contact.email}</a>
                </div>
              </div>

              {/* WhatsApp & WeChat side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* WhatsApp */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "#25d366", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>WhatsApp</div>
                    <a href={`https://wa.me/${contact.whatsapp.replace(/\s/g, "")}`} target="_blank" rel="noopener" style={{ color: "#2563eb", textDecoration: "none", fontSize: 15 }}>{contact.whatsapp}</a>
                    <div style={{ marginTop: 12 }}>
                      <img src={WHATSAPP_QR} alt="WhatsApp QR Code" style={{ width: 120, height: 120, borderRadius: 8, border: "1px solid #e5e7eb", objectFit: "cover" }} />
                      <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>Scan to chat</div>
                    </div>
                  </div>
                </div>

                {/* WeChat */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: "#07c160", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.96c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" fill="#fff"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>WeChat</div>
                    <span style={{ color: "#555", fontSize: 15 }}>{contact.wechat || "Netfactory01"}</span>
                    <div style={{ marginTop: 12 }}>
                      <img src={WECHAT_QR} alt="WeChat QR Code" style={{ width: 120, height: 120, borderRadius: 8, border: "1px solid #e5e7eb", objectFit: "cover" }} />
                      <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>Scan to add</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#1e3a5f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📍</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>Address</div>
                  <div style={{ color: "#555", fontSize: 15, lineHeight: 1.6 }}>{contact.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{ background: "#f9fafb", padding: 40, borderRadius: 16, border: "1px solid #e5e7eb" }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1e3a5f", marginBottom: 32 }}>Send Us a Message</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: 20 }} action={`mailto:${contact.email}`} method="POST" encType="text/plain">
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Name *</label>
                <input type="text" name="name" required style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, boxSizing: "border-box" }} placeholder="Your name" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Email *</label>
                <input type="email" name="email" required style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, boxSizing: "border-box" }} placeholder="your@email.com" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Message *</label>
                <textarea name="message" required rows={5} style={{ width: "100%", padding: "12px 16px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 15, boxSizing: "border-box", resize: "vertical" }} placeholder="Tell us about your requirements..." />
              </div>
              <button type="submit" style={{ width: "100%", padding: "14px 0", background: "#1e3a5f", color: "#fff", border: "none", borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
