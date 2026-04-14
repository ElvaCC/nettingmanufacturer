"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Factory", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  products: [
    { label: "Construction Safety Netting", href: "/products" },
    { label: "Hail Netting", href: "/products" },
    { label: "Shade Net", href: "/products" },
    { label: "Mesh Tarp", href: "/products" },
    { label: "Olive Net", href: "/products" },
    { label: "Privacy Fence Screen", href: "/products" },
    { label: "Bird Netting", href: "/products" },
    { label: "Anti Insect Net", href: "/products" },
  ],
  support: [
    { label: "Company News", href: "/news" },
    { label: "Industry News", href: "/news" },
    { label: "FAQ", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Links */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+86 XXX XXXX XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@nettingmanufacturer.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              Copyright © 2026 Netting Manufacturer Co., Ltd All Rights Reserved
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
