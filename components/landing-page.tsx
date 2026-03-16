import { Footer } from "@/components/footer";
import { AboutSection } from "@/components/sections/about-section";
import { AdvantagesSection } from "@/components/sections/advantages-section";
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
import { type LandingPageConfig } from "@/lib/site-content";

type LandingPageProps = {
  config: LandingPageConfig;
};

export function LandingPage({ config }: LandingPageProps) {
  return (
    <div className="page-shell">
      <SiteHeader navigation={config.content.navigation} />
      <main id="main-content">
        {config.sections.map((section) => {
          switch (section) {
            case "hero":
              return <HeroSection key={section} content={config.content.hero} />;
            case "about":
              return <AboutSection key={section} content={config.content.about} />;
            case "services":
              return <ServicesSection key={section} content={config.content.services} />;
            case "signals":
              return <SignalsSection key={section} content={config.content.signals} />;
            case "advantages":
              return (
                <AdvantagesSection key={section} content={config.content.advantages} />
              );
            case "formats":
              return <FormatsSection key={section} content={config.content.formats} />;
            case "estimation":
              return (
                <EstimationSection key={section} content={config.content.estimation} />
              );
            case "executiveDocs":
              return (
                <ExecutiveDocsSection
                  key={section}
                  content={config.content.executiveDocs}
                />
              );
            case "process":
              return <ProcessSection key={section} content={config.content.process} />;
            case "audience":
              return <AudienceSection key={section} content={config.content.audience} />;
            case "cases":
              return <CasesSection key={section} content={config.content.cases} />;
            case "faq":
              return <FaqSection key={section} content={config.content.faq} />;
            case "lead":
              return <LeadSection key={section} content={config.content.leadForm} />;
            case "finalCta":
              return (
                <FinalCtaSection key={section} content={config.content.finalCta} />
              );
            default:
              return null;
          }
        })}
      </main>
      <Footer
        content={config.content.footer}
        navigation={config.content.navigation}
      />
    </div>
  );
}
