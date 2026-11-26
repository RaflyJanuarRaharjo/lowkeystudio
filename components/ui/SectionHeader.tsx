import { FadeIn } from "@/components/effects";
import styles from "./SectionHeader.module.css";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  /** "center" = semua di tengah, "split" = judul kiri & pengantar kanan */
  align?: "center" | "split";
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  className = "",
}: Props) {
  return (
    <FadeIn className={`${styles.header} ${styles[align]} ${className}`}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.intro}>{intro}</p>
    </FadeIn>
  );
}
