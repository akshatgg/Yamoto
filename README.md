# Yamoto — Wheel & Tyre Care

Landing page for **Yamoto Wheel & Tyre Care**, a wheel and tyre shop in Kondapur, Hyderabad. Built to rank for local searches like *"wheel alignment in Kondapur"* and turn visitors into WhatsApp bookings, calls and quote requests.

**Live:** [yamoto.vercel.app](https://yamoto.vercel.app) · **Production domain:** www.yamoto.com (to be connected)

![Yamoto — wheel alignment bay](public/og.jpg)

## Features

- **Single static page** — hero, services, why Yamoto, tyre brands, location with map, FAQ and closing call-to-action
- **Interactive services panel** — hover to switch services on desktop, accordion on mobile; all copy is in the HTML so it's crawlable
- **Request-a-quote popup** — validated form, delivered to the shop by email (Resend) with a prefilled WhatsApp handoff as fallback
- **Mobile action bar** — WhatsApp, Call and Quote always one tap away on phones
- **Conversion tracking** — GA4 events for WhatsApp, call, directions and quote submissions

## Local SEO

| Area | Implementation |
|---|---|
| Metadata | Location-keyword title and description, canonical URL, Open Graph + Twitter card image, geo meta tags |
| Structured data | JSON-LD graph: `TireShop` / `AutoRepair` (address, geo, opening hours, areas served, services, brands), `WebSite`, `WebPage`, `FAQPage` |
| Crawling | `sitemap.xml` (with image), `robots.txt`, `llms.txt` summary for AI assistants |
| Content | Semantic headings, descriptive image alt text, direct-answer intro paragraph, 8 local FAQs |
| Performance | Static HTML, self-hosted Archivo font, AVIF/WebP images, preloaded hero — Lighthouse 100 for SEO, Accessibility and Best Practices; zero layout shift |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, statically generated)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript
- [Vercel](https://vercel.com) hosting, auto-deployed from `master`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
├── app/
│   ├── page.tsx              # all page sections + JSON-LD
│   ├── layout.tsx            # metadata, font, analytics
│   ├── api/quote/route.ts    # quote form → email
│   ├── sitemap.ts · robots.ts · manifest.ts
│   └── icon.svg · apple-icon.png
├── components/
│   ├── nav.tsx               # floating nav, shrinks on scroll
│   ├── services.tsx          # services list + photo panel
│   ├── quote.tsx             # quote popup and trigger buttons
│   ├── analytics.tsx         # GA4 + click tracking
│   └── icons.tsx
├── config/site.ts            # business details, services, brands, FAQ — single source of truth
├── lib/                      # links, structured data, analytics helper
└── assets/images/            # site photography
public/                       # og.jpg, llms.txt
docs/                         # project scope
```

## Configuration

All business content lives in [`src/config/site.ts`](src/config/site.ts). Values marked `TODO(client)` are placeholders and must be replaced before launch:

- [ ] Phone and WhatsApp number
- [ ] Street address and PIN code
- [ ] Shop coordinates (`geo`) — drives the map, directions and structured data
- [ ] Google Business Profile link and social profiles (`sameAs`)
- [ ] Tyre brands stocked and the "Why Yamoto" differentiators
- [ ] Real shop photos

Name, address and phone must match the Google Business Profile exactly. Update `public/llms.txt` to match.

## Environment variables

Copy `.env.example` to `.env.local` for local development, and add the same keys in **Vercel → Project → Settings → Environment Variables**.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID. Events: `click_whatsapp`, `click_call`, `click_directions`, `quote_open`, `generate_lead` |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console HTML-tag verification token |
| `RESEND_API_KEY` | [Resend](https://resend.com) API key for quote emails |
| `LEAD_TO_EMAIL` | Where quote requests are sent (comma-separate multiple addresses) |
| `LEAD_FROM_EMAIL` | Sender on a Resend-verified domain, e.g. `Yamoto Website <leads@yamoto.com>` |

Without the email variables the quote form still works — customers are handed off to WhatsApp with their details prefilled.

## Deployment

Pushing to `master` deploys to production on Vercel automatically. Manual deploy:

```bash
vercel deploy --prod
```

## Launch checklist

1. Connect `www.yamoto.com` (primary) and `yamoto.com` (redirects to www) in Vercel → Domains, and update DNS at the registrar.
2. Replace every `TODO(client)` placeholder and set the environment variables.
3. Google Search Console: verify the domain, submit `https://www.yamoto.com/sitemap.xml`, request indexing.
4. Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).
5. Google Business Profile: primary category **Tire shop**, secondary **Wheel alignment service**; add website, services, hours and photos.
6. List the same name, address and phone on Justdial, Sulekha, Bing Places, Apple Business Connect, Facebook and Instagram.
7. Ask every customer for a Google review — send the review link on WhatsApp after the job.
