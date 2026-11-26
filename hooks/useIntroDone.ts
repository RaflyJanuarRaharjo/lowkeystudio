"use client";

import { useEffect, useState } from "react";

export const INTRO_DONE_EVENT = "lowkey:intro-done";

declare global {
  interface Window {
    __lowkeyIntroDone?: boolean;
  }
}

/** true setelah animasi intro (Intro.tsx) selesai. */
export default function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.__lowkeyIntroDone) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener(INTRO_DONE_EVENT, onDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onDone);
  }, []);

  return done;
}
