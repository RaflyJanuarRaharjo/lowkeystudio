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
  const [scrolled, setScrolled] = useState(false);
  const [dropdownLeft, setDropdownLeft] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Mode navbar: melebar di hero, jadi pill setelah di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ukur lebar pill (logo + menu + padding) supaya transisinya pas ke ukuran asli
  useEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      const logo = logoRef.current;
      const right = rightRef.current;
      if (!nav || !logo || !right) return;
      const width = logo.offsetWidth + right.scrollWidth + 12; // 12 = padding 6px kiri-kanan
      nav.style.setProperty("--pill-width", `${Math.ceil(width)}px`);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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

  // Posisikan dropdown di bawah tombol, tapi tidak keluar layar
  const placeDropdown = (button: HTMLElement) => {
    const rect = button.getBoundingClientRect();
    const half = 386; // setengah lebar dropdown (772px)
    const center = rect.left + rect.width / 2;
    const min = half + 16;
    const max = window.innerWidth - half - 16;
    setDropdownLeft(Math.min(Math.max(center, min), Math.max(min, max)));
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <nav ref={navRef} className={styles.nav} aria-label="Main">
        <a ref={logoRef} href="#" className={styles.logo} aria-label="Lowkey Studio home">
          <img src={ASSETS.logo} alt="" width={48} height={48} />
        </a>

        <div ref={rightRef} className={styles.right}>
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
                      onClick={(e) => {
                        placeDropdown(e.currentTarget);
                        setOpenMenu(isOpen ? null : menu);
                      }}
                      onMouseEnter={(e) => {
                        placeDropdown(e.currentTarget);
                        setOpenMenu(menu);
                      }}
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
        </div>
      </nav>

      <ServicesDropdown
        id="menu-services"
        open={openMenu === "services"}
        left={dropdownLeft}
      />
    </header>
  );
}
