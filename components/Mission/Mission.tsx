import { ASSETS, MISSION } from "@/data/content";
import { Parallax, ScrollRevealText } from "@/components/effects";
import Signature from "./Signature";
import styles from "./Mission.module.css";

export default function Mission() {
  const [first, second] = MISSION.founders;

  return (
    <div className={`container ${styles.mission}`}>
      {/* Kata demi kata berubah jadi putih saat di-scroll */}
      <ScrollRevealText className={styles.text} text={MISSION.text} />

      {/* rowWrap = container query: isi baris mengecil proporsional, tidak turun ke bawah */}
      <div className={styles.rowWrap}>
        <div className={styles.row}>
          <Signature {...first} />

          <Parallax speed={-0.05} className={styles.review}>
            <div className={styles.fastwork}>
              <img src={ASSETS.fastwork} alt="Fastwork" />
            </div>
            <div className={styles.rating}>
              <p className={styles.ratingLabel}>{MISSION.reviewLabel}</p>
              <img
                src={ASSETS.stars}
                alt="5 out of 5 stars"
                width={176}
                height={32}
              />
            </div>
          </Parallax>

          <Signature {...second} delay={600} />
        </div>
      </div>
    </div>
  );
}
