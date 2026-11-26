import { ASSETS } from "@/data/content";
import { Parallax, PixelReveal, PixelHeart } from "@/components/effects";
import styles from "./Team.module.css";

// Kecepatan parallax foto (positif = bergerak lebih lambat dari scroll)
const PHOTO_SPEED = 0.08;

// Hati pixel di kiri & kanan foto (posisi diatur di CSS lewat className)
const HEARTS = [
  { key: "l1", className: styles.heartL1, pixel: 12, delay: 300, seed: 1.3, speed: -0.12, dim: false },
  { key: "l2", className: styles.heartL2, pixel: 6, delay: 700, seed: 2.7, speed: -0.25, dim: true },
  { key: "r1", className: styles.heartR1, pixel: 10, delay: 500, seed: 3.1, speed: -0.18, dim: false },
  { key: "r2", className: styles.heartR2, pixel: 5, delay: 900, seed: 4.9, speed: -0.3, dim: true },
];

export default function Team() {
  const photo = ASSETS.teamPhoto;

  return (
    <div className={styles.team}>
      <div className={styles.stage}>
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

        {/* Hati pixel muncul saat section masuk layar */}
        {HEARTS.map((h) => (
          <div key={h.key} className={`${styles.heartSlot} ${h.className}`}>
            <Parallax speed={h.speed}>
              <PixelHeart pixel={h.pixel} delay={h.delay} seed={h.seed} dim={h.dim} />
            </Parallax>
          </div>
        ))}
      </div>
    </div>
  );
}
