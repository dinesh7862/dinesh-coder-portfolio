"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText, Reveal, EASE } from "./Reveal";
import Magnetic from "./Magnetic";

const ThreeScene = dynamic(() => import("./ThreeScene"), { ssr: false });

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      style={{ paddingTop: "clamp(120px, 18vh, 180px)", paddingBottom: 80 }}
    >
      <motion.div className="absolute inset-0" style={{ y: sceneY }}>
        <ThreeScene />
      </motion.div>

      {/* soft vignette so the type always stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(120% 90% at 8% 50%, rgba(7,7,10,0.92) 0%, rgba(7,7,10,0.55) 45%, transparent 75%)",
        }}
      />

      <motion.div
        className="container-x relative"
        style={{ zIndex: 2, y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          className="eyebrow eyebrow--plain"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        >
          <span className="dot-live" />
          Available for new projects
        </motion.div>

        <h1 className="display h1 mt-7">
          <MaskText text="Fast, *calm* products" delay={0.18} />
          <br />
          <MaskText text="for the modern web." delay={0.32} />
        </h1>

        <div className="mt-9 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.55} className="lead">
            I&apos;m Dinesh Coder — a full-stack developer and AI engineer
            building interfaces, systems and automation that feel effortless to
            use and quick to trust.
          </Reveal>

          <Reveal delay={0.65}>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="btn btn--solid">
                  <span>See selected work</span>
                  <span className="arrow">→</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a href="#contact" className="btn btn--ghost">
                  <span>Start a project</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.8}>
          <div
            className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 pt-8 mono"
            style={{
              borderTop: "1px solid var(--line)",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted-2)",
            }}
          >
            <span>Mandi, Himachal Pradesh</span>
            <span>3+ yrs experience</span>
            <span>Full-stack · AI · Automation</span>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 right-0"
        style={{ zIndex: 2, opacity: cueOpacity }}
      >
        <div className="container-x flex items-center gap-3">
          <span
            className="mono"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              color: "var(--muted-2)",
            }}
          >
            SCROLL
          </span>
          <span
            className="relative block h-px w-16 overflow-hidden"
            style={{ background: "var(--line)" }}
          >
            <motion.span
              className="absolute inset-y-0 left-0 block w-6"
              style={{ background: "var(--accent)" }}
              animate={{ x: ["-24px", "64px"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
