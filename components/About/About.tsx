import { SECTION_HEADERS } from "@/data/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Team from "@/components/Team";
import Mission from "@/components/Mission";
import styles from "./About.module.css";

/** Section "About": header, foto founder, lalu misi & tanda tangan. */
export default function About() {
  return (
    <section id="about" className={styles.about}>
      <SectionHeader {...SECTION_HEADERS.about} className={`container ${styles.header}`} />
      <Team />
      <Mission />
    </section>
  );
}
