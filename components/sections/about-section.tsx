import { SectionShell } from "@/components/section-shell";
import type { AboutContent } from "@/lib/site-content";

type AboutSectionProps = {
  content: AboutContent;
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <SectionShell
      id="about"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card rounded-[2rem] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[var(--text)]">
            Что обычно происходит без внешнего контура
          </h3>
          <ul className="mt-6 space-y-4">
            {content.problems.map((problem) => (
              <li
                key={problem}
                className="rounded-[1.5rem] border border-[var(--border)] bg-white/60 px-5 py-4 text-sm leading-6 text-[var(--text-muted)]"
              >
                {problem}
              </li>
            ))}
          </ul>
        </div>

        <div className="dark-card rounded-[2rem] p-6 md:p-8">
          <h3 className="text-xl font-semibold text-[#f3ede5]">
            Что меняется после подключения
          </h3>
          <p className="mt-5 text-base leading-7 text-[#d6cec2]">
            {content.outcome}
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8b59c]">
              Ключевой принцип
            </p>
            <p className="mt-3 text-sm leading-7 text-[#f3ede5]">
              {content.principle}
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
