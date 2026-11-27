"use client";

import { useEffect, useState } from "react";
import { ASSETS, type ChatItem, type Person } from "@/data/content";
import useInView from "@/hooks/useInView";
import Avatar from "./Avatar";
import styles from "./Testimonials.module.css";

// Pisahkan emoji dari teks supaya bisa diberi font emoji Apple (iOS)
const EMOJI = /(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)/gu;
function withEmoji(text: string) {
  return text.split(EMOJI).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={styles.emoji}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

const TYPING_DURATION = 900; // ms
const STAGGER = 600; // jeda antar pesan

type State = "hidden" | "typing" | "message";
type Props = { item: ChatItem; person: Person; side: "left" | "right"; index?: number };

/**
 * Satu pesan chat. Saat terlihat: muncul "mengetik..." dulu, lalu isi pesan
 * (teks, file, atau review bintang 5).
 */
export default function ChatMessage({ item, person, side, index = 0 }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  const [state, setState] = useState<State>("hidden");

  useEffect(() => {
    if (!inView) return;

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

  const content = () => {
    if (item.kind === "file") {
      return (
        <div className={styles.file}>
          <span className={styles.fileIcon} aria-hidden="true" />
          <div>
            <p className={styles.fileName}>{item.fileName}</p>
            <p className={styles.fileMeta}>{item.fileMeta}</p>
          </div>
        </div>
      );
    }
    if (item.kind === "review") {
      return (
        <div className={styles.review}>
          <p className={styles.reviewHead}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.reviewLabel}>Review</span>
          </p>
          <p className={styles.text}>{withEmoji(item.text)}</p>
        </div>
      );
    }
    return <p className={styles.text}>{withEmoji(item.text)}</p>;
  };

  return (
    <div
      ref={ref}
      className={`${styles.message} ${isRight ? styles.right : styles.left} ${
        state === "hidden" ? styles.hidden : ""
      }`}
    >
      <p className={styles.label}>
        <span className={styles.labelName}>{person.name}</span>
        <span className={styles.labelCompany}>{person.company}</span>
      </p>

      <div className={styles.row}>
        <Avatar person={person} size={40} />

        <div className={`${styles.bubble} ${item.kind === "review" ? styles.bubbleReview : ""}`}>
          {state === "typing" ? (
            <span className={styles.typing} aria-label="typing">
              <i />
              <i />
              <i />
            </span>
          ) : (
            content()
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
