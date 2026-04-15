'use client';

import { useState, useEffect } from 'react';
import contentData from '@/data/content.json';

type ContentData = typeof contentData;

export default function AdminPage() {
  const [content, setContent] = useState<ContentData>(contentData);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Tabs configuration
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
      alert('保存失败：' + error);
    }
    setLoading(false);
  };

  const updateHero = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateAbout = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      about: { ...prev.about, [field]: value }
    }));
  };

  const updateContact = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const updateFooter = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      footer: { ...prev.footer, [field]: value }
    }));
  };

  const updateFactory = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      factory: { ...prev.factory, [field]: value }
    }));
  };

  const updateProduct = (index: number, field: string, value: string) => {
    setContent(prev => {
      const newProducts = [...prev.products];
      newProducts[index] = { ...newProducts[index], [field]: value };
      return { ...prev, products: newProducts };
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>首页 Hero 区域设置</h3>
            
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>主标题 (Title)</label>
              <textarea
                value={content.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>副标题 (Subtitle)</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>按钮1文字</label>
                <input
                  type="text"
                  value={content.hero.cta1}
                  onChange={(e) => updateHero('cta1', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>按钮2文字</label>
                <input
                  type="text"
                  value={content.hero.cta2}
                  onChange={(e) => updateHero('cta2', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>关于我们 设置</h3>
            
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>标题</label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e) => updateAbout('title', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>副标题</label>
              <input
                type="text"
                value={content.about.subtitle}
                onChange={(e) => updateAbout('subtitle', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>公司描述</label>
              <textarea
                value={content.about.description}
                onChange={(e) => updateAbout('description', e.target.value)}
                rows={6}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>特点列表（用逗号分隔）</label>
              <textarea
                value={content.about.features.join(', ')}
                onChange={(e) => updateAbout('features', e.target.value.split(',').map(s => s.trim()))}
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace"
                }}
              />
            </div>
          </div>
        );

      case 'contact':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>联系方式 设置</h3>
            
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>📧 邮箱 Email</label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>📱 电话 Phone</label>
              <input
                type="text"
                value={content.contact.phone}
                onChange={(e) => updateContact('phone', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>💬 WhatsApp</label>
              <input
                type="text"
                value={content.contact.whatsapp}
                onChange={(e) => updateContact('whatsapp', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>📍 地址 Address</label>
              <textarea
                value={content.contact.address}
                onChange={(e) => updateContact('address', e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>⏰ 工作时间</label>
              <input
                type="text"
                value={content.contact.workingHours}
                onChange={(e) => updateContact('workingHours', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>
        );

      case 'footer':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>页脚 Footer 设置</h3>
            
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>公司名称</label>
              <input
                type="text"
                value={content.footer.company}
                onChange={(e) => updateFooter('company', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>版权信息</label>
              <input
                type="text"
                value={content.footer.copyright}
                onChange={(e) => updateFooter('copyright', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>
          </div>
        );

      case 'factory':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>工厂介绍 设置</h3>
            
            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>标题</label>
              <input
                type="text"
                value={content.factory.title}
                onChange={(e) => updateFactory('title', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>副标题</label>
              <input
                type="text"
                value={content.factory.subtitle}
                onChange={(e) => updateFactory('subtitle', e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>工厂描述</label>
              <textarea
                value={content.factory.description}
                onChange={(e) => updateFactory('description', e.target.value)}
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontFamily: "monospace"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>厂房面积</label>
                <input
                  type="text"
                  value={content.factory.info.area}
                  onChange={(e) => updateFactory('info', JSON.stringify({ ...content.factory.info, area: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>成立时间</label>
                <input
                  type="text"
                  value={content.factory.info.experience}
                  onChange={(e) => updateFactory('info', JSON.stringify({ ...content.factory.info, experience: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>员工人数</label>
                <input
                  type="text"
                  value={content.factory.info.employees}
                  onChange={(e) => updateFactory('info', JSON.stringify({ ...content.factory.info, employees: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>出口国家</label>
                <input
                  type="text"
                  value={content.factory.info.exports}
                  onChange={(e) => updateFactory('info', JSON.stringify({ ...content.factory.info, exports: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "14px"
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>产品管理 ({content.products.length} 个产品)</h3>
            
            {content.products.map((product, index) => (
              <div key={product.id} style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "20px",
                backgroundColor: "#fafafa"
              }}>
                <h4 style={{ 
                  margin: "0 0 15px 0", 
                  color: "#2563eb",
                  fontSize: "16px",
                  borderBottom: "2px solid #2563eb",
                  paddingBottom: "10px"
                }}>
                  产品 #{index + 1}: {product.name} ({product.nameZh})
                </h4>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px" }}>英文名称</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "13px"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px" }}>中文名称</label>
                    <input
                      type="text"
                      value={product.nameZh || ''}
                      onChange={(e) => updateProduct(index, 'nameZh', e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "13px"
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px" }}>产品描述</label>
                  <textarea
                    value={product.description}
                    onChange={(e) => updateProduct(index, 'description', e.target.value)}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontFamily: "monospace"
                    }}
                  />
                </div>

                <div style={{ marginTop: "15px" }}>
                  <label style={{ display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px" }}>规格参数（每行一个）</label>
                  <textarea
                    value={product.specs.join('\n')}
                    onChange={(e) => updateProduct(index, 'specs', e.target.value.split('\n'))}
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontFamily: "monospace"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'blog':
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>博客文章管理 ({content.blog.length} 篇)</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>💡 提示：这里只能编辑文章标题和摘要。完整的博客内容需要直接修改代码文件。</p>
            
            {content.blog.map((post, index) => (
              <div key={post.id} style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "20px",
                backgroundColor: "#fafafa"
              }}>
                <h4 style={{ margin: "0 0 15px 0", color: "#2563eb", fontSize: "16px" }}>
                  文章 #{index + 1}: {post.category}
                </h4>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px" }}>标题</label>
                    <input
                      type="text"
                      value={post.title}
                      onChange={(e) => {
                        const newBlog = [...content.blog];
                        newBlog[index] = { ...newBlog[index], title: e.target.value };
                        setContent(prev => ({ ...prev, blog: newBlog }));
                      }}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "13px"
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: "block", fontWeight: "600", marginBottom: "5px", fontSize: "13px" }}>摘要</label>
                    <textarea
                      value={post.excerpt}
                      onChange={(e) => {
                        const newBlog = [...content.blog];
                        newBlog[index] = { ...newBlog[index], excerpt: e.target.value };
                        setContent(prev => ({ ...prev, blog: newBlog }));
                      }}
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontFamily: "monospace"
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <p>请选择一个标签页</p>;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
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
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>🛠️ 网站后台管理面板</h1>
          <p style={{ margin: "5px 0 0 0", opacity: 0.9, fontSize: "14px" }}>JIACHENG NETTING - 内容管理系统</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            padding: "12px 30px",
            fontSize: "16px",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            backgroundColor: saved ? "#22c55e" : "white",
            color: saved ? "white" : "#1e40af",
            transition: "all 0.3s",
            opacity: loading ? 0.7 : 1
          }}
        >
          {saved ? '✅ 已保存！' : loading ? '保存中...' : '💾 保存所有更改'}
        </button>
      </header>

      <div style={{ display: "flex", height: "calc(100vh - 80px)" }}>
        {/* Sidebar Tabs */}
        <aside style={{
          width: "250px",
          backgroundColor: "white",
          borderRight: "1px solid #e0e0e0",
          padding: "20px 0",
          overflowY: "auto"
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
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
                transition: "all 0.2s",
                borderLeft: activeTab === tab.id ? '4px solid #3b82f6' : '4px solid transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
          
          {/* Quick Links */}
          <div style={{ marginTop: "30px", borderTop: "1px solid #e0e0e0", paddingTop: "20px", paddingHorizontal: "20px" }}>
            <p style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", marginBottom: "10px" }}>快速链接</p>
            <a href="/" target="_blank" style={{ display: "block", padding: "10px", color: "#6b7280", textDecoration: "none", fontSize: "13px" }}>→ 查看网站首页</a>
            <a href="/vercel" target="_blank" style={{ display: "block", padding: "10px", color: "#6b7280", textDecoration: "none", fontSize: "13px" }}>→ Vercel 部署</a>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          maxWidth: "1200px"
        }}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
