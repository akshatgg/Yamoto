import { quoteServiceOptions, site } from "@/config/site";
import { quoteWhatsappText, whatsappHref, type QuoteRequest } from "@/lib/links";

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/**
 * Receives a quote request and emails it to the shop via Resend.
 * Env: RESEND_API_KEY, LEAD_TO_EMAIL, optional LEAD_FROM_EMAIL.
 * If email isn't configured the lead is logged and the client falls back to WhatsApp.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't retry.
  if (clip(body.company, 100)) return Response.json({ ok: true, delivered: true });

  const lead: QuoteRequest = {
    name: clip(body.name, 80),
    phone: clip(body.phone, 20),
    car: clip(body.car, 80),
    service: clip(body.service, 40),
    size: clip(body.size, 30),
    date: clip(body.date, 20),
    notes: clip(body.notes, 600),
  };

  if (!lead.name || !/^[0-9+\s-]{8,16}$/.test(lead.phone)) {
    return Response.json({ ok: false, error: "Name and a valid phone number are required" }, { status: 400 });
  }
  if (!quoteServiceOptions.includes(lead.service)) lead.service = "Not sure";

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  if (!apiKey || !to) {
    console.info("[quote] email not configured — lead:", JSON.stringify(lead));
    return Response.json({ ok: true, delivered: false });
  }

  const rows = ([
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Car", lead.car],
    ["Service", lead.service],
    ["Tyre size", lead.size],
    ["Preferred day", lead.date],
    ["Notes", lead.notes],
  ] as const)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#605d5d">${k}</td><td style="padding:6px 0"><strong>${escapeHtml(v || "-")}</strong></td></tr>`)
    .join("");
  const replyOnWhatsapp = `https://wa.me/${lead.phone.replace(/\D/g, "").replace(/^(?=\d{10}$)/, "91")}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || `${site.shortName} Website <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      subject: `New quote request: ${lead.service} — ${lead.name}`,
      text: `${quoteWhatsappText(lead)}\n\nReply on WhatsApp: ${replyOnWhatsapp}`,
      html: `<h2 style="font-family:sans-serif">New quote request</h2><table style="font-family:sans-serif;font-size:15px">${rows}</table><p style="font-family:sans-serif"><a href="${replyOnWhatsapp}">Reply on WhatsApp</a> · <a href="tel:${escapeHtml(lead.phone)}">Call ${escapeHtml(lead.phone)}</a></p>`,
    }),
  });

  if (!res.ok) {
    console.error("[quote] Resend failed", res.status, await res.text());
    return Response.json({ ok: true, delivered: false, whatsapp: whatsappHref(quoteWhatsappText(lead)) });
  }
  return Response.json({ ok: true, delivered: true });
}
