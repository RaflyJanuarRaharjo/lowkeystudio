"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mengembalikan [ref, inView].
 * once = true (default): sekali terlihat, tetap true.
 * once = false: ikut berubah saat elemen keluar-masuk layar (mis. untuk pause animasi).
 */
export default function useInView<T extends Element = HTMLDivElement>(threshold = 0.4, once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView] as const;
}
