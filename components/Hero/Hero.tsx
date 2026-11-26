import { HERO } from "@/data/content";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="about" className={`container ${styles.hero}`}>
      <h1 className={styles.title}>{HERO.title}</h1>
      <p className={styles.subtitle}>{HERO.subtitle}</p>
    </section>
  );
}
