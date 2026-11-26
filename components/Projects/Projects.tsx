"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/content";
import { FadeIn, PixelReveal } from "@/components/effects";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

/**
 * Portofolio — layout & interaksi mengikuti section "Our work" di koto.com:
 * - Grid 16 kolom. Kiri: info menempel (sticky), mulai di 30% tinggi layar.
 * - Kanan: gambar 16:9 tersusun ke bawah dan di-scroll biasa.
 * - Nama, deskripsi & info project berganti dengan fade di tempat,
 *   mengikuti gambar yang sedang di tengah layar.
 * - Hover gambar: label "View case" mengikuti kursor.
 * - Ditutup kartu "[ View all projects ]".
 */

export default function Projects() {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Project aktif = gambar yang paling dekat dengan tengah layar
  useEffect(() => {
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const center = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      if (best !== last) {
        last = best;
        setActive(best);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Label "View case" mengikuti kursor
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const state = (i: number) => (i === active ? styles.isActive : "");

  return (
    <div id="portfolio" className={styles.wrapper}>
      {/* ---------- Desktop ---------- */}
      <section className={styles.grid} aria-label="Our work">
        {/* Kiri: info menempel */}
        <aside className={styles.info}>
          <div className={styles.titles}>
            <h2 className={styles.heading}>Our work</h2>
            <div className={styles.stack} aria-live="polite">
              {PROJECTS.map((p, i) => (
                <h3 key={p.title} className={`${styles.name} ${state(i)}`}>
                  {p.title}
                </h3>
              ))}
            </div>
          </div>

          <div className={styles.details}>
            <div className={`${styles.stack} ${styles.stackBottom}`}>
              {PROJECTS.map((p, i) => (
                <p key={p.title} className={`${styles.summary} ${state(i)}`}>
                  {p.summary}
                </p>
              ))}
            </div>

            <div className={styles.stack}>
              {PROJECTS.map((p, i) => (
                <div key={p.title} className={`${styles.chip} ${state(i)}`}>
                  <img src={p.image} alt="" className={styles.chipThumb} />
                  <div>
                    <p className={styles.chipTitle}>{p.tagline}</p>
                    <p className={styles.chipMeta}>
                      {p.year}, {p.tag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Kanan: gambar */}
        <div className={styles.media}>
          {PROJECTS.map((p, i) => (
            <a
              key={p.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href="#portfolio"
              className={`${styles.item} ${i === active ? styles.itemCurrent : ""}`}
              onMouseMove={onMove}
              aria-label={`View case: ${p.title}`}
            >
              <PixelReveal color="#0a0a0a" className={styles.itemInner}>
                <img
                  src={p.image}
                  alt={p.title}
                  className={p.crop ? styles.imgCropped : styles.imgCover}
                  style={p.crop}
                />
              </PixelReveal>

              <span className={styles.viewCase} aria-hidden="true">
                <span className={styles.viewCaseIcon}>↗</span>
                View case
              </span>
            </a>
          ))}

          {/* Kartu penutup */}
          <a href="#portfolio" className={styles.viewAll}>
            <span className={styles.viewAllText}>[ View all projects ]</span>
          </a>
        </div>
      </section>

      {/* ---------- Mobile: daftar kartu ---------- */}
      <section className={`container ${styles.mobileList}`} aria-label="Our work">
        <h2 className={styles.heading}>Our work</h2>
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={(i % 2) * 120}>
            <ProjectCard {...p} />
          </FadeIn>
        ))}
        <a href="#portfolio" className={styles.viewAll}>
          <span className={styles.viewAllText}>[ View all projects ]</span>
        </a>
      </section>
    </div>
  );
}
