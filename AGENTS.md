# AGENTS.md

## Project
Marketing landing page for a Russian B2B construction outsourcing service.

The business offers:
- outsourced cost estimation (smety),
- outsourced executive documentation,
- outsourced PTO support.

Primary goal:
Build a premium, trustworthy, conversion-focused landing page that converts traffic from Yandex Direct and partner referrals into leads.

## Audience
- contractors
- subcontractors
- general contractors
- small-to-mid construction companies in Russia

## Product principles
- This is not a generic freelancer website.
- The site must feel like a strong external documentation and estimation unit.
- Emphasize deadlines, reliability, structure, clarity, and problem-solving.
- Avoid vague “agency” language.
- Every major section should support conversion.

## Engineering principles
- Use minimal diff.
- Do not overengineer.
- Do not add dependencies unless clearly necessary.
- Prefer simple, readable components.
- Prefer server-rendered/static content where possible.
- Keep all marketing copy in a dedicated content file.
- Keep mobile-first responsive layout.
- Keep Tailwind usage clean and consistent.
- Use semantic HTML and accessible structure.
- Run checks before finishing tasks.

## UX principles
- Premium B2B feel
- Spacious layout
- Strong typography
- Clear CTA rhythm
- Expensive but calm visual tone
- No template-like appearance
- Good mobile readability
- No visually empty sections

## Workflow
- Work in small safe iterations.
- Summarize changed files after each task.
- Mention assumptions and placeholders.
- Do not rewrite unrelated parts of the project.
Rules:
- minimal diff only
- do not add dependencies unless necessary
- do not rename files without need
- do not overengineer
- keep copy in lib/site-content.ts
- keep components small and readable
- mobile-first responsive layout
- premium B2B feel
- run checks before finishing
- summarize changed files at the end

Project context:
We are building a premium B2B conversion landing page for construction outsourcing services in Russia.

Services:
1. outsourced cost estimation (smety)
2. outsourced executive documentation
3. outsourced PTO support

Audience:
Contractors, subcontractors, general contractors, and small-to-mid construction companies.

Goal:
Convert Yandex Direct and partner traffic into leads via form, Telegram, and contact CTA.

Brand feel:
Not a freelancer site.
Not a cheap template.
Should feel premium, structured, reliable, calm, and commercially credible.