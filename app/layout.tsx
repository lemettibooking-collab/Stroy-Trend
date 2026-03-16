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
  manifest: "/stroy-favicon-pack/site.webmanifest",
  keywords: [
    "аутсорс смет",
    "исполнительная документация",
    "ПТО",
    "сметчик на аутсорсе",
    "строительная документация",
  ],
  applicationName: siteConfig.name,
  icons: {
    icon: [
      {
        url: "/stroy-favicon-pack/favicon.ico",
      },
      {
        url: "/stroy-favicon-pack/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/stroy-favicon-pack/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/stroy-favicon-pack/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/stroy-favicon-pack/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/stroy-favicon-pack/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: {
      url: "/stroy-favicon-pack/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    shortcut: "/stroy-favicon-pack/favicon.ico",
  },
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
