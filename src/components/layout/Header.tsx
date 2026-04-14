"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Products", href: "/products", hasDropdown: true, dropdown: [
    { label: "HDPE Safety Net", href: "/products/safety-net" },
    { label: "Shade Net", href: "/products/shade-net" },
    { label: "Anti-hail Net", href: "/products/anti-hail-net" },
    { label: "Olive Net", href: "/products/olive-net" },
    { label: "Bird Net", href: "/products/bird-net" },
    { label: "Privacy Screen", href: "/products/privacy-screen" },
  ]},
  { label: "Applications", href: "/applications", hasDropdown: true, dropdown: [
    { label: "Construction", href: "/applications/construction" },
    { label: "Agriculture", href: "/applications/agriculture" },
    { label: "Sports Facilities", href: "/applications/sports" },
    { label: "Dust Cover", href: "/applications/dust-cover" },
  ]},
  { label: "Our Factory", href: "/factory", hasDropdown: true, dropdown: [
    { label: "Production Line", href: "/factory/production" },
    { label: "Quality Control", href: "/factory/quality" },
    { label: "Certifications", href: "/factory/certifications" },
  ]},
  { label: "Solutions", href: "/solutions", hasDropdown: true, dropdown: [
    { label: "Custom Logo Printing", href: "/solutions/logo-printing" },
    { label: "Custom Specifications", href: "/solutions/custom-specs" },
  ]},
  { label: "Blog", href: "/blog", hasDropdown: false },
  { label: "Contact Us", href: "/contact", hasDropdown: false },
];

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "en";
  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const getPath = (href: string) => locale === "en" ? href : `/${locale}${href}`;

  const handleLang = (code: string) => {
    const path = window.location.pathname.replace(/^\/(en|es|ru|ar)/, "");
    router.push(code === "en" ? path || "/" : `/${code}${path}`);
    setIsLangOpen(false);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000, background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
      {/* Main Header Row */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Link href={getPath("/")} style={{ display: "flex", alignItems: "center", textDecoration: "none", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
          <span style={{ color: "#1a1a1a" }}>NETTING</span>
          <span style={{ color: "#2563eb", marginLeft: 4 }}>MANUFACTURER</span>
        </Link>

        {/* Navigation - 横向排列 */}
        <nav style={{ display: "flex", flexDirection: "row", flex: 1, justifyContent: "center" }}>
          <ul style={{ display: "flex", flexDirection: "row", listStyle: "none", margin: 0, padding: 0, gap: 4 }}>
            {navItems.map(item => (
              <li 
                key={item.label}
                style={{ position: "relative", flexShrink: 0 }}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={getPath(item.href)} 
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", color: "#333", textDecoration: "none", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}
                >
                  {item.label}
                  {item.hasDropdown && <span style={{ fontSize: 10 }}>▼</span>}
                </Link>

                {item.hasDropdown && activeDropdown === item.label && (
                  <div style={{ position: "absolute", top: "100%", left: 0, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", borderRadius: 8, padding: "8px 0", minWidth: 180 }}>
                    {item.dropdown?.map(sub => (
                      <Link key={sub.label} href={getPath(sub.href)} style={{ display: "block", padding: "10px 20px", color: "#333", textDecoration: "none", fontSize: 14 }}>
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {/* Search */}
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#333" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Language */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setIsLangOpen(!isLangOpen)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "#f3f4f6", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14, color: "#333" }}>
              <span>{currentLang.flag}</span>
              <span style={{ fontWeight: 600 }}>{currentLang.code.toUpperCase()}</span>
              <span style={{ fontSize: 10 }}>▼</span>
            </button>
            {isLangOpen && (
              <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", borderRadius: 8, padding: "8px 0", minWidth: 160 }}>
                {languages.map(lang => (
                  <button key={lang.code} onClick={() => handleLang(lang.code)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: lang.code === locale ? "#e0e7ff" : "none", border: "none", cursor: "pointer", fontSize: 14, color: "#333", textAlign: "left" }}>
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileOpen(!isMobileOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <span style={{ display: "block", width: 24, height: 2, background: "#333", transition: "all 0.3s", transform: isMobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
            <span style={{ display: "block", width: 24, height: 2, background: "#333", transition: "all 0.3s", opacity: isMobileOpen ? 0 : 1 }}></span>
            <span style={{ display: "block", width: 24, height: 2, background: "#333", transition: "all 0.3s", transform: isMobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <nav style={{ background: "#fff", borderTop: "1px solid #e5e7eb", padding: 16 }}>
          {navItems.map(item => (
            <div key={item.label}>
              <Link href={getPath(item.href)} style={{ display: "block", padding: "16px 0", color: "#333", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid #e5e7eb" }}>
                {item.label}
              </Link>
              {item.hasDropdown && (
                <div style={{ paddingLeft: 16 }}>
                  {item.dropdown?.map(sub => (
                    <Link key={sub.label} href={getPath(sub.href)} style={{ display: "block", padding: "8px 0", color: "#666", textDecoration: "none", fontSize: 14 }}>
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
