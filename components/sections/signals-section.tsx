import { SectionShell } from "@/components/section-shell";
import type { SignalsContent } from "@/lib/site-content";

type SignalsSectionProps = {
  content: SignalsContent;
};

export function SignalsSection({ content }: SignalsSectionProps) {
  return (
    <SectionShell
      id="signals"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {content.items.map((item, index) => (
          <article
            key={item.title}
            className="surface-card rounded-[1.75rem] p-6 md:p-7"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              0{index + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">
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
