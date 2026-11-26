"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export type DropdownItem = {
  title: string;
  description: string;
  image: string;
  href: string;
};

type Props = { id: string; open: boolean; items: DropdownItem[] };

/** Dropdown navbar: daftar di kiri, gambar preview di kanan berganti sesuai item yang disorot. */
export default function NavDropdown({ id, open, items }: Props) {
  const [hovered, setHovered] = useState(0);

  // Kembali ke item pertama setiap dropdown ditutup
  useEffect(() => {
    if (!open) setHovered(0);
  }, [open]);

  return (
    <div
      id={id}
      className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
      aria-hidden={!open}
    >
      <ul className={styles.dropdownList}>
        {items.map((item, i) => (
          <li key={item.title}>
            <a
              href={item.href}
              className={`${styles.dropdownItem} ${hovered === i ? styles.dropdownItemActive : ""}`}
              tabIndex={open ? 0 : -1}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
            >
              <span className={styles.dropdownTitle}>{item.title}</span>
              <span className={styles.dropdownDesc}>{item.description}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Gambar preview, crossfade sesuai item yang disorot */}
      <div className={styles.dropdownPreview}>
        {items.map((item, i) => (
          <img
            key={item.title}
            src={item.image}
            alt=""
            className={`${styles.dropdownImg} ${hovered === i ? styles.dropdownImgActive : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
