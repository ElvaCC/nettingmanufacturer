"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Language options with flags
const languages = [
  { code: "en", name: "English", flag: "🇺🇸", href: "" },
  { code: "es", name: "Español", flag: "🇪🇸", href: "/es" },
  { code: "ru", name: "Русский", flag: "🇷🇺", href: "/ru" },
  { code: "ar", name: "العربية", flag: "🇸🇦", href: "/ar" },
];

// Navigation items
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

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "en";
  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const getLocalePath = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path}`;
  };

  const handleLangChange = (langCode: string) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|es|ru|ar)/, "");
    const newPath = langCode === "en" ? pathWithoutLocale || "/" : `/${langCode}${pathWithoutLocale}`;
    router.push(newPath);
    setIsLangOpen(false);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <Link href={getLocalePath("/")} style={styles.logo}>
          <span style={styles.logoText}>NETTING</span>
          <span style={styles.logoHighlight}>MANUFACTURER</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.navDesktop}>
          <ul style={styles.navList}>
            {navItems.map((item) => (
              <li
                key={item.label}
                style={styles.navItem}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={getLocalePath(item.href)} style={styles.navLink}>
                  {item.label}
                  {item.hasDropdown && <span style={styles.arrow}>▼</span>}
                </Link>

                {item.hasDropdown && activeDropdown === item.label && (
                  <div style={styles.dropdown}>
                    {item.dropdown?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={getLocalePath(subItem.href)}
                        style={styles.dropdownLink}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side */}
        <div style={styles.rightSide}>
          {/* Search */}
          <button style={styles.iconBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Language */}
          <div style={styles.langSelector}>
            <button style={styles.langBtn} onClick={() => setIsLangOpen(!isLangOpen)}>
              <span>{currentLang.flag}</span>
              <span style={styles.langCode}>{currentLang.code.toUpperCase()}</span>
              <span style={styles.arrow}>▼</span>
            </button>

            {isLangOpen && (
              <div style={styles.langDropdown}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    style={{
                      ...styles.langOption,
                      background: lang.code === locale ? "#e0e7ff" : "transparent",
                    }}
                    onClick={() => handleLangChange(lang.code)}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button style={styles.mobileBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span style={{ ...styles.hamburgerLine, transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}></span>
            <span style={{ ...styles.hamburgerLine, opacity: isMobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ ...styles.hamburgerLine, transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav style={styles.mobileNav}>
          {navItems.map((item) => (
            <div key={item.label}>
              <Link href={getLocalePath(item.href)} style={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
              {item.hasDropdown && (
                <div style={styles.mobileSubNav}>
                  {item.dropdown?.map((subItem) => (
                    <Link key={subItem.label} href={getLocalePath(subItem.href)} style={styles.mobileSubLink} onClick={() => setIsMobileMenuOpen(false)}>
                      {subItem.label}
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

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 24px",
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: 18,
    flexShrink: 0,
  },
  logoText: { color: "#1a1a1a" },
  logoHighlight: { color: "#2563eb", marginLeft: 4 },
  navDesktop: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  navList: {
    display: "flex",
    flexDirection: "row",
    listStyle: "none",
    margin: 0,
    padding: 0,
    gap: 4,
  },
  navItem: {
    position: "relative",
    flexShrink: 0,
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "8px 12px",
    color: "#333",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  arrow: { fontSize: 10, marginLeft: 2 },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    borderRadius: 8,
    padding: "8px 0",
    minWidth: 180,
  },
  dropdownLink: {
    display: "block",
    padding: "10px 20px",
    color: "#333",
    textDecoration: "none",
    fontSize: 14,
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexShrink: 0,
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    color: "#333",
  },
  langSelector: { position: "relative" },
  langBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    background: "#f3f4f6",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    color: "#333",
  },
  langCode: { fontWeight: 600 },
  langDropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: 8,
    background: "#fff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    borderRadius: 8,
    padding: "8px 0",
    minWidth: 160,
  },
  langOption: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "10px 16px",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#333",
    textAlign: "left",
  },
  mobileBtn: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
  },
  hamburgerLine: {
    display: "block",
    width: 24,
    height: 2,
    background: "#333",
    transition: "all 0.3s",
  },
  mobileNav: {
    background: "#fff",
    borderTop: "1px solid #e5e7eb",
    padding: "16px",
    display: "none",
  },
  mobileLink: {
    display: "block",
    padding: "16px 0",
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
    borderBottom: "1px solid #e5e7eb",
  },
  mobileSubNav: { paddingLeft: 16 },
  mobileSubLink: {
    display: "block",
    padding: "8px 0",
    color: "#666",
    textDecoration: "none",
    fontSize: 14,
  },
};
