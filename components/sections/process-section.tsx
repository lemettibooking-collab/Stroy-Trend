import { SectionShell } from "@/components/section-shell";
import type { ProcessContent } from "@/lib/site-content";

type ProcessSectionProps = {
  content: ProcessContent;
};

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <SectionShell
      id="process"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-5 lg:grid-cols-5">
        {content.steps.map((step, index) => (
          <article
            key={step.title}
            className="surface-card rounded-[1.75rem] p-6"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Шаг {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {step.text}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
