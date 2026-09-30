"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { quoteServiceOptions } from "@/config/site";
import { quoteWhatsappText, whatsappHref, type QuoteRequest } from "@/lib/links";
import { track } from "@/lib/analytics";
import { ArrowIcon, ChatIcon, CloseIcon } from "./icons";

const QuoteContext = createContext<(service?: string) => void>(() => {});

export function QuoteProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState("Not sure");
  const [sent, setSent] = useState<(QuoteRequest & { delivered: boolean }) | null>(null);
  const [sending, setSending] = useState(false);

  const open = useCallback((s?: string) => {
    setService(s && quoteServiceOptions.includes(s) ? s : "Not sure");
    setSent(null);
    dialogRef.current?.showModal();
    track("quote_open", { service: s ?? "Not sure" });
  }, []);

  const close = () => dialogRef.current?.close();

  // Lock page scroll while the modal is open.
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const sync = () => (document.documentElement.style.overflow = d.open ? "hidden" : "");
    const obs = new MutationObserver(sync);
    obs.observe(d, { attributes: true, attributeFilter: ["open"] });
    return () => obs.disconnect();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const req: QuoteRequest & { company?: string } = { ...data, service } as QuoteRequest;
    setSending(true);
    let delivered = false;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      delivered = res.ok && Boolean((await res.json()).delivered);
    } catch {
      delivered = false;
    }
    setSending(false);
    setSent({ ...req, delivered });
    track("generate_lead", { service, delivered });
  }

  const field = "w-full min-h-11 px-2.5 py-1.5 text-sm bg-surface border border-ink/40 caret-accent hover:border-ink/45 focus-visible:border-accent focus-visible:outline-offset-0";
  const label = "block text-xs mb-1.5 text-ink/70";

  return (
    <QuoteContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="quote-title"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(560px,calc(100%-32px))] max-h-[calc(100dvh-32px)] overflow-y-auto bg-bg text-ink p-0 border-t-[6px] border-accent shadow-[0_12px_32px_rgba(45,43,43,0.22)]"
      >
        <div className="p-7 flex flex-col gap-5">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 id="quote-title" className="text-[26px] leading-[1.1] m-0">Request a quote</h2>
              <p className="text-sm mt-1.5 text-neutral-700">We&apos;ll call you back with a price during shop hours.</p>
            </div>
            <button type="button" aria-label="Close" onClick={close} className="btn w-9 h-9 p-0 border-ink/40 hover:bg-ink/7">
              <CloseIcon />
            </button>
          </div>

          {!sent ? (
            <form onSubmit={submit} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-4">
              <div>
                <label htmlFor="q-name" className={label}>Name</label>
                <input id="q-name" name="name" required maxLength={80} autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="q-phone" className={label}>Phone</label>
                <input id="q-phone" name="phone" type="tel" required pattern="[0-9+\s\-]{8,16}" autoComplete="tel" placeholder="+91" className={field} />
              </div>
              <div>
                <label htmlFor="q-car" className={label}>Car make &amp; model</label>
                <input id="q-car" name="car" maxLength={80} placeholder="e.g. Hyundai Creta 2021" className={field} />
              </div>
              <div>
                <label htmlFor="q-service" className={label}>Service</label>
                <select id="q-service" name="service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
                  {quoteServiceOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="q-size" className={label}>Tyre size (optional)</label>
                <input id="q-size" name="size" maxLength={30} placeholder="e.g. 215/60 R16" className={field} />
              </div>
              <div>
                <label htmlFor="q-date" className={label}>Preferred day</label>
                <input id="q-date" name="date" type="date" className={field} />
              </div>
              <div className="col-span-full">
                <label htmlFor="q-notes" className={label}>Anything we should know?</label>
                <textarea id="q-notes" name="notes" maxLength={600} placeholder="Pulling to one side, vibration at speed, uneven wear…" className={`${field} min-h-20 resize-y`} />
              </div>
              {/* Honeypot: hidden from people, filled in by bots. */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <button type="submit" disabled={sending} className="btn col-span-full justify-between px-[18px] py-3.5 text-[15px] bg-accent-600 text-white hover:bg-accent-700 disabled:opacity-60">
                <span>{sending ? "Sending…" : "Send request"}</span>
                <ArrowIcon />
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-4 pt-4 border-t-2 border-ink/40" role="status">
              <div className="flex items-center gap-2.5 font-extrabold text-xl">
                <span className="w-3 h-3 bg-accent block" />
                Thanks, {sent.name.split(" ")[0]}.
              </div>
              {sent.delivered ? (
                <p className="m-0 text-[15px] leading-6">
                  We&apos;ve got your request{sent.service !== "Not sure" && <> for <strong>{sent.service.toLowerCase()}</strong></>} and will call you on {sent.phone} shortly. In a hurry? Send the same details on WhatsApp.
                </p>
              ) : (
                <p className="m-0 text-[15px] leading-6">
                  Tap below to send your {sent.service !== "Not sure" && <strong>{sent.service.toLowerCase()} </strong>}request to us on WhatsApp — it&apos;s the fastest way to get a price.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <a href={whatsappHref(quoteWhatsappText(sent))} target="_blank" rel="noopener" className="btn px-4 py-3 bg-accent-600 text-white hover:bg-accent-700">
                  <ChatIcon size={16} />
                  <span>Send on WhatsApp</span>
                </a>
                <button type="button" onClick={close} className="btn px-4 py-3 border-ink/40 hover:bg-ink/7">Done</button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </QuoteContext.Provider>
  );
}

export function QuoteButton({ service, className, children }: { service?: string; className?: string; children: ReactNode }) {
  const open = useContext(QuoteContext);
  return (
    <button type="button" onClick={() => open(service)} className={className}>
      {children}
    </button>
  );
}
