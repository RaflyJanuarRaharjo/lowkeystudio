import { ASSETS } from "@/data/content";
import { Parallax, PixelReveal } from "@/components/effects";
import styles from "./Team.module.css";

// Kecepatan parallax tiap foto (positif = bergerak lebih lambat dari scroll)
const PHOTO_SPEEDS = [0.06, 0.1];

export default function Team() {
  return (
    <div className={styles.team}>
      {/* Foto tim — tiap foto punya kecepatan parallax sendiri + efek pixel */}
      <div className={styles.photos}>
        {ASSETS.teamPhotos.map((photo, i) => (
          <Parallax key={i} speed={PHOTO_SPEEDS[i] ?? 0.06} className={styles.photoLayer}>
            <PixelReveal delay={i * 200} tileSize={24}>
              <img
                src={photo.src}
                alt="Lowkey Studio founder"
                width={photo.width}
                height={364}
                style={{ width: photo.width, objectFit: photo.fit, objectPosition: photo.position }}
                className={styles.photo}
              />
            </PixelReveal>
          </Parallax>
        ))}
      </div>
    </div>
  );
}
