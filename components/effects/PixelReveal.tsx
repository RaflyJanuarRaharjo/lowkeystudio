"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import useInView from "@/hooks/useInView";
import styles from "./effects.module.css";

type Props = {
  children: ReactNode;
  /** Warna kotak penutup — samakan dengan background di sekitar gambar */
  color?: string;
  /** Ukuran tiap kotak pixel (px) */
  tileSize?: number;
  /** Lama animasi (ms) */
  duration?: number;
  /** Jeda sebelum mulai (ms) */
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Gambar muncul lewat kotak-kotak pixel yang hilang dari atas ke bawah
 * (sedikit acak) saat elemen masuk ke layar.
 */
export default function PixelReveal({
  children,
  color = "#0a0a0a",
  tileSize = 32,
  duration = 700,
  delay = 0,
  className = "",
  style,
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tilesRef = useRef<{ order: number[]; cols: number; size: number } | null>(null);

  // 1. Tutup gambar dengan grid kotak penuh
  useEffect(() => {
    const wrapper = ref.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    canvas.style.background = "transparent";

    const cols = Math.ceil(width / tileSize);
    const rows = Math.ceil(height / tileSize);
    // Urutan: menyapu dari atas ke bawah, dengan sedikit acak per baris
    const order = Array.from({ length: cols * rows }, (_, i) => i)
      .map((i) => ({ i, key: Math.floor(i / cols) + Math.random() * 2.5 }))
      .sort((a, b) => a.key - b.key)
      .map((t) => t.i);
    tilesRef.current = { order, cols, size: tileSize };
  }, [ref, color, tileSize]);

  // 2. Saat terlihat, hapus kotak satu per satu secara acak
  useEffect(() => {
    const canvas = canvasRef.current;
    const tiles = tilesRef.current;
    if (!inView || !canvas || !tiles) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let cleared = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const target = Math.floor(progress * tiles.order.length);

      for (; cleared < target; cleared++) {
        const index = tiles.order[cleared];
        const x = (index % tiles.cols) * tiles.size;
        const y = Math.floor(index / tiles.cols) * tiles.size;
        ctx.clearRect(x, y, tiles.size, tiles.size);
      }

      if (progress < 1) raf = requestAnimationFrame(step);
      else canvas.style.display = "none";
    };

    const timer = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, duration, delay]);

  return (
    <div ref={ref} className={`${styles.pixelWrap} ${className}`} style={style}>
      {children}
      <canvas
        ref={canvasRef}
        className={styles.pixelCanvas}
        style={{ background: color }}
        aria-hidden="true"
      />
    </div>
  );
}
