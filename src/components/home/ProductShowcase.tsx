"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// Product data with detailed SEO information
const products = [
  {
    id: "dust-cover-net",
    name: "Dust Cover Nets",
    keyword: "construction dust cover net",
    description: "Heavy-duty HDPE dust containment nets for construction sites, scaffolding, and demolition projects. UV stabilized and fire-retardant options available.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    specs: ["Mesh: 1-3mm", "Weight: 80-200g/m²", "Width: 2-8m"],
    href: "/products/dust-cover-nets"
  },
  {
    id: "shade-net",
    name: "Shade Nets",
    keyword: "HDPE shade net for agriculture",
    description: "UV-resistant HDPE shade nets for agriculture, horticulture, and livestock. Reduces temperature by up to 15°C, protecting crops and animals.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    specs: ["Shade Rate: 30%-90%", "Material: HDPE", "Lifespan: 3-5 years"],
    href: "/products/shade-nets"
  },
  {
    id: "hail-protection-net",
    name: "Hail Protection Nets",
    keyword: "anti hail net for fruit trees",
    description: "Durable anti-hail netting to protect orchards, vineyards, and crops from storm damage. High tensile strength with easy installation systems.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    specs: ["Mesh: 20-50mm", "Weight: 70-150g/m²", "Anti-hail rated"],
    href: "/products/hail-protection-nets"
  },
  {
    id: "olive-net",
    name: "Olive Collection Nets",
    keyword: "olive harvest net",
    description: "Premium olive catching nets for efficient harvest collection. Foldable design with reinforced edges for easy installation and storage.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=400&fit=crop",
    specs: ["Material: HDPE", "Size: 4x8m to 8x20m", "Easy fold"],
    href: "/products/olive-collection-nets"
  },
  {
    id: "bird-net",
    name: "Bird Protection Nets",
    keyword: "bird netting for gardens",
    description: "Humane bird deterrent netting for crops, orchards, and building protection. Invisible when installed, safe for birds and environment.",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&h=400&fit=crop",
    specs: ["Mesh: 25-50mm", "UV stabilized", "Various colors"],
    href: "/products/bird-protection-nets"
  },
  {
    id: "construction-mesh",
    name: "Construction Safety Mesh",
    keyword: "scaffolding safety mesh",
    description: "Heavy-duty safety mesh for scaffolding, bridge construction, and fall protection systems. Meets international safety standards.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
    specs: ["Mesh: 50-100mm", "Weight: 200-500g/m²", "EN compliant"],
    href: "/products/construction-mesh"
  },
];

export default function ProductShowcase({ locale }: { locale: string }) {
  return (
    <>
      {/* Product Categories Section */}
      <section className="py-20 bg-white" aria-labelledby="products-heading">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="products-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Our HDPE Netting Product Categories
            </h2>
            <p className="text-lg text-text-secondary">
              Professional manufacturer of industrial HDPE netting solutions. From construction dust control to agricultural protection, we have you covered.
            </p>
          </header>

          {/* Product Grid with detailed SEO info */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {products.map((product) => (
              <article key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.keyword}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/90 text-primary text-xs font-medium rounded-full">
                      {product.keyword}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Product Specifications */}
                  <ul className="flex flex-wrap gap-2 mb-4" aria-label="Product specifications">
                    {product.specs.map((spec, index) => (
                      <li key={index} className="inline-block px-2 py-1 bg-gray-100 text-text-secondary text-xs rounded">
                        {spec}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={`/${locale}${product.href}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                    aria-label={`Learn more about ${product.name}`}
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="text-center">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition-colors"
            >
              <span>View All HDPE Netting Products</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "HDPE Netting Products",
            "description": "Professional HDPE netting products including dust cover nets, shade nets, hail protection, olive nets, and bird nets",
            "itemListElement": products.map((product, index) => ({
              "@type": "Product",
              "position": index + 1,
              "name": product.name,
              "description": product.description,
              "image": product.image,
              "url": `https://www.nettingmanufacturer.com/${locale}${product.href}`
            }))
          })
        }}
      />
    </>
  );
}
