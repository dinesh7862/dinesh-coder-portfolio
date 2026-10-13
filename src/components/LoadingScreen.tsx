"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE_IO, useReducedMotion } from "./Reveal";

/**
 * Minimal, fast intro curtain. It never blocks longer than ~1.4s,
 * and it is skipped completely for reduced-motion users.
 */
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      onComplete();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1150;
    let rafId = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        window.setTimeout(onComplete, 260);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.style.overflow = "";
    };
  }, [onComplete, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1, ease: EASE_IO }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.5, ease: EASE_IO }}
      >
        <motion.span
          className="eyebrow eyebrow--plain"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_IO }}
        >
          Portfolio — MMXXV
        </motion.span>

        <motion.h1
          className="display mt-5"
          style={{ fontSize: "clamp(2rem, 6vw, 3.4rem)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE_IO }}
        >
          Dinesh <em>Coder</em>
        </motion.h1>

        <div
          className="mt-10 flex items-center gap-4"
          style={{ width: "min(320px, 72vw)" }}
        >
          <div
            className="relative h-px flex-1 overflow-hidden"
            style={{ background: "var(--line)" }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                background: "var(--accent)",
                width: `${progress}%`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
          <span
            className="mono"
            style={{ fontSize: "0.7rem", color: "var(--muted)", width: "2.6em" }}
          >
            {String(progress).padStart(3, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
