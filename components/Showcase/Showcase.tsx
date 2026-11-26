"use client";

import { useEffect, useRef } from "react";
import styles from "./Showcase.module.css";

/**
 * Showcase video dengan efek "expand on scroll" (ala antinomy.studio):
 * 1. Video muncul kecil di tengah di bawah hero.
 * 2. Saat di-scroll, video membesar (clip-path) sampai full layar
 *    sambil section-nya ditahan (sticky).
 * 3. Setelah full, video ditahan sebentar, lalu halaman lanjut.
 *
 * Video asli: public/assets/showcase.mp4
 * Poster:     public/assets/showcase-poster.png
 */

// ---- Pengaturan animasi ----
const START_INSET_X = 0; // % sisi kiri & kanan yang dipotong di awal (0 = selalu full lebar)
const START_INSET_TOP = 4; // % sisi atas yang dipotong di awal (kecil = dekat ke teks hero)
const START_INSET_BOTTOM = 40; // % sisi bawah yang dipotong di awal
const START_RADIUS = 0; // px (0 karena video sudah full lebar)
const START_ZOOM = 1.25; // zoom isi video di awal (efek kedalaman)
const GROW_UNTIL = 0.8; // video selesai membesar setelah di-scroll 80% tinggi layar sejak menempel

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return;

    const apply = (p: number) => {
      const inv = 1 - p;
      frame.style.setProperty("--inset-x", `${START_INSET_X * inv}%`);
      frame.style.setProperty("--inset-top", `${START_INSET_TOP * inv}%`);
      frame.style.setProperty("--inset-bottom", `${START_INSET_BOTTOM * inv}%`);
      frame.style.setProperty("--radius", `${START_RADIUS * inv}px`);
      frame.style.setProperty("--zoom", String(1 + (START_ZOOM - 1) * inv));
    };

    // Reduced motion: langsung full tanpa animasi
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(1);
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;
      const vh = window.innerHeight;
      const top = section.getBoundingClientRect().top;
      // 0 saat section masuk dari bawah layar, 1 saat sudah menempel + GROW_UNTIL layar
      const progress = clamp((vh - top) / (vh + vh * GROW_UNTIL));
      apply(easeInOut(progress));
    };

    const onScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.showcase}>
      <div className={styles.sticky}>
        <div ref={frameRef} className={styles.frame}>
          <video
            className={styles.video}
            src="/assets/showcase.mp4"
            poster="/assets/showcase-poster.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Lowkey Studio process showcase"
          />
        </div>
      </div>
    </section>
  );
}
