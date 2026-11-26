"use client";

import { useMemo, useState } from "react";
import { FILTERS, PROJECTS } from "@/data/content";
import Pill from "@/components/ui/Pill";
import { FadeIn } from "@/components/effects";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";

type Sort = "Recent" | "Oldest";

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<Sort>("Recent");

  const visibleProjects = useMemo(() => {
    const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
    return sort === "Recent" ? list : [...list].reverse();
  }, [filter, sort]);

  const toggleSort = () => setSort((s) => (s === "Recent" ? "Oldest" : "Recent"));

  return (
    <section id="portfolio" className={styles.projects}>
      <FadeIn className={`container ${styles.toolbar}`}>
        <Pill onClick={toggleSort} aria-label={`Sort: ${sort}`}>
          <span className={styles.sortLabel}>Sort</span>
          <span className={styles.sortValue}>{sort} ▾</span>
        </Pill>

        <div className={styles.filters} role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <Pill
              key={f.id}
              active={filter === f.id}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </Pill>
          ))}
        </div>

        <Pill href="#portfolio">View all project</Pill>
      </FadeIn>

      <div className={`container ${styles.grid}`}>
        {visibleProjects.map((project, i) => (
          // Kartu muncul bergantian kiri-kanan (stagger)
          <FadeIn key={project.title} delay={(i % 2) * 150}>
            <ProjectCard {...project} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
