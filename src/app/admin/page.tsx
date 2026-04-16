'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [content, setContent] = useState({
    hero: { title: '', subtitle: '', cta1: '', cta2: '' },
    about: { title: '', subtitle: '', description: '', features: '' },
    contact: { email: '', phone: '', whatsapp: '', address: '', workingHours: '' },
    footer: { company: '', copyright: '' },
  });

  // Load data on mount
  useState(() => {
    fetch('/api/admin/content')
      .then(r => r.json())
      .then(data => {
        if (data.hero) setContent(prev => ({ ...prev, ...data }));
      })
      .catch(() => {});
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
      else alert('保存失败');
    } catch { alert('网络错误'); }
    setLoading(false);
  };

  const inputStyle = { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" as const };
  const labelStyle = { display: "block" as const, fontWeight: "600" as const, marginBottom: "5px" };

  const Field = ({ label, field, area }: { label: string; field: string; area?: boolean }) => (
    <div>
      <label style={labelStyle}>{label}</label>
      {area ? (
        <textarea
          value={(content as any)[field]}
          onChange={e => setContent(p => ({ ...p, [field]: e.target.value }))}
          rows={4} style={{ ...inputStyle, fontFamily: "monospace" }}
        />
      ) : (
        <input
          type="text"
          value={(content as any)[field]}
          onChange={e => setContent(p => ({ ...p, [field]: e.target.value }))}
          style={inputStyle}
        />
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "#2563eb", color: "white", padding: "20px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px" }}>网站后台管理面板</h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "14px" }}>JIACHENG NETTING</p>
        </div>
        <button onClick={handleSave} disabled={loading} style={{
          padding: "12px 28px", fontSize: "16px", fontWeight: "600",
          border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: saved ? "#22c55e" : "white", color: saved ? "white" : "#2563eb"
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
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
          {activeTab === 'hero' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0 }}>首页 Hero 设置</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="主标题" field="hero.title" area />
                <Field label="副标题" field="hero.subtitle" area />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <Field label="按钮1文字" field="hero.cta1" />
                  <Field label="按钮2文字" field="hero.cta2" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0 }}>关于我们</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="标题" field="about.title" />
                <Field label="副标题" field="about.subtitle" />
                <Field label="公司描述" field="about.description" area />
                <Field label="特点（逗号分隔）" field="about.features" area />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0 }}>联系方式</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="📧 邮箱" field="contact.email" />
                <Field label="📱 电话" field="contact.phone" />
                <Field label="💬 WhatsApp" field="contact.whatsapp" />
                <Field label="📍 地址" field="contact.address" area />
                <Field label="⏰ 工作时间" field="contact.workingHours" />
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div style={{ maxWidth: "700px" }}>
              <h2 style={{ marginTop: 0 }}>页脚设置</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <Field label="公司名称" field="footer.company" />
                <Field label="版权信息" field="footer.copyright" />
              </div>
            </div>
          )}

          {!['hero','about','contact','footer'].includes(activeTab) && <p>请选择左侧标签页</p>}
        </main>
      </div>
    </div>
  );
}
