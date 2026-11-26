"use client";

import type { ElementType, ReactNode } from "react";
import useInView from "@/hooks/useInView";
import styles from "./effects.module.css";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Jeda sebelum muncul (ms) */
  delay?: number;
};

/** Fade-in halus + naik sedikit saat masuk ke layar. */
export default function FadeIn({ children, as: Tag = "div", className = "", delay = 0 }: Props) {
  const [ref, inView] = useInView<HTMLElement>(0.2);

  return (
    <Tag
      ref={ref}
      className={`${styles.fade} ${inView ? styles.fadeIn : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
