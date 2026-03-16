import type { Metadata } from "next";

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

const fallbackSiteUrl = "http://localhost:3000";
const fallbackPhoneHref = "tel:+79991402795";
const fallbackPhoneDisplay = "8 (999) 140-27-95";
const fallbackEmailHref = "mailto:stroytrend.org@mail.ru";
const fallbackEmailDisplay = "stroytrend.org@mail.ru";

export const siteConfig = {
  name: "Строй Тренд",
  description:
    "Аутсорс смет, исполнительной документации и поддержки ПТО для подрядчиков, субподрядчиков и генподрядчиков.",
  siteUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
  ),
  ogImagePath: "/icon.svg",
  telegramContactUrl: process.env.NEXT_PUBLIC_TELEGRAM_CONTACT_URL || "",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF || fallbackPhoneHref,
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || fallbackPhoneDisplay,
  emailHref: process.env.NEXT_PUBLIC_EMAIL_HREF || fallbackEmailHref,
  emailDisplay:
    process.env.NEXT_PUBLIC_EMAIL_DISPLAY || fallbackEmailDisplay,
};

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
}: PageMetadataInput): Metadata {
  const canonicalUrl = new URL(path, `${siteConfig.siteUrl}/`).toString();
  const imageUrl = new URL(
    siteConfig.ogImagePath,
    `${siteConfig.siteUrl}/`,
  ).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "ru_RU",
      siteName: siteConfig.name,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
  };
}
