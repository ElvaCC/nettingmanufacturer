"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const news = [
  {
    date: "2026-04-10",
    title: "Premium HDPE Netting Solutions for Global Construction",
    excerpt: "Leading supplier of high-density polyethylene netting for construction safety, agricultural protection, and industrial applications. 20+ years of manufacturing excellence.",
  },
  {
    date: "2026-04-05",
    title: "How to Choose the Right Shade Net for Your Project",
    excerpt: "Complete guide to selecting shade nets based on UV protection levels, density, and material quality. Expert recommendations for agricultural and commercial applications.",
  },
  {
    date: "2026-03-28",
    title: "Safety Debris Netting Standards and Compliance",
    excerpt: "Understanding OSHA and international safety netting requirements for construction sites. Our products meet or exceed all relevant quality standards.",
  },
  {
    date: "2026-03-20",
    title: "Anti-Hail Netting: Protection for Your Crops",
    excerpt: "Effective crop protection solutions against hail damage. Our UV-stabilized netting provides long-lasting defense for orchards, vineyards, and agricultural facilities.",
  },
];

export default function NewsSection({ locale }: { locale: string }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            NEWS CENTER
          </h2>
          <Link
            href={`/${locale}/news`}
            className="flex items-center gap-2 text-blue-600 font-medium hover:underline"
          >
            MORE + <ArrowRight size={16} />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {news.map((item, index) => (
            <article
              key={index}
              className="bg-gray-50 rounded-lg p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <Calendar size={14} />
                <span>{item.date}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
