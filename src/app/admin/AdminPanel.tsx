'use client';

import { useState, useEffect } from 'react';

interface FactoryImage {
  src: string;
  alt: string;
  label: string;
  span: 'full' | 'half';
}

interface FactoryHighlight {
  icon: string;
  title: string;
  desc: string;
}

interface FactoryInfoCard {
  icon: string;
  title: string;
  value: string;
}

interface Product {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  specs: string[];
  applications: string[];
  images: string[];
  appImages: string[];
}

interface BlogPost {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

interface SiteContent {
  hero: { title: string; subtitle: string; cta1: string; cta2: string };
  about: { title: string; subtitle: string; description: string; features: string };
  contact: { email: string; phone: string; whatsapp: string; address: string; workingHours: string };
  footer: { company: string; copyright: string };
  factory: { title: string; subtitle: string; description: string; highlights: FactoryHighlight[]; infoCards: FactoryInfoCard[] };
  factoryImages: FactoryImage[];
  products: Product[];
  blog: BlogPost[];
}

const defaultContent: SiteContent = {
  hero: { title: '', subtitle: '', cta1: 'Get Free Quote', cta2: 'View Products' },
  about: { title: '', subtitle: '', description: '', features: '' },
  contact: { email: '', phone: '', whatsapp: '', address: '', workingHours: '' },
  footer: { company: 'Jiacheng Netting', copyright: '' },
  factory: { title: '', subtitle: '', description: '', highlights: [], infoCards: [] },
  factoryImages: [],
  products: [],
  blog: [],
};

const TABS = ['hero', 'about', 'factory', 'products', 'blog', 'contact', 'footer'] as const;
type TabKey = typeof TABS[number];

const TAB_LABELS: Record<TabKey, string> = {
  hero: 'Home Hero',
  about: 'About Us',
  factory: 'Factory',
  products: 'Products',
  blog: 'Blog',
  contact: 'Contact',
  footer: 'Footer',
};

const baseInput: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: '10px',
  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
};
const s = (p?: React.CSSProperties): React.CSSProperties => p ? { ...baseInput, ...p } : baseInput;

const card: React.CSSProperties = {
  background: '#fff', borderRadius: '12px', padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)', marginBottom: '20px', border: '1px solid #f1f5f9',
};

const lbl: React.CSSProperties = { display: 'block', fontWeight: 600, marginBottom: '6px', color: '#334155', fontSize: '13px' };

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState(false);
  const [tab, setTab] = useState<TabKey>('hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editProd, setEditProd] = useState<number | null>(null);
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    if (!auth) return;
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(data => {
        const sc: SiteContent = {
          hero: data.hero || defaultContent.hero,
          about: {
            ...(data.about || defaultContent.about),
            features: Array.isArray((data.about || {}).features)
              ? (data.about.features as string[]).join(', ')
              : ((data.about || defaultContent.about).features as string),
          },
          contact: data.contact || defaultContent.contact,
          footer: data.footer || defaultContent.footer,
          factory: {
            ...(data.factory || defaultContent.factory),
            highlights: (data.factory?.highlights || defaultContent.factory.highlights),
            infoCards: (data.factory?.infoCards || defaultContent.factory.infoCards),
          },
          factoryImages: [
            { src: '/images/factory/jiacheng-factory-exterior-panorama.jpg', alt: 'Exterior panoramic view of Jiacheng Netting HDPE plastic netting manufacturing facility in Jinan Shandong China', label: 'Factory Exterior - 20,000m2 Manufacturing Base', span: 'full' },
            { src: '/images/factory/jiacheng-workshop-karl-mayer-machines.jpg', alt: 'Advanced warp knitting production lines with Karl Mayer machines manufacturing HDPE nets', label: 'Karl Mayer Warp Knitting Lines', span: 'half' },
            { src: '/images/factory/jiacheng-workshop-wide-angle-production.jpg', alt: 'Wide angle view of Jiacheng Netting modern production workshop with warp knitting machines and skilled workers', label: 'Production Workshop', span: 'half' },
            { src: '/images/factory/jiacheng-warp-knitting-production-colorful-nets.jpg', alt: 'Karl Mayer warp knitting machines producing custom colored HDPE plastic netting in green blue red black and white', label: 'Custom Colored HDPE Netting Production', span: 'full' },
            { src: '/images/factory/jiacheng-warehouse-hdpe-netting-rolls-stacked.jpg', alt: 'Large scale warehouse at Jiacheng Netting with finished HDPE netting rolls stacked on racks ready for export', label: 'Bulk Inventory - Ready for Global Export', span: 'full' },
          ],
          products: data.products || [],
          blog: data.blog || [],
        };
        setContent(sc);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [auth]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: content.hero,
          about: content.about,
          contact: content.contact,
          footer: content.footer,
          factory: content.factory,
          products: content.products,
          blog: content.blog,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      // Notify ContentProvider to refetch
      window.dispatchEvent(new Event('content-updated'));
    } catch {
      setTimeout(() => setSaving(false), 3000);
    }
    setSaving(false);
  };

  const upd = (sec: string, field: string, val: any) =>
    setContent(prev => ({ ...prev, [sec]: { ...(prev as any)[sec], [field]: val } }));

  // LOGIN
  if (!auth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a, #1e3a5f)' }}>
        <div style={{ background: '#fff', padding: 48, borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: 420, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, #1e40af, #3b82f6)', margin: '0 auto 20px' }} />
          <h1 style={{ color: '#1e3a5f', margin: '0 0 6px' }}>Admin Panel</h1>
          <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 14 }}>Jiacheng Netting</p>
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setPwErr(false); }} onKeyDown={e => e.key === 'Enter' && pw === 'wode2020' && setAuth(true)} placeholder="Password" style={s({ marginBottom: 16, borderColor: pwErr ? '#ef4444' : '#e2e8f0' })} />
          {pwErr && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>Wrong password</p>}
          <button onClick={() => pw === 'wode2020' ? setAuth(true) : setPwErr(true)} style={s({ background: '#1e40af', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', padding: 14 })}>Login</button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><p>Loading...</p></div>;
  }

  // TAB RENDERERS
  const HeroTab = (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ color: '#1e3a5f' }}>Home Hero</h2>
      <div style={card}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div><label style={lbl}>Title</label><textarea value={content.hero.title} onChange={e => upd('hero', 'title', e.target.value)} rows={2} style={s({ resize: 'vertical' as const })} /></div>
          <div><label style={lbl}>Subtitle</label><textarea value={content.hero.subtitle} onChange={e => upd('hero', 'subtitle', e.target.value)} rows={3} style={s({ resize: 'vertical' as const })} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>CTA Button 1</label><input type="text" value={content.hero.cta1} onChange={e => upd('hero', 'cta1', e.target.value)} style={s()} /></div>
            <div><label style={lbl}>CTA Button 2</label><input type="text" value={content.hero.cta2} onChange={e => upd('hero', 'cta2', e.target.value)} style={s()} /></div>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutTab = (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ color: '#1e3a5f' }}>About Us</h2>
      <div style={card}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>Title</label><input type="text" value={content.about.title} onChange={e => upd('about', 'title', e.target.value)} style={s()} /></div>
            <div><label style={lbl}>Subtitle</label><input type="text" value={content.about.subtitle} onChange={e => upd('about', 'subtitle', e.target.value)} style={s()} /></div>
          </div>
          <div><label style={lbl}>Company Description</label><textarea value={content.about.description} onChange={e => upd('about', 'description', e.target.value)} rows={8} style={s({ resize: 'vertical' as const, lineHeight: 1.6 })} /></div>
          <div><label style={lbl}>Features (comma-separated)</label><textarea value={content.about.features} onChange={e => upd('about', 'features', e.target.value)} rows={3} style={s({ resize: 'vertical' as const })} /></div>
        </div>
      </div>
    </div>
  );

  const FactoryTab = (
    <div style={{ maxWidth: 1000 }}>
      <h2 style={{ color: '#1e3a5f' }}>Factory</h2>
      <div style={card}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div><label style={lbl}>Title</label><input type="text" value={content.factory.title} onChange={e => upd('factory', 'title', e.target.value)} style={s()} /></div>
          <div><label style={lbl}>Subtitle</label><input type="text" value={content.factory.subtitle} onChange={e => upd('factory', 'subtitle', e.target.value)} style={s()} /></div>
        </div>
        <div style={{ marginTop: 16 }}><label style={lbl}>Description</label><textarea value={content.factory.description} onChange={e => upd('factory', 'description', e.target.value)} rows={4} style={s({ resize: 'vertical' as const })} /></div>
      </div>

      <h3 style={{ color: '#1e3a5f', marginTop: 28, marginBottom: 12 }}>Factory Images ({content.factoryImages.length})</h3>
      {content.factoryImages.map((img, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div onClick={() => window.open(img.src, '_blank')} style={{ width: 220, height: 150, borderRadius: 10, overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer', flexShrink: 0, background: '#f1f5f9' }}>
              <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}><label style={lbl}>Label</label><input type="text" value={img.label} onChange={e => { const n = [...content.factoryImages]; n[i] = { ...n[i], label: e.target.value }; setContent({ ...content, factoryImages: n }); }} style={s()} /></div>
                <div><label style={lbl}>Layout</label><select value={img.span} onChange={e => { const n = [...content.factoryImages]; n[i] = { ...n[i], span: e.target.value as 'full' | 'half' }; setContent({ ...content, factoryImages: n }); }} style={s({ width: 90 })}><option value="full">Full</option><option value="half">Half</option></select></div>
              </div>
              <div><label style={lbl}>Alt Tag (SEO)</label><textarea value={img.alt} onChange={e => { const n = [...content.factoryImages]; n[i] = { ...n[i], alt: e.target.value }; setContent({ ...content, factoryImages: n }); }} rows={3} style={s({ resize: 'vertical' as const })} /></div>
              <div><label style={lbl}>Image Path</label><input type="text" value={img.src} onChange={e => { const n = [...content.factoryImages]; n[i] = { ...n[i], src: e.target.value }; setContent({ ...content, factoryImages: n }); }} style={s()} /></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button disabled={i === 0} onClick={() => { if (i > 0) { const n = [...content.factoryImages]; [n[i-1], n[i]] = [n[i], n[i-1]]; setContent({ ...content, factoryImages: n }); }}} style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: i === 0 ? 'not-allowed' : 'pointer', fontSize: 13 }}>Up</button>
                <button disabled={i === content.factoryImages.length - 1} onClick={() => { if (i < content.factoryImages.length - 1) { const n = [...content.factoryImages]; [n[i], n[i+1]] = [n[i+1], n[i]]; setContent({ ...content, factoryImages: n }); }}} style={{ padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', cursor: i === content.factoryImages.length - 1 ? 'not-allowed' : 'pointer', fontSize: 13 }}>Down</button>
                <button onClick={() => { setContent({ ...content, factoryImages: content.factoryImages.filter((_, idx) => idx !== i) }); }} style={{ padding: '6px 12px', border: '1px solid #fecaca', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#dc2626' }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => setContent({ ...content, factoryImages: [...content.factoryImages, { src: '/images/factory/new-image.jpg', alt: 'New factory image', label: 'New Image', span: 'full' }] })} style={{ padding: '12px 24px', border: '2px dashed #94a3b8', borderRadius: 12, background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#64748b', width: '100%', marginTop: 8 }}>+ Add Image</button>

      {/* Highlights */}
      <h3 style={{ color: '#1e3a5f', marginTop: 32, marginBottom: 12 }}>Factory Highlights ({content.factory.highlights.length})</h3>
      {content.factory.highlights.map((h, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 80px', gap: 12, alignItems: 'end' }}>
            <div><label style={lbl}>Icon</label><input type="text" value={h.icon} onChange={e => { const n = [...content.factory.highlights]; n[i] = { ...n[i], icon: e.target.value }; setContent({ ...content, factory: { ...content.factory, highlights: n } }); }} style={s()} /></div>
            <div><label style={lbl}>Title</label><input type="text" value={h.title} onChange={e => { const n = [...content.factory.highlights]; n[i] = { ...n[i], title: e.target.value }; setContent({ ...content, factory: { ...content.factory, highlights: n } }); }} style={s()} /></div>
            <div><label style={lbl}>Description</label><input type="text" value={h.desc} onChange={e => { const n = [...content.factory.highlights]; n[i] = { ...n[i], desc: e.target.value }; setContent({ ...content, factory: { ...content.factory, highlights: n } }); }} style={s()} /></div>
            <button onClick={() => setContent({ ...content, factory: { ...content.factory, highlights: content.factory.highlights.filter((_, idx) => idx !== i) } })} style={{ padding: '8px 14px', border: '1px solid #fecaca', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#dc2626' }}>Delete</button>
          </div>
        </div>
      ))}
      <button onClick={() => setContent({ ...content, factory: { ...content.factory, highlights: [...content.factory.highlights, { icon: '', title: '', desc: '' }] } })} style={{ padding: '12px 24px', border: '2px dashed #94a3b8', borderRadius: 12, background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#64748b', width: '100%', marginTop: 8 }}>+ Add Highlight</button>

      {/* Info Cards */}
      <h3 style={{ color: '#1e3a5f', marginTop: 32, marginBottom: 12 }}>Factory Info Cards ({content.factory.infoCards.length})</h3>
      {content.factory.infoCards.map((info, i) => (
        <div key={i} style={card}>
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 80px', gap: 12, alignItems: 'end' }}>
            <div><label style={lbl}>Icon</label><input type="text" value={info.icon} onChange={e => { const n = [...content.factory.infoCards]; n[i] = { ...n[i], icon: e.target.value }; setContent({ ...content, factory: { ...content.factory, infoCards: n } }); }} style={s()} /></div>
            <div><label style={lbl}>Title</label><input type="text" value={info.title} onChange={e => { const n = [...content.factory.infoCards]; n[i] = { ...n[i], title: e.target.value }; setContent({ ...content, factory: { ...content.factory, infoCards: n } }); }} style={s()} /></div>
            <div><label style={lbl}>Value</label><input type="text" value={info.value} onChange={e => { const n = [...content.factory.infoCards]; n[i] = { ...n[i], value: e.target.value }; setContent({ ...content, factory: { ...content.factory, infoCards: n } }); }} style={s()} /></div>
            <button onClick={() => setContent({ ...content, factory: { ...content.factory, infoCards: content.factory.infoCards.filter((_, idx) => idx !== i) } })} style={{ padding: '8px 14px', border: '1px solid #fecaca', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#dc2626' }}>Delete</button>
          </div>
        </div>
      ))}
      <button onClick={() => setContent({ ...content, factory: { ...content.factory, infoCards: [...content.factory.infoCards, { icon: '', title: '', value: '' }] } })} style={{ padding: '12px 24px', border: '2px dashed #94a3b8', borderRadius: 12, background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#64748b', width: '100%', marginTop: 8 }}>+ Add Info Card</button>
    </div>
  );

  const ProductsTab = (
    <div style={{ maxWidth: 1000 }}>
      <h2 style={{ color: '#1e3a5f' }}>Products ({content.products.length})</h2>
      {content.products.map((product, i) => (
        <div key={product.id} style={card}>
          <div onClick={() => setEditProd(editProd === i ? null : i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <div><span style={{ fontWeight: 600, color: '#1e3a5f' }}>{product.name}</span><span style={{ color: '#94a3b8', fontSize: 13, marginLeft: 12 }}>{product.nameZh} | {product.id}</span></div>
            <span>{editProd === i ? '^' : 'v'}</span>
          </div>
          {editProd === i && (
            <div style={{ marginTop: 20, borderTop: '1px solid #f1f5f9', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>Name (EN)</label><input type="text" value={product.name} onChange={e => { const p = [...content.products]; p[i] = { ...p[i], name: e.target.value }; setContent({ ...content, products: p }); }} style={s()} /></div>
                <div><label style={lbl}>Name (ZH)</label><input type="text" value={product.nameZh} onChange={e => { const p = [...content.products]; p[i] = { ...p[i], nameZh: e.target.value }; setContent({ ...content, products: p }); }} style={s()} /></div>
              </div>
              <div><label style={lbl}>Description</label><textarea value={product.description} onChange={e => { const p = [...content.products]; p[i] = { ...p[i], description: e.target.value }; setContent({ ...content, products: p }); }} rows={4} style={s({ resize: 'vertical' as const })} /></div>
              <div><label style={lbl}>Specs (one per line)</label><textarea value={product.specs.join('\n')} onChange={e => { const p = [...content.products]; p[i] = { ...p[i], specs: e.target.value.split('\n').filter(Boolean) }; setContent({ ...content, products: p }); }} rows={5} style={s({ resize: 'vertical' as const })} /></div>
              <div><label style={lbl}>Applications (one per line)</label><textarea value={product.applications.join('\n')} onChange={e => { const p = [...content.products]; p[i] = { ...p[i], applications: e.target.value.split('\n').filter(Boolean) }; setContent({ ...content, products: p }); }} rows={4} style={s({ resize: 'vertical' as const })} /></div>
              <div><label style={lbl}>Images (one path per line)</label><textarea value={product.images.join('\n')} onChange={e => { const p = [...content.products]; p[i] = { ...p[i], images: e.target.value.split('\n').filter(Boolean) }; setContent({ ...content, products: p }); }} rows={3} style={s({ resize: 'vertical' as const })} /></div>
              <button onClick={() => { setContent({ ...content, products: content.products.filter((_, idx) => idx !== i) }); setEditProd(null); }} style={{ padding: '8px 18px', border: '1px solid #fecaca', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#dc2626', alignSelf: 'flex-start' }}>Delete Product</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const BlogTab = (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ color: '#1e3a5f' }}>Blog ({content.blog.length})</h2>
      {content.blog.map((post, i) => (
        <div key={post.id} style={card}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: 6, fontSize: 13 }}>#{i + 1}</span>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>{post.category} | {post.date}</span>
          </div>
          <input type="text" value={post.title} onChange={e => { const b = [...content.blog]; b[i] = { ...b[i], title: e.target.value }; setContent({ ...content, blog: b }); }} style={s({ fontWeight: 600, fontSize: 15, marginBottom: 12 })} />
          <textarea value={post.excerpt} onChange={e => { const b = [...content.blog]; b[i] = { ...b[i], excerpt: e.target.value }; setContent({ ...content, blog: b }); }} rows={3} style={s({ resize: 'vertical' as const, marginBottom: 12 })} />
          <div style={{ display: 'flex', gap: 12 }}>
            <div><label style={lbl}>Category</label><input type="text" value={post.category} onChange={e => { const b = [...content.blog]; b[i] = { ...b[i], category: e.target.value }; setContent({ ...content, blog: b }); }} style={s({ width: 120 })} /></div>
            <div><label style={lbl}>Date</label><input type="date" value={post.date} onChange={e => { const b = [...content.blog]; b[i] = { ...b[i], date: e.target.value }; setContent({ ...content, blog: b }); }} style={s({ width: 160 })} /></div>
            <button onClick={() => setContent({ ...content, blog: content.blog.filter((_, idx) => idx !== i) })} style={{ padding: '8px 16px', border: '1px solid #fecaca', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: 13, color: '#dc2626', alignSelf: 'flex-end' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  const ContactTab = (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ color: '#1e3a5f' }}>Contact</h2>
      <div style={card}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div><label style={lbl}>Email</label><input type="email" value={content.contact.email} onChange={e => upd('contact', 'email', e.target.value)} style={s()} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label style={lbl}>Phone</label><input type="text" value={content.contact.phone} onChange={e => upd('contact', 'phone', e.target.value)} style={s()} /></div>
            <div><label style={lbl}>WhatsApp</label><input type="text" value={content.contact.whatsapp} onChange={e => upd('contact', 'whatsapp', e.target.value)} style={s()} /></div>
          </div>
          <div><label style={lbl}>Address</label><textarea value={content.contact.address} onChange={e => upd('contact', 'address', e.target.value)} rows={3} style={s({ resize: 'vertical' as const })} /></div>
          <div><label style={lbl}>Working Hours</label><input type="text" value={content.contact.workingHours} onChange={e => upd('contact', 'workingHours', e.target.value)} style={s()} /></div>
        </div>
      </div>
    </div>
  );

  const FooterTab = (
    <div style={{ maxWidth: 800 }}>
      <h2 style={{ color: '#1e3a5f' }}>Footer</h2>
      <div style={card}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div><label style={lbl}>Company Name</label><input type="text" value={content.footer.company} onChange={e => upd('footer', 'company', e.target.value)} style={s()} /></div>
          <div><label style={lbl}>Copyright</label><input type="text" value={content.footer.copyright} onChange={e => upd('footer', 'copyright', e.target.value)} style={s()} /></div>
        </div>
      </div>
    </div>
  );

  const tabContent: Record<TabKey, JSX.Element> = {
    hero: HeroTab,
    about: AboutTab,
    factory: FactoryTab,
    products: ProductsTab,
    blog: BlogTab,
    contact: ContactTab,
    footer: FooterTab,
  };

  // MAIN LAYOUT
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b' }}>
      <header style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', color: '#fff', padding: '0 30px', height: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>ONLY NETTING Admin</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="/en" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', textDecoration: 'none', fontSize: 13, border: '1px solid rgba(255,255,255,0.2)' }}>View Site</a>
          <button onClick={handleSave} disabled={saving} style={{ padding: '8px 22px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 8, cursor: saving ? 'wait' : 'pointer', background: saved ? '#22c55e' : '#3b82f6', color: '#fff' }}>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}</button>
          <button onClick={() => { setAuth(false); setLoading(true); }} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 13 }}>Logout</button>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        <aside style={{ width: 200, background: '#fff', borderRight: '1px solid #e2e8f0', padding: '16px 0', minHeight: 'calc(100vh - 64px)', position: 'sticky', top: 64, flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ display: 'block', width: '100%', padding: '13px 20px', textAlign: 'left', border: 'none', background: tab === t ? '#eff6ff' : 'transparent', color: tab === t ? '#1e40af' : '#475569', fontWeight: tab === t ? 600 : 400, fontSize: 14, cursor: 'pointer', borderLeft: tab === t ? '3px solid #3b82f6' : '3px solid transparent' }}>{TAB_LABELS[t]}</button>
          ))}
        </aside>
        <main style={{ flex: 1, padding: '32px 40px' }}>
          {tabContent[tab]}
        </main>
      </div>
    </div>
  );
}
