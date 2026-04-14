"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Filter, Grid, List } from "lucide-react";

// Product data with full SEO content
const allProducts = [
  {
    id: "dust-cover-net-80",
    name: "Heavy Duty Dust Cover Net 80g/m²",
    category: "Dust Cover Nets",
    keyword: "construction dust net 80gsm",
    sku: "DCN-80",
    price: "$1.2",
    moq: "500 sqm",
    description: "Heavy-duty HDPE dust containment net with 80g/m² weight. Ideal for construction sites, scaffolding, and renovation projects. UV stabilized for outdoor use up to 3 years.",
    specs: { weight: "80g/m²", mesh: "1-2mm", width: "2-8m", color: "Green/Blue/White", material: "100% Virgin HDPE" },
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "dust-cover-net-120",
    name: "Heavy Duty Dust Cover Net 120g/m²",
    category: "Dust Cover Nets",
    keyword: "dust screen net 120gsm",
    sku: "DCN-120",
    price: "$1.8",
    moq: "500 sqm",
    description: "Premium HDPE dust net with 120g/m² weight for heavy-duty containment. Suitable for demolition sites and industrial applications. Fire-retardant option available.",
    specs: { weight: "120g/m²", mesh: "1-3mm", width: "3-10m", color: "Green/Black", material: "100% Virgin HDPE" },
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "shade-net-60",
    name: "HDPE Shade Net 60% Coverage",
    category: "Shade Nets",
    keyword: "garden shade net 60 percent",
    sku: "SN-60",
    price: "$0.8",
    moq: "1000 sqm",
    description: "Professional 60% shade rate HDPE net for greenhouse, nursery, and livestock shelter. Reduces temperature by 8-10°C. 3-year UV warranty.",
    specs: { shade: "60%", mesh: "2x3mm", width: "2-12m", color: "Green/Black/White", material: "HDPE with UV" },
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "shade-net-80",
    name: "HDPE Shade Net 80% Coverage",
    category: "Shade Nets",
    keyword: "agricultural shade net 80 percent",
    sku: "SN-80",
    price: "$1.1",
    moq: "1000 sqm",
    description: "High-density 80% shade net for maximum sun protection. Perfect for vegetable farms, parking lots, and outdoor events. Reinforced edges for extended lifespan.",
    specs: { shade: "80%", mesh: "2x2mm", width: "2-12m", color: "Green/Black", material: "HDPE with UV" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "hail-net-30",
    name: "Anti-Hail Protection Net 30mm",
    category: "Hail Protection Nets",
    keyword: "anti hail net fruit trees",
    sku: "HN-30",
    price: "$1.5",
    moq: "500 sqm",
    description: "Specialized anti-hail netting with 30mm mesh for orchard and vineyard protection. High tensile strength, absorbs impact energy. Easy installation with cable system.",
    specs: { mesh: "30mm", weight: "80g/m²", width: "4-12m", color: "White/Black", material: "HDPE UV stabilized" },
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "olive-net-standard",
    name: "Olive Collection Net Premium",
    category: "Olive Nets",
    keyword: "olive harvest catching net",
    sku: "OL-STD",
    price: "$2.5",
    moq: "200 pcs",
    description: "Professional olive catching net with reinforced edges and foldable design. 4x8m standard size, easy to install under trees. Machine washable and reusable.",
    specs: { size: "4x8m", material: "HDPE", weight: "120g/m²", edges: "Reinforced", color: "Green" },
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "bird-net-25",
    name: "Bird Protection Net 25mm Mesh",
    category: "Bird Nets",
    keyword: "bird netting garden protection",
    sku: "BN-25",
    price: "$0.9",
    moq: "500 sqm",
    description: "Humane bird deterrent net with 25mm mesh. Invisible when installed over crops and gardens. Safe for birds, prevents entanglements. 5-year outdoor durability.",
    specs: { mesh: "25mm", weight: "30g/m²", width: "2-10m", color: "Transparent/Green", material: "HDPE UV stabilized" },
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=500&h=400&fit=crop",
    inStock: true
  },
  {
    id: "construction-safety-mesh",
    name: "Construction Safety Mesh Heavy Duty",
    category: "Construction Mesh",
    keyword: "scaffolding safety mesh construction",
    sku: "CSM-HD",
    price: "$3.2",
    moq: "200 sqm",
    description: "Industrial-grade safety mesh for scaffolding, bridge construction, and fall protection. Meets EN ISO 1806 standards. High visibility orange color.",
    specs: { mesh: "50x50mm", weight: "350g/m²", width: "1-2m", color: "Orange/Black", material: "HDPE Heavy Duty" },
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=400&fit=crop",
    inStock: true
  },
];

const categories = ["All Products", "Dust Cover Nets", "Shade Nets", "Hail Protection Nets", "Olive Nets", "Bird Nets", "Construction Mesh"];

export default function ProductGrid({ locale }: { locale: string }) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = activeCategory === "All Products"
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <>
      {/* Products Page Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 text-white/70" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><a href={`/${locale}`} className="hover:text-white">Home</a></li>
              <li><ChevronRight size={14} aria-hidden="true" /></li>
              <li className="text-white font-medium" aria-current="page">Products</li>
            </ol>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            HDPE Netting Products
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Professional manufacturer of industrial HDPE netting solutions. Factory direct pricing with global shipping.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-white text-text-primary hover:bg-gray-50"
                  }`}
                  role="tab"
                  aria-selected={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-text-primary"}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-text-primary"}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}
              >
                <div className={`relative h-48 ${viewMode === "list" ? "md:w-1/3" : ""}`}>
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.keyword}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {product.inStock && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                      In Stock
                    </span>
                  )}
                </div>
                
                <div className={`p-6 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                  <span className="text-xs text-primary font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h2 className="text-lg font-bold text-text-primary mt-1 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Specs Table */}
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-text-secondary mb-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium capitalize">{key}:</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <span className="text-xs text-text-secondary ml-1">/ sqm</span>
                      <p className="text-xs text-text-secondary">MOQ: {product.moq}</p>
                    </div>
                    <Link
                      href={`/${locale}/contact?product=${product.id}`}
                      className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "HDPE Netting Products - Factory Direct",
            "description": "Professional manufacturer of industrial HDPE netting solutions including dust cover nets, shade nets, hail protection nets, olive nets, and bird nets.",
            "url": "https://www.nettingmanufacturer.com/products",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": filteredProducts.map((product, index) => ({
                "@type": "Product",
                "position": index + 1,
                "name": product.name,
                "description": product.description,
                "image": product.image,
                "sku": product.sku,
                "offers": {
                  "@type": "Offer",
                  "price": product.price.replace("$", ""),
                  "priceCurrency": "USD",
                  "availability": "https://schema.org/InStock",
                  "minimumOrderQuantity": product.moq
                }
              }))
            }
          })
        }}
      />
    </>
  );
}
