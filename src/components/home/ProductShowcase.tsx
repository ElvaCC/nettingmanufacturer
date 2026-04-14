"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "Construction Safety Debris Netting",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    description: "Heavy-duty debris netting for construction sites, scaffolding protection, and safety barriers.",
  },
  {
    name: "Hail Netting / Anti-hail Net",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Protect crops and vehicles from hail damage with our UV-stabilized anti-hail netting.",
  },
  {
    name: "Shade Net",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop",
    description: "High-density polyethylene shade nets for agriculture, parking, and outdoor areas.",
  },
  {
    name: "Mesh Tarp",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Breathable mesh tarps for trucks, trailers, and cargo coverage.",
  },
  {
    name: "Olive Net",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop",
    description: "Premium olive collection nets for efficient harvest and fruit catching.",
  },
  {
    name: "Privacy Fence Screen",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Privacy screening for fences, pergolas, and outdoor enclosures.",
  },
  {
    name: "Pool Leaf Net Cover",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop",
    description: "Leaf collection nets for swimming pools and water features.",
  },
  {
    name: "Trampoline Enclosure Net",
    image: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=400&h=300&fit=crop",
    description: "Safety enclosure nets for residential and commercial trampolines.",
  },
  {
    name: "Bird Netting",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&h=300&fit=crop",
    description: "Humane bird control netting for gardens, orchards, and buildings.",
  },
  {
    name: "Shade Sail",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    description: "Custom shade sails for patios, playgrounds, and parking areas.",
  },
  {
    name: "Anti Insect Net",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Fine mesh insect screens for greenhouses, windows, and crop protection.",
  },
  {
    name: "Weed Mat",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    description: "Landscape weed control fabric for gardens and agricultural applications.",
  },
];

export default function ProductShowcase({ locale }: { locale: string }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Product Series
          </h2>
          <p className="text-lg text-gray-600">
            We pride ourselves on manufacturing the best products and customer service possible.
          </p>
        </div>

        {/* Products Grid - 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {products.map((product, index) => (
            <Link
              key={index}
              href={`/${locale}/products`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                  READ MORE <span>+</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
