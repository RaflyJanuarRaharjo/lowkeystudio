import { ASSETS, MISSION } from "@/data/content";
import { FadeIn } from "@/components/effects";
import styles from "./Mission.module.css";

function SignatureBlock({ name, role }: { name: string; role: string }) {
  return (
    <div className={styles.signatureBlock}>
      <div className={styles.signature}>
        <img src={ASSETS.signature} alt={`${name} signature`} width={140} height={248} />
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{role}</p>
    </div>
  );
}

export default function Mission() {
  const [first, second] = MISSION.founders;

  return (
    <section className={`container ${styles.mission}`}>
      <FadeIn as="p" className={styles.text}>
        {MISSION.text}
      </FadeIn>

      <div className={styles.row}>
        <SignatureBlock {...first} />

        <div className={styles.review}>
          <div className={styles.fastwork}>
            <img src={ASSETS.fastwork} alt="Fastwork" />
          </div>
          <div className={styles.rating}>
            <p className={styles.ratingLabel}>{MISSION.reviewLabel}</p>
            <img src={ASSETS.stars} alt="5 out of 5 stars" width={176} height={32} />
          </div>
        </div>

        <SignatureBlock {...second} />
      </div>
    </section>
  );
}
