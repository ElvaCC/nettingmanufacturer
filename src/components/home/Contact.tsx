"use client";

import { useState } from "react";
import { useContent } from "@/context/ContentContext";
// QR Code data URLs (inline)
const WHATSAPP_QR = 'data:image/jpeg;base64,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';
const WECHAT_QR = 'data:image/jpeg;base64,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';

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { contact, contactPage } = useContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          country: "",
          product: formData.message.substring(0, 100),
          message: formData.message,
          phone: formData.phone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const pageTitle = (contactPage as any)?.title || "Contact Us";
  const pageSubtitle = (contactPage as any)?.subtitle || "Get in touch for inquiries and custom orders";
  const exportMarkets = (contactPage as any)?.exportMarkets || "North America, South America, Europe, Middle East, Asia, Africa";

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>{pageTitle}</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>{pageSubtitle}</p>

        {/* Contact Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48 }}>
          {/* Left - Contact Info */}
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 36, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: "#1e3a5f", marginBottom: 28 }}>Get In Touch</h3>

              {/* Company Name */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, color: "#1e3a5f", fontSize: 16, marginBottom: 4 }}>Jiacheng Netting</div>
                <div style={{ fontSize: 13, color: "#888" }}>Shandong Jiacheng Chemical Fiber Products Co., Ltd.</div>
              </div>

              {/* Contact Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>📍</span>
                  <div>
                    <div style={{ fontWeight: 500, color: "#333", fontSize: 14, marginBottom: 2 }}>Factory Address</div>
                    <div style={{ fontSize: 13, color: "#666" }}>{contact.address}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>📧</span>
                  <div>
                    <div style={{ fontWeight: 500, color: "#333", fontSize: 14, marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: 13, color: "#2563eb" }}>{contact.email}</div>
                  </div>
                </div>

                {/* WhatsApp & WeChat side by side */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {/* WhatsApp */}
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "#25D366", borderRadius: 8 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/>
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontWeight: 500, color: "#333", fontSize: 14, marginBottom: 2 }}>WhatsApp</div>
                      <a href={`https://wa.me/${contact.whatsapp.replace(/\s/g, "")}`} target="_blank" rel="noopener" style={{ fontSize: 13, color: "#25D366", textDecoration: "none" }}>{contact.whatsapp}</a>
                      <div style={{ marginTop: 8 }}>
                        <img src={WHATSAPP_QR} alt="WhatsApp QR Code" style={{ width: 100, height: 100, borderRadius: 8, border: "1px solid #e5e7eb", objectFit: "cover" }} />
                        <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>Scan to chat</div>
                      </div>
                    </div>
                  </div>

                  {/* WeChat */}
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, background: "#07C160", borderRadius: 8 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.96c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" fill="#fff"/>
                      </svg>
                    </span>
                    <div>
                      <div style={{ fontWeight: 500, color: "#333", fontSize: 14, marginBottom: 2 }}>WeChat</div>
                      <span style={{ fontSize: 13, color: "#07c160" }}>{contact.wechat || "Netfactory01"}</span>
                      <div style={{ marginTop: 8 }}>
                        <img src={WECHAT_QR} alt="WeChat QR Code" style={{ width: 100, height: 100, borderRadius: 8, border: "1px solid #e5e7eb", objectFit: "cover" }} />
                        <div style={{ fontSize: 11, color: "#999", marginTop: 4 }}>Scan to add</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Info */}
              <div style={{ marginTop: 24, padding: 16, background: "#f0f9ff", borderRadius: 8, borderLeft: "4px solid #2563eb" }}>
                <div style={{ fontSize: 13, color: "#0369a1", lineHeight: 1.6 }}>
                  <strong>Export Markets:</strong> {exportMarkets}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 36, border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#1e3a5f", marginBottom: 24 }}>Send Inquiry</h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 4 }}>Your Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full name"
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 4 }}>Email Address *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="email@example.com"
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 4 }}>Company Name</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Your company"
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 4 }}>Phone / WhatsApp</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+86 ..."
                    style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#555", display: "block", marginBottom: 4 }}>Message / Product Interest *</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  placeholder="Tell us which products you're interested in (Debris Netting, Scaffolding Net, Shade Net, etc.) and your requirements..."
                  style={{ width: "100%", padding: "10px 14px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, resize: "vertical", boxSizing: "border-box" }}
                />
              </div>

              <button type="submit" disabled={status === "sending"}
                style={{ padding: "14px 32px", background: status === "sending" ? "#93c5fd" : "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: status === "sending" ? "not-allowed" : "pointer", alignSelf: "flex-start" }}
              >
                {status === "sending" ? "Sending..." : status === "success" ? "✓ Sent Successfully!" : status === "error" ? "✕ Failed, Try Again" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
