"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery smooth scrolling + eased anchor navigation.
 * Disabled entirely for users who prefer reduced motion.
 */
type LenisWindow = Window & {
  __lenis?: { scrollTo: (target: number | HTMLElement, options?: object) => void };
};

/** Eased jump to the top — uses Lenis when it is running. */
export function scrollToTop() {
  const lenis = (window as LenisWindow).__lenis;
  if (lenis) lenis.scrollTo(0, { duration: 1.3 });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -76, duration: 1.25 });
      window.history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    (window as LenisWindow).__lenis = lenis;

    // The intro curtain locks the document, so re-measure once it lifts.
    const refresh = () => lenis.resize();
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 1900);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      cancelAnimationFrame(rafId);
      delete (window as LenisWindow).__lenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
