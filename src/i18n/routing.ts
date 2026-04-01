// src/i18n/routing.ts
import { DEFAULT_LOCALE, LOCALES } from "@/src/i18n/locale";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LOCALES,

  // Used when no locale matches
  defaultLocale: DEFAULT_LOCALE,
});