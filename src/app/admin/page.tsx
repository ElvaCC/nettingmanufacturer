'use client';

import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('./AdminPanel'), { 
  ssr: false,
  loading: () => (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7fa' }}>
      <p>加载中...</p>
    </div>
  )
});

export default function AdminPage() {
  return <AdminPanel />;
}
