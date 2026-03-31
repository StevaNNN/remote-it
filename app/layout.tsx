import { DEFAULT_LOCALE } from "@/src/i18n/locale";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
