import "server-only";
import { cookies, headers } from "next/headers";

export type Locale = "en" | "sr";

export const resolveLocale = async (
  localeFromQuery?: string,
): Promise<Locale> => {
  if (localeFromQuery === "sr" || localeFromQuery === "en") {
    return localeFromQuery;
  }

  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;

  if (localeCookie === "sr" || localeCookie === "en") {
    return localeCookie;
  }

  const headersList = await headers();
  const acceptLanguage =
    headersList.get("accept-language")?.toLowerCase() ?? "";

  return acceptLanguage.includes("sr") ? "sr" : "en";
};
