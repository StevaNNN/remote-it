// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { resolveLocale } from "./locale";

export default getRequestConfig(async ({ locale }) => {
  const resolved = resolveLocale(locale);

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
