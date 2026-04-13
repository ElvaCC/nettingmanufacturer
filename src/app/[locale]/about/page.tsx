import { Metadata } from "next";
import Image from "next/image";
import { getLocalizedMetadata } from "@/lib/seo/metadata";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Countries Served" },
  { value: "1000+", label: "Happy Clients" },
  { value: "20+", label: "Production Lines" },
];

const certifications = [
  { name: "ISO 9001", desc: "Quality Management System" },
  { name: "CE", desc: "European Safety Standards" },
  { name: "SGS", desc: "Global Inspection Services" },
  { name: "BV", desc: "Verification & Testing" },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Our Company</h1>
            <p className="text-xl text-white/80">
              With over 15 years of experience, we are a trusted global leader in HDPE netting manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-text-secondary">
                <p>
                  Founded in 2008, Netting Manufacturer has grown from a small family workshop 
                  to one of the leading HDPE netting manufacturers in China.
                </p>
                <p>
                  Our state-of-the-art facility spans over 50,000 square meters, equipped with 
                  more than 20 advanced production lines capable of producing over 5,000 tons 
                  of netting products annually.
                </p>
                <p>
                  We serve customers in over 50 countries, providing custom solutions for 
                  construction, agriculture, horticulture, and industrial applications.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&h=600&fit=crop"
                alt="Our factory"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            Quality Certifications
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{cert.name}</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1">{cert.name}</h3>
                <p className="text-sm text-text-secondary">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Quality First", desc: "We never compromise on materials or manufacturing standards." },
              { title: "Customer Focus", desc: "Every solution is tailored to meet specific customer needs." },
              { title: "Continuous Innovation", desc: "We invest in R&D to stay ahead of industry trends." },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-white/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
