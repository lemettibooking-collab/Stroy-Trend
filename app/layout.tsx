import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Аутсорс смет, ИД и ПТО для строительных компаний | Строй Тренд",
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(`${siteConfig.siteUrl}/`),
  description: siteConfig.description,
  keywords: [
    "аутсорс смет",
    "исполнительная документация",
    "ПТО",
    "сметчик на аутсорсе",
    "строительная документация",
  ],
  applicationName: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImagePath }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
