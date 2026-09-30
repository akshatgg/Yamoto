"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type CSSProperties } from "react";
import { services, site, type ServiceKey } from "@/config/site";
import { whatsappHref } from "@/lib/links";
import alignment from "@/assets/images/wheel-alignment.jpg";
import balancing from "@/assets/images/wheel-balancing.jpg";
import nitrogen from "@/assets/images/nitrogen-filling.jpg";
import rotation from "@/assets/images/tyre-rotation.jpg";
import tyres from "@/assets/images/new-tyres.jpg";
import { ArrowIcon, ChatIcon, CheckIcon } from "./icons";
import { QuoteButton } from "./quote";

const photos: Record<ServiceKey, StaticImageData> = { alignment, balancing, nitrogen, rotation, tyres };

/**
 * Desktop (≥900px): list on the left, a photo panel on the right that follows hover.
 * Mobile: an accordion with the panel inline under the tapped row.
 * All five panels are always in the HTML so every service's copy is crawlable.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const isDesktop = () => window.matchMedia("(min-width: 900px)").matches;

  return (
    <div className="grid svc:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] border-y-2 border-ink">
      {services.map((s, i) => {
        const on = active === i;
        const row = { "--row": i + 1 } as CSSProperties;
        return (
          <div key={s.key} className="contents">
            <h3 className={`m-0 svc:col-start-1 svc:[grid-row:var(--row)] ${i ? "border-t-2 border-ink/40" : ""}`} style={row}>
              <button
                type="button"
                id={`svc-tab-${s.key}`}
                aria-expanded={on}
                aria-controls={`svc-panel-${s.key}`}
                onClick={() => setActive((cur) => (!isDesktop() && cur === i ? -1 : i))}
                onMouseEnter={() => isDesktop() && setActive(i)}
                className={`w-full h-full grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-4 px-5 py-[22px] text-left cursor-pointer transition-colors duration-200 focus-visible:-outline-offset-2 ${
                  on ? "bg-ink text-bg" : "bg-transparent text-ink hover:bg-ink/5"
                }`}
              >
                <span className={`font-extrabold text-sm tabular-nums ${on ? "text-accent-500" : "text-accent-700"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1 min-w-0">
                  <span className="font-extrabold text-[clamp(20px,2vw,26px)] leading-[1.15] tracking-[-0.01em]">{s.title}</span>
                  <span className="font-normal text-sm leading-5 opacity-80">{s.short}</span>
                </span>
                <span className={`w-10 h-10 flex items-center justify-center ${on ? "bg-accent text-bg" : ""}`}>
                  <ArrowIcon />
                </span>
              </button>
            </h3>

            <div
              id={`svc-panel-${s.key}`}
              role="region"
              aria-labelledby={`svc-tab-${s.key}`}
              className={`relative overflow-hidden bg-ink text-bg svc:col-start-2 svc:row-start-1 svc:row-span-5 svc:min-h-[560px] svc:transition-opacity svc:duration-500 ${
                on ? "svc:opacity-100 svc:z-10" : "max-svc:hidden svc:opacity-0 svc:pointer-events-none"
              }`}
              inert={!on}
            >
              <div className="relative aspect-[16/10] svc:absolute svc:inset-0 svc:aspect-auto">
                <Image
                  src={photos[s.key]}
                  alt={`${s.title} at Yamoto, ${site.area}, ${site.city}`}
                  fill
                  sizes="(min-width: 900px) 55vw, 100vw"
                  placeholder="blur"
                  className={`object-cover transition-transform duration-[1200ms] ${on ? "scale-100" : "scale-[1.06]"}`}
                />
              </div>
              <div className="hidden svc:block absolute inset-0 bg-[linear-gradient(to_top,rgb(32_30_29/0.94)_0%,rgb(32_30_29/0.6)_42%,transparent_72%)]" />
              <div className="hidden svc:flex absolute top-5 inset-x-6 justify-between text-[11px] tracking-[0.14em] uppercase text-bg/80">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent block" />
                  {String(i + 1).padStart(2, "0")} / 05
                </span>
                <span>{s.time}</span>
              </div>

              <div className="relative flex flex-col gap-4 p-5 svc:absolute svc:inset-x-0 svc:bottom-0 svc:p-7 svc:gap-[18px]">
                <p className="hidden svc:block m-0 font-extrabold text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.015em]">{s.title}</p>
                <p className="m-0 text-[15px] leading-6 svc:text-base svc:leading-[25px] max-w-[52ch] text-bg/85">{s.copy}</p>
                <ul className="flex flex-col svc:flex-row svc:flex-wrap gap-2 svc:gap-x-6 list-none m-0 p-0">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2.5 svc:gap-2 items-center text-sm font-semibold">
                      <CheckIcon size={16} className="flex-none text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-2 svc:flex svc:flex-wrap svc:gap-2.5 svc:pt-[18px] svc:border-t-2 svc:border-bg/22">
                  <QuoteButton service={s.title} className="btn justify-between px-3.5 py-3 svc:px-4 svc:py-[13px] svc:min-w-[200px] svc:gap-4 bg-accent-600 text-white hover:bg-accent-700">
                    <span className="svc:hidden">Get a quote</span>
                    <span className="hidden svc:inline">Get a {s.title.toLowerCase()} quote</span>
                    <ArrowIcon />
                  </QuoteButton>
                  <a href={whatsappHref()} target="_blank" rel="noopener" className="btn px-3.5 py-3 svc:px-4 svc:py-[13px] text-bg border-bg/55 hover:bg-bg/12">
                    <ChatIcon size={16} />
                    <span className="svc:hidden">WhatsApp</span>
                    <span className="hidden svc:inline">Book on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
