import { faqs, seo, services, site } from "@/config/site";

const id = (frag: string) => `${site.url}/#${frag}`;

/** One JSON-LD @graph for the whole page: business, website, webpage and FAQ. */
export function buildJsonLd() {
  const { address, geo, hours } = site;

  const business = {
    "@type": ["TireShop", "AutoRepair"],
    "@id": id("business"),
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    image: [`${site.url}/og.jpg`],
    logo: `${site.url}/icon.svg`,
    telephone: site.phone,
    priceRange: site.priceRange,
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: `${address.locality}, ${address.city}`,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    hasMap: site.googleBusinessUrl || `https://www.google.com/maps?q=${geo.lat},${geo.lng}`,
    openingHoursSpecification: [hours.weekdays, hours.sunday].map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name: `${name}, ${site.city}` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wheel & tyre services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.copy,
          areaServed: `${site.area}, ${site.city}`,
          provider: { "@id": id("business") },
        },
      })),
    },
    brand: site.brands.map((name) => ({ "@type": "Brand", name })),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": id("website"),
    url: site.url,
    name: site.name,
    inLanguage: "en-IN",
    publisher: { "@id": id("business") },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": id("webpage"),
    url: site.url,
    name: seo.title,
    description: seo.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": id("website") },
    about: { "@id": id("business") },
    primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/og.jpg` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": id("faq"),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [business, website, webpage, faqPage] };
}

export function jsonLdScript(data: unknown) {
  // Escape `<` so the payload can never close the script tag (per Next.js JSON-LD guide).
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
