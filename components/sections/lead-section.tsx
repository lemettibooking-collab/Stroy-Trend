import { ButtonLink } from "@/components/button-link";
import { SectionShell } from "@/components/section-shell";
import { LeadFormPanel } from "@/components/sections/lead-form-panel";
import type { LeadFormContent } from "@/lib/site-content";

type LeadSectionProps = {
  content: LeadFormContent;
};

export function LeadSection({ content }: LeadSectionProps) {
  return (
    <SectionShell
      id="lead"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <LeadFormPanel content={content} />

        <aside className="dark-card h-full rounded-[2rem] p-6 md:p-8" aria-label="Что обсудим после заявки">
          <h3 className="text-xl font-semibold text-[#f3ede5]">
            Что обсуждаем на первом контакте
          </h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[#d6cec2]">
            {content.contactPoints.map((item) => (
              <li
                key={item}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-7 text-[#f3ede5]">{content.placeholderNote}</p>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8b59c]">
              Что происходит дальше
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#d6cec2]">
              {content.nextSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            {content.quickCtas.map((item, index) => (
              <ButtonLink
                key={item.label}
                href={item.href}
                label={item.label}
                variant={index === 0 ? "light" : "dark-outline"}
              />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="#faq" label={content.secondaryCta} variant="dark-outline" />
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
