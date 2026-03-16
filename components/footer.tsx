import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import type { FooterContent, NavigationItem } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";

type FooterProps = {
  content: FooterContent;
  navigation: NavigationItem[];
};

export function Footer({ content, navigation }: FooterProps) {
  return (
    <footer id="contacts" className="border-t border-white/40 py-10 md:py-14">
      <Container>
        <div className="surface-card grid gap-8 rounded-[2rem] p-8 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <section aria-labelledby="footer-brand">
            <h2
              id="footer-brand"
              className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]"
            >
              Строй Тренд
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--text)]">
              {content.description}
            </p>
            <p className="readable-text mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
              {content.positioning}
            </p>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--text-muted)]">
              {content.contactLabels.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">
              {content.placeholderNote}
            </p>
            {siteConfig.telegramContactUrl || siteConfig.phoneHref ? (
              <address className="mt-5 not-italic text-sm leading-6 text-[var(--text-muted)]">
                {siteConfig.telegramContactUrl ? (
                  <p>
                    Telegram:{" "}
                    <a
                      href={siteConfig.telegramContactUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
                    >
                      Перейти в контактный канал
                    </a>
                  </p>
                ) : null}
                {siteConfig.phoneHref && siteConfig.phoneDisplay ? (
                  <p className="mt-2">
                    Телефон:{" "}
                    <a
                      href={siteConfig.phoneHref}
                      className="font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </p>
                ) : null}
              </address>
            ) : (
              <address className="mt-5 not-italic text-sm leading-6 text-[var(--text-muted)]">
                Контакты подключаются после согласования финальных данных.
              </address>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {content.contactCtas.map((item, index) => (
                <ButtonLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  variant={index === 0 ? "primary" : "secondary"}
                />
              ))}
            </div>
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <nav aria-label="Навигация в подвале">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                Навигация
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="transition hover:text-[var(--text)]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <section aria-labelledby="footer-services">
              <h3 id="footer-services" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text)]">
                Направления
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--text-muted)]">
                {content.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </footer>
  );
}
