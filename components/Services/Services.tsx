import { SERVICES, SERVICES_SECTION } from "@/data/content";
import { FadeIn } from "@/components/effects";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" className={`container ${styles.services}`}>
      {/* Header */}
      <FadeIn className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{SERVICES_SECTION.eyebrow}</p>
          <h2 className={styles.title}>{SERVICES_SECTION.title}</h2>
        </div>
        <p className={styles.intro}>{SERVICES_SECTION.intro}</p>
      </FadeIn>

      {/* Daftar layanan */}
      <ul className={styles.list}>
        {SERVICES.map((service, i) => (
          <FadeIn as="li" key={service.title} delay={i * 100} className={styles.item}>
            <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>

            <div className={styles.body}>
              <h3 className={styles.name}>{service.title}</h3>
              <p className={styles.summary}>{service.summary}</p>
            </div>

            <ul className={styles.tags}>
              {service.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
