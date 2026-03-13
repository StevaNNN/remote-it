// app/[locale]/layout.tsx
import { resolveLocale, LOCALES } from "@/app/lib/i18n/locale";
import en from "@/app/lib/i18n/en/en";
import sr from "@/app/lib/i18n/sr/sr";
import { Suspense } from "react";
import Header from "@/app/components/Header";
import FooterSection from "@/app/sections/footer/FooterSection";
import type { Metadata } from "next";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = locale === "sr" ? sr : en;
  const { title, description, keywords, ogLocale, ogAlternateLocale } =
    t.metadata;

  return {
    title,
    description,
    keywords,
    openGraph: {
      type: "website",
      siteName: "PeyClub",
      locale: ogLocale,
      alternateLocale: ogAlternateLocale,
      title,
      description,
      url: `https://peyclub.com/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = locale === "sr" ? sr : en;

  return (
    <>
      <Suspense>
        <Header locale={locale} t={t} />
      </Suspense>
      <main className="v-box">{children}</main>
      <FooterSection t={t} />
    </>
  );
}
