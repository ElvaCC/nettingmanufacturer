'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    if (password === 'wode2020') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7fa' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ color: '#1e40af', marginBottom: '8px' }}>网站后台管理</h1>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>请输入访问密码</p>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
            placeholder="请输入密码"
            style={{ width: '100%', padding: '14px', border: `2px solid ${error ? '#ef4444' : '#e5e7eb'}`, borderRadius: '10px', fontSize: '16px', marginBottom: '16px', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>密码错误，请重试</p>}
          <button 
            onClick={handleLogin} 
            style={{ width: '100%', padding: '14px', backgroundColor: '#1e40af', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}
          >
            登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f5f7fa' }}>
      <h1>管理面板</h1>
      <p>登录成功！</p>
      <p>这里将显示编辑表单...</p>
    </div>
  );
}
