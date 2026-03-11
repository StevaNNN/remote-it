import "./styles/main.scss";

import { Suspense } from "react";
import Header from "./components/Header";
import { resolveLocale } from "./lib/i18n/locale";
import en from "./lib/i18n/en/en";
import sr from "./lib/i18n/sr/sr";
import HeroSection from "./sections/hero/HeroSection";
import WhatSection from "./sections/what/WhatSection";
import AISection from "./sections/ai/AISection";
import WhoSection from "./sections/who/WhoSection";
import CustomerSection from "./sections/customer/CustomerSection";

export default function Home() {
  const locale = resolveLocale();
  const t = locale === "en" ? en : sr;

  return (
    <>
      <Suspense>
        <Header locale={locale} t={t} />
      </Suspense>
      <main className="v-box">
        <HeroSection t={t} />
        <WhatSection t={t} />
        <AISection t={t} />
        <WhoSection t={t} />
        <CustomerSection t={t} />
      </main>
    </>
  );
}
