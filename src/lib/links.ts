import { site } from "@/config/site";

const phoneDigits = site.phone.replace(/\D/g, "");

export const telHref = `tel:+${phoneDigits}`;

export function whatsappHref(text = "Hi Yamoto, I'd like to book a slot.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const directionsHref = site.googleBusinessUrl
  ? site.googleBusinessUrl
  : `https://www.google.com/maps/dir/?api=1&destination=${site.geo.lat},${site.geo.lng}`;

export const mapEmbedSrc = `https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;

export type QuoteRequest = {
  name: string;
  phone: string;
  car?: string;
  service: string;
  size?: string;
  date?: string;
  notes?: string;
};

export function quoteWhatsappText(q: QuoteRequest) {
  return [
    "Hi Yamoto, quote request:",
    `Name: ${q.name}`,
    `Phone: ${q.phone}`,
    `Car: ${q.car || "-"}`,
    `Service: ${q.service}`,
    `Tyre size: ${q.size || "-"}`,
    `Preferred day: ${q.date || "-"}`,
    q.notes || "",
  ]
    .join("\n")
    .trim();
}
