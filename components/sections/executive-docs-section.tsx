import { ButtonLink } from "@/components/button-link";
import { SectionShell } from "@/components/section-shell";
import type { DetailSectionContent } from "@/lib/site-content";

type ExecutiveDocsSectionProps = {
  content: DetailSectionContent;
};

export function ExecutiveDocsSection({ content }: ExecutiveDocsSectionProps) {
  return (
    <SectionShell
      id="executive-docs"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="dark-card rounded-[2rem] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[#f3ede5]">
            Что берём в работу
          </h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[#d6cec2]">
            {content.points.map((point) => (
              <li
                key={point}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[var(--text)]">
            Что получает команда
          </h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
            {content.deliverables.map((item) => (
              <li
                key={item}
                className="rounded-[1.25rem] border border-[var(--border)] bg-white/65 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-[var(--text)]">{content.note}</p>
          <div className="mt-8">
            <ButtonLink href="#lead-form" label={content.cta} variant="secondary" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
