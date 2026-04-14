"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Factory, Users, Award, Headphones } from "lucide-react";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <>
      {/* Hero Section - Big Banner Style */}
      <section className="relative pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90" />
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>15+ Years Professional Manufacturer · ISO 9001 Certified</span>
            </div>

            {/* H1 - Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Premium HDPE Netting Solutions for
              <span className="text-yellow-400"> Global Construction</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Professional manufacturer of construction safety nets, dust cover nets, shade nets, and agricultural netting. Factory direct with global shipping to 50+ countries.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto px-8 py-4 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/30"
              >
                <span>Get Free Quote</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href={`/${locale}/products`}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/30 flex items-center justify-center gap-2"
              >
                <span>View Products</span>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "15+", label: "Years Experience", icon: Factory },
                { value: "50+", label: "Countries", icon: Truck },
                { value: "1000+", label: "Projects", icon: Award },
                { value: "98%", label: "Satisfaction", icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <stat.icon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 50C1200 60 1320 70 1380 75L1440 80V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>ISO 9001 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-500" />
              <span>Global Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-purple-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
