import type { Person } from "@/data/content";
import styles from "./Testimonials.module.css";

/** Avatar: foto kalau ada, kalau tidak inisial dengan warna. */
export default function Avatar({ person, size = 40 }: { person: Person; size?: number }) {
  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        width={size}
        height={size}
        className={styles.avatar}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, background: person.color }}
      aria-hidden="true"
    >
      {person.initial}
    </span>
  );
}
