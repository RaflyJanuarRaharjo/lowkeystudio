import type { Project } from "@/data/content";
import styles from "./Projects.module.css";

export default function ProjectCard({ title, tag, year, image, crop }: Project) {
  return (
    <article className={styles.card}>
      <div className={styles.preview}>
        <img
          src={image}
          alt={title}
          className={crop ? styles.previewCropped : styles.previewCover}
          style={crop}
        />
      </div>

      <div className={styles.meta}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.tag}>
          {tag} · {year}
        </p>
      </div>
    </article>
  );
}
