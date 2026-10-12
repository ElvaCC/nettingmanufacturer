import { Metadata } from "next";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/app/i18n";

// NOTE: Project cases are pending real client information.
// Previously hardcoded cases referenced real third-party companies (e.g. Al Futtaim,
// Vale S.A.) without verification — removed to avoid false attribution. Replace with
// verified client projects before publishing.
const cases: any[] = [];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = getLocalizedMetadata(locale as Locale, "/cases");
  return {
    ...base,
    title: "Project Cases | Netting Manufacturer",
    description: "Explore our successful projects across the globe, serving diverse industries with HDPE netting solutions.",
  };
}

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  unstable_setRequestLocale(locale);

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
          {cases.length === 0 && (
            <div className="text-center py-16 text-text-secondary">
              <p className="text-lg">Verified project cases will be published here soon.</p>
              <p className="mt-2 text-sm opacity-70">
                For reference projects, please contact our sales team directly.
              </p>
            </div>
          )}
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
