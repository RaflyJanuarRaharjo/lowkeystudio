import { ASSETS, TOOL_ICONS } from "@/data/content";
import styles from "./Team.module.css";

export default function Team() {
  return (
    <section className={styles.team}>
      {/* Baris ikon tools — di belakang foto */}
      <ul className={styles.icons} aria-label="Tools we use">
        {TOOL_ICONS.map((src, i) => (
          <li key={i}>
            <img src={src} alt="" width={100} height={100} />
          </li>
        ))}
      </ul>

      {/* Foto tim */}
      <div className={styles.photos}>
        {ASSETS.teamPhotos.map((photo, i) => (
          <img
            key={i}
            src={photo.src}
            alt="Lowkey Studio founder"
            width={photo.width}
            height={364}
            style={{ width: photo.width, objectFit: "cover", objectPosition: photo.position }}
            className={styles.photo}
          />
        ))}
      </div>

      {/* Fade ke background */}
      <div className={styles.fade} aria-hidden="true" />
    </section>
  );
}
