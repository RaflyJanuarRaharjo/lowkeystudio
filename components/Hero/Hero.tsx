import { HERO } from "@/data/content";
import { FadeIn, ScrambleText } from "@/components/effects";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`container ${styles.hero}`}>
      <ScrambleText as="h1" className={styles.title} text={HERO.title} duration={900} waitForIntro />
      <FadeIn as="p" className={styles.subtitle} delay={500} waitForIntro>
        {HERO.subtitle}
      </FadeIn>
    </section>
  );
}
