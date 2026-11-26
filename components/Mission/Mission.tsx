import { ASSETS, MISSION } from "@/data/content";
import { ScrollRevealText } from "@/components/effects";
import Signature from "./Signature";
import styles from "./Mission.module.css";

export default function Mission() {
  const [first, second] = MISSION.founders;

  return (
    <div className={`container ${styles.mission}`}>
      {/* Kata demi kata berubah jadi putih saat di-scroll */}
      <ScrollRevealText className={styles.text} text={MISSION.text} />

      <div className={styles.row}>
        <Signature {...first} />

        <div className={styles.review}>
          <div className={styles.fastwork}>
            <img src={ASSETS.fastwork} alt="Fastwork" />
          </div>
          <div className={styles.rating}>
            <p className={styles.ratingLabel}>{MISSION.reviewLabel}</p>
            <img src={ASSETS.stars} alt="5 out of 5 stars" width={176} height={32} />
          </div>
        </div>

        <Signature {...second} delay={600} />
      </div>
    </div>
  );
}
