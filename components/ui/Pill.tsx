import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Pill.module.css";

type PillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  href?: string;
  children: ReactNode;
};

/** Pill abu-abu / putih (toolbar Projects). Render <a> jika ada href, selain itu <button>. */
export default function Pill({ active = false, href, className = "", children, ...props }: PillProps) {
  const classes = `${styles.pill} ${active ? styles.active : ""} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
