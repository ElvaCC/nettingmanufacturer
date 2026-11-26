'use client';

import { useContent } from '@/context/ContentContext';

export default function FactoryPage() {
  const { factory } = useContent();

  return (
    <div style={{ padding: "80px 24px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#0B4C8E" }}>{factory.title}</h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 32, maxWidth: 800, margin: "0 auto 32px" }}>
          {factory.subtitle}
        </p>

        {/* Factory hero — container loading with our company name visible */}
        <div className="factory-hero">
          <img
            src="/images/factory/factory-hero-container-loading.jpg"
            alt="Shandong Jiacheng Chemical Fiber Products factory building with an export container being loaded at our own gate"
            width={1400}
            height={648}
          />
        </div>

        {/* Factory Info Cards */}
        <div className="rgrid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 64 }}>
          <div style={{ background: "#0B4C8E", color: "#fff", padding: 32, borderRadius: 12, textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{factory.info.area}</div>
            <div style={{ fontSize: 14, marginTop: 8, opacity: 0.8 }}>Factory Area</div>
          </div>
          <div style={{ background: "#fff", padding: 32, borderRadius: 12, textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#0B4C8E" }}>{factory.info.experience}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>Knitting Machines</div>
          </div>
          <div style={{ background: "#fff", padding: 32, borderRadius: 12, textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#0B4C8E" }}>{factory.info.employees}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>Employees</div>
          </div>
          <div style={{ background: "#fff", padding: 32, borderRadius: 12, textAlign: "center", border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "#0B4C8E" }}>{factory.info.exports}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: "#666" }}>Export Markets</div>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "#555", marginBottom: 64, textAlign: "left", maxWidth: 900, margin: "0 auto 64px" }}>
          {factory.description}
        </p>

        {/* Production Process */}
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", marginBottom: 12, color: "#0B4C8E" }}>Production Process</h2>
        <p style={{ textAlign: "center", color: "#8a94a6", fontSize: 14, marginBottom: 40 }}>
          Eight steps from HDPE resin to a container loaded at our own gate
        </p>
        <div className="rgrid-4 process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {factory.process.map((item: any) => (
            <div key={item.step} className="process-card">
              {item.image && (
                <div className="process-media">
                  <img
                    src={item.image}
                    alt={item.imageAlt || `${item.title} — HDPE netting production at Jiacheng Netting`}
                    width={672}
                    height={377}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="process-step">{item.step}</span>
                </div>
              )}
              <div className="process-body">
                {!item.image && <div className="process-step-inline">{item.step}</div>}
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Container Loading Gallery */}
        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: "center", margin: "72px 0 12px", color: "#0B4C8E" }}>
          Loading at Our Own Gate
        </h2>
        <p style={{ textAlign: "center", color: "#8a94a6", fontSize: 14, marginBottom: 32 }}>
          Containers packed and loaded in Shandong — see our name on the building, not just on the invoice.
        </p>
        <div className="loading-gallery">
          <img
            src="/images/factory/loading-gallery-1.jpg"
            alt="Forklift loading HDPE netting rolls into a container outside the Shandong Jiacheng Chemical Fiber Products factory"
            width={900}
            height={675}
            loading="lazy"
          />
          <img
            src="/images/factory/loading-gallery-2.jpg"
            alt="Palletised pink HDPE netting rolls ready for container loading with the Jiacheng company name on the building"
            width={900}
            height={675}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
