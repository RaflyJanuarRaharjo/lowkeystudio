import { ASSETS, TOOL_ICONS } from "@/data/content";
import { Parallax, PixelReveal } from "@/components/effects";
import styles from "./Team.module.css";

function IconSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.iconSet} aria-hidden={hidden || undefined}>
      {TOOL_ICONS.map((src, i) => (
        <li key={i}>
          <img src={src} alt="" width={100} height={100} />
        </li>
      ))}
    </ul>
  );
}

export default function Team() {
  return (
    <div className={styles.team}>
      {/* Slider ikon tools (infinite marquee) — di belakang foto */}
      <div className={styles.marquee} aria-label="Tools we use">
        <Parallax speed={-0.04}>
          <div className={styles.track}>
            <IconSet />
            <IconSet hidden /> {/* duplikat supaya loop mulus */}
          </div>
        </Parallax>
      </div>

      {/* Foto tim — efek pixel + parallax (bergerak beda kecepatan dari slider) */}
      <Parallax speed={0.06} className={styles.photos}>
        {ASSETS.teamPhotos.map((photo, i) => (
          <PixelReveal key={i} delay={i * 200} tileSize={24}>
            <img
              src={photo.src}
              alt="Lowkey Studio founder"
              width={photo.width}
              height={364}
              style={{ width: photo.width, objectFit: photo.fit, objectPosition: photo.position }}
              className={styles.photo}
            />
          </PixelReveal>
        ))}
      </Parallax>
    </div>
  );
}
