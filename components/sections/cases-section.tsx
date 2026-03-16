import { SectionShell } from "@/components/section-shell";
import type { CasesContent } from "@/lib/site-content";

type CasesSectionProps = {
  content: CasesContent;
};

export function CasesSection({ content }: CasesSectionProps) {
  return (
    <SectionShell
      id="cases"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {content.items.map((item) => (
          <article
            key={item.title}
            className="surface-card flex h-full flex-col rounded-[2rem] p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold text-[var(--text)]">
              {item.title}
            </h3>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
              Ситуация
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              {item.challenge}
            </p>
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
              Что нужно на выходе
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
              {item.outcome}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
