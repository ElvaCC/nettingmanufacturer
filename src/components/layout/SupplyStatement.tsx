"use client";

import { useSelectedLayoutSegments } from "next/navigation";

/**
 * Site-wide B2B positioning statement.
 *
 * Wording is fixed by the client (2026-11-27) — do not paraphrase:
 * the site sells to importers / wholesalers / distributors, not consumers.
 *
 * Two placements, one source of truth:
 *  - variant="strip"  → directly under the H1 on product detail pages
 *  - variant="band"   → full-width band above the footer on every other page
 *                        (auto-hidden on product detail pages, which already
 *                         carry the strip, so the text never appears twice
 *                         on the same page)
 */
export const SUPPLY_TITLE = "Manufacturer & Wholesale Supply";
export const SUPPLY_BODY =
  "We manufacture HDPE warp-knitted netting for importers, wholesalers, and distributors. We specialize in bulk orders and customized production, not retail sales.";
export const SUPPLY_TAGLINE =
  "Factory Direct \u2022 Bulk Orders \u2022 Custom Manufacturing";

export default function SupplyStatement({
  variant = "strip",
}: {
  variant?: "strip" | "band";
}) {
  const segments = useSelectedLayoutSegments() || [];
  const isBand = variant === "band";

  // Product detail pages (/[locale]/products/[slug]) render the strip
  // themselves right under the H1 — skip the footer band there.
  const onProductDetail = segments[0] === "products" && segments.length > 1;
  if (isBand && onProductDetail) return null;

  return (
    <section
      aria-label="Supply model"
      style={{
        background: "#f6f9fd",
        borderTop: isBand ? "1px solid #e3ebf5" : undefined,
        borderBottom: isBand ? undefined : "1px solid #e3ebf5",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isBand ? "28px 24px 30px" : "16px 24px 18px",
        }}
      >
        <div style={{ borderLeft: "3px solid #0B4C8E", paddingLeft: isBand ? 16 : 14 }}>
          <h2
            style={{
              fontSize: isBand ? 16 : 14,
              fontWeight: 700,
              color: "#0B4C8E",
              margin: "0 0 6px",
              lineHeight: 1.3,
            }}
          >
            {SUPPLY_TITLE}
          </h2>
          <p
            style={{
              fontSize: isBand ? 14 : 13,
              color: "#4b5563",
              lineHeight: 1.6,
              margin: "0 0 8px",
              maxWidth: 880,
            }}
          >
            {SUPPLY_BODY}
          </p>
          {/* Bold navy only — no fill, no border, so it reads as emphasised
              copy rather than a clickable button. */}
          <div
            style={{
              fontSize: isBand ? 13.5 : 13,
              fontWeight: 700,
              color: "#0B4C8E",
              letterSpacing: 0.3,
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {SUPPLY_TAGLINE}
          </div>
        </div>
      </div>
    </section>
  );
}
