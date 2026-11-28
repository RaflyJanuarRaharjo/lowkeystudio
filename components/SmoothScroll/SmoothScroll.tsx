"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Smooth scroll global (Lenis) — bikin animasi scroll terasa halus. */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    lenisRef.current = lenis;
    // Dipakai Intro & menu mobile untuk menahan scroll
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Tahan scroll hanya kalau intro akan tampil (intro cuma ada di homepage)
    if (window.location.pathname === "/" && !window.__lowkeyIntroDone) {
      lenis.stop();
      window.addEventListener("lowkey:intro-done", () => lenis.start(), { once: true });
    }
    return () => lenis.destroy();
  }, []);

  // Pindah halaman: ke #section kalau ada hash (mis. "/#portfolio"), kalau tidak ke paling atas
  useEffect(() => {
    const hash = window.location.hash;
    const lenis = lenisRef.current;
    // Tunggu halaman baru selesai dirender (diulang sekali setelah gambar mulai termuat)
    const go = () => {
      const target = hash ? document.querySelector<HTMLElement>(hash) : null;
      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
        else target.scrollIntoView();
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      }
    };
    const timers = [50, 400].map((ms) => window.setTimeout(go, ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [pathname]);

  return null;
}
