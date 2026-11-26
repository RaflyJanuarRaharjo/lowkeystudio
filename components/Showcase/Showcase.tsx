import styles from "./Showcase.module.css";

/**
 * Video showcase ("Rectangle 62" di Figma, 1440×921).
 * Taruh file video asli di: public/assets/showcase.mp4
 * Poster (frame diam) diambil dari Figma: public/assets/showcase-poster.png
 */
export default function Showcase() {
  return (
    <section className={styles.showcase}>
      <video
        className={styles.video}
        src="/assets/showcase.mp4"
        poster="/assets/showcase-poster.png"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Lowkey Studio process showcase"
      />
    </section>
  );
}
