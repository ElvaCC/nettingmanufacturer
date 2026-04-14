"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Factory, Users } from "lucide-react";

export default function Hero({ locale }: { locale: string }) {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary via-primary to-primary-light overflow-hidden pt-16">
      {/* SEO-friendly background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <main id="main-content" className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Main SEO Text */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6" role="status">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                <span>Factory Direct · Custom Solutions · Global Shipping</span>
              </div>

              {/* H1 - Main Keyword */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                {t("title")}
              </h1>

              {/* H2 - Subtitle with secondary keywords */}
              <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                {t("subtitle")}
              </p>

              {/* CTA Buttons with descriptive anchor text */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link
                  href={`/${locale}/contact`}
                  className="w-full sm:w-auto px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-accent/30"
                >
                  <span>Request Free Quote</span>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <span>View Products</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-3 text-white/90">
                  <Shield size={20} className="text-green-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">ISO 9001 Certified</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Truck size={20} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">Global Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Factory size={20} className="text-orange-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">15+ Years Factory</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <Users size={20} className="text-purple-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">50+ Countries</span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "15+", label: "Years Experience", keyword: "HDPE netting manufacturer" },
                  { value: "50+", label: "Countries Served", keyword: "Global exports" },
                  { value: "1000+", label: "Projects Completed", keyword: "Construction projects" },
                  { value: "98%", label: "Client Satisfaction", keyword: "Customer reviews" },
                ].map((stat) => (
                  <article key={stat.label} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2" aria-label={`${stat.value} ${stat.label}`}>
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 100L60 85C120 70 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
