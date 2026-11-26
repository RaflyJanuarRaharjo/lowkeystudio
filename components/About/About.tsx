import Team from "@/components/Team";
import Mission from "@/components/Mission";
import styles from "./About.module.css";

/** Section "About" (frame About di Figma): foto founder + slider ikon, lalu misi & tanda tangan. */
export default function About() {
  return (
    <section id="about" className={styles.about}>
      <Team />
      <Mission />
    </section>
  );
}
