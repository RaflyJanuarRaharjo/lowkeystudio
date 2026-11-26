// Semua konten statis halaman dikumpulkan di sini supaya komponen tetap bersih.
// Aset ada di /public/assets (jalankan download-assets.cmd dulu).

import type { CSSProperties } from "react";

export type NavLink = { label: string; href?: string; dropdown?: string; chevron?: boolean };
export type Project = {
  title: string;
  tag: string;
  category: string;
  year: number;
  image: string;
  crop?: CSSProperties;
  tagline: string;
  summary: string;
};
export type Message = {
  side: "left" | "right";
  name: string;
  company: string;
  initial: string;
  color: string;
  text: string;
};

const asset = (name: string) => `/assets/${name}`;

export type TeamPhoto = { src: string; width: number; fit: "cover" | "contain"; position: string };

export const ASSETS = {
  logo: asset("logo-square.svg"), // logo sudut tajam (dibuat ulang dari Figma)
  chevronDown: asset("chevron-down.svg"),
  chevronUp: asset("chevron-up.svg"),
  dropdownPreview: asset("dropdown-preview.png"),
  fastwork: asset("fastwork.png"),
  stars: asset("stars.svg"),
  signature: asset("signature.svg"),
  tailLeft: asset("tail-left.svg"),
  tailRight: asset("tail-right.svg"),
  arrow: asset("arrow.svg"),
  teamPhotos: [
    // File foto sudah di-crop langsung dari Figma (rasio sama dengan kotaknya)
    { src: asset("team-1.png"), width: 273, fit: "cover", position: "center" },
    { src: asset("team-2.png"), width: 326, fit: "cover", position: "center" },
  ] as TeamPhoto[],
};

/* ---------- Navbar ---------- */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Service", dropdown: "services" },
  { label: "Portofolio", href: "#portfolio", chevron: true },
  { label: "Testimonial", href: "#testimonial" },
];

// Dipakai di dropdown navbar (title + description) dan section Services (semua field)
export const SERVICES = [
  {
    title: "Branding",
    description: "Identity & logo systems",
    summary: "A clear, ownable identity that feels established from day one.",
    image: asset("project-aurora-rebrand.png"),
    tags: ["Logo & wordmark", "Visual identity", "Brand guidelines"],
  },
  {
    title: "Websites",
    description: "Sites & landing pages",
    summary: "Fast, considered sites that explain what you do and turn visits into calls.",
    image: asset("project-kala-living.png"),
    tags: ["Landing pages", "Company sites", "Webflow / Next.js"],
  },
  {
    title: "Mobile Apps",
    description: "Calm, clear product UI",
    summary: "Product design that stays out of the way and lets people get things done.",
    image: asset("project-fintra-dashboard.png"),
    tags: ["UX flows", "UI design", "Design systems"],
  },
  {
    title: "Motion",
    description: "Brand & interface animation",
    summary: "Movement that gives your brand and product a bit of personality.",
    image: asset("project-nomad-coffee.png"),
    tags: ["Logo animation", "UI micro-interactions", "Launch videos"],
  },
];

/* ---------- Header tiap section ---------- */
export const SECTION_HEADERS = {
  about: {
    eyebrow: "About",
    title: "Who we are",
    intro: "Two founders, one small studio. We keep the team tight so every project gets our full attention.",
  },
  services: {
    eyebrow: "Services",
    title: "What we do",
    intro: "Small team, end to end. We take a few projects at a time and see each one through from first sketch to launch.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What clients say",
    intro: "Real messages from the founders we've worked with, straight from our chats.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    intro: "The things founders usually ask before we start working together.",
  },
};

/* ---------- Hero ---------- */
export const HERO = {
  title: "Thoughtful design. Meaningful impact.",
  subtitle:
    "From brands to digital products, we turn ideas into experiences that connect and inspire",
};

/* ---------- Mission ---------- */
export const MISSION = {
  text: "We’re a small studio that works with founders around the world. From the first sketch to launch day, we treat every product like it’s our own and we sign our name on every one",
  founders: [
    { name: "Nareswari Maia H", role: "Co Founder Lowkey Studio" },
    { name: "Rafly Januar R", role: "Founder Lowkey Studio" },
  ],
  reviewLabel: "5 Star Reviews",
};

/* ---------- Projects ---------- */
// `crop` mereplikasi crop gambar di Figma (posisi/ukuran dalam persen).
export const PROJECTS: Project[] = [
  {
    title: "Kala Living",
    tag: "WEB",
    category: "web",
    year: 2025,
    image: asset("project-kala-living.png"),
    tagline: "A calmer way to shop for home",
    summary:
      "Kala Living sells handmade furniture from small workshops. We designed a site that feels like walking through a quiet showroom, with room for each piece to breathe.",
  },
  {
    title: "Aurora Rebrand",
    tag: "BRANDING",
    category: "branding",
    year: 2025,
    image: asset("project-aurora-rebrand.png"),
    tagline: "A brand with a pixel at its heart",
    summary:
      "Aurora had outgrown its first logo. We built a new identity around a single pixel mark that scales from packaging to app icons without losing its character.",
  },
  {
    title: "Fintra Dashboard",
    tag: "PRODUCT",
    category: "web",
    year: 2025,
    image: asset("project-fintra-dashboard.png"),
    tagline: "Money, made legible",
    summary:
      "Fintra helps funded startups manage their runway. We redesigned the dashboard so founders can see cash, burn and forecasts at a glance.",
  },
  {
    title: "Ritme Music App",
    tag: "MOBILE",
    category: "mobile",
    year: 2024,
    image: asset("project-ritme-music.png"),
    crop: { width: "200.9%", height: "111.84%", left: "-55.05%", top: "-8.53%" },
    tagline: "Music that follows your pace",
    summary:
      "Ritme builds playlists around your daily rhythm. We designed a mobile app that stays out of the way while you move, with big, simple controls.",
  },
  {
    title: "Sora Skincare",
    tag: "WEB",
    category: "web",
    year: 2024,
    image: asset("project-sora-skincare.png"),
    crop: { width: "172.07%", height: "193.31%", left: "-38.34%", top: "-25.14%" },
    tagline: "Gentle care, clearly explained",
    summary:
      "Sora makes skincare for sensitive skin. We built an online store that explains every ingredient in plain language and makes routines easy to follow.",
  },
  {
    title: "Nomad Coffee",
    tag: "PACKAGING",
    category: "branding",
    year: 2024,
    image: asset("project-nomad-coffee.png"),
    tagline: "Coffee for the road",
    summary:
      "Nomad roasts small batches for travellers. We designed packaging that is easy to spot on a shelf and tells the story of each origin on the back.",
  },
];

/* ---------- Testimonials ---------- */
// side: "left" = klien, "right" = studio
export const MESSAGES: Message[] = [
  {
    side: "left",
    name: "Maya",
    company: "Aurora",
    initial: "M",
    color: "#b04ce6",
    text: "wait this is so much better than what we had in our heads. the little pixel thing on the packaging is my favourite bit",
  },
  {
    side: "right",
    name: "Rafly",
    company: "lowkey studio",
    initial: "R",
    color: "#3f8f3a",
    text: "Went through everything on desktop and mobile. The case study pages feel really solid, thanks for turning it around so fast",
  },
  {
    side: "left",
    name: "Maya",
    company: "Aurora",
    initial: "K",
    color: "#e5304a",
    text: "OK WHO DESIGNED THIS. I'm showing my mum",
  },
  {
    side: "right",
    name: "Rafly",
    company: "lowkey studio",
    initial: "R",
    color: "#ff8f2e",
    text: "bookings through the site have gone up quite a bit since launch, and people keep mentioning the design when they come in 🙏",
  },
  {
    side: "left",
    name: "Sarah",
    company: "Aurora",
    initial: "S",
    color: "#5b8def",
    text: "obsessed. can we just use the orange for everything lol",
  },
];

/* ---------- FAQ ---------- */
export const FAQS = [
  {
    question: "How long does a project take?",
    answer:
      "Most branding projects take 3–4 weeks, websites 4–6 weeks and app design 6–10 weeks. We'll give you a clear timeline after our first call.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Every project is scoped individually. After the first call we send a fixed-price proposal, so you know the full cost before we start.",
  },
  {
    question: "How many projects do you take at once?",
    answer:
      "Only 2–3 clients per month. Keeping it small means you work directly with the founders, not a rotating team.",
  },
  {
    question: "Do you also build the website?",
    answer:
      "Yes. We design and develop sites in Next.js or Webflow, and hand everything over so you can update content yourself.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Each phase includes two rounds of revisions. In practice we rarely need them all because we share progress early and often.",
  },
  {
    question: "How do we get started?",
    answer:
      "Send us a message with a bit about what you're building. We'll set up a short call to see if we're the right fit.",
  },
];

/* ---------- Footer ---------- */
export const FOOTER = {
  cta: "Have a project in mind?",
  ctaSub: "Tell us what you're building. We usually reply within a day.",
  email: "hello@lowkeystudio.com", // TODO: ganti dengan email asli
  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#portfolio" },
    { label: "Testimonials", href: "#testimonial" },
    { label: "FAQ", href: "#faq" },
  ],
  socials: [
    // TODO: ganti href dengan link akun asli
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  copyright: "© 2026 Lowkey Studio. All rights reserved.",
};
