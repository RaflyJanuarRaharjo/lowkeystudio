"use client";

import { ASSETS } from "@/data/content";
import useInView from "@/hooks/useInView";
import styles from "./Mission.module.css";

type Props = { name: string; role: string; signature?: string; delay?: number };

/**
 * Tanda tangan dengan efek "ditulis tangan":
 * muncul perlahan dari kiri ke kanan saat masuk ke layar.
 */
export default function Signature({ name, role, signature, delay = 0 }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>(0.5);

  return (
    <div ref={ref} className={styles.signatureBlock}>
      <div
        className={`${styles.signature} ${inView ? styles.signatureDrawn : ""}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {signature ? (
          // File landscape: tampil apa adanya
          <img src={signature} alt={`${name} signature`} className={styles.signatureFlat} />
        ) : (
          // File Figma (portrait): diputar -90°
          <img src={ASSETS.signature} alt={`${name} signature`} width={140} height={248} className={styles.signatureRotated} />
        )}
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{role}</p>
    </div>
  );
}
