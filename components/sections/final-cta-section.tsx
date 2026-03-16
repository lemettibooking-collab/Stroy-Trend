import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import type { FinalCtaContent } from "@/lib/site-content";

type FinalCtaSectionProps = {
  content: FinalCtaContent;
};

export function FinalCtaSection({ content }: FinalCtaSectionProps) {
  return (
    <section className="section-offset py-12 md:py-20">
      <Container>
        <div className="dark-card relative rounded-[2.2rem] p-8 md:p-12">
          <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d3b28a]">
            Финальное действие
          </span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h2 className="balanced-text max-w-3xl text-3xl font-semibold tracking-tight text-[#f3ede5] md:text-5xl md:leading-[1.08]">
                {content.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#d6cec2] md:text-lg">
                {content.description}
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <ButtonLink
                  href={content.primaryCta.href}
                  label={content.primaryCta.label}
                  variant="light-filled"
                />
                <ButtonLink
                  href={content.secondaryCta.href}
                  label={content.secondaryCta.label}
                  variant="dark-outline"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
