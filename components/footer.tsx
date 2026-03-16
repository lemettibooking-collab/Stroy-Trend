import Image from "next/image";
import Link from "next/link";
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
            <h2 id="footer-brand">
              <Link href="/" className="inline-flex rounded-2xl">
                <Image
                  src="/logo files 2/stroy-trend-logo-transparent.png"
                  alt="Логотип Строй Тренд"
                  width={323}
                  height={119}
                  className="h-auto w-[164px] sm:w-[188px]"
                />
              </Link>
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
            <address className="mt-5 not-italic">
              <div className="grid gap-4 text-sm leading-6 text-[var(--text-muted)] sm:max-w-md sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Телефон
                  </p>
                  <a
                    href={siteConfig.phoneHref}
                    className="mt-2 inline-flex font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                    Email
                  </p>
                  <a
                    href={siteConfig.emailHref}
                    className="mt-2 inline-flex break-all font-medium text-[var(--text)] transition hover:text-[var(--accent)]"
                  >
                    {siteConfig.emailDisplay}
                  </a>
                </div>
              </div>
              {siteConfig.telegramContactUrl ? (
                <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">
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
            </address>
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
