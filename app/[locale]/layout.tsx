// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { resolveLocale, LOCALES } from "@/app/lib/i18n/locale";
import en from "@/app/lib/i18n/en/en";
import sr from "@/app/lib/i18n/sr/sr";
import { ThemeProvider } from "../components/providers/theme-provider";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const awaitedParams = await params;
  const { locale } = awaitedParams;

  const titles = {
    sr: "REMOTE-IT | Softverska Agencija",
    en: "REMOTE-IT | Software Agency",
  };

  const descriptions = {
    sr: "Opis na srpskom...",
    en: "Description in English...",
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title,
    description,
    openGraph: { title, description, locale },
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
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
