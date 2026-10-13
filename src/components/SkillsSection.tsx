"use client";

import { motion } from "framer-motion";
import { EASE, MaskText, Reveal } from "./Reveal";
import Marquee from "./Marquee";

const GROUPS = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDB", "REST & GraphQL"],
  },
  {
    title: "AI & Automation",
    items: ["OpenAI API", "LangChain", "RAG pipelines", "Vector DBs", "n8n workflows", "Whisper"],
  },
  {
    title: "Design & Tooling",
    items: ["Figma", "GSAP", "Lenis", "Git", "Docker", "Vercel"],
  },
];

const TICKER = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "Node",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "OpenAI",
  "LangChain",
  "Docker",
  "Figma",
];

export default function SkillsSection() {
  return (
    <section id="skills" className="section" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow">Stack</span>
            </Reveal>
            <h2 className="display h2 mt-6">
              <MaskText text="Tools I reach for," delay={0.05} />
              <br />
              <MaskText text="again and *again*." delay={0.18} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="lead">
              A deliberately small toolkit — chosen for speed, clarity and how
              well it holds up under real traffic.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((group, gi) => (
            <div key={group.title}>
              <motion.h3
                className="mono"
                style={{
                  fontSize: "0.66rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--muted-2)",
                  paddingBottom: 14,
                }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: gi * 0.06, ease: EASE }}
              >
                {group.title}
              </motion.h3>

              <ul className="flex flex-col" style={{ borderTop: "1px solid var(--line)" }}>
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    className="group flex items-center justify-between"
                    style={{
                      borderBottom: "1px solid var(--line)",
                      paddingBlock: 13,
                      cursor: "default",
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      delay: gi * 0.06 + i * 0.045,
                      ease: EASE,
                    }}
                  >
                    <span
                      className="text-sm transition-colors duration-500"
                      style={{ color: "var(--text)" }}
                    >
                      {item}
                    </span>
                    <span
                      className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2"
                      style={{ color: "var(--accent)", fontSize: "0.8rem" }}
                    >
                      ✦
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-24" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", paddingBlock: 28 }}>
        <Marquee speed={52}>
          {TICKER.map((word) => (
            <span key={word} className="flex items-center">
              <span
                className="display"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)", color: "var(--muted-2)", paddingInline: 22 }}
              >
                {word}
              </span>
              <span style={{ color: "var(--accent)", opacity: 0.5 }}>✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
