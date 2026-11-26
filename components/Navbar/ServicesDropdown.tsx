import { ASSETS, SERVICES } from "@/data/content";
import styles from "./Navbar.module.css";

type Props = { id: string; open: boolean };

export default function ServicesDropdown({ id, open }: Props) {
  return (
    <div
      id={id}
      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
      aria-hidden={!open}
    >
      <ul className={styles.dropdownList}>
        {SERVICES.map((item) => (
          <li key={item.title}>
            <a href="#services" className={styles.dropdownItem} tabIndex={open ? 0 : -1}>
              <span className={styles.dropdownTitle}>{item.title}</span>
              <span className={styles.dropdownDesc}>{item.description}</span>
            </a>
          </li>
        ))}
      </ul>

      <img
        src={ASSETS.dropdownPreview}
        alt=""
        width={352}
        height={288}
        className={styles.dropdownPreview}
      />
    </div>
  );
}
