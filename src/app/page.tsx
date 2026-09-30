import Image from "next/image";
import { faqs, reasons, site } from "@/config/site";
import { directionsHref, mapEmbedSrc, telHref, whatsappHref } from "@/lib/links";
import { buildJsonLd, jsonLdScript } from "@/lib/structured-data";
import hero from "@/assets/images/hero.jpg";
import shopFront from "@/assets/images/shop-front.jpg";
import { Nav } from "@/components/nav";
import { Services } from "@/components/services";
import { QuoteButton, QuoteProvider } from "@/components/quote";
import { ArrowIcon, ChatIcon, CheckIcon, ClockIcon, Logo, MinusIcon, PhoneIcon, PinIcon, PlusIcon } from "@/components/icons";

const wrap = "max-w-[1200px] mx-auto px-[clamp(20px,5vw,72px)]";
const sectionPad = "py-[clamp(56px,8vw,112px)]";

export default function Home() {
  const { area, city, address, hours } = site;

  return (
    <QuoteProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(buildJsonLd()) }} />
      <a href="#services" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-bg focus:px-4 focus:py-2">
        Skip to services
      </a>
      <Nav />

      <main>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section id="top" className="relative overflow-hidden bg-ink text-bg h-svh min-h-[680px] max-h-[980px]">
          <Image
            src={hero}
            alt={`Yamoto wheel alignment bay in ${area}, ${city}`}
            fill
            preload
            sizes="100vw"
            placeholder="blur"
            className="object-cover object-right origin-[85%_60%] animate-ken"
          />
          <div className="absolute inset-0 bg-ink/72" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgb(32_30_29/0.55)_0%,transparent_100%)]" />
          <div className={`relative h-full ${wrap} flex flex-col justify-center items-center text-center`}>
            <p className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-bg/80 mb-6">
              <span className="w-2 h-2 bg-accent block" />
              {area} · {city}
            </p>
            <h1 className="text-[clamp(36px,5.6vw,80px)] leading-[1.02] tracking-[-0.025em] m-0 max-w-[16ch]">
              Wheel &amp; tyre care <span className="text-accent">in {area}.</span>
            </h1>
            <p className="text-lg leading-7 max-w-[44ch] mt-5 text-bg/85">Alignment, balancing, nitrogen &amp; new tyres — done while you wait.</p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href={whatsappHref()} target="_blank" rel="noopener" className="btn px-5 py-[15px] text-[15px] gap-2.5 bg-accent-600 text-white hover:bg-accent-700">
                <ChatIcon />
                Book on WhatsApp
              </a>
              <a href={telHref} className="btn px-5 py-[15px] text-[15px] text-bg border-bg/60 hover:bg-bg/12">
                Call {site.phone}
              </a>
            </div>
          </div>
        </section>

        <div className={wrap}>
          {/* ── Quick facts strip ─────────────────────────────── */}
          <ul className="flex flex-wrap gap-0.5 bg-ink/40 border-b-2 border-ink/40 list-none m-0 p-0">
            {[
              { icon: <ClockIcon size={20} />, label: "Hours", value: hours.short, first: true },
              { icon: <PinIcon size={20} />, label: "Find us", value: `${site.landmark}, ${area}` },
              { icon: <CheckIcon size={20} strokeWidth={2} />, label: "Walk-ins welcome", value: "Most jobs done while you wait" },
            ].map((f) => (
              <li key={f.label} className={`flex-[1_1_260px] bg-bg py-5 ${f.first ? "pr-6" : "px-6"} flex gap-3.5 items-start`}>
                <span className="text-accent mt-0.5">{f.icon}</span>
                <div>
                  <div className="text-xs tracking-[0.08em] uppercase text-neutral-700">{f.label}</div>
                  <div className="font-semibold text-[15px] mt-1">{f.value}</div>
                </div>
              </li>
            ))}
          </ul>

          {/* ── Services ─────────────────────────────────────── */}
          <section id="services" aria-labelledby="services-title" className={`scroll-mt-[72px] ${sectionPad}`}>
            <div className="flex flex-wrap justify-between items-end gap-x-12 gap-y-6 mb-10">
              <div className="max-w-[640px]">
                <p className="eyebrow mb-4">Services · {area}</p>
                <h2 id="services-title" className="section-title m-0">Five services. One bay. Done while you wait.</h2>
                <p className="mt-5 mb-0 text-[15.5px] leading-[26px] text-ink/78 max-w-[60ch]">
                  Yamoto is a wheel and tyre shop in {area}, {city}, {site.landmark.replace(/^N/, "n")}. We do computerised wheel alignment, wheel
                  balancing, nitrogen filling and tyre rotation, and fit new car and SUV tyres — most jobs in under an hour while you wait.
                </p>
              </div>
              <QuoteButton className="btn px-4 py-3 gap-2.5 border-ink/40 hover:bg-ink/7">
                Not sure what you need?
                <ArrowIcon />
              </QuoteButton>
            </div>
            <Services />
          </section>

          <hr className="h-0.5 border-0 m-0 bg-ink/40" />

          {/* ── Why Yamoto ───────────────────────────────────── */}
          <section id="why" aria-labelledby="why-title" className={`scroll-mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-[clamp(32px,6vw,96px)] gap-y-12 ${sectionPad} items-start`}>
            <figure className="m-0 sticky top-24">
              <div className="relative aspect-[4/5] max-h-[640px] w-full bg-ink overflow-hidden">
                <Image
                  src={shopFront}
                  alt={`Yamoto shop front in ${area}, ${city} at dusk`}
                  fill
                  sizes="(min-width: 900px) 45vw, 100vw"
                  placeholder="blur"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-0.5 bg-bg/22 border-t-2 border-bg/22">
                  {[
                    ["Readout", "Before & after"],
                    ["Tyres", "Authorised stock"],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-ink text-bg px-4 py-3.5">
                      <div className="text-[11px] tracking-[0.12em] uppercase text-bg/65">{k}</div>
                      <div className="font-extrabold text-xl mt-1">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </figure>
            <div>
              <p className="eyebrow mb-4">Why Yamoto</p>
              <h2 id="why-title" className="section-title mt-0 mb-10 max-w-[16ch]">Why drivers in {area} come back.</h2>
              <ol className="list-none m-0 p-0">
                {reasons.map((r, i) => (
                  <li key={r.title} className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 gap-y-2 py-6 border-t-2 border-ink/40">
                    <span className="font-extrabold text-sm leading-[30px] tabular-nums text-accent-700">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[22px] leading-[1.25] tracking-[-0.01em] mt-0 mb-2">{r.title}</h3>
                      <p className="text-[15.5px] leading-[26px] m-0 max-w-[52ch] text-ink/78">{r.copy}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>

        {/* ── Brands ─────────────────────────────────────────── */}
        <section id="brands" aria-labelledby="brands-title" className="scroll-mt-16 bg-ink text-bg">
          <div className="relative w-full min-w-0 max-w-[1440px] mx-auto aspect-[5/2] min-h-[320px] max-h-[560px] overflow-hidden">
            <Image src={hero} alt={`Tyre stacks and alignment bay inside Yamoto, ${area}`} fill sizes="(min-width: 1440px) 1440px, 100vw" placeholder="blur" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(32_30_29/0.85),transparent_55%)]" />
            <div className="absolute inset-x-0 bottom-0">
              <div className={`${wrap} pb-[clamp(24px,4vw,48px)]`}>
                <p className="text-[13px] tracking-[0.08em] uppercase text-bg/75 mb-3">Tyre brands we fit &amp; sell</p>
                <h2 id="brands-title" className="text-[clamp(28px,4vw,56px)] leading-[1.04] tracking-[-0.02em] m-0 max-w-[18ch]">
                  The right tyre for {city} roads.
                </h2>
              </div>
            </div>
          </div>
          <div className={`${wrap} pb-[clamp(48px,6vw,80px)]`}>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-0.5 bg-bg/22 border-2 border-bg/22 list-none m-0 p-0">
              {site.brands.map((b) => (
                <li key={b} className="bg-ink px-6 py-7 flex flex-col gap-1.5 transition-colors hover:bg-neutral-900">
                  <span className="font-extrabold text-[clamp(18px,2vw,24px)] tracking-[-0.01em]">{b}</span>
                  <span className="text-[11px] tracking-[0.12em] uppercase text-bg/60">Car &amp; SUV tyres</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap justify-between items-center gap-4 mt-6">
              <p className="m-0 text-[15px] text-bg/78">Hatchback to SUV — send us your tyre size for a price.</p>
              <QuoteButton service="New tyres" className="btn px-4 py-3 bg-accent-600 text-white hover:bg-accent-700">
                Ask for a tyre price
              </QuoteButton>
            </div>
          </div>
        </section>

        <div className={wrap}>
          {/* ── Location ─────────────────────────────────────── */}
          <section id="location" aria-labelledby="location-title" className={`scroll-mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-[clamp(32px,5vw,80px)] gap-y-12 ${sectionPad}`}>
            <div className="flex flex-col gap-7">
              <div>
                <p className="eyebrow mb-4">Visit us</p>
                <h2 id="location-title" className="section-title m-0">Find us in {area}.</h2>
              </div>
              <address className="not-italic text-[17px] leading-7">
                <strong className="font-extrabold">{site.name}</strong>
                <br />
                {address.street}
                <br />
                {address.locality}, {address.city}, {address.region} {address.postalCode}
              </address>
              <table className="w-full border-collapse text-[15px]">
                <caption className="sr-only">Opening hours</caption>
                <thead>
                  <tr className="border-b-2 border-ink/40">
                    <th scope="col" className="text-left text-[11px] tracking-[0.08em] uppercase text-neutral-700 font-extrabold px-3 py-2.5">Day</th>
                    <th scope="col" className="text-left text-[11px] tracking-[0.08em] uppercase text-neutral-700 font-extrabold px-3 py-2.5">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {[hours.weekdays, hours.sunday].map((h) => (
                    <tr key={h.label} className="border-b border-ink/25">
                      <td className="px-3 py-3">{h.label}</td>
                      <td className="px-3 py-3 tabular-nums">{h.display}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="m-0 text-[15px] leading-6 text-ink/78">
                <strong className="text-ink">{site.landmark}.</strong> A short drive from{" "}
                {site.areasServed.filter((a) => a !== area && a !== "Kothaguda").join(", ")}.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={directionsHref} target="_blank" rel="noopener" className="btn px-4 py-3 gap-2.5 bg-accent-600 text-white hover:bg-accent-700">
                  <PinIcon size={16} />
                  Get directions
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener" className="btn px-4 py-3 text-ink border-ink/40 hover:bg-ink/7">
                  WhatsApp us
                </a>
                <a href={telHref} className="btn px-4 py-3 text-ink border-ink/40 hover:bg-ink/7">
                  Call {site.phone}
                </a>
              </div>
            </div>
            <div className="relative min-h-[460px] border-2 border-ink/40 bg-surface grayscale contrast-[1.08]">
              <iframe
                title={`Map showing Yamoto in ${area}, ${city}`}
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </section>

          <hr className="h-0.5 border-0 m-0 bg-ink/40" />

          {/* ── FAQ ──────────────────────────────────────────── */}
          <section id="faq" aria-labelledby="faq-title" className={`scroll-mt-[72px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-[clamp(32px,5vw,80px)] gap-y-8 ${sectionPad} items-start`}>
            <div>
              <p className="eyebrow mb-4">FAQ</p>
              <h2 id="faq-title" className="section-title m-0">Questions we hear at the counter.</h2>
            </div>
            <div className="border-b-2 border-ink/40">
              {faqs.map((f, i) => (
                <details key={f.q} name="faq" open={i === 0} className="group border-t-2 border-ink/40">
                  <summary className="list-none cursor-pointer flex justify-between items-center gap-6 py-5 font-extrabold text-lg leading-[1.3] hover:text-accent-700">
                    <h3 className="m-0 text-lg leading-[1.3] font-extrabold">{f.q}</h3>
                    <span className="group-open:hidden"><PlusIcon size={20} /></span>
                    <span className="hidden group-open:block text-accent"><MinusIcon size={20} /></span>
                  </summary>
                  <p className="text-[15.5px] leading-[26px] m-0 pr-10 pb-6 max-w-[60ch] text-ink/80">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* ── Closing CTA ────────────────────────────────────── */}
        <section aria-label="Book a visit" className="bg-accent-600 text-white">
          <div className={`${wrap} py-[clamp(64px,9vw,120px)]`}>
            <p className="font-extrabold text-[clamp(36px,5vw,68px)] leading-[1.04] tracking-[-0.02em] m-0 -ml-[0.058em]">
              <span className="block">Steering pulling left?</span>
              <span className="block">Drive in today.</span>
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <a href={whatsappHref()} target="_blank" rel="noopener" className="btn px-[18px] py-3.5 text-[15px] bg-bg text-accent-700 min-w-[220px] justify-between gap-4 hover:bg-accent-100">
                Book on WhatsApp
                <ArrowIcon />
              </a>
              <a href={telHref} className="btn px-[18px] py-3.5 text-[15px] text-white border-white hover:bg-accent-700">
                Call {site.phone}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${wrap} pt-12 pb-10 max-bar:pb-[100px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-8 text-sm leading-[22px]`}>
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <Logo size={28} ticks={false} />
            <span className="font-extrabold text-lg tracking-[0.06em]">YAMOTO</span>
          </div>
          <p className="m-0 text-neutral-700">
            Wheel alignment, balancing, nitrogen, tyre rotation &amp; new tyres in {area}, {city}.
          </p>
        </div>
        <div className="text-neutral-700">
          <div className="font-extrabold text-ink mb-1.5">Address</div>
          {address.street}
          <br />
          {address.city}, {address.region} {address.postalCode}
        </div>
        <div className="text-neutral-700">
          <div className="font-extrabold text-ink mb-1.5">Contact</div>
          <a href={whatsappHref()} target="_blank" rel="noopener" className="text-accent-700 hover:text-accent">WhatsApp</a>
          <br />
          <a href={telHref} className="text-accent-700 hover:text-accent">{site.phone}</a>
        </div>
        <div className="text-neutral-700">
          <div className="font-extrabold text-ink mb-1.5">Hours</div>
          Mon–Sat {hours.weekdays.display}
          <br />
          Sun {hours.sunday.display}
        </div>
        <div className="col-span-full border-t-2 border-ink/40 pt-5 text-[13px] text-neutral-700">
          © {new Date().getFullYear()} {site.shortName} · www.yamoto.com
        </div>
      </footer>

      {/* ── Mobile action bar ────────────────────────────────── */}
      <div className="bar:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1.3fr_1fr_1fr] gap-0.5 bg-ink/40 border-t-2 border-ink/40">
        <a href={whatsappHref()} target="_blank" rel="noopener" className="btn justify-start px-3.5 h-14 bg-accent-600 text-white">
          <ChatIcon size={16} />
          WhatsApp
        </a>
        <a href={telHref} className="btn justify-start px-3.5 h-14 bg-bg text-ink">
          <PhoneIcon size={16} />
          Call
        </a>
        <QuoteButton className="btn justify-start px-3.5 h-14 bg-bg text-ink">Quote</QuoteButton>
      </div>
    </QuoteProvider>
  );
}
