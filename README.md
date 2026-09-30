# Yamoto — landing page

Single-page, statically generated site for Yamoto Wheel & Tyre Care (Kondapur, Hyderabad), built from the approved design to the brief in `docs/Yamoto-Website-Project-Scope.pdf`.

Next.js 16 (App Router) · Tailwind CSS 4 · deployed on Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — the home page prerenders as static HTML
```

## Where things live

| What | File |
|---|---|
| Business details, services, brands, reasons, FAQ | `src/config/site.ts` |
| Page sections | `src/app/page.tsx` |
| Services list / photo panel | `src/components/services.tsx` |
| Quote popup | `src/components/quote.tsx` |
| Lead delivery (email) | `src/app/api/quote/route.ts` |
| Title, description, Open Graph, geo tags | `src/app/layout.tsx` |
| Structured data (TireShop + FAQPage JSON-LD) | `src/lib/structured-data.ts` |
| sitemap.xml / robots.txt / manifest | `src/app/sitemap.ts`, `robots.ts`, `manifest.ts` |
| AI-crawler summary | `public/llms.txt` |
| Photos | `src/assets/images/` (served as AVIF/WebP by `next/image`) |

## Before launch — replace placeholders

Search the code for `TODO(client)`. All of it is in `src/config/site.ts`, plus `public/llms.txt`:

- [ ] Phone and WhatsApp number
- [ ] Street address and PIN code (must match Google Business Profile exactly)
- [ ] Shop coordinates (`geo`) — drives the map, directions and structured data
- [ ] Google Business Profile link (`googleBusinessUrl`) and social profiles (`sameAs`)
- [ ] Brands actually stocked, and the four "Why Yamoto" differentiators
- [ ] Real shop photos when available (current ones are generated); rotation and new-tyres use crops

## Environment variables

Copy `.env.example` to `.env.local` (and add the same in Vercel → Settings → Environment Variables):

- `NEXT_PUBLIC_GA_ID` — GA4. Tracks `click_whatsapp`, `click_call`, `click_directions`, `quote_open`, `generate_lead`. Mark `generate_lead` and `click_whatsapp` as key events in GA4.
- `NEXT_PUBLIC_GSC_VERIFICATION` — Search Console HTML-tag token.
- `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` — quote requests by email via Resend. Without them the form still works: the customer is handed off to WhatsApp with their details prefilled.

## Launch checklist

1. Deploy to Vercel; add `www.yamoto.com` (primary) and `yamoto.com` (redirects to www) under Domains; update A / CNAME records at the registrar.
2. Search Console: verify, submit `https://www.yamoto.com/sitemap.xml`, request indexing of `/`.
3. Check structured data with the [Rich Results Test](https://search.google.com/test/rich-results).
4. Google Business Profile: primary category **Tire shop**, secondary **Wheel alignment service**; add the website link, services, hours and photos. Name, address and phone identical to `site.ts`.
5. Same name, address and phone on Justdial, Sulekha, Bing Places, Apple Business Connect, Facebook, Instagram.
6. Ask every customer for a Google review (send the review link on WhatsApp after the job).
