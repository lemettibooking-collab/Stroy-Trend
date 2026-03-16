import { ButtonLink } from "@/components/button-link";
import { SectionShell } from "@/components/section-shell";
import type { FaqContent } from "@/lib/site-content";

type FaqSectionProps = {
  content: FaqContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <SectionShell
      id="faq"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-4">
        {content.items.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="faq-item surface-card rounded-[1.75rem] p-6"
          >
            <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--text)]">
              {item.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
      <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/52 p-4 sm:inline-flex sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#lead" label="Оставить заявку" />
          <ButtonLink href="#services" label="Посмотреть услуги" variant="secondary" />
        </div>
      </div>
    </SectionShell>
  );
}
