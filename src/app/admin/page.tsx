'use client';

import { useState } from 'react';
import contentData from '@/data/content.json';

interface ContentData {
  hero: { title: string; subtitle: string; cta1: string; cta2: string };
  about: { title: string; subtitle: string; description: string; features: string[] };
  products: Array<{ id: string; name: string; nameZh: string; description: string; specs: string[] }>;
  factory: { title: string; subtitle: string; description: string; info: Record<string, string> };
  contact: { email: string; phone: string; whatsapp: string; address: string; workingHours: string };
  footer: { company: string; copyright: string };
  blog: Array<{ id: number; title: string; date: string; excerpt: string; category: string }>;
}

export default function AdminPage() {
  const [content, setContent] = useState<ContentData>(contentData as ContentData);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'hero', label: '🏠 首页 Hero' },
    { id: 'about', label: '📋 关于我们' },
    { id: 'contact', label: '📞 联系方式' },
    { id: 'footer', label: '🔽 页脚 Footer' },
    { id: 'factory', label: '🏭 工厂介绍' },
    { id: 'products', label: '📦 产品管理' },
    { id: 'blog', label: '📰 博客文章' },
  ];

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      alert('保存失败：' + String(error));
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    fontFamily: "monospace",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontWeight: "600",
    marginBottom: "5px",
  };

  // Hero Tab
  const renderHero = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>首页 Hero 区域设置</h3>
      <div>
        <label style={labelStyle}>主标题 (Title)</label>
        <textarea value={content.hero.title} onChange={(e) => setContent(p => ({ ...p, hero: { ...p.hero, title: e.target.value } }))} rows={3} style={textareaStyle} />
      </div>
      <div>
        <label style={labelStyle}>副标题 (Subtitle)</label>
        <textarea value={content.hero.subtitle} onChange={(e) => setContent(p => ({ ...p, hero: { ...p.hero, subtitle: e.target.value } }))} rows={3} style={textareaStyle} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div>
          <label style={labelStyle}>按钮1文字</label>
          <input type="text" value={content.hero.cta1} onChange={(e) => setContent(p => ({ ...p, hero: { ...p.hero, cta1: e.target.value } }))} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>按钮2文字</label>
          <input type="text" value={content.hero.cta2} onChange={(e) => setContent(p => ({ ...p, hero: { ...p.hero, cta2: e.target.value } }))} style={inputStyle} />
        </div>
      </div>
    </div>
  );

  // About Tab
  const renderAbout = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>关于我们 设置</h3>
      <div>
        <label style={labelStyle}>标题</label>
        <input type="text" value={content.about.title} onChange={(e) => setContent(p => ({ ...p, about: { ...p.about, title: e.target.value } }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>副标题</label>
        <input type="text" value={content.about.subtitle} onChange={(e) => setContent(p => ({ ...p, about: { ...p.about, subtitle: e.target.value } }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>公司描述</label>
        <textarea value={content.about.description} onChange={(e) => setContent(p => ({ ...p, about: { ...p.about, description: e.target.value } }))} rows={6} style={textareaStyle} />
      </div>
      <div>
        <label style={labelStyle}>特点列表（用逗号分隔）</label>
        <textarea
          value={(content.about.features || []).join(', ')}
          onChange={(e) => {
            const newContent = JSON.parse(JSON.stringify(content));
            newContent.about.features = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean);
            setContent(newContent as ContentData);
          }}
          rows={4}
          style={textareaStyle}
        />
      </div>
    </div>
  );

  // Contact Tab
  const renderContact = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>联系方式 设置</h3>
      {[
        { key: 'email', label: '📧 邮箱 Email', type: 'email' },
        { key: 'phone', label: '📱 电话 Phone', type: 'text' },
        { key: 'whatsapp', label: '💬 WhatsApp', type: 'text' },
      ].map(field => (
        <div key={field.key}>
          <label style={labelStyle}>{field.label}</label>
          <input
            type={field.type as any}
            value={(content.contact as any)[field.key]}
            onChange={(e) => setContent(p => ({ ...p, contact: { ...p.contact, [field.key]: e.target.value } }))}
            style={inputStyle}
          />
        </div>
      ))}
      <div>
        <label style={labelStyle}>📍 地址 Address</label>
        <textarea value={content.contact.address} onChange={(e) => setContent(p => ({ ...p, contact: { ...p.contact, address: e.target.value } }))} rows={3} style={textareaStyle} />
      </div>
      <div>
        <label style={labelStyle}>⏰ 工作时间</label>
        <input type="text" value={content.contact.workingHours} onChange={(e) => setContent(p => ({ ...p, contact: { ...p.contact, workingHours: e.target.value } }))} style={inputStyle} />
      </div>
    </div>
  );

  // Footer Tab
  const renderFooter = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>页脚 Footer 设置</h3>
      <div>
        <label style={labelStyle}>公司名称</label>
        <input type="text" value={content.footer.company} onChange={(e) => setContent(p => ({ ...p, footer: { ...p.footer, company: e.target.value } }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>版权信息</label>
        <input type="text" value={content.footer.copyright} onChange={(e) => setContent(p => ({ ...p, footer: { ...p.footer, copyright: e.target.value } }))} style={inputStyle} />
      </div>
    </div>
  );

  // Factory Tab
  const renderFactory = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>工厂介绍 设置</h3>
      <div>
        <label style={labelStyle}>标题</label>
        <input type="text" value={content.factory.title} onChange={(e) => setContent(p => ({ ...p, factory: { ...p.factory, title: e.target.value } }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>副标题</label>
        <input type="text" value={content.factory.subtitle} onChange={(e) => setContent(p => ({ ...p, factory: { ...p.factory, subtitle: e.target.value } }))} style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>工厂描述</label>
        <textarea value={content.factory.description} onChange={(e) => setContent(p => ({ ...p, factory: { ...p.factory, description: e.target.value } }))} rows={5} style={textareaStyle} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        {Object.entries(content.factory.info).map(([key, val]) => (
          <div key={key}>
            <label style={labelStyle}>{key === 'area' ? '厂房面积' : key === 'experience' ? '成立时间' : key === 'employees' ? '员工人数' : '出口国家'}</label>
            <input type="text" value={val} onChange={(e) => {
              const newContent = JSON.parse(JSON.stringify(content));
              newContent.factory.info[key] = e.target.value;
              setContent(newContent as ContentData);
            }} style={inputStyle} />
          </div>
        ))}
      </div>
    </div>
  );

  // Products Tab
  const renderProducts = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>产品管理 ({content.products.length} 个产品)</h3>
      {(content.products).map((product, index) => (
        <div key={product.id} style={{ border: "1px solid #e0e0e0", borderRadius: "12px", padding: "20px", backgroundColor: "#fafafa" }}>
          <h4 style={{ margin: "0 0 15px 0", color: "#2563eb", fontSize: "16px", borderBottom: "2px solid #2563eb", paddingBottom: "10px" }}>
            产品 #{index + 1}: {product.name} ({product.nameZh})
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <div>
              <label style={{ ...labelStyle, fontSize: "13px" }}>英文名称</label>
              <input type="text" value={product.name} onChange={(e) => {
                const newProducts = [...content.products];
                newProducts[index] = { ...newProducts[index], name: e.target.value };
                setContent(p => ({ ...p, products: newProducts }));
              }} style={{ ...inputStyle, padding: "10px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: "13px" }}>中文名称</label>
              <input type="text" value={product.nameZh || ''} onChange={(e) => {
                const newProducts = [...content.products];
                newProducts[index] = { ...newProducts[index], nameZh: e.target.value };
                setContent(p => ({ ...p, products: newProducts }));
              }} style={{ ...inputStyle, padding: "10px", fontSize: "13px" }} />
            </div>
          </div>
          <div style={{ marginTop: "15px" }}>
            <label style={{ ...labelStyle, fontSize: "13px" }}>产品描述</label>
            <textarea value={product.description} onChange={(e) => {
              const newProducts = [...content.products];
              newProducts[index] = { ...newProducts[index], description: e.target.value };
              setContent(p => ({ ...p, products: newProducts }));
            }} rows={3} style={{ ...textareaStyle, padding: "10px", fontSize: "13px" }} />
          </div>
          <div style={{ marginTop: "15px" }}>
            <label style={{ ...labelStyle, fontSize: "13px" }}>规格参数（每行一个）</label>
            <textarea
              value={(product.specs || []).join('\n')}
              onChange={(e) => {
                const newProducts = [...content.products];
                newProducts[index] = { ...newProducts[index], specs: e.target.value.split('\n') as any };
                setContent(p => ({ ...p, products: newProducts }));
              }}
              rows={5}
              style={{ ...textareaStyle, padding: "10px", fontSize: "13px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // Blog Tab
  const renderBlog = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>博客文章管理 ({(content.blog).length} 篇)</h3>
      <p style={{ color: "#666", fontSize: "14px" }}>💡 提示：这里只能编辑文章标题和摘要。完整的博客内容需要直接修改代码文件。</p>
      {(content.blog).map((post, index) => (
        <div key={post.id} style={{ border: "1px solid #e0e0e0", borderRadius: "12px", padding: "20px", backgroundColor: "#fafafa" }}>
          <h4 style={{ margin: "0 0 15px 0", color: "#2563eb", fontSize: "16px" }}>文章 #{index + 1}: {post.category}</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label style={{ ...labelStyle, fontSize: "13px" }}>标题</label>
              <input type="text" value={post.title} onChange={(e) => {
                const newBlog = [...content.blog];
                newBlog[index] = { ...newBlog[index], title: e.target.value };
                setContent(p => ({ ...p, blog: newBlog }));
              }} style={{ ...inputStyle, padding: "10px", fontSize: "13px" }} />
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: "13px" }}>摘要</label>
              <textarea value={post.excerpt} onChange={(e) => {
                const newBlog = [...content.blog];
                newBlog[index] = { ...newBlog[index], excerpt: e.target.value };
                setContent(p => ({ ...p, blog: newBlog }));
              }} rows={3} style={{ ...textareaStyle, padding: "10px", fontSize: "13px" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero': return renderHero();
      case 'about': return renderAbout();
      case 'contact': return renderContact();
      case 'footer': return renderFooter();
      case 'factory': return renderFactory();
      case 'products': return renderProducts();
      case 'blog': return renderBlog();
      default: return <p>请选择一个标签页</p>;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f7fa", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
        color: "white",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>网站后台管理面板</h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "14px" }}>JIACHENG NETTING - 内容管理系统</p>
        </div>
        <button onClick={handleSave} disabled={loading} style={{
          padding: "12px 30px",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: saved ? "#22c55e" : "white",
          color: saved ? "white" : "#1e40af"
        }}>
          {saved ? '已保存！' : loading ? '保存中...' : '保存所有更改'}
        </button>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        {/* Sidebar */}
        <aside style={{ width: "250px", backgroundColor: "white", borderRight: "1px solid #e0e0e0", padding: "20px 0", overflowY: "auto" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              display: "block",
              width: "100%",
              padding: "15px 25px",
              textAlign: "left",
              border: "none",
              backgroundColor: activeTab === tab.id ? '#eff6ff' : 'transparent',
              color: activeTab === tab.id ? '#1e40af' : '#374151',
              fontWeight: activeTab === tab.id ? '600' : '400',
              fontSize: "15px",
              cursor: "pointer",
              borderLeft: activeTab === tab.id ? '4px solid #3b82f6' : '4px solid transparent'
            }}>
              {tab.label}
            </button>
          ))}
          <div style={{ marginTop: "30px", borderTop: "1px solid #e0e0e0", paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
            <p style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", marginBottom: "10px" }}>快速链接</p>
            <a href="/" target="_blank" style={{ display: "block", padding: "10px", color: "#6b7280", textDecoration: "none", fontSize: "13px" }}>&rarr; 查看网站首页</a>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "30px", overflowY: "auto", maxWidth: "1200px" }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
