import { ButtonLink } from "@/components/button-link";
import { SectionShell } from "@/components/section-shell";
import type { FormatsContent } from "@/lib/site-content";

type FormatsSectionProps = {
  content: FormatsContent;
};

export function FormatsSection({ content }: FormatsSectionProps) {
  return (
    <SectionShell
      id="formats"
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
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              {item.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="rounded-[1.25rem] border border-[var(--border)] bg-white/65 px-4 py-3"
                >
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-[1.5rem] border border-[var(--border)] bg-white/50 p-4 sm:inline-flex sm:p-5">
        <ButtonLink href="#lead-form" label={content.cta} />
      </div>
    </SectionShell>
  );
}
