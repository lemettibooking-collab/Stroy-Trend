import { SectionShell } from "@/components/section-shell";
import type { AdvantagesContent } from "@/lib/site-content";

type AdvantagesSectionProps = {
  content: AdvantagesContent;
};

export function AdvantagesSection({ content }: AdvantagesSectionProps) {
  return (
    <SectionShell
      id="advantages"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      className="pb-10"
    >
      <div className="dark-card grid gap-5 rounded-[2rem] p-6 md:grid-cols-2 md:p-10">
        {content.items.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
          >
            <h3 className="text-lg font-semibold text-[#f3ede5]">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[#d6cec2]">{item.text}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
