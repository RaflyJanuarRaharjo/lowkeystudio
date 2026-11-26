import { ASSETS, MESSAGES, SECTION_HEADERS } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/effects";
import ChatMessage from "./ChatMessage";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section id="testimonial" className={styles.section}>
      <SectionHeader {...SECTION_HEADERS.testimonials} className="container" />

      <div className={styles.testimonials}>
        <div className={styles.chat}>
          {MESSAGES.map((message, i) => (
            <ChatMessage key={i} index={i} {...message} />
          ))}
        </div>

        <FadeIn className={styles.controls} delay={300}>
          <button type="button" className={`${styles.arrowBtn} ${styles.prev}`} aria-label="Previous">
            <img src={ASSETS.arrow} alt="" width={16} height={16} />
          </button>
          <button type="button" className={styles.arrowBtn} aria-label="Next">
            <img src={ASSETS.arrow} alt="" width={16} height={16} />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
