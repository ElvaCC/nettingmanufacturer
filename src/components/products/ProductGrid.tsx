"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";

const products = [
  {
    slug: "construction-mesh",
    category: "construction",
    nameKey: "categories.construction",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    description: "Heavy-duty HDPE mesh for scaffolding safety and debris containment.",
    specs: ["UV Resistant", "High Tensile Strength", "Reusable"],
  },
  {
    slug: "dust-cover-net",
    category: "dustCover",
    nameKey: "categories.dustCover",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop",
    description: "Fine mesh netting designed to contain dust and particles.",
    specs: ["Anti-Particle", "Breathable", "Durable"],
  },
  {
    slug: "shade-net",
    category: "shade",
    nameKey: "categories.shade",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    description: "UV-resistant shade nets for greenhouse and outdoor protection.",
    specs: ["UV Blocking", "Temperature Control", "Weather Resistant"],
  },
  {
    slug: "hail-protection-net",
    category: "hail",
    nameKey: "categories.hail",
    image: "https://images.unsplash.com/photo-1561548776-f5952c2d4c0e?w=600&h=400&fit=crop",
    description: "Protective nets against hailstorms for crops and vehicles.",
    specs: ["Impact Resistant", "Lightweight", "Easy Install"],
  },
  {
    slug: "olive-collection-net",
    category: "olive",
    nameKey: "categories.olive",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop",
    description: "Specialized nets for efficient olive harvesting and collection.",
    specs: ["Food Safe", "Tear Resistant", "Foldable"],
  },
  {
    slug: "bird-protection-net",
    category: "bird",
    nameKey: "categories.bird",
    image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop",
    description: "Humane bird control netting for agriculture and buildings.",
    specs: ["Humane", "Invisible", "Multi-Purpose"],
  },
];

const categories = [
  { key: "all", label: "All Products" },
  { key: "construction", label: "Construction" },
  { key: "agriculture", label: "Agriculture" },
  { key: "protection", label: "Protection" },
];

export default function ProductGrid({ locale }: { locale: string }) {
  const t = useTranslations("products");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t("title")}
          </h1>
          <p className="text-text-secondary">
            {t("subtitle")}
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat.key === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-primary hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/${locale}/products/${product.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={t(product.nameKey)}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
                    {categories.find(c => c.key === product.category)?.label || product.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {t(product.nameKey)}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-2 py-1 bg-gray-100 rounded text-xs text-text-secondary"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  <span>View Details</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
