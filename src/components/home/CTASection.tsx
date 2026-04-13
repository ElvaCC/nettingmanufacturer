"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function CTASection({ locale }: { locale: string }) {
  const t = useTranslations("contact");

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Get Your Custom Quote?
              </h2>
              <p className="text-white/80 mb-8">
                Contact us today and our team will provide you with a detailed quotation 
                tailored to your project requirements within 24 hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Email Us</div>
                    <div className="font-medium">info@nettingmanufacturer.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Call Us</div>
                    <div className="font-medium">+86 XXX XXXX XXXX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/60 text-sm">Response Time</div>
                    <div className="font-medium">Within 24 Hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - CTA Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Request Your Free Quote
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Product Interest
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
                    <option value="">Select a product category</option>
                    <option value="construction">Construction Mesh</option>
                    <option value="dust-cover">Dust Cover Nets</option>
                    <option value="shade">Shade Nets</option>
                    <option value="hail">Hail Protection Nets</option>
                    <option value="olive">Olive Collection Nets</option>
                    <option value="bird">Bird Protection Nets</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>
                <Link
                  href={`/${locale}/contact`}
                  className="w-full block text-center px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors"
                >
                  Submit Inquiry
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
