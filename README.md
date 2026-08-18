# Elite Auto Insurance

Marketing site for Elite Auto Insurance, an independent insurance agency in the Houston area. Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS v4. Quote requests are delivered by email through [Resend](https://resend.com).

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

The quote form needs a Resend key. Create a git-ignored `.env.local` holding `RESEND_API_KEY=re_...` — without it the form shows a "call us instead" message and sends nothing. Everything else has a working default.

## Environment variables

| Variable           | Required | Purpose                                                                                     |
| ------------------ | -------- | ------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`   | Yes      | Resend API key. Without it the quote form shows a "call us instead" message and sends nothing. |
| `QUOTE_TO_EMAIL`   | No       | Inbox that receives quote requests. Defaults to `quote@eliteautoinsurance.net`.               |
| `QUOTE_FROM_EMAIL` | No       | Sender address. Must be on a domain verified in Resend.                                       |
| `QUOTE_DEBUG`      | No       | Set to `1` to show the mail provider's reason in the form's error message. Diagnostics only.   |
| `GOOGLE_SITE_VERIFICATION` | No | Search Console token. Renders the `google-site-verification` meta tag. |

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
2. Validates every field on the server — the browser's `required` attributes are only a convenience. Every field has a maximum length, control characters are stripped, and the dropdowns are checked against their allowed values.
3. Applies a rate limit ([`lib/rate-limit.ts`](lib/rate-limit.ts)) once the submission is otherwise valid: three per address and thirty site-wide per ten minutes. The counters are in memory, so on a serverless host they are per-instance and reset on a cold start — enough to bound a burst, not a hard guarantee.
4. Emails the agency, with the customer's address as `Reply-To` so replying goes straight to them.

Field errors and entered values are returned to the form via `useActionState`, so a rejected submission never clears what the customer typed.

There is deliberately **no confirmation email to the customer**. Sending one meant delivering mail to an address the submitter chose, with text they supplied — an open relay that could have put the agency's sending domain on blocklists. The customer sees an on-screen confirmation instead.

## Search Console

The site ships a sitemap (`/sitemap.xml`), a robots file that points at it, canonical URLs on every page, Open Graph and Twitter cards, and `InsuranceAgency` structured data for all three offices.

To connect Search Console:

1. Add the property at [search.google.com/search-console](https://search.google.com/search-console) as `https://eliteautoinsurance.net` — the bare domain, which is what Netlify serves; `www` 301s to it. Choose the **HTML tag** method.
2. Copy the `content` value out of the tag Google shows — the token only, not the whole tag.
3. Set `GOOGLE_SITE_VERIFICATION` to it on the host and **redeploy** — metadata is built at deploy time.
4. Press Verify, then submit `https://eliteautoinsurance.net/sitemap.xml` under **Sitemaps**.

`site.url` in [`lib/site.ts`](lib/site.ts) must match the hostname Netlify serves, since canonical URLs, the sitemap and `og:url` are all built from it. If the primary domain is ever switched to `www`, change that value too or every canonical will point at a redirect.

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
