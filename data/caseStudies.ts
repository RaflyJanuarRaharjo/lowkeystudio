/* ---------- Detail study case (/work/<slug>) ----------
 * Key = `slug` di PROJECTS (data/content.ts).
 * Judul, tag, tahun, gambar & tagline diambil dari PROJECTS, di sini cuma isi tambahan.
 *
 * TODO: isi dengan data asli tiap project (teks di bawah masih draft):
 * - `palette` & `typeface`: warna dan font asli brand/produk
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
  /** Target utama project */
  goals: string[];
  /** Solusi / fitur kunci yang dibuat */
  solution: { title: string; text: string }[];
  /** Sistem visual: palet warna & huruf */
  palette: { name: string; hex: string }[];
  typeface: { name: string; note: string };
  /** Key di PEOPLE — review klien diambil otomatis dari CONVERSATIONS (testimoni) */
  testimonial?: string;
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
    goals: [
      "Give every piece room to breathe, like a real showroom",
      "Put the makers' stories next to the products",
      "Make browsing on phones feel as calm as on desktop",
    ],
    solution: [
      { title: "Showroom product pages", text: "Large photos, generous spacing and one product at a time, so nothing competes for attention." },
      { title: "Maker stories", text: "Every product links to a short story about the workshop, with photos from the studio floor." },
      { title: "Room collections", text: "Pieces grouped by room and mood, so customers can picture them at home." },
      { title: "Calm checkout", text: "A short, three-step checkout with clear delivery times for each handmade piece." },
    ],
    palette: [
      { name: "Linen", hex: "#EFE9DF" },
      { name: "Teak", hex: "#8A5A3B" },
      { name: "Moss", hex: "#5E6B4E" },
      { name: "Charcoal", hex: "#1F1E1C" },
    ],
    typeface: { name: "Fraunces", note: "A soft serif for headlines, paired with a quiet sans for body text." },
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
    goals: [
      "One mark that works from 16px icons to large signage",
      "Keep the playful spirit of the original brand",
      "Give the team guidelines they can use without us",
    ],
    solution: [
      { title: "The pixel mark", text: "A single square pixel that becomes the logo, the app icon and the starting point of every pattern." },
      { title: "Flexible patterns", text: "The pixel repeats into patterns for packaging, slides and social posts." },
      { title: "Bright but calm colour", text: "One strong accent colour on a neutral base, so the brand stands out without shouting." },
      { title: "Practical guidelines", text: "A short guideline book with real examples and ready-made templates." },
    ],
    palette: [
      { name: "Aurora Violet", hex: "#7B5CFF" },
      { name: "Glow", hex: "#C9F26B" },
      { name: "Paper", hex: "#F4F2EE" },
      { name: "Night", hex: "#141221" },
    ],
    typeface: { name: "Space Grotesk", note: "A geometric sans with small quirks that echo the pixel mark." },
    testimonial: "maya",
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
    goals: [
      "Show cash, burn and runway at a glance",
      "Cut the time founders spend preparing investor updates",
      "Build a system the product team can grow on their own",
    ],
    solution: [
      { title: "Runway at the top", text: "The three numbers founders check first now sit at the top of every screen." },
      { title: "Forecast scenarios", text: "Founders can test hiring or spending plans and see how runway changes instantly." },
      { title: "Investor-ready views", text: "One click turns the dashboard into a clean summary ready to share." },
      { title: "Component library", text: "Charts, tables and cards built as reusable components with clear rules." },
    ],
    palette: [
      { name: "Ledger Blue", hex: "#2F5BFF" },
      { name: "Positive", hex: "#2BB673" },
      { name: "Alert", hex: "#F25F4C" },
      { name: "Ink", hex: "#0E1116" },
    ],
    typeface: { name: "Inter", note: "Clear numbers and tabular figures, so columns of data line up." },
    testimonial: "kev",
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
    goals: [
      "Make the app usable without looking at the screen",
      "Build playlists around the user's daily rhythm",
      "Keep the interface calm and out of the way",
    ],
    solution: [
      { title: "Gesture controls", text: "Swipe anywhere to skip, hold to pause. No need to aim for small buttons." },
      { title: "Rhythm modes", text: "Run, commute and focus modes that change tempo and layout automatically." },
      { title: "Glanceable now playing", text: "Big type and high contrast, readable in sunlight and on the move." },
    ],
    palette: [
      { name: "Pulse", hex: "#FF4D2E" },
      { name: "Beat", hex: "#FFC93C" },
      { name: "Stage", hex: "#1A1A1D" },
      { name: "White", hex: "#FAFAFA" },
    ],
    typeface: { name: "Manrope", note: "Rounded and bold at large sizes, easy to read at a glance." },
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
    goals: [
      "Explain every ingredient in plain language",
      "Help customers build a routine for their skin",
      "Answer common questions before they reach chat",
    ],
    solution: [
      { title: "Ingredient glossary", text: "Every ingredient explained in one sentence, with what it does and who it's for." },
      { title: "Routine builder", text: "A short quiz that suggests a simple morning and evening routine." },
      { title: "Gentle product pages", text: "Soft visuals, clear labels and usage steps right next to the add-to-cart button." },
    ],
    palette: [
      { name: "Petal", hex: "#F6DCD7" },
      { name: "Clay", hex: "#C98B7A" },
      { name: "Mist", hex: "#F7F5F2" },
      { name: "Deep", hex: "#2B2324" },
    ],
    typeface: { name: "DM Sans", note: "Friendly and easy to read, even in long ingredient lists." },
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
    goals: [
      "Stand out on crowded café and store shelves",
      "Tell the story of each origin on the bag",
      "Work on both white and kraft paper",
    ],
    solution: [
      { title: "Bold shelf front", text: "Large type and one strong colour per origin, readable from across the store." },
      { title: "Travel-note backs", text: "The back of every bag reads like a postcard from the farm it came from." },
      { title: "Kraft-ready system", text: "Colours and inks tested on kraft paper after the supplier switched." },
    ],
    palette: [
      { name: "Roast", hex: "#5A3825" },
      { name: "Kraft", hex: "#C8A27A" },
      { name: "Signal", hex: "#E5532D" },
      { name: "Cream", hex: "#F3EBDD" },
    ],
    typeface: { name: "Archivo", note: "A sturdy grotesk that holds up in print, from big fronts to tiny labels." },
    testimonial: "laila",
    deliverables: ["Packaging system", "Origin illustrations", "Print production files"],
    results: [],
    gallery: [],
  },
};
