/* ---------- Detail study case (/work/<slug>) ----------
 * Key = `slug` di PROJECTS (data/content.ts).
 * Judul, tag, tahun, gambar & tagline diambil dari PROJECTS, di sini cuma isi tambahan.
 *
 * TODO: isi dengan data asli tiap project:
 * - `gallery`: gambar tambahan project. Kosong = bagian galeri tidak tampil.
 *    Contoh: { src: "/assets/kala-1.png", alt: "Kala Living homepage", span: "full" }
 * - `results`: angka hasil project (contoh: { value: "+32%", label: "Conversion rate" }).
 *    Sengaja dikosongkan — isi hanya dengan angka asli.
 */

export type CaseImage = {
  src?: string; // kosong = pakai gambar cover project
  alt: string;
  /** "full" = selebar konten, "half" = setengah */
  span: "full" | "half";
  /** Posisi crop gambar (CSS object-position), mis. "20% 40%" */
  focus?: string;
  /** Zoom gambar, 1 = normal */
  zoom?: number;
};

export type CaseStudy = {
  client: string;
  services: string[];
  timeline: string;
  overview: string;
  challenge: string;
  approach: string;
  process: { title: string; text: string }[];
  deliverables: string[];
  results: { value: string; label: string }[];
  gallery: CaseImage[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "kala-living": {
    client: "Kala Living",
    services: ["Web design", "Art direction", "Development"],
    timeline: "10 weeks",
    overview:
      "Kala Living sells handmade furniture from small workshops across Java. They needed an online store that feels as calm and considered as the pieces they make.",
    challenge:
      "The old site looked like every other furniture marketplace. Product photos were crowded together, and the stories behind each maker were buried three pages deep.",
    approach:
      "We designed the site like a quiet showroom. Every product gets space, a slow scroll and a short story about the workshop that made it. Navigation stays out of the way until you need it.",
    process: [
      { title: "Discover", text: "Workshop visits, interviews with the team and a review of how customers actually shop." },
      { title: "Design", text: "A spacious layout system, soft type and product pages built around the maker's story." },
      { title: "Build", text: "A fast storefront with smooth transitions and images that load without the wait." },
    ],
    deliverables: ["Website design", "Design system", "Product photography direction", "Storefront build"],
    results: [],
    gallery: [],
  },

  "aurora-rebrand": {
    client: "Aurora Labs",
    services: ["Brand identity", "Logo design", "Guidelines"],
    timeline: "8 weeks",
    overview:
      "Aurora had outgrown its first logo. The team wanted an identity that felt more grown up without losing the playful spirit that got them their first customers.",
    challenge:
      "The old mark broke down at small sizes and looked different on every surface, from app icons to packaging.",
    approach:
      "We built the identity around a single pixel. It works as a tiny app icon, a pattern on packaging and a bold mark on signage, so the brand feels the same everywhere.",
    process: [
      { title: "Discover", text: "Brand workshops with the founders and an audit of every place the logo lived." },
      { title: "Explore", text: "Three directions, narrowed down together over two review rounds." },
      { title: "Refine", text: "Final mark, colour, type and a guideline book the team can actually use." },
    ],
    deliverables: ["Logo & pixel mark", "Colour & type system", "Brand guidelines", "Packaging templates"],
    results: [],
    gallery: [],
  },

  "fintra-dashboard": {
    client: "Fintra",
    services: ["Product design", "UX research", "Design system"],
    timeline: "12 weeks",
    overview:
      "Fintra helps funded startups manage their runway. Founders open the dashboard every week, but most of them only needed three numbers from it.",
    challenge:
      "The dashboard showed everything at once. Important numbers like cash, burn and forecast were lost between dozens of charts.",
    approach:
      "We rebuilt the dashboard around the questions founders actually ask. The key numbers sit at the top, and details open only when you want to dig deeper.",
    process: [
      { title: "Research", text: "Interviews with founders and finance leads to learn what they check first." },
      { title: "Prototype", text: "Clickable prototypes tested weekly with real users." },
      { title: "Systemise", text: "A component library so the product team can keep building on their own." },
    ],
    deliverables: ["Dashboard redesign", "Interactive prototype", "Component library", "Handoff docs"],
    results: [],
    gallery: [],
  },

  "ritme-music-app": {
    client: "Ritme",
    services: ["Mobile app design", "Interaction design"],
    timeline: "9 weeks",
    overview:
      "Ritme builds playlists around your daily rhythm, from a morning run to a late night commute. The app had to work while people are on the move.",
    challenge:
      "Small buttons and busy screens made the app hard to use while walking, running or cycling.",
    approach:
      "We designed big, simple controls and screens that show only what matters right now. Gestures replace tiny buttons, so you can skip a song without looking.",
    process: [
      { title: "Observe", text: "We watched people use music apps on the go and noted every moment they struggled." },
      { title: "Design", text: "Large touch targets, gesture controls and a calm dark interface." },
      { title: "Test", text: "Real-world tests on runs and commutes before final polish." },
    ],
    deliverables: ["iOS & Android app design", "Motion specs", "Prototype", "Design system"],
    results: [],
    gallery: [],
  },

  "sora-skincare": {
    client: "Sora",
    services: ["E-commerce design", "Copywriting", "Development"],
    timeline: "10 weeks",
    overview:
      "Sora makes skincare for sensitive skin. Their customers read every label carefully, so the store needed to explain things clearly and gently.",
    challenge:
      "Ingredient lists were long and technical, and customers kept asking the same questions through chat before buying.",
    approach:
      "We wrote every ingredient in plain language and built simple routine guides. Customers can see what each product does and how to use it in one place.",
    process: [
      { title: "Listen", text: "We read hundreds of customer chats to find the questions people kept asking." },
      { title: "Write & design", text: "Plain-language ingredient pages and step-by-step routine builders." },
      { title: "Build", text: "A light, fast store that works well on phones, where most customers shop." },
    ],
    deliverables: ["Store design", "Ingredient glossary", "Routine builder", "Storefront build"],
    results: [],
    gallery: [],
  },

  "nomad-coffee": {
    client: "Nomad Coffee",
    services: ["Packaging design", "Illustration", "Brand refresh"],
    timeline: "6 weeks",
    overview:
      "Nomad roasts small batches for people who travel. Each bag comes from a different origin, and they wanted the packaging to tell that story.",
    challenge:
      "On crowded shelves the old bags blended in, and the origin stories never made it onto the packaging.",
    approach:
      "We designed a bold front that is easy to spot from across the store, and a back that reads like a travel note from each origin.",
    process: [
      { title: "Explore", text: "Shelf studies in cafés and stores to see what stands out." },
      { title: "Design", text: "A flexible packaging system with one illustration per origin." },
      { title: "Produce", text: "Print-ready files and close work with the printer on colour." },
    ],
    deliverables: ["Packaging system", "Origin illustrations", "Print production files"],
    results: [],
    gallery: [],
  },
};
