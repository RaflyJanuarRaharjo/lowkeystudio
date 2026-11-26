import { ASSETS } from "@/data/content";
import { Parallax, PixelReveal } from "@/components/effects";
import styles from "./Team.module.css";

// Kecepatan parallax foto (positif = bergerak lebih lambat dari scroll)
const PHOTO_SPEED = 0.08;

export default function Team() {
  const photo = ASSETS.teamPhoto;

  return (
    <div className={styles.team}>
      {/* Foto founder — efek pixel saat muncul + parallax */}
      <Parallax speed={PHOTO_SPEED} className={styles.photoLayer}>
        <PixelReveal tileSize={32}>
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className={styles.photo}
          />
        </PixelReveal>
      </Parallax>
    </div>
  );
}
