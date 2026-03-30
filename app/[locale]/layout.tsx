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
  const siteUrl = "https://remoteitconsulting.com";

  const titles = {
    sr: "REMOTE-IT | Softverska Agencija za Web i Mobilne Aplikacije",
    en: "REMOTE-IT | Software Agency for Web & Mobile Applications",
  };

  const descriptions = {
    sr: "Kreiramo savremene web i mobilne aplikacije fokusirane na performanse, pristupačnost i korisničko iskustvo. IT Konsalting, Web Razvoj, A11y Auditi.",
    en: "We create modern web and mobile applications focused on performance, accessibility, and user experience. IT Consulting, Web Development, A11y Audits.",
  };

  const title = titles[locale as keyof typeof titles] || titles.en;
  const description =
    descriptions[locale as keyof typeof descriptions] || descriptions.en;

  return {
    title,
    description,
    keywords: [
      "web development",
      "mobile applications",
      "IT consulting",
      "accessibility",
      "A11y",
      "frontend development",
      "React",
      "Next.js",
      "TypeScript",
      "design systems",
      "Storybook",
    ],
    authors: [{ name: "REMOTE-IT" }],
    creator: "REMOTE-IT",
    publisher: "REMOTE-IT",
    openGraph: {
      type: "website",
      locale: locale,
      url: `${siteUrl}/${locale}`,
      siteName: "REMOTE-IT",
      title,
      description,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "REMOTE-IT",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
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
