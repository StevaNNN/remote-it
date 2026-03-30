// middleware.ts
import createMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE, LOCALES } from "./src/app/lib/i18n/locale";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
