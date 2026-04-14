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
  {
    label: "Home",
    href: "",
    hasDropdown: false,
  },
  {
    label: "Products",
    href: "/products",
    hasDropdown: true,
    dropdown: [
      { label: "HDPE Safety Net", href: "/products/safety-net" },
      { label: "Shade Net", href: "/products/shade-net" },
      { label: "Anti-hail Net", href: "/products/anti-hail-net" },
      { label: "Olive Net", href: "/products/olive-net" },
      { label: "Bird Net", href: "/products/bird-net" },
      { label: "Privacy Screen", href: "/products/privacy-screen" },
    ],
  },
  {
    label: "Applications",
    href: "/applications",
    hasDropdown: true,
    dropdown: [
      { label: "Construction", href: "/applications/construction" },
      { label: "Agriculture", href: "/applications/agriculture" },
      { label: "Sports Facilities", href: "/applications/sports" },
      { label: "Dust Cover", href: "/applications/dust-cover" },
    ],
  },
  {
    label: "Our Factory",
    href: "/factory",
    hasDropdown: true,
    dropdown: [
      { label: "Production Line", href: "/factory/production" },
      { label: "Quality Control", href: "/factory/quality" },
      { label: "Certifications", href: "/factory/certifications" },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    hasDropdown: true,
    dropdown: [
      { label: "Custom Logo Printing", href: "/solutions/logo-printing" },
      { label: "Custom Specifications", href: "/solutions/custom-specs" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    hasDropdown: false,
  },
  {
    label: "Contact Us",
    href: "/contact",
    hasDropdown: false,
  },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "en";

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLangChange = (lang: (typeof languages)[0]) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|es|ru|ar)/, "");
    const newPath = lang.code === "en" ? pathWithoutLocale || "/" : `/${lang.code}${pathWithoutLocale}`;
    router.push(newPath);
    setIsLangOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link href={`/${locale === "en" ? "" : locale}`} className="logo">
          <span className="logo-text">NETTING</span>
          <span className="logo-highlight">MANUFACTURER</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="nav-item"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={`/${locale === "en" ? "" : locale}${item.href}`} className="nav-link">
                  {item.label}
                  {item.hasDropdown && <span className="dropdown-arrow">▼</span>}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="dropdown">
                    {item.dropdown?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={`/${locale === "en" ? "" : locale}${subItem.href}`}
                        className="dropdown-link"
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

        {/* Right Side: Search + Language + Mobile Menu */}
        <div className="header-right">
          {/* Search Icon */}
          <button className="icon-btn search-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Language Selector */}
          <div className="lang-selector">
            <button
              className="lang-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-label="Change language"
            >
              <span className="lang-flag">{currentLang.flag}</span>
              <span className="lang-code">{currentLang.code.toUpperCase()}</span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {isLangOpen && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${lang.code === locale ? "active" : ""}`}
                    onClick={() => handleLangChange(lang)}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="nav-mobile">
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="mobile-nav-item">
                <Link
                  href={`/${locale === "en" ? "" : locale}${item.href}`}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <div className="mobile-dropdown">
                    {item.dropdown?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={`/${locale === "en" ? "" : locale}${subItem.href}`}
                        className="mobile-dropdown-link"
                        onClick={() => setIsMobileMenuOpen(false)}
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
      )}

      <style jsx>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: #ffffff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
        }

        .logo-text {
          color: #1a1a1a;
        }

        .logo-highlight {
          color: #2563eb;
          margin-left: 4px;
        }

        .nav-desktop {
          display: flex;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 4px;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #2563eb;
        }

        .dropdown-arrow {
          font-size: 10px;
          margin-left: 2px;
        }

        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 8px 0;
          min-width: 180px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s;
        }

        .nav-item:hover .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-link {
          display: block;
          padding: 10px 20px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          transition: background 0.2s;
        }

        .dropdown-link:hover {
          background: #f3f4f6;
          color: #2563eb;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: #333;
          transition: color 0.2s;
        }

        .icon-btn:hover {
          color: #2563eb;
        }

        .lang-selector {
          position: relative;
        }

        .lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          background: #f3f4f6;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          color: #333;
        }

        .lang-btn:hover {
          background: #e5e7eb;
        }

        .lang-flag {
          font-size: 16px;
        }

        .lang-code {
          font-weight: 600;
        }

        .lang-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          padding: 8px 0;
          min-width: 160px;
        }

        .lang-option {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 16px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #333;
          text-align: left;
        }

        .lang-option:hover {
          background: #f3f4f6;
        }

        .lang-option.active {
          background: #e0e7ff;
          color: #2563eb;
        }

        .lang-name {
          flex: 1;
        }

        .mobile-menu-btn {
          display: flex;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        @media (min-width: 900px) {
          .mobile-menu-btn {
            display: none;
          }
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 24px;
        }

        .hamburger span {
          display: block;
          height: 2px;
          background: #333;
          transition: all 0.3s;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .nav-mobile {
          background: #ffffff;
          border-top: 1px solid #e5e7eb;
          padding: 16px;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-item {
          border-bottom: 1px solid #e5e7eb;
        }

        .mobile-nav-link {
          display: block;
          padding: 16px 0;
          color: #333;
          text-decoration: none;
          font-weight: 500;
        }

        .mobile-dropdown {
          padding-bottom: 8px;
        }

        .mobile-dropdown-link {
          display: block;
          padding: 8px 0 8px 16px;
          color: #666;
          text-decoration: none;
          font-size: 14px;
        }
      `}</style>
    </header>
  );
}
