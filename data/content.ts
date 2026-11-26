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
  logo: asset("logo-mark.svg"),
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

export const SERVICES = [
  { title: "Branding", description: "Identity & logo systems" },
  { title: "Websites", description: "Sites & landing pages" },
  { title: "Mobile Apps", description: "Calm, clear product UI" },
  { title: "Motion", description: "Brand & interface animation" },
];

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
export const FILTERS = [
  { id: "all", label: "All" },
  { id: "branding", label: "Branding" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "motion", label: "Motion" },
];

// `crop` mereplikasi crop gambar di Figma (posisi/ukuran dalam persen).
export const PROJECTS: Project[] = [
  { title: "Kala Living", tag: "WEB", category: "web", year: 2025, image: asset("project-kala-living.png") },
  { title: "Aurora Rebrand", tag: "BRANDING", category: "branding", year: 2025, image: asset("project-aurora-rebrand.png") },
  { title: "Fintra Dashboard", tag: "PRODUCT", category: "web", year: 2025, image: asset("project-fintra-dashboard.png") },
  {
    title: "Ritme Music App",
    tag: "MOBILE",
    category: "mobile",
    year: 2024,
    image: asset("project-ritme-music.png"),
    crop: { width: "200.9%", height: "111.84%", left: "-55.05%", top: "-8.53%" },
  },
  {
    title: "Sora Skincare",
    tag: "WEB",
    category: "web",
    year: 2024,
    image: asset("project-sora-skincare.png"),
    crop: { width: "172.07%", height: "193.31%", left: "-38.34%", top: "-25.14%" },
  },
  { title: "Nomad Coffee", tag: "PACKAGING", category: "branding", year: 2024, image: asset("project-nomad-coffee.png") },
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
