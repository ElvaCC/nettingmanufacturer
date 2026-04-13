import { Metadata } from "next";
import Image from "next/image";

const cases = [
  {
    id: 1,
    title: "Dubai Metro Construction Project",
    client: "Al Futtaim Group",
    location: "Dubai, UAE",
    year: "2023",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop",
    description: "Supplied 50,000 sqm of HDPE construction mesh for scaffolding safety and debris containment.",
  },
  {
    id: 2,
    title: "Spanish Olive Farm",
    client: "Cortijero S.L.",
    location: "Andalusia, Spain",
    year: "2023",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=500&fit=crop",
    description: "Provided custom olive collection nets covering 200 hectares of farmland.",
  },
  {
    id: 3,
    title: "German Greenhouse Complex",
    client: "GrünTech GmbH",
    location: "Bavaria, Germany",
    year: "2024",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=500&fit=crop",
    description: "Installed UV-resistant shade nets for 50,000 sqm of greenhouse facilities.",
  },
  {
    id: 4,
    title: "Brazilian Mining Site",
    client: "Vale S.A.",
    location: "Minas Gerais, Brazil",
    year: "2024",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=500&fit=crop",
    description: "Dust containment system with 100,000 sqm of fine mesh netting.",
  },
];

export default async function CasesPage({
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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Project Cases</h1>
            <p className="text-xl text-white/80">
              Explore our successful projects across the globe, serving diverse industries.
            </p>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={caseItem.image}
                    alt={caseItem.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-primary">
                    {caseItem.year}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {caseItem.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <span>{caseItem.client}</span>
                    <span>•</span>
                    <span>{caseItem.location}</span>
                  </div>
                  <p className="text-text-secondary">{caseItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a customized solution for your needs.
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center px-6 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
