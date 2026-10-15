// Localized product fields with graceful fallback to English.
//
// Product content lives in src/data/content.json. To localize a product, add
// either a nested "locales" object:
//
//   "locales": {
//     "es": { "name": "...", "description": "..." },
//     "ru": { "name": "...", "description": "..." },
//     "ar": { "name": "...", "description": "..." }
//   }
//
// or flat keys ("nameEs" / "descriptionEs", and likewise Ru / Ar).
// Anything missing falls back to the English product fields — nothing is invented.

const LOCALE_SUFFIX: Record<string, string> = {
  en: 'En',
  es: 'Es',
  ru: 'Ru',
  ar: 'Ar',
};

function pick(product: any, locale: string, field: 'name' | 'description'): string {
  const nested = product?.locales?.[locale]?.[field];
  if (typeof nested === 'string' && nested.trim()) return nested;

  const suffix = LOCALE_SUFFIX[locale];
  if (suffix) {
    const flat = product?.[`${field}${suffix}`];
    if (typeof flat === 'string' && flat.trim()) return flat;
  }

  const fallback = product?.[field];
  return typeof fallback === 'string' ? fallback : '';
}

export function getLocalizedProduct(
  product: any,
  locale: string
): { name: string; description: string } {
  return {
    name: pick(product, locale, 'name'),
    description: pick(product, locale, 'description'),
  };
}

export function hasLocalizedProduct(product: any, locale: string): boolean {
  if (locale === 'en') return true;
  const nested = product?.locales?.[locale];
  if (nested && (nested.name || nested.description)) return true;
  const suffix = LOCALE_SUFFIX[locale];
  return Boolean(suffix && (product?.[`name${suffix}`] || product?.[`description${suffix}`]));
}
