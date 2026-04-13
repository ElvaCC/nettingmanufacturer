"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/app/i18n";

const navLinks = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "cases", href: "/cases" },
  { key: "contact", href: "/contact" },
];

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-primary">Netting</span>
            <span className="text-gray-500 text-sm block -mt-1">Manufacturer</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              className="text-text-primary hover:text-primary transition-colors font-medium"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
              aria-label="Select language"
            >
              <Globe size={20} />
              <span className="hidden sm:inline text-sm uppercase">{locale}</span>
            </button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                {locales.map((loc) => (
                  <Link
                    key={loc}
                    href={`/${loc}`}
                    className={`block px-4 py-2 text-sm hover:bg-gray-50 ${
                      loc === locale ? "text-primary font-medium" : "text-text-primary"
                    }`}
                    onClick={() => setIsLangOpen(false)}
                  >
                    {localeNames[loc]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link
            href={`/${locale}/contact`}
            className="hidden sm:inline-flex items-center px-4 py-2 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover transition-colors"
          >
            Get Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href}`}
                className="text-text-primary hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-4 py-2 bg-accent text-white font-medium rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
