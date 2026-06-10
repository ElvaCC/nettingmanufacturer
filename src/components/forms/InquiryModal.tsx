'use client';

import { useState } from 'react';
import InquiryForm from '@/components/forms/InquiryForm';

interface InquiryModalProps {
  locale: string;
  productName: string;
  trigger: React.ReactNode;
}

export default function InquiryModal({ locale, productName, trigger }: InquiryModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            padding: 20, backdropFilter: 'blur(2px)',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 16,
              maxWidth: 600, width: '100%', maxHeight: '90vh',
              overflow: 'auto', padding: '32px 28px 24px',
              position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 32, height: 32, borderRadius: '50%',
                border: 'none', background: '#f3f4f6', color: '#666',
                fontSize: 18, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}
            >&#10005;</button>
            <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Inquiry for: {productName}
            </p>
            <InquiryForm locale={locale} />
          </div>
        </div>
      )}
    </>
  );
}
