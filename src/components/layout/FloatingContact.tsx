'use client';

import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { WECHAT_QR } from '@/lib/qr-codes';

export default function FloatingContact() {
  const content = useContent();
  const contact = (content as any)?.contact || {};
  const email = contact.email || 'Netfactory01@factory-jc.com';
  const whatsapp = contact.whatsapp || '+86-15628764579';
  const phone = contact.phone || whatsapp;

  // Strip non-digits for wa.me link
  const whatsappDigits = whatsapp.replace(/[^0-9]/g, '');
  // Strip non-digits but keep leading + for tel link
  const phoneDigits = phone.replace(/[^0-9+]/g, '');

  const waText = encodeURIComponent('Hi, I am interested in your products. Could you send me a quote?');

  const [collapsed, setCollapsed] = useState(false);
  const [showWechatQR, setShowWechatQR] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .floating-contact { position: fixed; right: 0; top: 40%; z-index: 998; display: flex; flex-direction: column; gap: 8px; transition: right 0.3s ease; }
        .floating-contact.collapsed { right: -50px; }
        .floating-contact a, .floating-contact .fc-btn { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: #fff; border-radius: 10px 0 0 10px; box-shadow: -2px 2px 8px rgba(0,0,0,0.12); text-decoration: none; cursor: pointer; border: 1px solid #e5e7eb; transition: transform 0.2s, box-shadow 0.2s; position: relative; padding: 0; }
        .floating-contact a:hover, .floating-contact .fc-btn:hover { transform: translateX(-4px); box-shadow: -3px 3px 12px rgba(0,0,0,0.18); }
        .floating-contact svg { width: 22px; height: 22px; display: block; }
        .fc-collapse-btn { background: #1e3a5f !important; color: #fff; }
        .fc-wechat-popup { position: fixed; right: 60px; top: 40%; transform: translateY(-50%); background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.2); z-index: 999; max-width: 220px; }
        .fc-wechat-popup img { width: 180px; height: 180px; border-radius: 8px; border: 1px solid #e5e7eb; }
        .fc-wechat-popup-close { position: absolute; top: 8px; right: 8px; background: none; border: none; font-size: 20px; cursor: pointer; color: #666; }
        @media (max-width: 768px) { .floating-contact { top: auto; bottom: 80px; right: 12px; flex-direction: row; gap: 6px; } .floating-contact a, .floating-contact .fc-btn { border-radius: 10px; width: 40px; height: 40px; } .fc-collapse-btn { display: none !important; } .fc-wechat-popup { right: 12px; bottom: 130px; top: auto; transform: none; } }
      ` }} />

      <div className={`floating-contact ${collapsed ? 'collapsed' : ''}`}>
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappDigits}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        {/* WeChat — click pops QR */}
        <button
          type="button"
          className="fc-btn"
          aria-label="WeChat"
          title="WeChat"
          onClick={() => setShowWechatQR(true)}
          style={{ background: '#fff' }}
        >
          <svg viewBox="0 0 24 24" fill="#07C160">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-2.036 2.96c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" />
          </svg>
        </button>

        {/* Email */}
        <a href={`mailto:${email}`} aria-label="Email" title="Email">
          <svg viewBox="0 0 24 24" fill="#10B981">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </a>

        {/* Phone */}
        <a href={`tel:${phoneDigits}`} aria-label="Phone" title="Phone">
          <svg viewBox="0 0 24 24" fill="#10B981">
            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
          </svg>
        </a>

        {/* Collapse / expand toggle */}
        <button
          type="button"
          className="fc-btn fc-collapse-btn"
          aria-label={collapsed ? 'Expand' : 'Collapse'}
          title={collapsed ? 'Show contact' : 'Hide'}
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? (
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </button>
      </div>

      {/* WeChat QR popup */}
      {showWechatQR && (
        <div className="fc-wechat-popup" onClick={() => setShowWechatQR(false)}>
          <button
            type="button"
            className="fc-wechat-popup-close"
            onClick={(e) => { e.stopPropagation(); setShowWechatQR(false); }}
            aria-label="Close"
          >&times;</button>
          <div style={{ textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#07C160', marginBottom: 10 }}>WeChat</div>
            <img src={WECHAT_QR} alt="WeChat QR Code" />
            <div style={{ fontSize: 11, color: '#666', marginTop: 8 }}>Scan to add on WeChat</div>
            <div style={{ fontSize: 12, color: '#333', marginTop: 6, fontWeight: 500 }}>{contact.wechat || 'Netfactory01'}</div>
          </div>
        </div>
      )}
    </>
  );
}