"use client";

import { useEffect, useRef, type ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacity kata yang belum "terbaca" */
  dimOpacity?: number;
};

/**
 * Teks yang berubah dari abu-abu ke putih kata per kata
 * mengikuti posisi scroll.
 */
export default function ScrollRevealText({
  text,
  as: Tag = "p",
  className,
  dimOpacity = 0.2,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      // Mulai saat teks di 85% tinggi layar, selesai saat di 35%
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = Math.min(Math.max((start - top) / (start - end), 0), 1);
      const lit = progress * spans.length;

      spans.forEach((span, i) => {
        // Tiap kata memudar masuk secara halus, bukan langsung loncat
        const t = Math.min(Math.max(lit - i, 0), 1);
        span.style.opacity = String(dimOpacity + (1 - dimOpacity) * t);
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dimOpacity, text]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word style={{ opacity: dimOpacity, transition: "opacity 0.15s linear" }}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
