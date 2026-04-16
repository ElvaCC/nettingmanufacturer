// i18n configuration
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "es", "ru", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ru: "Русский",
  ar: "العربية",
};

export const rtlLocales: Locale[] = ["ar"];

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async ({ locale }) => {
  // Enable static rendering
  const { unstable_setRequestLocale } = await import("next-intl/server");
  unstable_setRequestLocale(locale);

  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale,  // 明确返回 locale
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
