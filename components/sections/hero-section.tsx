import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import type { HeroContent } from "@/lib/site-content";

type HeroSectionProps = {
  content: HeroContent;
};

const balancedHeroTitle =
  "Сметная работа, исполнительная документация и сопровождение ПТО для подрядчиков и строительных компаний";

export function HeroSection({ content }: HeroSectionProps) {
  const titleContent =
    content.title === balancedHeroTitle ? (
      <>
        <span className="lg:hidden">{content.title}</span>
        <span className="hidden lg:block">
          Сметная работа,
          <br />
          исполнительная документация
          <br />
          и сопровождение ПТО
          <br />
          для подрядчиков и строительных компаний
        </span>
      </>
    ) : (
      content.title
    );

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="section-offset overflow-hidden px-3 pb-8 pt-10 sm:px-4 md:pb-10 md:pt-12"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(19rem,0.92fr)] lg:items-start">
          <header className="surface-card relative overflow-hidden rounded-[2rem] p-7 md:rounded-[2.5rem] md:px-9 md:py-8 lg:px-11 lg:py-10">
            <div className="absolute -right-10 top-0 h-44 w-44 rounded-full bg-[var(--accent-soft)] blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />
            {content.eyebrow ? <span className="eyebrow">{content.eyebrow}</span> : null}
            <div className="max-w-5xl xl:max-w-[82%]">
              <h1
                id="hero-title"
                className={`balanced-text text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl md:leading-[1.04] xl:text-[3.45rem] ${content.eyebrow ? "mt-6" : ""}`}
              >
                {titleContent}
              </h1>
              <p className="readable-text mt-5 max-w-[46rem] text-base leading-7 text-[var(--text-muted)] md:text-lg md:leading-8">
                {content.description}
              </p>
              <div className="mt-7 inline-flex w-fit max-w-full flex-col gap-3 rounded-[1.6rem] border border-[var(--border)] bg-white/60 p-4 md:p-5 sm:flex-row">
                <ButtonLink href={content.primaryCta.href} label={content.primaryCta.label} />
                <ButtonLink
                  href={content.secondaryCta.href}
                  label={content.secondaryCta.label}
                  variant="secondary"
                />
              </div>
            </div>
          </header>

          <aside
            className="surface-card rounded-[2rem] p-6 md:p-7"
            aria-label="Формат работы"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              Формат работы
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-[1.4rem] border border-[var(--border)] bg-white/70 p-4">
                <p className="text-sm font-semibold text-[var(--text)]">Разовые задачи</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Сметы, исполнительная документация, доработка по замечаниям.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--border)] bg-white/70 p-4">
                <p className="text-sm font-semibold text-[var(--text)]">Сопровождение объекта</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Работа по разделам или по объекту в целом.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-[var(--border)] bg-white/70 p-4">
                <p className="text-sm font-semibold text-[var(--text)]">Постоянный формат</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Удаленный сметчик или инженер ПТО на регулярной основе.
                </p>
              </div>
            </div>
            <div className="mt-5">
              <ButtonLink
                href={content.secondaryCta.href}
                label="Обсудить"
                variant="secondary"
              />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
