"use client";

import useInView from "@/hooks/useInView";
import styles from "./PixelHeart.module.css";

// Bentuk hati 9x8 pixel (X = pixel terisi)
const SHAPE = [
  ".XX...XX.",
  "XXXX.XXXX",
  "XXXXXXXXX",
  "XXXXXXXXX",
  ".XXXXXXX.",
  "..XXXXX..",
  "...XXX...",
  "....X....",
];

// Pixel highlight (sedikit lebih terang) di pojok kiri atas
const HIGHLIGHT = new Set(["1-1", "2-1", "1-2"]);

// Jeda antar pixel saat muncul (ms)
const PIXEL_STAGGER = 18;

type Pixel = { x: number; y: number; order: number; light: boolean };

// Urutan acak tapi tetap sama di server & client (hindari hydration mismatch)
function buildPixels(seed: number): Pixel[] {
  const pixels: Omit<Pixel, "order">[] = [];
  SHAPE.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === "X") pixels.push({ x, y, light: HIGHLIGHT.has(`${x}-${y}`) });
    })
  );
  const ranked = pixels
    .map((p, i) => ({ p, r: Math.sin((i + 1) * 12.9898 * seed) * 43758.5453 }))
    .map(({ p, r }) => ({ p, r: r - Math.floor(r) }))
    .sort((a, b) => a.r - b.r);
  return ranked.map(({ p }, order) => ({ ...p, order }));
}

type Props = {
  /** Ukuran 1 pixel dalam px */
  pixel?: number;
  /** Delay sebelum mulai muncul (ms) */
  delay?: number;
  /** Seed urutan pixel */
  seed?: number;
  /** Isi abu-abu (outline feel) alih-alih putih */
  dim?: boolean;
  className?: string;
};

/** Hati pixel yang muncul satu per satu saat masuk layar, lalu melayang pelan. */
export default function PixelHeart({ pixel = 10, delay = 0, seed = 1, dim = false, className = "" }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const pixels = buildPixels(seed);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`${styles.heart} ${inView ? styles.on : ""} ${dim ? styles.dim : ""} ${className}`}
      style={{ "--px": `${pixel}px`, "--float-delay": `${delay + pixels.length * PIXEL_STAGGER}ms` } as React.CSSProperties}
    >
      <div className={styles.grid}>
        {pixels.map((p) => (
          <span
            key={`${p.x}-${p.y}`}
            className={`${styles.pixel} ${p.light ? styles.light : ""}`}
            style={{
              gridColumn: p.x + 1,
              gridRow: p.y + 1,
              transitionDelay: `${delay + p.order * PIXEL_STAGGER}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
