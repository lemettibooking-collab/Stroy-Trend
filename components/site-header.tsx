import Image from "next/image";
import Link from "next/link";
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
          <Link href="/" className="flex min-w-0 items-center rounded-2xl">
            <Image
              src="/logo files 2/stroy-trend-logo-transparent.png"
              alt="Строй Тренд"
              width={323}
              height={119}
              priority
              className="h-auto w-[118px] sm:w-[132px] md:w-[146px] lg:w-[158px]"
            />
          </Link>

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
            <ButtonLink href="#lead-form" label="Оставить заявку" variant="dark-filled" />
          </div>

          <div className="md:hidden">
            <ButtonLink href="#lead-form" label="Заявка" variant="dark-filled" />
          </div>
        </div>
      </Container>
    </header>
  );
}
