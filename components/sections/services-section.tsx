import { SectionShell } from "@/components/section-shell";
import type { ServicesContent } from "@/lib/site-content";

type ServicesSectionProps = {
  content: ServicesContent;
};

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <SectionShell
      id="services"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {content.items.map((service) => (
          <article
            key={service.title}
            className="surface-card flex h-full flex-col rounded-[2rem] p-6 md:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-xl font-semibold text-[var(--text)]">
                {service.title}
              </h3>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                {service.tag}
              </span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--text-muted)]">
              {service.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="rounded-[1.25rem] border border-[var(--border)] bg-white/65 px-4 py-3"
                >
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold leading-6 text-[var(--text)]">
              {service.result}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
