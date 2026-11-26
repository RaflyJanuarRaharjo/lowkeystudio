import { ASSETS, FOOTER } from "@/data/content";
import { FadeIn } from "@/components/effects";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      {/* CTA */}
      <FadeIn className={`container ${styles.cta}`}>
        <h2 className={styles.ctaTitle}>{FOOTER.cta}</h2>
        <p className={styles.ctaSub}>{FOOTER.ctaSub}</p>
        <a href={`mailto:${FOOTER.email}`} className={styles.ctaButton}>
          {FOOTER.email}
          <span aria-hidden="true">→</span>
        </a>
      </FadeIn>

      {/* Link */}
      <div className={`container ${styles.grid}`}>
        <a href="#" className={styles.brand} aria-label="Lowkey Studio home">
          <img src={ASSETS.logo} alt="" width={40} height={40} />
          <span>Lowkey Studio</span>
        </a>

        <nav aria-label="Footer">
          <p className={styles.colTitle}>Navigate</p>
          <ul className={styles.links}>
            {FOOTER.nav.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={styles.colTitle}>Follow</p>
          <ul className={styles.links}>
            {FOOTER.socials.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bawah */}
      <div className={`container ${styles.bottom}`}>
        <p>{FOOTER.copyright}</p>
        <a href="#" className={styles.backTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
