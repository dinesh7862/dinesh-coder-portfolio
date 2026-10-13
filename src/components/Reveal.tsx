"use client";

import { motion, useInView, animate } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** Shared easing — expo-ish, feels expensive. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IO: [number, number, number, number] = [0.76, 0, 0.24, 1];

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionPreference() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerMotionPreference() {
  return false;
}

/** Reads the user's motion preference without any state-in-effect dance. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
};

/** Soft fade + rise on enter. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 1,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word mask reveal. Wrap a word in *asterisks* to render it as an accent. */
export function MaskText({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <Tag className={className}>{text.replace(/\*/g, "")}</Tag>;

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const accent = word.startsWith("*") && word.endsWith("*");
        const clean = accent ? word.slice(1, -1) : word;
        return (
          <span key={`${word}-${i}`}>
            <span
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                paddingBottom: "0.14em",
                marginBottom: "-0.14em",
              }}
            >
              <motion.span
                style={{ display: "inline-block", willChange: "transform" }}
                initial={{ y: "115%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 1.05,
                  delay: delay + i * stagger,
                  ease: EASE,
                }}
              >
                {accent ? <em>{clean}</em> : clean}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
}

/** Number that counts up when it scrolls into view. */
export function Counter({
  to,
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/** Staggered group — children reveal one after another. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
