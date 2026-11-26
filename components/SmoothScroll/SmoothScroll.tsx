"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/** Smooth scroll global (Lenis) — bikin animasi scroll terasa halus. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    // Dipakai Intro untuk menahan scroll selama animasi pembuka
    (window as unknown as { lenis?: Lenis }).lenis = lenis;
    if (!window.__lowkeyIntroDone) lenis.stop();
    window.addEventListener("lowkey:intro-done", () => lenis.start(), { once: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
