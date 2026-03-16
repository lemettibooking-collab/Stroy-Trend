import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import { smetyPageContent } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: smetyPageContent.seo.title,
  description: smetyPageContent.seo.description,
  path: "/smety",
});

export default function SmetyPage() {
  return <LandingPage config={smetyPageContent} />;
}
