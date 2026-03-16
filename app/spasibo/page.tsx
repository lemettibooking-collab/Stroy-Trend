import Link from "next/link";

import { Container } from "@/components/container";

export const metadata = {
  title: "Спасибо за заявку",
};

export default function ThanksPage() {
  return (
    <main className="page-shell flex min-h-screen items-center py-16">
      <Container className="w-full">
        <section className="surface-card mx-auto max-w-3xl rounded-[2rem] p-8 md:p-12">
          <span className="eyebrow">Заявка принята</span>
          <h1 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
            Получили ваш запрос и вернёмся с планом подключения в рабочее время.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-muted)] md:text-lg">
            Пока можно вернуться на главную и ещё раз посмотреть формат работы,
            перечень услуг и типовые сценарии подключения.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[var(--surface-strong)] px-6 py-3 text-sm font-semibold text-[#f3ede5] transition hover:-translate-y-0.5"
            >
              Вернуться на главную
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--accent)]"
            >
              Посмотреть услуги
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
