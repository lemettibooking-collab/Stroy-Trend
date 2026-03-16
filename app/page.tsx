import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import { homePageContent } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: homePageContent.seo.title,
  description: homePageContent.seo.description,
  path: "/",
});

export default function HomePage() {
  return <LandingPage config={homePageContent} showAchievements showProjectCases />;
}
