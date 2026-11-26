"use client";

import { useEffect, useState, type ElementType } from "react";
import useInView from "@/hooks/useInView";
import styles from "./effects.module.css";

// Karakter minimal supaya glitch terasa halus, bukan berisik
const CHARS = "abcdefghijklmnopqrstuvwxyz_/.";
const GLITCH_WIDTH = 4; // jumlah huruf acak di ujung teks yang sedang muncul

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  delay?: number;
};

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/**
 * Teks muncul dari kiri ke kanan dengan beberapa huruf acak samar di ujungnya.
 * Sisa teks yang belum muncul tetap memakan tempat (tidak ada layout shift).
 */
export default function ScrambleText({
  text,
  as: Tag = "span",
  className,
  duration = 900,
  delay = 0,
}: Props) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const [revealed, setRevealed] = useState(text.length);
  const [glitch, setGlitch] = useState("");

  // Sembunyikan teks sejak awal (sebelum terlihat)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRevealed(0);
  }, [text]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(text.length);
      return;
    }

    let raf = 0;
    let start = 0;
    let lastTick = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);

      if (now - lastTick > 50 || progress === 1) {
        lastTick = now;
        const count = Math.floor(progress * text.length);
        const tail = text
          .slice(count, count + GLITCH_WIDTH)
          .replace(/\S/g, () => randomChar());
        setRevealed(count);
        setGlitch(progress === 1 ? "" : tail);
      }

      if (progress < 1) raf = requestAnimationFrame(step);
    };

    const timer = setTimeout(() => (raf = requestAnimationFrame(step)), delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, text, duration, delay]);

  const done = text.slice(0, revealed);
  const hidden = text.slice(revealed + glitch.length);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {done}
        {glitch && <span className={styles.glitch}>{glitch}</span>}
        <span className={styles.invisible}>{hidden}</span>
      </span>
    </Tag>
  );
}
