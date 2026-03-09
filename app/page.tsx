import "./styles/main.scss";

import Header from "./components/Header";
import { resolveLocale } from "./lib/i18n/locale";
import en from "./lib/i18n/en/en";
import sr from "./lib/i18n/sr/sr";
import Sidemenu from "./components/sidemenu/Sidemenu";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const locale = await resolveLocale(resolvedSearchParams?.locale);
  const t = locale === "en" ? en : sr;
  const navItems = t.header.nav.slice(0, 6);

  return (
    <>
      <Header locale={locale} translation={t.header} />
      <main></main>
    </>
  );
}
