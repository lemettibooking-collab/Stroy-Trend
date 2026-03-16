import { ButtonLink } from "@/components/button-link";
import { SectionShell } from "@/components/section-shell";
import type { LeadFormContent } from "@/lib/site-content";

type LeadSectionProps = {
  content: LeadFormContent;
};

export function LeadSection({ content }: LeadSectionProps) {
  return (
    <SectionShell
      id="lead"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <form
          action="/api/lead"
          method="post"
          noValidate
          aria-labelledby="lead-form-title"
          className="surface-card rounded-[2rem] p-6 md:p-8"
        >
          <div className="border-b border-[var(--border)] pb-5">
            <h3 id="lead-form-title" className="text-xl font-semibold text-[var(--text)] md:text-2xl">
              {content.formTitle}
            </h3>
            <p className="readable-text mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)] md:text-base">
              {content.formSupportingText}
            </p>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--text-muted)] sm:grid-cols-3">
              {content.trustMicrocopy.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.15rem] border border-[var(--border)] bg-white/65 px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-[var(--text)]">
                Имя <span className="text-[var(--accent)]">*</span>
              </span>
              <input
                id="lead-name"
                className="field"
                type="text"
                name="name"
                placeholder="Как к вам обратиться"
                autoComplete="name"
                aria-describedby="lead-name-note lead-name-error"
                aria-invalid="false"
                required
              />
              <p id="lead-name-note" className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                Достаточно имени или роли, по которой удобно вернуться с ответом.
              </p>
              <p id="lead-name-error" className="sr-only">
                Поле для будущего текста ошибки.
              </p>
            </label>
            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-[var(--text)]">
                Телефон <span className="text-[var(--accent)]">*</span>
              </span>
              <input
                id="lead-phone"
                className="field"
                type="tel"
                name="phone"
                placeholder="+7"
                autoComplete="tel"
                aria-describedby="lead-phone-note lead-phone-error"
                aria-invalid="false"
                required
              />
              <p id="lead-phone-note" className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                Используем только для первичного контакта по вашей задаче.
              </p>
              <p id="lead-phone-error" className="sr-only">
                Поле для будущего текста ошибки.
              </p>
            </label>
          </div>

          <div className="mt-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[var(--text)]">
                Объект или проект <span className="text-[var(--text-muted)]">(необязательно)</span>
              </span>
              <input
                id="lead-project"
                className="field"
                type="text"
                name="project"
                placeholder="Объект, площадка или внутреннее название проекта"
                autoComplete="organization-title"
                aria-describedby="lead-project-note"
              />
              <p id="lead-project-note" className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                Помогает быстрее понять контекст и формат подключения.
              </p>
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-[var(--text)]">
              Кратко опишите задачу <span className="text-[var(--accent)]">*</span>
            </span>
            <textarea
              id="lead-task"
              className="field min-h-36 resize-y"
              name="task"
              placeholder="Какой объект, какая стадия, что нужно закрыть и в какие сроки"
              aria-describedby="lead-task-note lead-task-error"
              aria-invalid="false"
              required
            />
            <p id="lead-task-note" className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              Можно в свободной форме: объект, стадия, направление работ и критичный срок.
            </p>
            <p id="lead-task-error" className="sr-only">
              Поле для будущего текста ошибки.
            </p>
          </label>

          <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/55 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--surface-strong)] px-6 py-3 text-center text-sm font-semibold text-[#f3ede5] shadow-[0_16px_36px_rgba(31,38,43,0.16)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-muted)] sm:whitespace-nowrap"
              >
                {content.submitLabel}
              </button>
              <div className="max-w-md">
                <p className="text-sm leading-6 text-[var(--text-muted)]">{content.responseNote}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
                  {content.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </form>

        <aside className="dark-card h-full rounded-[2rem] p-6 md:p-8" aria-label="Что обсудим после заявки">
          <h3 className="text-xl font-semibold text-[#f3ede5]">
            Что обсуждаем на первом контакте
          </h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-[#d6cec2]">
            {content.contactPoints.map((item) => (
              <li
                key={item}
                className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-7 text-[#f3ede5]">{content.placeholderNote}</p>
          </div>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c8b59c]">
              Что происходит дальше
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#d6cec2]">
              {content.nextSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            {content.quickCtas.map((item, index) => (
              <ButtonLink
                key={item.label}
                href={item.href}
                label={item.label}
                variant={index === 0 ? "light" : "dark-outline"}
              />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="#faq" label={content.secondaryCta} variant="dark-outline" />
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
