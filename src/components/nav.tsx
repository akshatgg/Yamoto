"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/links";
import { ChatIcon, Logo } from "./icons";
import { QuoteButton } from "./quote";

const links = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why Yamoto" },
  { href: "#brands", label: "Brands" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const s = scrolled;
  const ease = "ease-[cubic-bezier(.2,.8,.2,1)]";
  const hover = s ? "hover:bg-ink/8" : "hover:bg-bg/16";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none transition-[padding] duration-400 ${ease} ${
        s ? "px-3 py-2.5" : "p-3 bar:px-[clamp(20px,5vw,72px)] bar:py-5"
      }`}
    >
      <nav
        aria-label="Main"
        className={`pointer-events-auto w-full grid grid-cols-[minmax(0,1fr)_auto] nav:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center rounded-full border backdrop-blur-[18px] backdrop-saturate-160 pr-2 transition-all duration-400 ${ease} ${
          s
            ? "max-w-[720px] nav:max-w-[1080px] h-14 pl-3.5 gap-2 bg-bg/72 text-ink border-ink/12 shadow-[0_10px_30px_-12px_rgba(32,30,29,0.35)]"
            : "max-w-[1200px] h-[68px] pl-5 gap-3.5 bg-bg/12 text-bg border-bg/26"
        }`}
      >
        <a href="#top" className="justify-self-start flex items-center gap-2.5 text-inherit no-underline">
          <Logo size={s ? 30 : 36} />
          <span className="flex flex-col gap-[3px]">
            <span className="font-extrabold text-lg leading-none tracking-[0.06em]">YAMOTO</span>
            {!s && <span className="text-[9px] leading-none font-semibold tracking-[0.18em] opacity-70 whitespace-nowrap">WHEEL &amp; TYRE CARE</span>}
          </span>
        </a>

        <ul className="hidden nav:flex items-center gap-0.5 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`block text-inherit no-underline text-sm font-semibold px-3 py-2 rounded-full whitespace-nowrap transition-colors ${hover}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="justify-self-end flex items-center gap-2">
          <QuoteButton
            className={`hidden bar:flex items-center cursor-pointer px-[18px] rounded-full border text-sm font-bold whitespace-nowrap transition-all ${hover} ${
              s ? "h-10 border-ink/30" : "h-[46px] border-bg/50"
            }`}
          >
            Get a quote
          </QuoteButton>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener"
            className={`flex items-center gap-2 px-[18px] rounded-full bg-accent-600 text-white no-underline text-sm font-bold whitespace-nowrap transition-all hover:bg-accent-700 ${s ? "h-10" : "h-[46px]"}`}
          >
            <ChatIcon size={16} />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
