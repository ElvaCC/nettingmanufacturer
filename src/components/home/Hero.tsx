"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function Hero({ locale }: { locale: string }) {
  const keywords = [
    "HDPE Netting Manufacturer",
    "Safety Debris Netting Factory",
    "Hail Netting from China",
    "Shade Net Supplier",
    "Olive Net Factory",
    "Privacy Fence Screen Manufacturer",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Company Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Netting Manufacturer Co., Ltd
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-blue-200 mb-8">
            Leading Manufacturer of HDPE Industrial Netting Solutions
          </p>

          {/* Keywords Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm border border-white/20"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href={`/${locale}/products`}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              View Products <ArrowRight size={18} />
            </Link>
            <Link
              href={`/${locale}/about`}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30"
            >
              About Us
            </Link>
          </div>

          {/* Search Box */}
          <div className="max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-xl">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-3 text-gray-800 outline-none"
              />
              <button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-white/60 text-sm mb-2">Scroll</div>
          <div className="flex items-center justify-center gap-2 text-white/60">
            <span>←</span>
            <span>↓</span>
            <span>→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
