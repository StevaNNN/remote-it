// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { resolveLocale } from "./locale";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = resolveLocale(await requestLocale);

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
