'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>({
    hero: { title: '', subtitle: '', cta1: 'Get Free Quote', cta2: 'View Products' },
    about: { title: '', subtitle: '', description: '', features: '' },
    contact: { email: '', phone: '', whatsapp: '', address: '', workingHours: '' },
    footer: { company: 'JIACHENG NETTING', copyright: '© 2024 JIACHENG NETTING' },
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then((data: any) => {
        if (data.hero) {
          setContent((prev: any) => ({ ...prev, ...data }));
          setLoaded(true);
        }
      })
      .catch(err => {
        console.error('Load error:', err);
        setLoaded(true);
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('保存失败');
      }
    } catch {
      alert('网络错误');
    }
    setLoading(false);
  };

  const inputStyle = { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" as const };
  const textareaStyle = { ...inputStyle, fontFamily: "monospace", resize: "vertical" as const };
  const labelStyle = { display: "block" as const, fontWeight: "600" as const, marginBottom: "5px" };

  const Field = ({ label, value, onChange, area }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      {area ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} style={textareaStyle} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} style={inputStyle} />
      )}
    </div>
  );

  const updateContent = (path: string, value: any) => {
    setContent((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const getValue = (path: string): string => {
    const keys = path.split('.');
    let val: any = content;
    for (const k of keys) {
      val = val?.[k];
    }
    return val ?? '';
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
        color: "white", padding: "20px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px" }}>网站后台管理面板</h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "14px" }}>JIACHENG NETTING</p>
        </div>
        <button onClick={handleSave} disabled={loading} style={{
          padding: "12px 28px", fontSize: "16px", fontWeight: "600",
          border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: saved ? "#22c55e" : "white", color: saved ? "white" : "#1e40af",
          transition: "all 0.3s"
        }}>
          {saved ? '✅ 已保存！' : loading ? '保存中...' : '💾 保存更改'}
        </button>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        {/* Sidebar */}
        <aside style={{ width: "220px", backgroundColor: "white", borderRight: "1px solid #e0e0e0", padding: "15px 0" }}>
          {[
            { id: 'hero', label: '🏠 首页 Hero' },
            { id: 'about', label: '📋 关于我们' },
            { id: 'contact', label: '📞 联系方式' },
            { id: 'footer', label: '🔽 页脚 Footer' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: "block", width: "100%", padding: "14px 20px",
              textAlign: "left", border: "none",
              backgroundColor: activeTab === tab.id ? '#eff6ff' : 'transparent',
              color: activeTab === tab.id ? '#2563eb' : '#374151',
              fontWeight: activeTab === tab.id ? '600' : '400', fontSize: "14px",
              cursor: "pointer",
              borderLeft: activeTab === tab.id ? '4px solid #3b82f6' : '4px solid transparent'
            }}>
              {tab.label}
            </button>
          ))}
          
          <div style={{ marginTop: "20px", padding: "0 20px" }}>
            <p style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", marginBottom: "8px" }}>快速链接</p>
            <a href="/" target="_blank" style={{ display: "block", padding: "8px 0", color: "#6b7280", textDecoration: "none", fontSize: "13px" }}>
              → 网站首页
            </a>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
          {activeTab === 'hero' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af" }}>首页 Hero 设置</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="主标题 (Title)" value={getValue('hero.title')} onChange={v => updateContent('hero.title', v)} area />
                <Field label="副标题 (Subtitle)" value={getValue('hero.subtitle')} onChange={v => updateContent('hero.subtitle', v)} area />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <Field label="按钮1文字" value={getValue('hero.cta1')} onChange={v => updateContent('hero.cta1', v)} />
                  <Field label="按钮2文字" value={getValue('hero.cta2')} onChange={v => updateContent('hero.cta2', v)} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af" }}>关于我们</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="标题" value={getValue('about.title')} onChange={v => updateContent('about.title', v)} />
                <Field label="副标题" value={getValue('about.subtitle')} onChange={v => updateContent('about.subtitle', v)} />
                <Field label="公司描述" value={getValue('about.description')} onChange={v => updateContent('about.description', v)} area />
                <Field label="特点（逗号分隔）" value={getValue('about.features')} onChange={v => updateContent('about.features', v)} area />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af" }}>联系方式</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="📧 邮箱" value={getValue('contact.email')} onChange={v => updateContent('contact.email', v)} />
                <Field label="📱 电话" value={getValue('contact.phone')} onChange={v => updateContent('contact.phone', v)} />
                <Field label="💬 WhatsApp" value={getValue('contact.whatsapp')} onChange={v => updateContent('contact.whatsapp', v)} />
                <Field label="📍 地址" value={getValue('contact.address')} onChange={v => updateContent('contact.address', v)} area />
                <Field label="⏰ 工作时间" value={getValue('contact.workingHours')} onChange={v => updateContent('contact.workingHours', v)} />
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af" }}>页脚设置</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="公司名称" value={getValue('footer.company')} onChange={v => updateContent('footer.company', v)} />
                <Field label="版权信息" value={getValue('footer.copyright')} onChange={v => updateContent('footer.copyright', v)} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
