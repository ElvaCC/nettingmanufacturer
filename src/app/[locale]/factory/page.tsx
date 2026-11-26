'use client';

import { useContent } from '@/context/ContentContext';

/**
 * On-site production shots, one per product family.
 * All images are first-party factory photography — no stock, no renders.
 */
const PRODUCTS_IN_PRODUCTION = [
  {
    title: 'Debris Netting',
    desc: 'Red debris netting running on our warp knitting line, quarter-inch mesh.',
    image: '/images/factory/production/production-debris-netting-warp-knitting.jpg',
    alt: 'Red HDPE debris netting being knitted on a warp knitting machine at Shandong Jiacheng',
  },
  {
    title: 'Shade Netting',
    desc: 'Tape yarn shade netting wound straight off the machine.',
    image: '/images/factory/production/production-shade-netting-tape-yarn.jpg',
    alt: 'Tape yarn shade netting coming off a warp knitting machine in the Jiacheng factory',
  },
  {
    title: 'Olive Netting',
    desc: 'Olive netting knitted to the mesh pattern each grove requires.',
    image: '/images/factory/production/production-olive-netting-warp-knitting.jpg',
    alt: 'Green olive netting running through a warp knitting machine at Jiacheng Netting',
  },
  {
    title: 'Anti-Hail Netting',
    desc: 'White anti-hail netting on the beam, guide tape in place.',
    image: '/images/factory/production/production-anti-hail-netting-warp-knitting.jpg',
    alt: 'White anti-hail netting being wound on a warp knitting machine at Jiacheng',
  },
  {
    title: 'Anti-Bee Netting',
    desc: 'Fine white insect netting knitted continuously along the machine.',
    image: '/images/factory/production/production-anti-bee-netting-warp-knitting.jpg',
    alt: 'Fine white anti-bee netting running the length of a warp knitting machine at Jiacheng',
  },
  {
    title: 'Scaffolding Net',
    desc: 'Black scaffold netting with red reinforced stripes coming off the beam.',
    image: '/images/factory/production/production-black-scaffolding-netting-warp-knitting.jpg',
    alt: 'Black HDPE scaffolding safety netting with red reinforcing stripes on a warp knitting machine',
  },
];

/** Packaging and outbound logistics, grouped by the stage it documents. */
const PACKAGING_GROUPS = [
  {
    label: 'Product Packaging',
    items: [
      {
        image: '/images/factory/packaging/packaging-debris-netting-rolls-strapped.jpg',
        alt: 'Debris netting rolls strapped together on a steel rack before palletising',
        caption: 'Debris netting rolls strapped and racked for palletising',
      },
      {
        image: '/images/factory/packaging/packaging-shade-netting-rolls-bagged.jpg',
        alt: 'Shade netting rolls bagged in clear film and stacked in the packing area',
        caption: 'Shade netting rolls bagged, labelled and stacked',
      },
    ],
  },
  {
    label: 'Finished Goods Warehouse',
    items: [
      {
        image: '/images/factory/packaging/warehouse-debris-netting-rolls.jpg',
        alt: 'Palletised debris netting rolls stored inside the finished goods warehouse',
        caption: 'Debris netting stock waiting inside the warehouse',
      },
      {
        image: '/images/factory/packaging/warehouse-anti-hail-netting-rolls.jpg',
        alt: 'Anti-hail netting rolls stacked under cover at the factory loading bay',
        caption: 'Anti-hail netting rolls held under cover at the loading bay',
      },
    ],
  },
  {
    label: 'Container Loading',
    items: [
      {
        image: '/images/factory/packaging/loading-debris-netting-container.jpg',
        alt: 'Export container packed floor to ceiling with coloured debris netting rolls',
        caption: 'Mixed-colour debris netting packed floor to ceiling',
      },
      {
        image: '/images/factory/packaging/loading-anti-hail-container.jpg',
        alt: 'White anti-hail netting rolls loaded into a shipping container',
        caption: 'Anti-hail netting loaded to the container roof',
      },
    ],
  },
  {
    label: 'Shipments',
    items: [
      {
        image: '/images/factory/packaging/shipment-container-factory-gate.jpg',
        alt: 'Blue export container and forklift loading HDPE netting rolls in front of the Jiacheng factory building',
        caption: 'Loaded at our own gate in Shanghe County',
      },
      {
        image: '/images/factory/packaging/shipment-netting-truck-loaded.jpg',
        alt: 'Truck loaded with wrapped netting rolls leaving the factory for the port',
        caption: 'Wrapped rolls on the truck, bound for the port',
      },
    ],
  },
];

export default function FactoryPage() {
  const { factory } = useContent();

  return (
    <div style={{ padding: '80px 24px', background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* ── Factory Overview ── */}
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 16, color: '#0B4C8E' }}>
          {factory.title}
        </h1>
        <p style={{ textAlign: 'center', color: '#666', fontSize: 16, margin: '0 auto 40px', maxWidth: 800 }}>
          {factory.subtitle}
        </p>

        <figure className="factory-overview-media">
          <img
            src="/images/factory/factory-overview-yard.jpg"
            alt="Aerial view of the Shandong Jiacheng Chemical Fiber Products factory yard, office building and HDPE netting workshop"
            width={1600}
            height={459}
            loading="eager"
            decoding="async"
          />
        </figure>

        <p className="factory-intro">{factory.description}</p>

        {/* Factory Info Cards */}
        <div className="rgrid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 72 }}>
          <div className="info-card" style={{ background: '#0B4C8E', color: '#fff', padding: 32, borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{factory.info.area}</div>
            <div style={{ fontSize: 14, marginTop: 8, opacity: 0.8 }}>Factory Area</div>
          </div>
          <div className="info-card" style={{ background: '#fff', padding: 32, borderRadius: 12, textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0B4C8E' }}>{factory.info.experience}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: '#666' }}>Experience</div>
          </div>
          <div className="info-card" style={{ background: '#fff', padding: 32, borderRadius: 12, textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0B4C8E' }}>{factory.info.employees}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: '#666' }}>Employees</div>
          </div>
          <div className="info-card" style={{ background: '#fff', padding: 32, borderRadius: 12, textAlign: 'center', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#0B4C8E' }}>{factory.info.exports}</div>
            <div style={{ fontSize: 14, marginTop: 8, color: '#666' }}>Export Markets</div>
          </div>
        </div>

        {/* ── Production Process ── */}
        <div className="factory-section-head">
          <h2>Production Process</h2>
          <p>Eight Steps from HDPE Resin to Container Loading.</p>
        </div>
        <div className="rgrid-4 process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
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

        {/* ── Products in Production ── */}
        <div className="factory-section-head" style={{ marginTop: 88 }}>
          <h2>Products in Production</h2>
          <p>Every product we quote, running on our own knitting machines.</p>
        </div>
        <div className="rgrid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {PRODUCTS_IN_PRODUCTION.map((item) => (
            <div key={item.title} className="showcase-card">
              <div className="showcase-media">
                <img src={item.image} alt={item.alt} width={960} height={960} loading="lazy" decoding="async" />
              </div>
              <div className="showcase-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Packaging & Shipments ── */}
        <div className="factory-section-head" style={{ marginTop: 88 }}>
          <h2>Packaging &amp; Shipments</h2>
          <p>How your order is packed, stored and loaded — all under one roof.</p>
        </div>
        <div>
          {PACKAGING_GROUPS.map((group) => (
            <div key={group.label} className="ps-block">
              <h3 className="ps-label">{group.label}</h3>
              <div className="ps-grid">
                {group.items.map((item) => (
                  <figure key={item.image} className="ps-item" style={{ margin: 0 }}>
                    <img src={item.image} alt={item.alt} width={960} height={960} loading="lazy" decoding="async" />
                    <figcaption className="ps-caption">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
