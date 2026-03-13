import type { Metadata } from "next";
import { DEFAULT_LOCALE } from "./lib/i18n/locale";
import "./styles/main.scss";

export const metadata: Metadata = {
  title: {
    default: "PeyClub",
    template: "%s | PeyClub",
  },
  authors: [{ name: "PeyClub" }],
  creator: "PeyClub",
  publisher: "PeyClub",
  metadataBase: new URL("https://peyclub.com"),
  alternates: {
    languages: {
      en: "/en",
      sr: "/sr",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>{children}</body>
    </html>
  );
}
