'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [content, setContent] = useState({
    hero: {
      title: 'Professional HDPE Plastic Netting Manufacturer Since 2005',
      subtitle: 'Leading manufacturer of construction safety nets, agricultural nets, and specialty plastic netting solutions.',
      cta1: 'Get Free Quote',
      cta2: 'View Products'
    },
    about: {
      title: 'About JIACHENG NETTING',
      subtitle: 'Your Trusted HDPE Netting Partner Since 2005',
      description: 'JIACHENG NETTING is a leading manufacturer of high-quality HDPE plastic netting products.',
      features: 'BSCI Certified, ISO14001 Certified, 20,000m² Production, Export to 50+ Countries'
    },
    contact: {
      email: 'sales@jiachengnetting.com',
      phone: '+86 531 8888 8888',
      whatsapp: '+86 138 0000 0000',
      address: 'No. 88 Industrial Park Road, Jinan City, Shandong Province, China',
      workingHours: 'Monday - Saturday: 8:00 AM - 6:00 PM (CST)'
    },
    footer: {
      company: 'JIACHENG NETTING',
      copyright: '© 2024 JIACHENG NETTING. All Rights Reserved.'
    }
  });

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
        alert('保存失败，请重试');
      }
    } catch {
      alert('网络错误');
    }
    setLoading(false);
  };

  const updateField = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const inputStyle = { width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box" as const };
  const textareaStyle = { ...inputStyle, fontFamily: "monospace", resize: "vertical" as const };
  const labelStyle = { display: "block" as const, fontWeight: "600" as const, marginBottom: "5px", color: "#374151" as const };

  const tabs = [
    { id: 'hero', label: '🏠 首页 Hero' },
    { id: 'about', label: '📋 关于我们' },
    { id: 'contact', label: '📞 联系方式' },
    { id: 'footer', label: '🔽 页脚 Footer' },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
        color: "white", padding: "20px 30px",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>网站后台管理</h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "14px" }}>JIACHENG NETTING</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            padding: "12px 30px", fontSize: "16px", fontWeight: "600",
            border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: saved ? "#22c55e" : "white",
            color: saved ? "white" : "#1e40af"
          }}
        >
          {saved ? '✓ 已保存' : loading ? '保存中...' : '💾 保存更改'}
        </button>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        {/* Sidebar */}
        <aside style={{ width: "240px", backgroundColor: "white", borderRight: "1px solid #e0e0e0", padding: "20px 0" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "block", width: "100%", padding: "16px 24px",
                textAlign: "left", border: "none",
                backgroundColor: activeTab === tab.id ? '#eff6ff' : 'transparent',
                color: activeTab === tab.id ? '#2563eb' : '#374151',
                fontWeight: activeTab === tab.id ? '600' : '400',
                fontSize: "15px",
                cursor: "pointer",
                borderLeft: activeTab === tab.id ? '4px solid #3b82f6' : '4px solid transparent'
              }}
            >
              {tab.label}
            </button>
          ))}

          <div style={{ marginTop: "30px", padding: "0 24px" }}>
            <a href="/" target="_blank" style={{ display: "block", padding: "10px 0", color: "#6b7280", textDecoration: "none", fontSize: "14px" }}>
              → 访问网站首页
            </a>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
          {activeTab === 'hero' && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af", fontSize: "24px" }}>首页 Hero 设置</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <label style={labelStyle}>主标题</label>
                  <textarea
                    value={content.hero.title}
                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                    rows={3}
                    style={textareaStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>副标题</label>
                  <textarea
                    value={content.hero.subtitle}
                    onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                    rows={4}
                    style={textareaStyle}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={labelStyle}>按钮 1 文字</label>
                    <input
                      type="text"
                      value={content.hero.cta1}
                      onChange={(e) => updateField('hero', 'cta1', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>按钮 2 文字</label>
                    <input
                      type="text"
                      value={content.hero.cta2}
                      onChange={(e) => updateField('hero', 'cta2', e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af", fontSize: "24px" }}>关于我们</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div>
                  <label style={labelStyle}>标题</label>
                  <input type="text" value={content.about.title} onChange={(e) => updateField('about', 'title', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>副标题</label>
                  <input type="text" value={content.about.subtitle} onChange={(e) => updateField('about', 'subtitle', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>公司描述</label>
                  <textarea value={content.about.description} onChange={(e) => updateField('about', 'description', e.target.value)} rows={5} style={textareaStyle} />
                </div>
                <div>
                  <label style={labelStyle}>特点列表</label>
                  <textarea value={content.about.features} onChange={(e) => updateField('about', 'features', e.target.value)} rows={3} style={textareaStyle} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af", fontSize: "24px" }}>联系方式</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div><label style={labelStyle}>邮箱</label><input type="text" value={content.contact.email} onChange={(e) => updateField('contact', 'email', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>电话</label><input type="text" value={content.contact.phone} onChange={(e) => updateField('contact', 'phone', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>WhatsApp</label><input type="text" value={content.contact.whatsapp} onChange={(e) => updateField('contact', 'whatsapp', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>地址</label><textarea value={content.contact.address} onChange={(e) => updateField('contact', 'address', e.target.value)} rows={3} style={textareaStyle} /></div>
                <div><label style={labelStyle}>工作时间</label><input type="text" value={content.contact.workingHours} onChange={(e) => updateField('contact', 'workingHours', e.target.value)} style={inputStyle} /></div>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div style={{ maxWidth: "800px" }}>
              <h2 style={{ marginTop: 0, color: "#1e40af", fontSize: "24px" }}>页脚设置</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div><label style={labelStyle}>公司名称</label><input type="text" value={content.footer.company} onChange={(e) => updateField('footer', 'company', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>版权信息</label><input type="text" value={content.footer.copyright} onChange={(e) => updateField('footer', 'copyright', e.target.value)} style={inputStyle} /></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
