import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "light" | "dark-outline";
};

const variants = {
  primary:
    "bg-[var(--surface-strong)] text-[#f3ede5] hover:-translate-y-0.5 hover:bg-[var(--surface-muted)]",
  secondary:
    "border border-[var(--border)] text-[var(--text)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]",
  light:
    "bg-[#f3ede5] text-[var(--surface-strong)] hover:-translate-y-0.5 hover:bg-white",
  "dark-outline":
    "border border-white/15 text-[#f3ede5] hover:-translate-y-0.5 hover:border-[#d3b28a] hover:text-[#d3b28a]",
};

export function ButtonLink({
  href,
  label,
  variant = "primary",
}: ButtonLinkProps) {
  const className = `inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold shadow-[0_14px_34px_rgba(31,38,43,0.08)] transition focus-visible:outline-none sm:whitespace-nowrap ${variants[variant]}`;

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      {label}
    </Link>
  );
}
