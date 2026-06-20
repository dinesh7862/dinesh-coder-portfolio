"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "HTML", icon: "🌐", color: "#f97316", level: 95 },
  { name: "CSS", icon: "🎨", color: "#06b6d4", level: 92 },
  { name: "JavaScript", icon: "⚡", color: "#f59e0b", level: 90 },
  { name: "React", icon: "⚛️", color: "#00d4ff", level: 88 },
  { name: "Next.js", icon: "▲", color: "#ffffff", level: 85 },
  { name: "Node.js", icon: "🟢", color: "#10b981", level: 82 },
  { name: "Python", icon: "🐍", color: "#a855f7", level: 80 },
  { name: "AI Dev", icon: "🤖", color: "#ec4899", level: 78 },
  { name: "UI/UX", icon: "✦", color: "#f97316", level: 85 },
  { name: "Three.js", icon: "🔮", color: "#06b6d4", level: 72 },
  { name: "GSAP", icon: "🎬", color: "#a855f7", level: 75 },
  { name: "TypeScript", icon: "📘", color: "#00d4ff", level: 82 },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Aurora */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          top: "-100px",
          right: "-100px",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">
            <span>{"<"}</span> Skills <span>{"/ >"}</span>
          </span>
          <h2
            className="text-5xl md:text-6xl font-black mt-4 gradient-text"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Tech Arsenal
          </h2>
          <p
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Cutting-edge tools and technologies I wield to craft digital excellence
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass rounded-2xl p-5 cursor-hover"
              style={{
                border: `1px solid rgba(${
                  skill.color === "#00d4ff"
                    ? "0,212,255"
                    : skill.color === "#a855f7"
                    ? "168,85,247"
                    : skill.color === "#06b6d4"
                    ? "6,182,212"
                    : skill.color === "#ec4899"
                    ? "236,72,153"
                    : skill.color === "#10b981"
                    ? "16,185,129"
                    : "249,115,22"
                },0.15)`,
                transition: "all 0.3s ease",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{skill.icon}</span>
                <span
                  className="font-semibold"
                  style={{
                    fontFamily: "JetBrains Mono",
                    color: skill.color,
                    fontSize: "0.9rem",
                  }}
                >
                  {skill.name}
                </span>
              </div>
              {/* Level bar */}
              <div
                className="w-full h-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ delay: i * 0.06 + 0.4, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                    boxShadow: `0 0 8px ${skill.color}44`,
                  }}
                />
              </div>
              <div
                className="text-right text-xs mt-1"
                style={{ color: "var(--text-secondary)", fontFamily: "JetBrains Mono" }}
              >
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
