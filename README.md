# Lowkey Studio — Next.js

Next.js 15 (App Router) + TypeScript + CSS Modules, dari frame Figma **Lowkey**.

## Jalankan (CMD)

```cmd
download-assets.cmd
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur

```
app/
  layout.tsx        # font + globals.css
  page.tsx          # urutan section
  globals.css       # design tokens + reset
components/         # tiap section: Nama.tsx + Nama.module.css + index.ts
  Navbar/ Hero/ Showcase/ Team/ Mission/ Projects/ Testimonials/ ui/Pill
data/content.ts     # semua teks, project, testimonial, path aset
hooks/useInView.ts  # trigger animasi chat saat di-scroll
public/assets/      # diisi oleh download-assets.cmd
```

Edit konten cukup di `data/content.ts`.
