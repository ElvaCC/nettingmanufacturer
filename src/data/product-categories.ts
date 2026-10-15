// Single source of truth for product category structure.
// Used by: products overview page, category landing pages, header dropdown.
// NOTE: productIds must reference existing product ids in content.json — do not rename products here.

export interface ProductCategory {
  id: string;
  slug: string;
  label: string;
  emoji: string;
  productIds: string[];
  tagline: string;
  intro: string;
  selectionPoints: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'construction',
    slug: 'construction-safety-netting',
    label: 'Construction & Safety Netting',
    emoji: '🏗️',
    productIds: ['debris-net', 'square-net', 'mesh-tarp'],
    tagline: 'Debris containment and site safety netting for scaffolding, construction and general protection.',
    intro:
      'Our construction and safety range covers HDPE warp-knitted netting for debris containment, scaffold protection and general site screening. Made from 100% virgin HDPE with UV treatment, supplyable in custom roll sizes, colours and edge finishes.',
    selectionPoints: [
      'Mesh opening — finer mesh for debris containment, larger openings for general site and scaffold protection',
      'Fire-retardant options available on request',
      'Custom roll width and length, reinforced edges and eyelet spacing',
      'Colour options and OEM supply for distributors',
    ],
  },
  {
    id: 'agriculture',
    slug: 'agricultural-netting',
    label: 'Agricultural & Horticultural Netting',
    emoji: '🌾',
    productIds: ['anti-hail-net', 'olive-net', 'anti-bee-net', 'anti-bird-net', 'weed-barrier'],
    tagline: 'Orchard, vineyard and crop protection netting against hail, birds, bees and weeds.',
    intro:
      'Our agricultural and horticultural range covers HDPE netting for orchards, vineyards and open-field crops. Products are UV-stabilised for outdoor exposure and can be customised to local crop, trellis and harvest systems.',
    selectionPoints: [
      'Match the net to the protection target — hail, birds, bees or weed control',
      'UV-stabilised material for long-term outdoor exposure',
      'Custom widths and any roll length',
      'Colour and mesh options to suit local growing practice',
    ],
  },
  {
    id: 'shade-privacy',
    slug: 'shade-privacy-netting',
    label: 'Shade & Privacy Netting',
    emoji: '☀️',
    productIds: ['tape-shade-net', 'shade-sail', 'privacy-screen'],
    tagline: 'Shade netting, shade sails and privacy screens for sun protection and screening.',
    intro:
      'Our shade and privacy range covers HDPE shade netting, shade sails and privacy screens with selectable shade rates and UV protection — for agriculture, horticulture, construction sites, balconies and commercial screening.',
    selectionPoints: [
      'Choose the shade rate to match the crop or climate',
      'UV-stabilised and water-resistant options available',
      'Custom widths, lengths and colours',
      'Reinforced edges and eyelets for secure installation',
    ],
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.id === id);
}

export function getCategoryByProductId(productId: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.productIds.includes(productId));
}

// Use-case relevance order for the "Related Products" module.
// Ordered by what a buyer of this product is most likely to need next,
// NOT by keyword or list order. Only ids above are referenced.
// Editable: reorder or change ids here — no other file needs touching.
export const RELATED_PRODUCT_IDS: Record<string, string[]> = {
  // Construction & site protection
  'debris-net': ['square-net', 'mesh-tarp', 'privacy-screen'],
  'square-net': ['debris-net', 'mesh-tarp', 'privacy-screen'],
  'mesh-tarp': ['square-net', 'debris-net', 'shade-sail'],
  // Shade & privacy
  'tape-shade-net': ['shade-sail', 'privacy-screen', 'anti-hail-net'],
  'shade-sail': ['tape-shade-net', 'privacy-screen', 'mesh-tarp'],
  'privacy-screen': ['tape-shade-net', 'shade-sail', 'debris-net'],
  // Orchard & crop protection
  'anti-hail-net': ['olive-net', 'anti-bird-net', 'anti-bee-net'],
  'olive-net': ['anti-hail-net', 'anti-bird-net', 'anti-bee-net'],
  'anti-bee-net': ['anti-bird-net', 'anti-hail-net', 'olive-net'],
  'anti-bird-net': ['anti-bee-net', 'anti-hail-net', 'olive-net'],
  'weed-barrier': ['anti-bird-net', 'anti-hail-net', 'olive-net'],
};

/**
 * Resolve related product ids for internal linking.
 * Order: use-case relevance first, then remaining products of the same series.
 * Returns fewer than `limit` items when there is not enough relevant content —
 * unrelated products are never padded in.
 */
export function getRelatedProductIds(
  productId: string,
  availableIds?: string[],
  limit = 4
): string[] {
  const pool =
    availableIds && availableIds.length
      ? availableIds
      : PRODUCT_CATEGORIES.flatMap((c) => c.productIds);

  const out: string[] = [];
  const push = (id: string) => {
    if (id === productId) return;
    if (!pool.includes(id)) return;
    if (out.includes(id)) return;
    out.push(id);
  };

  (RELATED_PRODUCT_IDS[productId] || []).forEach(push);
  const sameCategory = getCategoryByProductId(productId);
  if (sameCategory) sameCategory.productIds.forEach(push);

  return out.slice(0, limit);
}
