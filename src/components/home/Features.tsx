"use client";

import { useTranslations } from "next-intl";
import { CheckCircle, MessageSquare } from "lucide-react";

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
  const t = useTranslations("features");

  return (
    <>
      {/* Features Section */}
      <section className="py-20 bg-white" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Why Choose Our HDPE Netting Products?
            </h2>
            <p className="text-lg text-text-secondary">
              Professional manufacturer with 15+ years experience providing high-quality industrial netting solutions for global markets
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Premium Quality Materials",
                description: "100% virgin HDPE material with UV stabilization for long-lasting durability in harsh environments"
              },
              {
                icon: CheckCircle,
                title: "Custom Specifications",
                description: "Tailored mesh size, weight, width, and color to meet your exact project requirements"
              },
              {
                icon: CheckCircle,
                title: "Competitive Factory Price",
                description: "Direct from factory with no middlemen, offering the best prices for bulk orders"
              },
              {
                icon: CheckCircle,
                title: "Fast Global Delivery",
                description: "Efficient logistics network ensuring timely delivery to over 50 countries worldwide"
              },
            ].map((feature, index) => (
              <article key={index} className="text-center p-6 rounded-2xl bg-background-secondary hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Schema */}
      <section className="py-20 bg-background-secondary" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4">
          <header className="text-center max-w-3xl mx-auto mb-12">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-text-secondary">
              Quick answers to common questions about our products and services
            </p>
          </header>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <details key={index} className="group bg-white rounded-xl shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-medium text-text-primary flex items-center gap-3">
                    <MessageSquare size={20} className="text-primary flex-shrink-0" aria-hidden="true" />
                    {faq.question}
                  </span>
                  <span className="text-primary transition-transform group-open:rotate-180" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-text-secondary leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-text-secondary mb-4">Still have questions?</p>
            <a href="/contact" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              Contact us for more information →
            </a>
          </div>
        </div>

        {/* FAQ Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqData.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </section>
    </>
  );
}
