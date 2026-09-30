type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Fire a GA4 event if GA is loaded; no-op otherwise. */
export function track(name: string, params?: Record<string, unknown>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
