// Semua konten statis halaman dikumpulkan di sini supaya komponen tetap bersih.
// Aset ada di /public/assets (jalankan download-assets.cmd dulu).

import type { CSSProperties } from "react";

export type NavLink = { label: string; href?: string; dropdown?: string; chevron?: boolean };
export type Project = {
  /** URL halaman detail: /work/<slug> */
  slug: string;
  title: string;
  tag: string;
  category: string;
  year: number;
  image: string;
  crop?: CSSProperties;
  tagline: string;
  summary: string;
};
export type Person = {
  name: string;
  company: string;
  /** Foto avatar (opsional). Kalau kosong, pakai inisial + warna. */
  photo?: string;
  initial: string;
  color: string;
};
export type ChatItem =
  | { from: string; kind: "text"; text: string }
  | { from: string; kind: "file"; fileName: string; fileMeta: string }
  | { from: string; kind: "review"; text: string };
export type Conversation = { client: string; project: string; messages: ChatItem[] };

export const asset = (name: string) => `/assets/${name}`;

export type TeamPhoto = { src: string; alt: string; width: number; height: number };

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
  // Foto founder di section About (ganti file di public/assets/team-photo.webp)
  teamPhoto: {
    src: asset("team-photo.webp"), // tanpa background (transparan)
    alt: "Nareswari and Rafly, founders of Lowkey Studio",
    width: 1600,
    height: 1066,
  } as TeamPhoto,
};

/* ---------- Navbar ---------- */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Service", dropdown: "services" },
  { label: "Portofolio", dropdown: "portfolio" },
  { label: "Testimonial", href: "/#testimonial" },
];

// Dipakai di dropdown navbar (title + description) dan section Services (semua field)
export const SERVICES = [
  {
    /** URL halaman detail: /services/<slug> */
    slug: "branding",
    title: "Branding",
    description: "Identity & logo systems",
    summary: "A clear, ownable identity that feels established from day one.",
    image: asset("project-aurora-rebrand.png"),
    tags: ["Logo & wordmark", "Visual identity", "Brand guidelines"],
  },
  {
    /** URL halaman detail: /services/<slug> */
    slug: "websites",
    title: "Websites",
    description: "Sites & landing pages",
    summary: "Fast, considered sites that explain what you do and turn visits into calls.",
    image: asset("project-kala-living.png"),
    tags: ["Landing pages", "Company sites", "Webflow / Next.js"],
  },
  {
    /** URL halaman detail: /services/<slug> */
    slug: "mobile-apps",
    title: "Mobile Apps",
    description: "Calm, clear product UI",
    summary: "Product design that stays out of the way and lets people get things done.",
    image: asset("project-fintra-dashboard.png"),
    tags: ["UX flows", "UI design", "Design systems"],
  },
  {
    /** URL halaman detail: /services/<slug> */
    slug: "motion",
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
    intro: "Two founders, one small studio. We keep the team\ntight so every project gets our full attention.",
  },
  services: {
    eyebrow: "Services",
    title: "What we do",
    intro: "Small team, end to end. We take a few projects at a time\nand see each one through from first sketch to launch.",
  },
  testimonials: {
    eyebrow: "Straight from the DMs",
    title: "What our clients said when nobody asked them to",
    intro: "Real messages from the founders we've worked with, straight from our chats.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    intro: "The things founders usually ask before we start\nworking together.",
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
    { name: "Nareswari Maia H", role: "Co Founder Lowkey Studio" } as { name: string; role: string; signature?: string },
    // `signature` = file tanda tangan landscape (tanpa rotasi). Kosong = pakai ASSETS.signature (Figma, diputar)
    { name: "Rafly Januar R", role: "Founder Lowkey Studio", signature: asset("signature-rafly.png") },
  ],
  reviewLabel: "5 Star Reviews",
};

/* ---------- Projects ---------- */
// `crop` mereplikasi crop gambar di Figma (posisi/ukuran dalam persen).
// Kategori portofolio (dipakai di dropdown navbar). `id` harus sama dengan `category` di PROJECTS.
export const PORTFOLIO_CATEGORIES = [
  { id: "branding", label: "Branding" },
  { id: "web", label: "Websites" },
  { id: "mobile", label: "Mobile Apps" },
];

export const PROJECTS: Project[] = [
  {
    slug: "kala-living",
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
    slug: "aurora-rebrand",
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
    slug: "fintra-dashboard",
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
    slug: "ritme-music-app",
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
    slug: "sora-skincare",
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
    slug: "nomad-coffee",
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
// Orang-orang di chat. Tambahkan `photo: asset("nama-file.jpg")` untuk pakai foto.
export const PEOPLE: Record<string, Person> = {
  rafly: { name: "Rafly", company: "Lowkey Studio", photo: asset("avatar-rafly.jpg"), initial: "R", color: "#3f8f3a" },
  nara: { name: "Nara", company: "Lowkey Studio", photo: asset("avatar-nara.jpg"), initial: "N", color: "#ff8f2e" },
  // TODO: tambahkan foto klien (taruh di public/assets lalu isi `photo`)
  maya: { name: "Maya", company: "Aurora Labs", initial: "M", color: "#b04ce6" },
  laila: { name: "Laila", company: "Nomad Coffee", initial: "L", color: "#e5304a" },
  kev: { name: "Kev", company: "Fintra", initial: "K", color: "#5b8def" },
};

// Isi diambil dari frame "Testimonial Convo 1–3" di Figma.
// `from`: key di PEOPLE. Pesan dari orang Lowkey Studio tampil di kanan.
export const CONVERSATIONS: Conversation[] = [
  {
    client: "maya",
    project: "Brand identity",
    messages: [
      { from: "maya", kind: "text", text: "hey! any chance we can see the logo options before friday? the team is getting impatient lol" },
      { from: "rafly", kind: "text", text: "Yep, just finished cleaning them up. Sending now" },
      { from: "rafly", kind: "file", fileName: "Aurora_Logo_Round2.pdf", fileMeta: "4.2 MB · PDF" },
      { from: "maya", kind: "text", text: "ok option B. it's option B. not even close" },
      { from: "rafly", kind: "text", text: "Thought you'd say that 😄 I'll build the full system around it this week" },
      { from: "maya", kind: "review", text: "Honestly the smoothest branding project we've done. You got what we were going for faster than we could explain it." },
    ],
  },
  {
    client: "laila",
    project: "Packaging",
    messages: [
      { from: "laila", kind: "text", text: "quick one, can the bag label work on kraft paper too? our supplier just switched" },
      { from: "nara", kind: "text", text: "Good catch. I tried it on kraft, here's the mockup" },
      { from: "nara", kind: "file", fileName: "Nomad_Label_Kraft.png", fileMeta: "2.8 MB · PNG" },
      { from: "laila", kind: "text", text: "wait that's even better than the white version??" },
      { from: "nara", kind: "text", text: "Agreed. Print files are ready whenever you are" },
      { from: "laila", kind: "review", text: "Online orders went up after the rebrand and people keep asking who did our packaging. I just send them your way now." },
    ],
  },
  {
    client: "kev",
    project: "Product design",
    messages: [
      { from: "kev", kind: "text", text: "investors want to see the dashboard before the call tomorrow. is that doable?" },
      { from: "rafly", kind: "text", text: "Doable. Mobile is done, desktop in a couple of hours" },
      { from: "rafly", kind: "file", fileName: "Fintra_Dashboard_v3.fig", fileMeta: "Figma file · 18 frames" },
      { from: "kev", kind: "text", text: "just walked the team through it. nobody had notes. that never happens" },
      { from: "rafly", kind: "text", text: "Good luck tomorrow, tell us how it goes 🙌" },
      { from: "kev", kind: "review", text: "We closed the round, and the dashboard came up twice in the meeting. Easy to work with, and they actually care how it turns out." },
    ],
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
  email: "hello@lowkeystudio.com", // TODO: ganti dengan email asli
  // Kolom link (gaya Baseten): label di atas, daftar link di bawahnya
  columns: [
    {
      title: "Services",
      links: [
        { label: "Branding", href: "/services/branding" },
        { label: "Websites", href: "/services/websites" },
        { label: "Mobile Apps", href: "/services/mobile-apps" },
        { label: "Motion", href: "/services/motion" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "About", href: "/#about" },
        { label: "Work", href: "/work" },
        { label: "Testimonials", href: "/#testimonial" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Work",
      links: [
        { label: "Branding", href: "/work?category=branding" },
        { label: "Websites", href: "/work?category=web" },
        { label: "Mobile Apps", href: "/work?category=mobile" },
        { label: "All projects", href: "/work" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "hello@lowkeystudio.com", href: "mailto:hello@lowkeystudio.com" },
        { label: "Start a project", href: "mailto:hello@lowkeystudio.com" },
      ],
    },
  ],
  status: "Available for new projects",
  socials: [
    // TODO: ganti href dengan link akun asli
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  wordmark: "lowkey",
  tagline: "Thoughtful design, built lowkey.",
  copyright: "© 2026 Lowkey Studio",
};
