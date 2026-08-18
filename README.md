# Elite Auto Insurance

Marketing site for Elite Auto Insurance, an independent insurance agency in the Houston area. Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS v4. Quote requests are delivered by email through [Resend](https://resend.com).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

The site runs at http://localhost:3000.

## Environment variables

| Variable           | Required | Purpose                                                                                     |
| ------------------ | -------- | ------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`   | Yes      | Resend API key. Without it the quote form shows a "call us instead" message and sends nothing. |
| `QUOTE_TO_EMAIL`   | No       | Inbox that receives quote requests. Defaults to `quote@eliteautoinsurance.net`.               |
| `QUOTE_FROM_EMAIL` | No       | Sender address. Must be on a domain verified in Resend.                                       |
| `QUOTE_DEBUG`      | No       | Set to `1` to show the mail provider's reason in the form's error message. Diagnostics only.   |

To send from `quote@eliteautoinsurance.net`, add and verify `eliteautoinsurance.net` in the Resend dashboard (DNS records for SPF/DKIM). Until that is done, use `onboarding@resend.dev` as the sender — the default when `QUOTE_FROM_EMAIL` is unset.

## Deploying (Netlify)

Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL` and `QUOTE_FROM_EMAIL` under **Site configuration → Environment variables**, then redeploy — environment variables are read when the deploy is built, so an existing deploy will not pick them up.

Two rules differ from `.env.local`:

- **Paste values without quotes.** `.env.local` strips the quotes around `QUOTE_FROM_EMAIL`; Netlify's dashboard does not, and a sender address wrapped in `"` is rejected by Resend.
- **Scope must include Functions/Runtime.** A variable scoped to *Builds* only is invisible to the Server Action at request time.

### If the form still fails

The form is built not to depend on a perfect configuration:

- A `QUOTE_FROM_EMAIL` that is blank, malformed, or wrapped in quotes is ignored in favour of `onboarding@resend.dev`.
- If the provider **refuses** the configured sender — nearly always an unverified domain — the message is sent again from `onboarding@resend.dev`. The lead arrives; only the branding is lost, and the fallback is logged.
- If delivery fails anyway, the full submission is written to the function log under `UNDELIVERED LEAD:` so the customer can still be contacted.

To see what a deployment is actually using, set `QUOTE_DEBUG=1`, redeploy, and open **`/api/quote-check`**. It reports the resolved sender and recipient, a masked key preview, and the domains verified in the Resend account — the endpoint returns 404 unless `QUOTE_DEBUG` is set, and the key itself is never returned. Unset the variable once mail is flowing.

## Editing site content

Almost all copy, contact details and coverage information live in one file: [`lib/site.ts`](lib/site.ts).

- **Phone, email, Facebook, tagline** — the `site` object
- **Office addresses and open hours** — the `locations` array
- **The six insurance lines** — the `coverageLines` array. Each entry drives its own page at `/coverage/<slug>`, its home-page card, the header dropdown, the footer list, the sitemap and the quote form's dropdown. Adding an entry creates a new page automatically.

## Project structure

```
app/
  layout.tsx            Root layout, metadata, LocalBusiness JSON-LD
  page.tsx              Home
  about/                About the agency
  contact/              Three offices, addresses and hours
  coverage/             Coverage overview
  coverage/[slug]/      One page per insurance line (statically generated)
  quote/                Quote request page
  sitemap.ts, robots.ts SEO files
components/             Header, footer, quote form, cards, shared UI
lib/
  site.ts               Company data — edit content here
  quote.ts              Quote form shape and server-side validation
  actions.ts            'use server' action that sends the email via Resend
public/                 Images and logo
```

## The quote form

The form posts to a Server Action (`submitQuote` in [`lib/actions.ts`](lib/actions.ts)) rather than an API route, so it works before JavaScript hydrates. On submit it:

1. Drops the request silently if the hidden honeypot field is filled (bot).
2. Validates every field on the server — the browser's `required` attributes are only a convenience.
3. Emails the agency, with the customer's address as `Reply-To` so replying goes straight to them.
4. Emails the customer a confirmation, in Spanish if they selected Español. A failure here is logged but does not fail the submission.

Field errors and entered values are returned to the form via `useActionState`, so a rejected submission never clears what the customer typed.

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
