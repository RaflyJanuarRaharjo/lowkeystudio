"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_HEADERS, SERVICES } from "@/data/content";
import { FadeIn } from "@/components/effects";
import SectionHeader from "@/components/ui/SectionHeader";
import styles from "./Services.module.css";

const PREVIEW_W = 280;
const PREVIEW_H = 200;
const FOLLOW_EASE = 0.15; // makin kecil, makin "ngambang" preview-nya

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  // Preview gambar mengikuti kursor dengan gerakan halus (lerp)
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * FOLLOW_EASE;
      c.y += (t.y - c.y) * FOLLOW_EASE;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${c.x - PREVIEW_W / 2}px, ${c.y - PREVIEW_H / 2}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onMouseEnterList = (e: React.MouseEvent) => {
    // Mulai dari posisi kursor supaya preview tidak "terbang" dari pojok
    onMouseMove(e);
    current.current = { ...target.current };
  };

  return (
    <section id="services" className={`container ${styles.services}`}>
      <SectionHeader {...SECTION_HEADERS.services} />

      <ul
        ref={listRef}
        className={styles.list}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnterList}
        onMouseLeave={() => setActive(null)}
      >
        {SERVICES.map((service, i) => (
          <FadeIn
            as="li"
            key={service.title}
            delay={i * 100}
            className={`${styles.item} ${active === i ? styles.itemActive : ""} ${
              active !== null && active !== i ? styles.itemDim : ""
            }`}
          >
            <div className={styles.row} onMouseEnter={() => setActive(i)}>
              <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>

              <div className={styles.body}>
                <h3 className={styles.name}>{service.title}</h3>
                <p className={styles.summary}>{service.summary}</p>
              </div>

              <ul className={styles.tags}>
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </div>
          </FadeIn>
        ))}

        {/* Preview gambar yang mengikuti kursor */}
        <div
          ref={previewRef}
          className={`${styles.preview} ${active !== null ? styles.previewVisible : ""}`}
          aria-hidden="true"
        >
          {SERVICES.map((service, i) => (
            <img
              key={service.title}
              src={service.image}
              alt=""
              className={`${styles.previewImg} ${active === i ? styles.previewImgActive : ""}`}
            />
          ))}
        </div>
      </ul>
    </section>
  );
}
