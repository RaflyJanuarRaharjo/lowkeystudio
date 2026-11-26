"use client";

import { useEffect, useRef, useState } from "react";
import { ASSETS, NAV_LINKS } from "@/data/content";
import ServicesDropdown from "./ServicesDropdown";
import styles from "./Navbar.module.css";

function Chevron({ open }: { open: boolean }) {
  return (
    <img
      src={open ? ASSETS.chevronUp : ASSETS.chevronDown}
      alt=""
      width={12}
      height={12}
      className={styles.chevron}
    />
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Tutup dropdown saat klik di luar atau tekan Escape
  useEffect(() => {
    if (!openMenu) return;
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  return (
    <header ref={headerRef} className={styles.header} onMouseLeave={() => setOpenMenu(null)}>
      <nav className={styles.pill} aria-label="Main">
        <a href="#" className={styles.logo} aria-label="Lowkey Studio home">
          <img src={ASSETS.logo} alt="" width={48} height={48} />
        </a>

        <ul className={styles.links}>
          {NAV_LINKS.map((link) => {
            if (link.dropdown) {
              const menu = link.dropdown;
              const isOpen = openMenu === menu;
              return (
                <li key={link.label}>
                  <button
                    type="button"
                    className={`${styles.link} ${isOpen ? styles.linkActive : ""}`}
                    aria-expanded={isOpen}
                    aria-controls={`menu-${menu}`}
                    onClick={() => setOpenMenu(isOpen ? null : menu)}
                    onMouseEnter={() => setOpenMenu(menu)}
                  >
                    {link.label}
                    <Chevron open={isOpen} />
                  </button>
                </li>
              );
            }

            return (
              <li key={link.label}>
                <a href={link.href} className={styles.link} onMouseEnter={() => setOpenMenu(null)}>
                  {link.label}
                  {link.chevron && <Chevron open={false} />}
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#contact" className={styles.contact}>
          Contact Us
        </a>
      </nav>

      <ServicesDropdown id="menu-services" open={openMenu === "services"} />
    </header>
  );
}
