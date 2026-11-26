"use client";

import type { ElementType, ReactNode } from "react";
import useInView from "@/hooks/useInView";
import useIntroDone from "@/hooks/useIntroDone";
import styles from "./effects.module.css";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Jeda sebelum muncul (ms) */
  delay?: number;
  /** Tunggu animasi intro selesai sebelum muncul (untuk elemen di hero) */
  waitForIntro?: boolean;
};

/** Fade-in halus + naik sedikit saat masuk ke layar. */
export default function FadeIn({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  waitForIntro = false,
}: Props) {
  const [ref, isVisible] = useInView<HTMLElement>(0.2);
  const introDone = useIntroDone();
  const inView = isVisible && (!waitForIntro || introDone);

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
