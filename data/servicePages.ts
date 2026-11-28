/* ---------- Detail halaman service (/services/<slug>) ----------
 * Key = `slug` di SERVICES (data/content.ts).
 * Judul, ringkasan, tag & gambar diambil dari SERVICES, di sini cuma isi tambahan.
 * Semua teks masih draft — sesuaikan dengan cara kerja Lowkey yang sebenarnya.
 */

import type { ArtKind } from "@/components/ServiceDetail/ProcessArt";

export type ServicePage = {
  /** Paragraf pembuka (berubah putih saat di-scroll) */
  overview: string;
  /** Info singkat di bagian atas */
  timeline: string;
  bestFor: string;
  /** Apa saja yang bisa dikerjakan */
  capabilities: { title: string; text: string }[];
  /** Tahapan kerja */
  /** `art` (opsional): "discover" | "sketch" | "build" | "launch" — default ikut urutan */
  process: { title: string; text: string; duration: string; art?: ArtKind }[];
  /** Yang diterima klien di akhir project */
  deliverables: string[];
  /** Kategori PROJECTS untuk "Related work" (kosong = tidak tampil) */
  relatedCategory?: string;
  faqs: { q: string; a: string }[];
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  branding: {
    overview:
      "We build identities that feel established from day one. From the name on the door to the icon on a phone screen, everything looks and sounds like the same brand.",
    timeline: "4–8 weeks",
    bestFor: "New startups, rebrands, product launches",
    capabilities: [
      { title: "Brand strategy", text: "Positioning, audience and tone of voice, written down so the whole team says the same thing." },
      { title: "Logo & wordmark", text: "A mark that works from a 16px favicon to a billboard, in colour and in one colour." },
      { title: "Visual identity", text: "Colour, type, graphic elements and image style that make the brand easy to recognise." },
      { title: "Brand guidelines", text: "A short, practical guide with real examples, so anyone can use the brand correctly." },
      { title: "Packaging & print", text: "Labels, boxes, business cards and print files ready for production." },
      { title: "Social & templates", text: "Post templates, slide decks and documents your team can edit on their own." },
    ],
    process: [
      { title: "Discover", duration: "Week 1", text: "A kickoff workshop to understand your business, audience and competitors." },
      { title: "Direction", duration: "Week 2–3", text: "Two to three creative directions, presented with real examples, not just logos." },
      { title: "Design", duration: "Week 3–6", text: "We develop the chosen direction into a full identity, with two rounds of feedback." },
      { title: "Handover", duration: "Final week", text: "Guidelines, source files and a walkthrough so your team is ready to use it." },
    ],
    deliverables: [
      "Logo suite (primary, secondary, icon)",
      "Colour palette & typography",
      "Brand guidelines (PDF)",
      "Social media & presentation templates",
      "Business card & stationery",
      "All source files (AI, SVG, PNG)",
    ],
    relatedCategory: "branding",
    faqs: [
      { q: "How many logo options will we see?", a: "Two to three directions in the first presentation. We then refine one of them together." },
      { q: "Can you work with our existing brand?", a: "Yes. We can refresh what you have instead of starting from scratch, which is usually faster." },
      { q: "Do we own the final files?", a: "Yes. Once the project is paid, all final files and rights are yours." },
    ],
  },

  websites: {
    overview:
      "We design and build websites that explain what you do in seconds and turn visits into calls. Fast, easy to update and built to grow with you.",
    timeline: "4–10 weeks",
    bestFor: "Company sites, landing pages, online stores",
    capabilities: [
      { title: "Landing pages", text: "Focused pages for launches, campaigns or fundraising, built to convert." },
      { title: "Company websites", text: "Multi-page sites that tell your story, show your work and bring in leads." },
      { title: "E-commerce", text: "Online stores with clear product pages and a checkout that doesn't get in the way." },
      { title: "CMS setup", text: "Edit text, images and blog posts yourself, without touching code." },
      { title: "Development", text: "Built in Next.js or Webflow, fast on phones and ready for search engines." },
      { title: "Motion & interaction", text: "Scroll effects and small animations that make the site feel alive, never slow." },
    ],
    process: [
      { title: "Discover", duration: "Week 1", text: "Goals, audience and content. We map the pages and what each one needs to do." },
      { title: "Wireframe", duration: "Week 2", text: "Simple layouts to agree on structure and content before any visual design." },
      { title: "Design", duration: "Week 3–5", text: "Full visual design for desktop and mobile, with two rounds of feedback." },
      { title: "Build & launch", duration: "Week 5–8", text: "Development, testing on real devices, then launch on your domain." },
    ],
    deliverables: [
      "Sitemap & wireframes",
      "Desktop & mobile design (Figma)",
      "Live website on your domain",
      "CMS for editing content",
      "Basic SEO setup",
      "Handover session & how-to guide",
    ],
    relatedCategory: "web",
    faqs: [
      { q: "Can we update the site ourselves?", a: "Yes. We set up a CMS so you can change text, images and posts without a developer." },
      { q: "Do you write the copy?", a: "We can help shape and edit it. If you need full copywriting, we plan it into the project." },
      { q: "What happens after launch?", a: "We fix any bugs for 30 days, and you can keep us on for ongoing updates if you like." },
    ],
  },

  "mobile-apps": {
    overview:
      "We design product interfaces that stay out of the way and let people get things done. Clear flows, calm screens and a design system your developers can build from.",
    timeline: "6–12 weeks",
    bestFor: "New apps, MVPs, product redesigns",
    capabilities: [
      { title: "UX research", text: "Interviews and testing to find out what users really need before we design." },
      { title: "User flows", text: "The paths people take through your app, simplified so nothing feels like work." },
      { title: "UI design", text: "Every screen for iOS and Android, designed for real content and real thumbs." },
      { title: "Prototyping", text: "Clickable prototypes to test ideas and show investors before writing code." },
      { title: "Design systems", text: "Reusable components and rules so the product stays consistent as it grows." },
      { title: "Developer handoff", text: "Specs, assets and support while your team builds, so the app matches the design." },
    ],
    process: [
      { title: "Research", duration: "Week 1–2", text: "Talk to users, review the current product and agree on the main problems to solve." },
      { title: "Flows & wireframes", duration: "Week 2–4", text: "Map key journeys and sketch screens to test the structure early." },
      { title: "UI & prototype", duration: "Week 4–8", text: "High-fidelity screens and a prototype, tested with real users." },
      { title: "System & handoff", duration: "Week 8–10", text: "Component library, specs and close work with your developers." },
    ],
    deliverables: [
      "User flows & wireframes",
      "UI design for all key screens",
      "Clickable prototype",
      "Design system / component library",
      "Developer specs & assets",
      "Usability test notes",
    ],
    relatedCategory: "mobile",
    faqs: [
      { q: "Do you build the app too?", a: "We focus on design and work closely with your developers. We can also recommend partners for development." },
      { q: "Can you work on an app that already exists?", a: "Yes. Many projects start with an audit of the current app, then we improve it step by step." },
      { q: "iOS, Android or both?", a: "Both. We design with each platform's patterns in mind, from one shared system." },
    ],
  },

  motion: {
    overview:
      "We add movement that gives your brand and product a bit of personality. Logos that come alive, interfaces that respond and launch videos people actually watch.",
    timeline: "2–6 weeks",
    bestFor: "Launches, product demos, brand refreshes",
    capabilities: [
      { title: "Logo animation", text: "A short, memorable animation for your logo, for videos, apps and social." },
      { title: "UI micro-interactions", text: "Small animations for buttons, loading and feedback that make the product feel polished." },
      { title: "Launch videos", text: "Short product videos that explain what you do in under a minute." },
      { title: "Social content", text: "Animated posts and stories that match your brand." },
      { title: "Motion guidelines", text: "Rules for timing and easing, so every animation feels like the same brand." },
      { title: "Lottie & web-ready files", text: "Lightweight files your developers can drop straight into the app or site." },
    ],
    process: [
      { title: "Brief", duration: "Week 1", text: "What the motion needs to say, where it will live and how long it should be." },
      { title: "Storyboard", duration: "Week 1–2", text: "Key frames and timing, agreed before we animate." },
      { title: "Animate", duration: "Week 2–4", text: "Full animation with sound if needed, with two rounds of feedback." },
      { title: "Export", duration: "Final week", text: "Files in every format you need, optimised for web, app and social." },
    ],
    deliverables: [
      "Storyboard",
      "Final animations (MP4, MOV)",
      "Lottie / web-ready files",
      "Social media cut-downs",
      "Motion guidelines",
      "Source project files",
    ],
    faqs: [
      { q: "Do you need a finished brand first?", a: "It helps, but we can also create motion as part of a branding project." },
      { q: "Can animations be used in our app?", a: "Yes. We export lightweight Lottie files that developers can add easily." },
      { q: "Do you add music and voiceover?", a: "We can add licensed music and sound effects, and work with a voiceover artist if needed." },
    ],
  },
};
