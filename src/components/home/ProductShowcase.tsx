"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const specs = [
  { label: "Material", value: "100% Virgin HDPE" },
  { label: "UV Stabilization", value: "2-5% UV stabilizer" },
  { label: "Weight Range", value: "60-200 gsm" },
  { label: "Width", value: "1-12 meters" },
  { label: "Shade Factor", value: "30-90%" },
  { label: "Life Expectancy", value: "3-10 years" },
];

const certifications = [
  "ISO 9001:2015",
  "CE Certified",
  "SGS Tested",
  "REACH Compliant",
];

export default function ProductShowcase({ locale }: { locale: string }) {
  return (
    <>
      {/* Product Spotlight */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                alt="HDPE Netting Products - Factory Direct"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-slate-900 px-6 py-3 rounded-lg font-bold shadow-lg">
                Factory Direct
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Premium HDPE Netting Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our HDPE netting products are manufactured using 100% virgin materials with advanced UV stabilization technology, ensuring exceptional durability and performance in harsh environments.
              </p>

              {/* Key Features */}
              <div className="space-y-3 mb-8">
                {[
                  "Heavy-duty construction for industrial applications",
                  "UV-stabilized for long outdoor lifespan",
                  "Lightweight yet incredibly strong",
                  "Resistant to chemicals and mildew",
                  "Easy installation and maintenance",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 uppercase">{spec.label}</div>
                    <div className="font-semibold text-gray-900">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Request Quote <ArrowRight size={18} />
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  View Specifications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white mb-2">Certified Quality Assurance</h3>
            <p className="text-white/70">All products meet international quality standards</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
