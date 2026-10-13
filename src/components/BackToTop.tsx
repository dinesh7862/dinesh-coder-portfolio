"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { EASE } from "./Reveal";

const SIZE = 48;
const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.12 && v < 0.995);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-6 z-40 grid place-items-center rounded-full sm:right-8"
          style={{
            width: SIZE,
            height: SIZE,
            border: "1px solid var(--line-2)",
            background: "rgba(7,7,10,0.6)",
            backdropFilter: "blur(10px)",
          }}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ y: -3, borderColor: "var(--accent-line)" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ pathLength: progress }}
            />
          </svg>
          <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
