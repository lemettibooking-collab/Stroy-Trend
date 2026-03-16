import { ButtonLink } from "@/components/button-link";
import { SectionShell } from "@/components/section-shell";
import type { DetailSectionContent } from "@/lib/site-content";

type EstimationSectionProps = {
  content: DetailSectionContent;
};

export function EstimationSection({ content }: EstimationSectionProps) {
  return (
    <SectionShell
      id="estimation"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[var(--text)]">
            Что закрываем
          </h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
            {content.points.map((point) => (
              <li
                key={point}
                className="rounded-[1.25rem] border border-[var(--border)] bg-white/65 px-4 py-3"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="dark-card rounded-[2rem] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[#f3ede5]">
            На выходе
          </h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[#d6cec2]">
            {content.deliverables.map((item) => (
              <li
                key={item}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-7 text-[#f3ede5]">{content.note}</p>
          <div className="mt-8">
            <ButtonLink href="#lead" label={content.cta} variant="light" />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
