"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Shield, Truck, Factory, Users } from "lucide-react";

const features = [
  {
    icon: Factory,
    titleKey: "items.quality.title",
    descKey: "items.quality.description",
  },
  {
    icon: Shield,
    titleKey: "items.certification.title",
    descKey: "items.certification.description",
  },
  {
    icon: Truck,
    titleKey: "items.customization.title",
    descKey: "items.customization.description",
  },
  {
    icon: Users,
    titleKey: "items.manufacturing.title",
    descKey: "items.manufacturing.description",
  },
];

export default function Features() {
  const t = useTranslations("features");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-text-secondary text-sm">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
