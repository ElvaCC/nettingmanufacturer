export default function ContactPage() {
  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 48 }}>Contact Us</h1>
        
        {/* Contact Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 48 }}>
          {/* Contact Info */}
          <div style={{ border: "2px dashed #ccc", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
            <span style={{ color: "#999" }}>Contact Info</span>
          </div>
          {/* Contact Form */}
          <div style={{ border: "2px dashed #ccc", padding: 40, minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
            <span style={{ color: "#999" }}>Contact Form</span>
          </div>
        </div>
      </div>
    </div>
  );
}
