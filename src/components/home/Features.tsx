"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Features({ locale }: { locale: string }) {
  const products = [
    "Safety & Scaffolding Netting",
    "Hail Netting / Anti-hail Net",
    "Shade Net",
    "Mesh Tarp",
    "Olive Net",
    "Privacy Fence Screen",
    "Shade Sail",
    "Pool Leaf Net Cover",
    "Bird Netting",
    "Trampoline Enclosure Net",
    "Anti Insect Net",
    "Weed Mat",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop"
                alt="Netting Manufacturer Factory"
                className="w-full rounded-xl shadow-lg"
              />
            </div>

            {/* Right - Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Netting Manufacturer Co., Ltd
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Established in 2005, Netting Manufacturer Co., Ltd is a leading manufacturer of HDPE industrial netting solutions. We specialize in the following products:
              </p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {products.map((product) => (
                  <div key={product} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">{product}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We can customize various knotless plastic netting according to your requirements. Our core value is "Quality First", which has earned us satisfied customers worldwide across multiple industries. 60% of our products are exported to the United States, with the proportion still rising; 40% are sold in Europe, Middle East, and Africa.
              </p>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
              >
                About us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-gray-50 rounded-xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
