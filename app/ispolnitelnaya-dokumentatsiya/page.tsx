import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";
import { executiveDocsPageContent } from "@/lib/site-content";
import { buildPageMetadata } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: executiveDocsPageContent.seo.title,
  description: executiveDocsPageContent.seo.description,
  path: "/ispolnitelnaya-dokumentatsiya",
});

export default function ExecutiveDocsPage() {
  return <LandingPage config={executiveDocsPageContent} />;
}
