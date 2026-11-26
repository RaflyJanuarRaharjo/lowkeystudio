import { ASSETS, MESSAGES } from "@/data/content";
import ChatMessage from "./ChatMessage";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section id="testimonial" className={styles.testimonials}>
      <h2 className="sr-only">What clients say</h2>

      <div className={styles.chat}>
        {MESSAGES.map((message, i) => (
          <ChatMessage key={i} index={i} {...message} />
        ))}
      </div>

      <div className={styles.controls}>
        <button type="button" className={`${styles.arrowBtn} ${styles.prev}`} aria-label="Previous">
          <img src={ASSETS.arrow} alt="" width={16} height={16} />
        </button>
        <button type="button" className={styles.arrowBtn} aria-label="Next">
          <img src={ASSETS.arrow} alt="" width={16} height={16} />
        </button>
      </div>
    </section>
  );
}
