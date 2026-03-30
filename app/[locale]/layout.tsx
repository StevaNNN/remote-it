// app/[locale]/layout.tsx
import type { Metadata } from "next";

import { ThemeProvider } from "../components/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LOCALES, resolveLocale } from "../lib/i18n/locale";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    sr: "REMOTE-IT | Softverska Agencija",
    en: "REMOTE-IT | Software Agency",
  };
  const descriptions = {
    sr: "Opis na srpskom...",
    en: "Description in English...",
  };
  const title = titles[locale as keyof typeof titles] ?? titles.en;
  const description =
    descriptions[locale as keyof typeof descriptions] ?? descriptions.en;
  return { title, description, openGraph: { title, description, locale } };
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
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
