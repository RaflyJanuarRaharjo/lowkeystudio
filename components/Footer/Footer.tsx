import { FOOTER } from "@/data/content";
import { FadeIn } from "@/components/effects";
import Wordmark from "./Wordmark";
import styles from "./Footer.module.css";

/** Footer (gaya Baseten): kolom link, baris status + sosial, wordmark besar, baris bawah. */
export default function Footer() {
  return (
    <footer id="contact" className={`container ${styles.footer}`}>
      {/* Kolom link */}
      <FadeIn className={styles.columns}>
        {FOOTER.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className={styles.label}>{col.title}</p>
            <ul className={styles.links}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </FadeIn>

      {/* Status + sosial */}
      <div className={styles.statusRow}>
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden="true" />
          {FOOTER.status}
        </p>
        <ul className={styles.socials}>
          {FOOTER.socials.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Wordmark besar selebar konten */}
      <Wordmark text={FOOTER.wordmark} />

      {/* Baris bawah */}
      <div className={styles.bottom}>
        <p>{FOOTER.tagline}</p>
        <p>{FOOTER.copyright}</p>
      </div>
    </footer>
  );
}
