import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Аутсорс смет, ИД и ПТО для строительных компаний | Строй Тренд",
    template: "%s | Строй Тренд",
  },
  description:
    "Строй Тренд: аутсорс смет, исполнительной документации и поддержки ПТО для подрядчиков, субподрядчиков и генподрядчиков. Быстрый первый контакт и понятный формат подключения.",
  keywords: [
    "аутсорс смет",
    "исполнительная документация",
    "ПТО",
    "сметчик на аутсорсе",
    "строительная документация",
  ],
  applicationName: "Строй Тренд",
  openGraph: {
    title: "Строй Тренд",
    description:
      "Аутсорс смет, исполнительной документации и поддержки ПТО для строительных компаний.",
    type: "website",
    locale: "ru_RU",
    siteName: "Строй Тренд",
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
