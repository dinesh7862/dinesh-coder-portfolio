"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { EASE, EASE_IO } from "./Reveal";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > 600 && latest > previous && !open);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          backgroundColor: scrolled ? "rgba(7,7,10,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
          transition:
            "background-color .5s var(--ease), border-color .5s var(--ease)",
        }}
      >
        <div className="container-x flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3" aria-label="Dinesh Coder — home">
            <span
              className="display grid h-9 w-9 place-items-center"
              style={{
                border: "1px solid var(--line-2)",
                borderRadius: 10,
                fontSize: "1.15rem",
                lineHeight: 1,
              }}
            >
              D
            </span>
            <span className="text-sm font-medium tracking-tight">
              Dinesh <span className="muted">Coder</span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="link-u text-sm">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <a
                href="#contact"
                className="btn btn--ghost"
                style={{ padding: "10px 20px" }}
              >
                <span>Let&apos;s talk</span>
                <span className="arrow">→</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative grid h-10 w-10 place-items-center md:hidden"
              style={{ border: "1px solid var(--line)", borderRadius: 10 }}
            >
              <motion.span
                className="absolute block h-px w-4"
                style={{ background: "var(--text)" }}
                animate={{ rotate: open ? 45 : 0, y: open ? 0 : -3 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.span
                className="absolute block h-px w-4"
                style={{ background: "var(--text)" }}
                animate={{ rotate: open ? -45 : 0, y: open ? 0 : 3 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </button>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left"
          style={{ background: "var(--accent)", scaleX: progress }}
        />
      </motion.header>


      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between px-6 pb-10 pt-28 md:hidden"
            style={{ background: "rgba(7,7,10,0.97)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_IO }}
          >
            <nav className="flex flex-col">
              {[...LINKS, { href: "#home", label: "Home" }].map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display"
                  style={{
                    fontSize: "clamp(2.2rem, 11vw, 3rem)",
                    paddingBlock: 10,
                    borderBottom: "1px solid var(--line)",
                    textDecoration: "none",
                    color: "var(--text)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.12 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="eyebrow">Get in touch</span>
              <a
                href="mailto:dineshkumar65418@gmail.com"
                className="link-u mt-3 text-sm"
                style={{ color: "var(--text)" }}
              >
                dineshkumar65418@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
