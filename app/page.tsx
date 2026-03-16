import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about-section";
import { AudienceSection } from "@/components/sections/audience-section";
import { CasesSection } from "@/components/sections/cases-section";
import { ExecutiveDocsSection } from "@/components/sections/executive-docs-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { FormatsSection } from "@/components/sections/formats-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LeadSection } from "@/components/sections/lead-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SignalsSection } from "@/components/sections/signals-section";
import { SiteHeader } from "@/components/site-header";
import { EstimationSection } from "@/components/sections/estimation-section";
import { AdvantagesSection } from "@/components/sections/advantages-section";
import { siteContent } from "@/lib/site-content";

export default function HomePage() {
  return (
    <div className="page-shell">
      <SiteHeader navigation={siteContent.navigation} />
      <main id="main-content">
        <HeroSection content={siteContent.hero} />
        <AboutSection content={siteContent.about} />
        <ServicesSection content={siteContent.services} />
        <SignalsSection content={siteContent.signals} />
        <AdvantagesSection content={siteContent.advantages} />
        <FormatsSection content={siteContent.formats} />
        <EstimationSection content={siteContent.estimation} />
        <ExecutiveDocsSection content={siteContent.executiveDocs} />
        <ProcessSection content={siteContent.process} />
        <AudienceSection content={siteContent.audience} />
        <CasesSection content={siteContent.cases} />
        <FaqSection content={siteContent.faq} />
        <LeadSection content={siteContent.leadForm} />
        <FinalCtaSection content={siteContent.finalCta} />
      </main>
      <Footer content={siteContent.footer} navigation={siteContent.navigation} />
    </div>
  );
}
