"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";

import { ButtonLink } from "@/components/button-link";
import type { LeadFormContent } from "@/lib/site-content";

type LeadFormPanelProps = {
  content: LeadFormContent;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function LeadFormPanel({ content }: LeadFormPanelProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isSubmitting = status === "submitting";

  async function handleSubmit(formData: FormData) {
    const response = await fetch("/api/lead", {
      method: "POST",
      body: formData,
      headers: {
        "x-requested-with": "fetch",
      },
    });

    const payload = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok || payload?.ok === false) {
      throw new Error(payload?.error || content.errorMessage);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await handleSubmit(formData);
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : content.errorMessage,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="surface-card rounded-[2rem] p-6 md:p-8">
        <div className="border-b border-[var(--border)] pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Заявка получена
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--text)] md:text-3xl">
            {content.successTitle}
          </h3>
          <p className="readable-text mt-4 text-sm leading-7 text-[var(--text-muted)] md:text-base">
            {content.successText}
          </p>
        </div>
        <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/55 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Следующий шаг
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
            {content.successNextStep}
          </p>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={content.successTelegramCta.href}
            label={content.successTelegramCta.label}
            variant="primary"
          />
          <ButtonLink href="#process" label="Как работаем дальше" variant="secondary" />
        </div>
      </div>
    );
  }

  return (
    <form
      action="/api/lead"
      method="post"
      noValidate
      aria-labelledby="lead-form-title"
      className="surface-card rounded-[2rem] p-6 md:p-8"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="sourcePath" value={pathname} />
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="lead-company-website">Website</label>
        <input
          id="lead-company-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
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
            aria-describedby="lead-name-error"
            aria-invalid={status === "error" ? "true" : "false"}
            disabled={isSubmitting}
            required
          />
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
            aria-describedby="lead-phone-error"
            aria-invalid={status === "error" ? "true" : "false"}
            disabled={isSubmitting}
            required
          />
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
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--text)]">
            Срок или дедлайн <span className="text-[var(--text-muted)]">(необязательно)</span>
          </span>
          <input
            id="lead-deadline"
            className="field"
            type="text"
            name="deadline"
            placeholder="Например: до конца недели или к сдаче этапа"
            disabled={isSubmitting}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[var(--text)]">
            Какие материалы уже есть <span className="text-[var(--text-muted)]">(необязательно)</span>
          </span>
          <input
            id="lead-materials"
            className="field"
            type="text"
            name="materials"
            placeholder="Сметы, шаблоны, журналы, реестры, исходные данные"
            disabled={isSubmitting}
          />
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
          aria-describedby="lead-task-error"
          aria-invalid={status === "error" ? "true" : "false"}
          disabled={isSubmitting}
          required
        />
        <p id="lead-task-error" className="sr-only">
          Поле для будущего текста ошибки.
        </p>
      </label>

      <div className="mt-6 rounded-[1.5rem] border border-[var(--border)] bg-white/55 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--surface-strong)] px-6 py-3 text-center text-sm font-semibold text-[#f3ede5] shadow-[0_16px_36px_rgba(31,38,43,0.16)] transition hover:-translate-y-0.5 hover:bg-[var(--surface-muted)] disabled:cursor-not-allowed disabled:opacity-75 sm:whitespace-nowrap"
          >
            {status === "submitting" ? "Отправляем..." : content.submitLabel}
          </button>
          <div className="max-w-md">
            <p className="text-sm leading-6 text-[var(--text-muted)]">{content.responseNote}</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
              {content.disclaimer}
            </p>
          </div>
        </div>
        {status === "error" ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[#973939]">{errorMessage}</p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              onClick={() => {
                setStatus("idle");
                setErrorMessage("");
              }}
            >
              Попробовать снова
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
}
