import { FadeIn } from "@/components/effects";
import styles from "./SectionHeader.module.css";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  className?: string;
};

/** Header section: label kecil + judul di kiri, kalimat pengantar di kanan. */
export default function SectionHeader({ eyebrow, title, intro, className = "" }: Props) {
  return (
    <FadeIn className={`${styles.header} ${className}`}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <p className={styles.intro}>{intro}</p>
    </FadeIn>
  );
}
