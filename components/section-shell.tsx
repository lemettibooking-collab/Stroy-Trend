import type { ReactNode } from "react";

import { Container } from "@/components/container";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionShellProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`section-offset py-16 md:py-24 lg:py-28 ${className}`}
    >
      <Container>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
        <div className="mt-10 max-w-4xl md:mt-12">
          <span className="eyebrow">{eyebrow}</span>
          <h2
            id={titleId}
            className="balanced-text mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl md:leading-[1.08]"
          >
            {title}
          </h2>
          <p className="readable-text mt-5 max-w-3xl text-base leading-7 text-[var(--text-muted)] md:text-lg md:leading-8">
            {description}
          </p>
        </div>
        <div className="mt-10 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
