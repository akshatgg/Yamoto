"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** GA4 plus conversion events for the three actions that matter: WhatsApp, call, directions. */
export function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_call", { link_url: href });
      else if (href.includes("wa.me/")) track("click_whatsapp", { link_text: a.textContent?.trim() });
      else if (href.includes("google.com/maps")) track("click_directions");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
