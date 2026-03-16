# Construction Outsourcing Landing

Conversion-focused landing page for:
- outsourced cost estimation,
- executive documentation,
- PTO outsourcing.

## Stack
- Next.js
- TypeScript
- Tailwind CSS

## Local run
```bash
npm install
npm run dev
```

## Required environment variables
Create `.env.local` for local development or configure these variables in your deployment platform:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Optional environment variables
```bash
TELEGRAM_THREAD_ID=
NEXT_PUBLIC_TELEGRAM_CONTACT_URL=
NEXT_PUBLIC_PHONE_HREF=
NEXT_PUBLIC_PHONE_DISPLAY=
```

## Lead delivery
- Form submissions go through `app/api/lead/route.ts`
- Leads are delivered to Telegram using the Bot API
- The API sends name, phone, task, project, deadline, existing materials, source path, and timestamp

## Local lead delivery test
1. Create a Telegram bot with BotFather.
2. Add the bot to your target chat or group.
3. Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in `.env.local`.
4. Run `npm run dev`.
5. Submit the form from `/`, `/smety`, or `/ispolnitelnaya-dokumentatsiya`.
6. Verify the message arrives in Telegram and the form switches to the inline thank-you state.

## Deployment notes
- `NEXT_PUBLIC_SITE_URL` is used for canonical URLs, sitemap, robots host, and Open Graph metadata.
- Open Graph currently uses `/icon.svg` as a placeholder asset until a dedicated social preview image is added.
