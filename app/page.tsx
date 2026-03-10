import "./styles/main.scss";

import Header from "./components/Header";
import { resolveLocale } from "./lib/i18n/locale";
import en from "./lib/i18n/en/en";
import sr from "./lib/i18n/sr/sr";
import HeroSection from "./sections/hero/HeroSection";
import WhatSection from "./sections/what/WhatSection";
import AISection from "./sections/ai/AISection";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ locale?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const locale = resolveLocale(resolvedSearchParams?.locale);
  const t = locale === "en" ? en : sr;

  return (
    <>
      <Header locale={locale} t={t} />
      <main>
        <HeroSection t={t} />
        <WhatSection t={t} />
        <AISection t={t} />
      </main>
    </>
  );
}
