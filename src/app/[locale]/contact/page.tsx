import contentData from '@/data/content.json';

export default function ContactPage() {
  const { contact } = contentData;

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

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#1e3a5f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📞</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>Phone</div>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} style={{ color: "#2563eb", textDecoration: "none", fontSize: 15 }}>{contact.phone}</a>
                </div>
              </div>

              {/* WhatsApp */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#25d366", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>💬</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>WhatsApp</div>
                  <a href={`https://wa.me/${contact.whatsapp.replace(/\s/g, "")}`} target="_blank" rel="noopener" style={{ color: "#2563eb", textDecoration: "none", fontSize: 15 }}>{contact.whatsapp}</a>
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

              {/* Working Hours */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ width: 48, height: 48, background: "#1e3a5f", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🕐</div>
                <div>
                  <div style={{ fontWeight: 600, color: "#1e3a5f", marginBottom: 4 }}>Working Hours</div>
                  <div style={{ color: "#555", fontSize: 15 }}>{contact.workingHours}</div>
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
