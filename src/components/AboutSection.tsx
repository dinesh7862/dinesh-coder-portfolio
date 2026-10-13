"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Counter, EASE, MaskText, Reveal } from "./Reveal";

const STATS = [
  { value: 50, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "+", label: "Years experience" },
  { value: 30, suffix: "+", label: "Happy clients" },
  { value: 10, suffix: "+", label: "AI builds" },
];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

export default function AboutSection() {
  const imageWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageWrap,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" className="section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="container-x">
        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1fr] lg:gap-24">
          {/* Portrait */}
          <motion.div
            ref={imageWrap}
            className="relative"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4 / 5", borderRadius: 22, border: "1px solid var(--line)" }}
            >
              <motion.div className="absolute inset-[-6%]" style={{ y: imageY }}>
                <Image
                  src="/dinesh.png"
                  alt="Dinesh Coder"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                  style={{ filter: "grayscale(0.25) contrast(1.04) brightness(0.98)" }}
                />
              </motion.div>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(7,7,10,0.85) 100%)",
                }}
              />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="mono" style={{ fontSize: "0.66rem", letterSpacing: "0.18em", color: "var(--muted)" }}>
                  MANDI · IN
                </span>
                <span className="mono" style={{ fontSize: "0.66rem", letterSpacing: "0.18em", color: "var(--muted)" }}>
                  GMT +5:30
                </span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="eyebrow">About</span>
            </Reveal>

            <h2 className="display h2 mt-6">
              <MaskText text="Design and engineering," delay={0.05} />
              <br />
              <MaskText text="done *properly*." delay={0.18} />
            </h2>

            <Reveal delay={0.15}>
              <p className="lead mt-8">
                I work across the whole stack — from the first sketch to the
                last deploy. My focus is simple: fast interfaces, honest motion,
                and systems that stay maintainable long after launch.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-5" style={{ color: "var(--muted)", lineHeight: 1.8, maxWidth: "46ch" }}>
                Lately I&apos;ve been building AI assistants, booking platforms
                and automation that removes the boring parts of a business —
                always with the same attention to detail on the front end.
              </p>
            </Reveal>

            {/* Stats */}
            <div
              className="mt-14 grid grid-cols-2"
              style={{ borderTop: "1px solid var(--line)", borderLeft: "1px solid var(--line)" }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="px-6 py-7"
                  style={{
                    borderRight: "1px solid var(--line)",
                    borderBottom: "1px solid var(--line)",
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                >
                  <div className="display" style={{ fontSize: "clamp(2rem, 3.4vw, 2.8rem)" }}>
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="mono mt-2"
                    style={{ fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted-2)" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <Reveal delay={0.1}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-u text-sm"
                  >
                    {social.label} ↗
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
