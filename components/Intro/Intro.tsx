"use client";

import { useEffect, useRef, useState } from "react";
import { INTRO_DONE_EVENT } from "@/hooks/useIntroDone";
import styles from "./Intro.module.css";

/**
 * Animasi pembuka (terinspirasi locomotive.ca):
 * 1. Layar hitam, teks muncul dari huruf acak lalu "terurai" jadi teks asli.
 * 2. Layar hitam hilang lewat efek pixel acak, memperlihatkan halaman.
 * Setelah selesai, event "lowkey:intro-done" dikirim supaya animasi hero mulai.
 */

// ---- Teks intro (ubah sesukamu) ----
const LEFT_LINES = ["Lowkey Studio", "Thoughtful design.", "Meaningful impact."];
const RIGHT_LINES = ["Based in Indonesia", "Working worldwide", "©2026"];

// ---- Timing (ms) ----
const DECODE_DURATION = 1300; // lama teks terurai
const LINE_STAGGER = 120; // jeda antar baris
const HOLD = 400; // diam sebentar setelah teks selesai
const DISSOLVE_DURATION = 700; // lama efek pixel menghilang
const TILE_SIZE = 48; // ukuran kotak pixel (px)

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&/\\<>?![]{}";
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

/** Teks acak yang terurai dari kiri ke kanan. progress 0..1 */
function scrambleAt(text: string, progress: number) {
  const revealed = Math.floor(progress * text.length);
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === " " || i < revealed) out += ch;
    else out += randomChar();
  }
  return out;
}

const markDone = () => {
  window.__lowkeyIntroDone = true;
  document.documentElement.style.overflow = "";
  window.dispatchEvent(new Event(INTRO_DONE_EVENT));
};

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [dissolving, setDissolving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Lewati intro kalau sudah pernah tampil (mis. kembali dari halaman study case)
    // atau user memilih reduced motion
    if (window.__lowkeyIntroDone || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      markDone();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const lines = [...LEFT_LINES, ...RIGHT_LINES];
    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;
    const start = performance.now();
    let lastTick = 0;

    // 1. Decode teks
    const decode = (now: number) => {
      if (now - lastTick > 45) {
        lastTick = now;
        lines.forEach((text, i) => {
          const el = lineRefs.current[i];
          if (!el) return;
          const local = (now - start - i * LINE_STAGGER) / DECODE_DURATION;
          const p = Math.min(Math.max(local, 0), 1);
          el.textContent = local < 0 ? "" : scrambleAt(text, p);
        });
      }
      const total = DECODE_DURATION + LINE_STAGGER * (lines.length - 1);
      if (now - start < total) raf = requestAnimationFrame(decode);
      else lines.forEach((text, i) => lineRefs.current[i] && (lineRefs.current[i]!.textContent = text));
    };
    raf = requestAnimationFrame(decode);

    // 2. Pixel dissolve
    const dissolveAt = DECODE_DURATION + LINE_STAGGER * (lines.length - 1) + HOLD;
    timers.push(
      setTimeout(() => {
        setDissolving(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const w = window.innerWidth;
        const h = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, w, h);

        const cols = Math.ceil(w / TILE_SIZE);
        const rows = Math.ceil(h / TILE_SIZE);
        const order = Array.from({ length: cols * rows }, (_, i) => i);
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [order[i], order[j]] = [order[j], order[i]];
        }

        // Halaman siap di bawah: mulai animasi hero sedikit sebelum pixel selesai
        timers.push(setTimeout(markDone, DISSOLVE_DURATION * 0.5));

        let cleared = 0;
        const dStart = performance.now();
        const dissolve = (now: number) => {
          const p = Math.min((now - dStart) / DISSOLVE_DURATION, 1);
          const target = Math.floor(p * order.length);
          for (; cleared < target; cleared++) {
            const idx = order[cleared];
            ctx.clearRect((idx % cols) * TILE_SIZE, Math.floor(idx / cols) * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          }
          if (p < 1) raf = requestAnimationFrame(dissolve);
          else setVisible(false);
        };
        raf = requestAnimationFrame(dissolve);
      }, dissolveAt)
    );

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  let index = 0;
  const renderLines = (lines: string[]) =>
    lines.map((text) => {
      const i = index++;
      return (
        <span
          key={text}
          ref={(el) => {
            lineRefs.current[i] = el;
          }}
          className={styles.line}
        />
      );
    });

  return (
    <div className={`${styles.intro} ${dissolving ? styles.dissolving : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.text}>
        <div className={styles.left}>{renderLines(LEFT_LINES)}</div>
        <div className={styles.right}>{renderLines(RIGHT_LINES)}</div>
      </div>
    </div>
  );
}
