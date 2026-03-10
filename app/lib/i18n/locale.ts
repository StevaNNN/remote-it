export type Locale = "en" | "sr";

export const DEFAULT_LOCALE: Locale = "en";

export const resolveLocale = (localeFromQuery?: string): Locale => {
  if (localeFromQuery === "sr" || localeFromQuery === "en") {
    return localeFromQuery;
  }

  return DEFAULT_LOCALE;
};
