"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, CheckCircle, Droplets, Sun, Cloud, TreeDeciduous, Bird, ShieldCheck, Truck, CreditCard, Clock } from "lucide-react";

// Product categories matching nettingfactory.com
const productCategories = [
  {
    name: "Dust Cover Nets",
    keyword: "construction dust nets",
    description: "Heavy-duty HDPE mesh for dust containment on construction sites",
    icon: Droplets,
    href: "/products",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    name: "Shade Nets",
    keyword: "outdoor shade sails",
    description: "UV-resistant shade nets for agriculture, parking, and outdoor spaces",
    icon: Sun,
    href: "/products",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    name: "Hail Protection Nets",
    keyword: "anti-hail nets",
    description: "Protective netting to safeguard crops from hail damage",
    icon: Cloud,
    href: "/products",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&h=400&fit=crop",
  },
  {
    name: "Olive Nets",
    keyword: "olive collection nets",
    description: "Durable nets for efficient olive and fruit harvesting",
    icon: TreeDeciduous,
    href: "/products",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop",
  },
  {
    name: "Bird Protection Nets",
    keyword: "bird control nets",
    description: "Humane bird deterrent nets for agriculture and buildings",
    icon: Bird,
    href: "/products",
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&h=400&fit=crop",
  },
  {
    name: "Safety Mesh",
    keyword: "construction safety nets",
    description: "Fall protection and scaffolding safety nets for construction",
    icon: ShieldCheck,
    href: "/products",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
  },
];

const advantages = [
  { icon: Factory, title: "Factory Direct", description: "Competitive pricing with no middleman markup" },
  { icon: CheckCircle, title: "Premium Quality", description: "100% virgin HDPE with UV stabilization" },
  { icon: Truck, title: "Fast Delivery", description: "15-30 days production, worldwide shipping" },
  { icon: CreditCard, title: "Secure Payment", description: "T/T, L/C, PayPal accepted" },
  { icon: Clock, title: "24/7 Support", description: "Dedicated sales team for instant response" },
  { icon: Award, title: "Custom Solutions", description: "Tailored specifications for your needs" },
];

export default function Features() {
  const t = useTranslations("features");

  return (
    <>
      {/* Products Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Professional HDPE Netting Products
            </h2>
            <p className="text-lg text-gray-600">
              Explore our complete range of industrial netting solutions designed for construction, agriculture, and commercial applications
            </p>
          </header>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {productCategories.map((product) => (
              <Link
                key={product.name}
                href={`/${product.name.toLowerCase().replace(/ /g, '-')}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    View Details <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Products <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us as Your Netting Supplier?
            </h2>
            <p className="text-lg text-gray-600">
              With 15+ years of manufacturing experience, we deliver quality, reliability, and value to customers worldwide
            </p>
          </header>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((adv) => (
              <div key={adv.title} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <adv.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{adv.title}</h3>
                  <p className="text-sm text-gray-600">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
