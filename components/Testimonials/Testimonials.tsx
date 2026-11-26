"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASSETS, CONVERSATIONS, PEOPLE, SECTION_HEADERS } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Avatar from "./Avatar";
import ChatMessage from "./ChatMessage";
import styles from "./Testimonials.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Testimoni bergaya chat. Tombol panah (atau ← → di keyboard) berganti percakapan. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const count = CONVERSATIONS.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count]
  );

  // Tombol ← → di keyboard saat section ini terlihat di layar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, [contenteditable]")) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      go(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const convo = CONVERSATIONS[index];
  const client = PEOPLE[convo.client];

  return (
    <section ref={sectionRef} id="testimonial" className={styles.section}>
      <SectionHeader {...SECTION_HEADERS.testimonials} className="container" />

      <div className={styles.testimonials}>
        {/* Header percakapan: klien + nomor */}
        <div className={styles.convoHead}>
          <div key={`client-${index}`} className={styles.convoClient}>
            <Avatar person={client} size={40} />
            <div>
              <p className={styles.convoName}>{client.name}</p>
              <p className={styles.convoMeta}>
                {client.company} · {convo.project}
              </p>
            </div>
          </div>
          {/* Nomor + tombol ganti percakapan */}
          <div className={styles.controls}>
            <span className={styles.counter} aria-live="polite">
              {pad(index + 1)} / {pad(count)}
            </span>
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.prev}`}
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
            >
              <img src={ASSETS.arrow} alt="" width={16} height={16} />
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              aria-label="Next testimonial"
              onClick={() => go(1)}
            >
              <img src={ASSETS.arrow} alt="" width={16} height={16} />
            </button>
          </div>
        </div>

        {/* key = index → isi chat dibuat ulang & animasi mengetik diputar lagi */}
        <div key={index} className={styles.chat}>
          {convo.messages.map((item, i) => (
            <ChatMessage
              key={i}
              index={i}
              item={item}
              person={PEOPLE[item.from]}
              side={PEOPLE[item.from].company === "Lowkey Studio" ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
