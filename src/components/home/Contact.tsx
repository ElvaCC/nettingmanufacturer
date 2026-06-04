"use client";

import { useState } from "react";
import { useContent } from "@/context/ContentContext";
import { WHATSAPP_QR, WECHAT_QR } from "@/data/qr-codes";

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
