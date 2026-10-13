import { Metadata } from "next";
import Link from "next/link";
import { getLocalizedMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/app/i18n";
import contentData from "@/data/content.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = getLocalizedMetadata(locale as Locale, "/solutions");
  return {
    ...base,
    title: "HDPE Netting Solutions by Application | Jiacheng Netting",
    description:
      "Industry-specific HDPE netting solutions for construction safety, agriculture, shade, and privacy. Factory-direct from Jiacheng Netting — BSCI & NFPA-701 certified.",
  };
}

// Solution scenarios mapped to real product ids (from content.json)
const SOLUTIONS = [
  {
    id: "construction-safety",
    title: "Construction Safety & Debris Containment",
    icon: "🏗️",
    intro:
      "Protect workers, pedestrians, and property on active job sites with high-strength, fire-retardant HDPE safety netting.",
    productIds: ["debris-net", "square-net", "mesh-tarp"],
    points: [
      "NFPA 701 fire-retardant options for enclosed scaffolding",
      "Reinforced eyelets for fast, secure installation",
      "UV-stabilized for long outdoor service life",
    ],
  },
  {
    id: "shade-sun",
    title: "Shade & Sun Protection",
    icon: "☀️",
    intro:
      "Regulate temperature and light for agriculture, greenhouses, and outdoor spaces with UV-treated HDPE shade netting.",
    productIds: ["tape-shade-net", "shade-sail"],
    points: [
      "Multiple shade factors and mesh densities",
      "Custom sizes, colors, and edge finishing",
      "Breathable knit resists wind load and tearing",
    ],
  },
  {
    id: "agriculture-harvest",
    title: "Agriculture & Harvest Protection",
    icon: "🌾",
    intro:
      "Shield crops from hail, birds, insects, and weeds while supporting efficient harvesting workflows.",
    productIds: ["anti-hail-net", "olive-net", "anti-bee-net", "anti-bird-net", "weed-barrier"],
    points: [
      "Crop-specific mesh sizes for targeted protection",
      "Lightweight yet durable for multi-season use",
      "Custom roll widths for large-area coverage",
    ],
  },
  {
    id: "privacy-barrier",
    title: "Privacy Screens & Barriers",
    icon: "🛡️",
    intro:
      "Create clean, secure boundaries for residential, commercial, and industrial perimeters with durable privacy netting.",
    productIds: ["privacy-screen"],
    points: [
      "High opacity for visual privacy",
      "Wind-permeable knit for fence stability",
      "Available in a range of colors and heights",
    ],
  },
];

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div style={{ padding: "80px 24px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, textAlign: "center", marginBottom: 16, color: "#0B4C8E" }}>
          HDPE Netting Solutions by Application
        </h1>
        <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginBottom: 56, maxWidth: 760, margin: "0 auto 56px", lineHeight: 1.7 }}>
          From construction safety to agriculture and privacy, our warp-knitted HDPE netting is engineered for specific
          real-world applications. Explore the right solution for your project.
        </p>

        {SOLUTIONS.map((sol) => {
          const products = sol.productIds
            .map((id) => contentData.products.find((p) => p.id === id))
            .filter(Boolean);

          return (
            <div
              key={sol.id}
              style={{
                background: "#f9fafb",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e5e7eb",
                marginBottom: 28,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{sol.icon}</span>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0B4C8E", margin: 0 }}>{sol.title}</h2>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#555", marginBottom: 16 }}>{sol.intro}</p>

              <ul style={{ margin: "0 0 20px", paddingLeft: 20, fontSize: 14, color: "#555", lineHeight: 1.9 }}>
                {sol.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              {/* Linked products */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {products.map((p) => (
                  <Link
                    key={p!.id}
                    href={`/${locale}/products/${p!.id}`}
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      background: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      color: "#0B4C8E",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    {p!.name} →
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
