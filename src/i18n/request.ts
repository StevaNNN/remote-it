// i18n/request.ts
import { resolveLocale } from "@/app/lib/i18n/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = resolveLocale(await requestLocale);
  const messages = {
    en: (await import("../messages/en.json")).default,
    sr: (await import("../messages/sr.json")).default,
  };

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
