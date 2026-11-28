"use client";

import { useEffect, useRef } from "react";
import styles from "./CaseStudy.module.css";

/** Garis tipis di atas layar yang memanjang sesuai progres membaca. */
export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div ref={barRef} className={styles.progress} aria-hidden="true" />;
}
