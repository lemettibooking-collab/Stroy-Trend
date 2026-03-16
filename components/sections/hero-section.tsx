import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import type { HeroContent } from "@/lib/site-content";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="section-offset overflow-hidden px-3 pb-8 pt-10 sm:px-4 md:pb-10 md:pt-12"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <header className="surface-card relative overflow-hidden rounded-[2rem] p-7 md:rounded-[2.5rem] md:p-10 lg:p-12">
            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-[var(--accent-soft)] blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />
            <span className="eyebrow">{content.eyebrow}</span>
            <h1
              id="hero-title"
              className="balanced-text mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-[var(--text)] md:text-6xl md:leading-[1.03]"
            >
              {content.title}
            </h1>
            <p className="readable-text mt-6 max-w-2xl text-base leading-7 text-[var(--text-muted)] md:text-xl md:leading-8">
              {content.description}
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-[var(--border)] bg-white/60 p-4 md:p-5">
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.highlights.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.15rem] border border-white/80 bg-white/75 px-4 py-3 text-sm leading-6 text-[var(--text-muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={content.primaryCta.href} label={content.primaryCta.label} />
                <ButtonLink
                  href={content.secondaryCta.href}
                  label={content.secondaryCta.label}
                  variant="secondary"
                />
              </div>
              <div className="mt-4 flex flex-col gap-3 border-t border-[var(--border)] pt-4 sm:flex-row sm:flex-wrap">
                {content.quickCtas.map((item) => (
                  <ButtonLink
                    key={item.label}
                    href={item.href}
                    label={item.label}
                    variant="secondary"
                  />
                ))}
              </div>
            </div>
          </header>

          <aside className="dark-card rounded-[2rem] p-7 md:p-10" aria-label="Ключевые рабочие ориентиры">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d3b28a]">
              Рабочий контур
            </p>
            <div className="mt-7 grid gap-4">
              {content.metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8b59c]">
                    {item.label}
                  </p>
                  <p className="balanced-text mt-3 text-lg leading-7 text-[#f3ede5]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-7 text-[#d6cec2]">
                {content.sideNote}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
