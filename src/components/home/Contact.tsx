export default function Contact() {
  return (
    <section style={{ padding: "80px 24px", background: "#f9fafb" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Title */}
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>
          Contact Us
        </h2>
        {/* Contact Layout - 框架占位 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Left - Contact Info */}
          <div style={{ border: "2px dashed #ccc", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#999" }}>Contact Info</span>
          </div>
          {/* Right - Contact Form */}
          <div style={{ border: "2px dashed #ccc", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#999" }}>Contact Form</span>
          </div>
        </div>
      </div>
    </section>
  );
}
