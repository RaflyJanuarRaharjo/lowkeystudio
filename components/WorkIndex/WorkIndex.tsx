"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PORTFOLIO_CATEGORIES, PROJECTS } from "@/data/content";
import { FadeIn, PixelReveal } from "@/components/effects";
import styles from "./WorkIndex.module.css";

const ALL = "all";
const FILTERS = [{ id: ALL, label: "All" }, ...PORTFOLIO_CATEGORIES];

const countOf = (id: string) =>
  id === ALL ? PROJECTS.length : PROJECTS.filter((p) => p.category === id).length;

const pad = (n: number) => String(n).padStart(2, "0");

export default function WorkIndex() {
  const [filter, setFilter] = useState(ALL);

  // Baca kategori dari URL (mis. /work?category=branding dari dropdown navbar)
  useEffect(() => {
    const read = () => {
      const cat = new URLSearchParams(window.location.search).get("category");
      setFilter(cat && FILTERS.some((f) => f.id === cat) ? cat : ALL);
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const choose = (id: string) => {
    setFilter(id);
    const url = id === ALL ? "/work" : `/work?category=${id}`;
    window.history.replaceState(null, "", url);
  };

  const list = filter === ALL ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // Label "View case" mengikuti kursor
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className={`container ${styles.page}`}>
      {/* ---------- Header ---------- */}
      {/* Kiri: tombol kembali, kanan: filter kategori */}
      <header className={styles.header}>
        <h1 className={styles.srOnly}>All projects</h1>

        <FadeIn>
          <Link href="/#portfolio" className={styles.back}>
            Back to home
          </Link>
        </FadeIn>

        <FadeIn delay={150}>
          <div className={styles.filters} role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`${styles.filter} ${filter === f.id ? styles.filterActive : ""}`}
                onClick={() => choose(f.id)}
              >
                {f.label}
                <span className={styles.filterCount}>{pad(countOf(f.id))}</span>
              </button>
            ))}
          </div>
        </FadeIn>
      </header>

      {/* ---------- Grid ---------- */}
      {/* key={filter} → grid dirender ulang supaya animasi muncul diputar lagi */}
      <div key={filter} className={styles.grid}>
        {list.map((p, i) => (
          <FadeIn key={p.slug} delay={(i % 2) * 120} className={i % 3 === 0 ? styles.wide : ""}>
            <Link
              href={`/work/${p.slug}`}
              className={styles.card}
              onMouseMove={onMove}
              aria-label={`View case: ${p.title}`}
            >
              <div className={styles.media}>
                <PixelReveal color="#0a0a0a" className={styles.fill}>
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
              </div>

              <div className={styles.meta}>
                <div>
                  <h2 className={styles.cardTitle}>{p.title}</h2>
                  <p className={styles.cardTagline}>{p.tagline}</p>
                </div>
                <p className={styles.cardTag}>
                  {p.tag} · {p.year}
                </p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
