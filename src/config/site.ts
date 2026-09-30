/**
 * Single source of truth for everything about the business.
 *
 * Every value marked `TODO(client)` is a placeholder carried over from the
 * design mock-up. Replace it with the real value before launch — the
 * name, address and phone here must match the Google Business Profile
 * character for character (NAP consistency is a local ranking signal).
 */

export const site = {
  name: "Yamoto Wheel & Tyre Care",
  shortName: "Yamoto",
  url: "https://www.yamoto.com",
  locale: "en_IN",

  area: "Kondapur",
  city: "Hyderabad",

  // TODO(client): real phone + WhatsApp number (digits only for WhatsApp, with country code).
  phone: "+91 98765 43210",
  whatsapp: "919876543210",

  // TODO(client): real street address and PIN code.
  address: {
    street: "Plot 24, Kondapur Main Road, near Kothaguda Junction",
    locality: "Kondapur",
    city: "Hyderabad",
    region: "Telangana",
    regionCode: "IN-TG",
    postalCode: "500084",
    country: "IN",
  },
  landmark: "Near Kothaguda Junction",

  // TODO(client): exact coordinates of the shop (right-click the pin in Google Maps → copy).
  geo: { lat: 17.4632, lng: 78.3669 },

  // TODO(client): Google Business Profile share link once the listing is verified.
  googleBusinessUrl: "",
  // TODO(client): Instagram / Facebook / Justdial profile URLs — feeds `sameAs` in structured data.
  sameAs: [] as string[],

  hours: {
    weekdays: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:30", label: "Monday – Saturday", display: "9:00 AM – 8:30 PM" },
    sunday: { days: ["Sunday"], opens: "09:30", closes: "14:00", label: "Sunday", display: "9:30 AM – 2:00 PM" },
    short: "Mon–Sat 9 AM – 8:30 PM · Sun till 2 PM",
  },

  priceRange: "₹₹",

  // Neighbourhoods a driver would reasonably come from. Used in copy and `areaServed`.
  areasServed: ["Kondapur", "Kothaguda", "Gachibowli", "Madhapur", "Hitech City", "Hafeezpet", "Miyapur", "Serilingampally"],

  // TODO(client): confirm the brands actually stocked.
  brands: ["MRF", "Apollo", "CEAT", "Bridgestone", "Michelin", "JK Tyre", "Yokohama", "Goodyear"],
} as const;

export const seo = {
  title: `Wheel Alignment, Balancing & Tyres in ${site.area}, Hyderabad | Yamoto`,
  description: `Yamoto, ${site.area}, Hyderabad: computerised wheel alignment, wheel balancing, nitrogen filling, tyre rotation and new MRF, Apollo, CEAT & Michelin tyres. Walk-ins welcome — most jobs done while you wait.`,
};

export type ServiceKey = "alignment" | "balancing" | "nitrogen" | "rotation" | "tyres";

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  time: string;
  copy: string;
  points: string[];
};

export const services: Service[] = [
  {
    key: "alignment",
    title: "Wheel alignment",
    short: "Car pulling or steering off-centre",
    time: "≈ 40 min",
    copy: "Computerised alignment that sets camber, caster and toe to your car's factory spec. Stops the pull, centres the steering and saves your tyres.",
    points: ["Before / after readout", "Cars & SUVs", "Steering centred"],
  },
  {
    key: "balancing",
    title: "Wheel balancing",
    short: "Vibration at highway speed",
    time: "≈ 30 min",
    copy: "Dynamic balancing on all four wheels with precise weights, so the steering stays steady at highway speed — no shake at 80.",
    points: ["All four wheels", "Alloy-safe weights", "Road-checked"],
  },
  {
    key: "nitrogen",
    title: "Nitrogen filling",
    short: "Stable pressure, cooler tyres",
    time: "≈ 10 min",
    copy: "Nitrogen holds pressure longer and runs cooler than air, so your tyres stay at the right PSI between visits.",
    points: ["Fill & top-ups", "Pressure check", "Valve check"],
  },
  {
    key: "rotation",
    title: "Tyre rotation",
    short: "Even wear, longer tyre life",
    time: "≈ 25 min",
    copy: "Front-to-back and cross rotation to even out wear, with a tread-depth check on every tyre while the car is up.",
    points: ["Tread-depth check", "Torque-set nuts", "Every 8–10k km"],
  },
  {
    key: "tyres",
    title: "New tyres",
    short: "Leading brands, fitted same visit",
    time: "Same visit",
    copy: "Tyres for hatchbacks, sedans and SUVs from the brands you know — fitted, balanced and aligned in the same visit.",
    points: ["Leading brands", "Fitted & balanced", "Size advice"],
  },
];

// TODO(client): confirm these differentiators are true for the shop.
export const reasons = [
  { title: "Machines that measure, not guess", copy: "Calibrated computerised alignment and balancing, with a readout you can see before and after the job." },
  { title: "Straight answers on what’s needed", copy: "We show you the tread, the readings and the wear before recommending anything. If it doesn’t need doing, we say so." },
  { title: "Genuine tyres, full warranty", copy: "Tyres sourced from authorised distributors, so the manufacturer’s warranty stays intact." },
  { title: "In and out quickly", copy: "Most alignment and balancing jobs are done while you wait. Walk in, or hold a slot on WhatsApp." },
];

export const faqs = [
  {
    q: "Where is Yamoto located?",
    a: `${site.address.street}, ${site.city}. Tap "Get directions" for turn-by-turn navigation on Google Maps.`,
  },
  {
    q: `How much does wheel alignment cost in ${site.area}?`,
    a: "It depends on your car — hatchbacks, sedans and SUVs are priced differently. Request a quote or WhatsApp us and we will confirm the price before we start any work.",
  },
  {
    q: "How long do alignment and balancing take?",
    a: "On most cars both are done in under an hour, while you wait. Book a slot on WhatsApp to skip the queue.",
  },
  {
    q: "How often should I get wheel alignment done?",
    a: "Every 5,000–10,000 km, whenever you fit new tyres, after hitting a big pothole, or as soon as the car pulls to one side or the steering sits off-centre.",
  },
  {
    q: "Is nitrogen better than normal air?",
    a: `Nitrogen leaks out more slowly and is less affected by heat, so tyre pressure stays stable for longer — useful in ${site.city} summers. Normal air works too, if you check pressure regularly.`,
  },
  {
    q: "Which tyre brands do you sell?",
    a: `We fit and sell car and SUV tyres from ${site.brands.slice(0, -1).join(", ")} and ${site.brands.at(-1)}. Send us your tyre size on WhatsApp for a price.`,
  },
  {
    q: "Do you serve Gachibowli, Madhapur and Hitech City?",
    a: `Yes. We are ${site.landmark.replace(/^N/, "n")} in ${site.area}, a short drive from Gachibowli, Madhapur, Hitech City, Hafeezpet and Miyapur.`,
  },
  {
    q: "Do I need an appointment?",
    a: "No — walk-ins are welcome during shop hours. If you would rather not wait, message us on WhatsApp and we will hold a slot for you.",
  },
];

export const quoteServiceOptions = [...services.map((s) => s.title), "Not sure"];
