"use client";

import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";

/** Teks besar yang ukurannya otomatis disesuaikan supaya pas selebar wadahnya. */
export default function Wordmark({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const el = textRef.current;
      if (!wrap || !el) return;
      el.style.fontSize = "100px";
      const ratio = wrap.clientWidth / el.getBoundingClientRect().width;
      el.style.fontSize = `${100 * ratio}px`;
    };

    fit();
    document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={wrapRef} className={styles.wordmarkWrap}>
      <span ref={textRef} className={styles.wordmark} aria-label="Lowkey Studio">
        {text}
      </span>
    </div>
  );
}
