"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/content";
import { FadeIn, PixelReveal } from "@/components/effects";
import Pill from "@/components/ui/Pill";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

/**
 * Portofolio ala koto.com:
 * - Kiri: teks menempel di layar (sticky) dan berganti mengikuti project yang sedang terlihat.
 * - Kanan: gambar project tersusun ke bawah dan di-scroll biasa.
 * - Hover gambar: label "View case" mengikuti kursor.
 * Di layar kecil berubah jadi daftar kartu biasa.
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

  // Label "View case" mengikuti kursor di dalam gambar
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const current = PROJECTS[active];

  return (
    <div id="portfolio" className={styles.wrapper}>
      {/* ---------- Desktop ---------- */}
      <section className={`container ${styles.layout}`} aria-label="Selected work">
        {/* Kiri: menempel saat scroll */}
        <aside className={styles.info}>
          <div>
            <h2 className={styles.heading}>Our work</h2>
            <div className={styles.nameMask}>
              <ul
                className={styles.nameList}
                style={{ transform: `translateY(calc(-${active} * 1.15em))` }}
              >
                {PROJECTS.map((p) => (
                  <li key={p.title}>{p.title}</li>
                ))}
              </ul>
            </div>

            <p key={current.title} className={styles.summary}>
              {current.summary}
            </p>
          </div>

          <div key={`${current.title}-chip`} className={styles.chip}>
            <img src={current.image} alt="" className={styles.chipThumb} />
            <div>
              <p className={styles.chipTitle}>{current.tagline}</p>
              <p className={styles.chipMeta}>
                {current.year}, {current.tag}
              </p>
            </div>
          </div>
        </aside>

        {/* Kanan: gambar di-scroll biasa */}
        <div className={styles.media}>
          {PROJECTS.map((p, i) => (
            <a
              key={p.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              href="#portfolio"
              className={styles.item}
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
                <span>↗</span> View case
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- Mobile: daftar kartu ---------- */}
      <section className={`container ${styles.mobileList}`} aria-label="Selected work">
        <h2 className={styles.heading}>Our work</h2>
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={(i % 2) * 120}>
            <ProjectCard {...p} />
          </FadeIn>
        ))}
      </section>

      <FadeIn className={styles.viewAll}>
        <Pill href="#portfolio">[ View all projects ]</Pill>
      </FadeIn>
    </div>
  );
}
