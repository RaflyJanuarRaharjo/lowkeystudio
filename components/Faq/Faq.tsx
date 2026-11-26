"use client";

import { useState } from "react";
import { FAQS, SECTION_HEADERS } from "@/data/content";
import { FadeIn } from "@/components/effects";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./Faq.module.css";

export default function Faq() {
  // Satu pertanyaan terbuka dalam satu waktu (default: yang pertama)
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={`container ${styles.faq}`}>
      <SectionHeader {...SECTION_HEADERS.faq} />

      <ul className={styles.list}>
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <FadeIn
              as="li"
              key={item.question}
              delay={i * 80}
              className={`${styles.item} ${isOpen ? styles.open : ""}`}
            >
              <button
                type="button"
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>

              {/* Animasi buka-tutup pakai grid-template-rows 0fr -> 1fr */}
              <div id={`faq-${i}`} className={styles.answerWrap} role="region">
                <div className={styles.answerInner}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </ul>
    </section>
  );
}
