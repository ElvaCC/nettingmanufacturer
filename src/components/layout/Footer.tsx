import Link from "next/link";

const footerLinks = [
  { key: "products", href: "/products" },
  { key: "about", href: "/about" },
  { key: "cases", href: "/cases" },
];

export default function Footer() {
  return (
    <footer className="bg-background-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <span className="font-bold">Netting</span>
                <span className="text-gray-400 text-sm block -mt-1">Manufacturer</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Leading manufacturer of industrial HDPE netting solutions for construction, agriculture, 
              and commercial applications. Trusted by partners worldwide since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm capitalize"
                  >
                    {link.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@nettingmanufacturer.com</li>
              <li>Tel: +86 XXX XXXX XXXX</li>
              <li>WeChat: netting_mfr</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 Netting Manufacturer. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
