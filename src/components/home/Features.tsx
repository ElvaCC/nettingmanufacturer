"use client";

import { CheckCircle, Shield, Truck, Factory, Users, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Premium Quality Materials",
    description: "100% virgin HDPE material with UV stabilization for long-lasting durability in harsh environments",
  },
  {
    icon: Factory,
    title: "Custom Specifications",
    description: "Tailored mesh size, weight, width, and color to meet your exact project requirements",
  },
  {
    icon: Award,
    title: "Competitive Factory Price",
    description: "Direct from factory with no middlemen, offering the best prices for bulk orders",
  },
  {
    icon: Truck,
    title: "Fast Global Delivery",
    description: "Efficient logistics network ensuring timely delivery to over 50 countries worldwide",
  },
];

const faqData = [
  {
    question: "What is your minimum order quantity?",
    answer: "Our MOQ varies by product type, typically starting from 500 sqm. For custom specifications, please contact us for a detailed quote."
  },
  {
    question: "Do you offer OEM/ODM services?",
    answer: "Yes, we provide full OEM and ODM services including custom logos, packaging, and specifications to meet your specific requirements."
  },
  {
    question: "What are your payment terms?",
    answer: "We accept T/T, L/C, and PayPal. Standard terms are 30% deposit, 70% balance before shipment."
  },
  {
    question: "How long is your production lead time?",
    answer: "Standard products ship within 7-15 days. Custom orders typically require 20-30 days depending on order volume."
  },
];

export default function Features() {
  return (
    <>
      {/* Features Grid */}
      <section className="py-20 bg-gray-50" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our HDPE Netting Products?
            </h2>
            <p className="text-lg text-gray-600">
              Professional manufacturer with 15+ years experience providing high-quality industrial netting solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <article 
                key={index} 
                className="flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <details 
                key={index} 
                className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-gray-100 transition-colors">
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="text-blue-600 transition-transform group-open:rotate-180 flex-shrink-0" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
            >
              Contact us for more information →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
