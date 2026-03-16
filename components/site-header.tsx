import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import type { NavigationItem } from "@/lib/site-content";

type SiteHeaderProps = {
  navigation: NavigationItem[];
};

export function SiteHeader({ navigation }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 px-3 pt-2 sm:px-4 sm:pt-3">
      <Container>
        <div className="flex items-center justify-between gap-4 rounded-[1.6rem] border border-white/70 bg-[#f8f3eb]/86 px-4 py-3 shadow-[0_18px_40px_rgba(31,38,43,0.08)] backdrop-blur-xl md:px-5">
          <a href="#top" className="flex min-w-0 items-center gap-3 rounded-2xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--surface-strong)] text-sm font-semibold uppercase tracking-[0.2em] text-[#f3ede5]">
              ST
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Строй Тренд
              </span>
              <span className="mt-1 hidden truncate text-sm text-[var(--text-muted)] sm:block">
                Сметы, ИД и поддержка ПТО для строительных компаний
              </span>
            </span>
          </a>

          <nav
            aria-label="Основная навигация"
            className="hidden items-center gap-6 lg:flex"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href="#services" label="Услуги" variant="secondary" />
            <ButtonLink href="#lead" label="Оставить заявку" />
          </div>

          <div className="md:hidden">
            <ButtonLink href="#lead" label="Заявка" />
          </div>
        </div>
      </Container>
    </header>
  );
}
