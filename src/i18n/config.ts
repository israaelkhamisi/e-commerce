export const locales = ["ar", "en"] as const;
export const defaultLocale = "ar";

export type Locale = (typeof locales)[number];

export const rtlLocales: Locale[] = ["ar"];

export function getDirection(locale: Locale) {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}
