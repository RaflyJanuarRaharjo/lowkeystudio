"use client";

import { useEffect, useState } from "react";
import { ASSETS, type Message } from "@/data/content";
import useInView from "@/hooks/useInView";
import styles from "./Testimonials.module.css";

const TYPING_DURATION = 900; // ms
const STAGGER = 500; // jeda antar pesan

type State = "hidden" | "typing" | "message";
type Props = Message & { index?: number };

/**
 * Testimonial bergaya chat.
 * Sesuai catatan komponen di Figma: tampil "Typing" saat masuk viewport,
 * lalu berganti ke "Message". Side kiri/kanan bergantian.
 */
export default function ChatMessage({ side, name, company, initial, color, text, index = 0 }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [state, setState] = useState<State>("hidden");

  useEffect(() => {
    if (!inView) return;

    // Hormati setting reduced motion: langsung tampilkan pesan
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("message");
      return;
    }

    const start = setTimeout(() => setState("typing"), index * STAGGER);
    const done = setTimeout(() => setState("message"), index * STAGGER + TYPING_DURATION);
    return () => {
      clearTimeout(start);
      clearTimeout(done);
    };
  }, [inView, index]);

  const isRight = side === "right";

  return (
    <div
      ref={ref}
      className={`${styles.message} ${isRight ? styles.right : styles.left} ${
        state === "hidden" ? styles.hidden : ""
      }`}
    >
      <p className={styles.label}>
        <span className={styles.labelName}>{name}</span>
        <span className={styles.labelCompany}>{company}</span>
      </p>

      <div className={styles.row}>
        <span className={styles.avatar} style={{ background: color }} aria-hidden="true">
          {initial}
        </span>

        <div className={styles.bubble}>
          {state === "typing" ? (
            <span className={styles.typing} aria-label="typing">
              <i />
              <i />
              <i />
            </span>
          ) : (
            <p className={styles.text}>{text}</p>
          )}
          <img
            src={isRight ? ASSETS.tailRight : ASSETS.tailLeft}
            alt=""
            width={16}
            height={18}
            className={styles.tail}
          />
        </div>
      </div>
    </div>
  );
}
