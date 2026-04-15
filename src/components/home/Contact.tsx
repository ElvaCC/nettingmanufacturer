"use client";

import { useState } from "react";
import contentData from '@/data/content.json';

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const { contact } = contentData;

  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#1e3a5f" }}>Contact Us</h2>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 48 }}>Get in touch for inquiries and custom orders</p>

        {/* Contact Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48 }}>
          {/* Left - Contact Info */}
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 36, border: "1px solid #e5e7eb" }}>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: "#1e3a5f", marginBottom: 28 }}>Get In Touch</h3>

              {/* Company Name */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, color: "#1e3a5f", fontSize: 16, marginBottom: 4 }}>JIACHENG NETTING</div>
                <div style={{ fontSize: 13, color: "#888" }}>(山东佳诚网具)</div>
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

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>📱</span>
                  <div>
                    <div style={{ fontWeight: 500, color: "#333", fontSize: 14, marginBottom: 2 }}>Phone / WhatsApp</div>
                    <div style={{ fontSize: 13, color: "#2563eb" }}>{contact.phone}</div>
                    <div style={{ fontSize: 13, color: "#25D366" }}>WhatsApp: {contact.whatsapp}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>⏰</span>
                  <div>
                    <div style={{ fontWeight: 500, color: "#333", fontSize: 14, marginBottom: 2 }}>Working Hours</div>
                    <div style={{ fontSize: 13, color: "#666" }}>{contact.workingHours}</div>
                  </div>
                </div>
              </div>

              {/* Export Info */}
              <div style={{ marginTop: 24, padding: 16, background: "#f0f9ff", borderRadius: 8, borderLeft: "4px solid #2563eb" }}>
                <div style={{ fontSize: 13, color: "#0369a1", lineHeight: 1.6 }}>
                  <strong>Export Markets:</strong> North America, South America, Europe, Middle East, Asia, Africa
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 36, border: "1px solid #e5e7eb" }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, color: "#1e3a5f", marginBottom: 24 }}>Send Inquiry</h3>

            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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

              <button type="submit"
                style={{ padding: "14px 32px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer", alignSelf: "flex-start" }}
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
