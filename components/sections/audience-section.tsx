import { SectionShell } from "@/components/section-shell";
import type { AudienceContent } from "@/lib/site-content";

type AudienceSectionProps = {
  content: AudienceContent;
};

export function AudienceSection({ content }: AudienceSectionProps) {
  return (
    <SectionShell
      id="audience"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {content.items.map((item) => (
          <article
            key={item.title}
            className="surface-card rounded-[1.75rem] p-6"
          >
            <h3 className="text-lg font-semibold text-[var(--text)]">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
