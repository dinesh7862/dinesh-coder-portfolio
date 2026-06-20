"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { num: "50+", label: "Projects Completed", icon: "🚀" },
    { num: "3+", label: "Years Experience", icon: "⚡" },
    { num: "30+", label: "Happy Clients", icon: "✦" },
    { num: "10+", label: "AI Projects", icon: "🤖" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-dark) 0%, rgba(5,0,15,1) 100%)",
      }}
    >
      {/* Aurora blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          bottom: "-200px",
          left: "-200px",
          borderRadius: "50%",
          filter: "blur(80px)",
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
            <span>{"<"}</span> About <span>{"/ >"}</span>
          </span>
          <h2
            className="text-5xl md:text-6xl font-black mt-4 gradient-text"
            style={{ fontFamily: "Space Grotesk" }}
          >
            The Story
          </h2>
        </motion.div>

        {/* Main glass card */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative" style={{ maxWidth: "380px", width: "100%" }}>
              {/* Glow */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
                  borderRadius: "30px",
                  filter: "blur(30px)",
                  transform: "scale(1.2)",
                }}
              />
              {/* Card */}
              <div
                className="glass-strong rounded-3xl overflow-hidden relative"
                style={{
                  border: "1px solid rgba(0,212,255,0.15)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src="/dinesh.png"
                    alt="Dinesh Coder"
                    fill
                    className="object-cover object-top"
                    style={{ filter: "brightness(1.02) contrast(1.05) saturate(1.1)" }}
                  />
                  {/* Bottom gradient */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2"
                    style={{
                      background:
                        "linear-gradient(transparent, rgba(2,0,8,0.9))",
                    }}
                  />
                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="font-black text-2xl"
                      style={{ fontFamily: "Space Grotesk", color: "white" }}
                    >
                      Dinesh Coder
                    </div>
                    <div
                      className="text-xs mt-1"
                      style={{
                        fontFamily: "JetBrains Mono",
                        color: "var(--neon-blue)",
                      }}
                    >
                      Full Stack Developer & AI Engineer
                    </div>
                  </div>
                </div>

                {/* Holographic code panel */}
                <div className="holo-panel m-4 rounded-xl">
                  <div style={{ lineHeight: 1.8 }}>
                    <span style={{ color: "var(--neon-purple)" }}>const</span>{" "}
                    <span style={{ color: "var(--neon-blue)" }}>developer</span>{" "}
                    <span style={{ color: "white" }}>=</span>{" "}
                    <span style={{ color: "white" }}>{"{"}</span>
                    <br />
                    {"  "}
                    <span style={{ color: "var(--neon-cyan)" }}>name</span>
                    <span style={{ color: "white" }}>:</span>{" "}
                    <span style={{ color: "var(--neon-emerald)" }}>
                      &apos;Dinesh Coder&apos;
                    </span>
                    <span style={{ color: "white" }}>,</span>
                    <br />
                    {"  "}
                    <span style={{ color: "var(--neon-cyan)" }}>passion</span>
                    <span style={{ color: "white" }}>:</span>{" "}
                    <span style={{ color: "var(--neon-emerald)" }}>
                      &apos;Building the Future&apos;
                    </span>
                    <span style={{ color: "white" }}>,</span>
                    <br />
                    {"  "}
                    <span style={{ color: "var(--neon-cyan)" }}>mode</span>
                    <span style={{ color: "white" }}>:</span>{" "}
                    <span style={{ color: "var(--neon-pink)" }}>&apos;AI_GOD&apos;</span>
                    <br />
                    <span style={{ color: "white" }}>{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            {/* Description */}
            <div
              className="glass-strong rounded-3xl p-8"
              style={{ border: "1px solid rgba(168,85,247,0.15)" }}
            >
              <p
                className="text-lg leading-relaxed"
                style={{ color: "var(--text-secondary)", lineHeight: "1.9" }}
              >
                Hi, I&apos;m{" "}
                <span
                  className="font-bold"
                  style={{ color: "var(--neon-blue)" }}
                >
                  Dinesh Coder
                </span>
                , a passionate developer focused on creating{" "}
                <span style={{ color: "var(--neon-purple)" }}>modern websites</span>,{" "}
                <span style={{ color: "var(--neon-cyan)" }}>AI assistants</span>,{" "}
                <span style={{ color: "var(--neon-pink)" }}>automation systems</span>{" "}
                and innovative digital experiences that push boundaries.
              </p>
              <p
                className="text-lg leading-relaxed mt-4"
                style={{ color: "var(--text-secondary)", lineHeight: "1.9" }}
              >
                I blend cutting-edge technology with beautiful design to create
                solutions that don&apos;t just work — they{" "}
                <span style={{ color: "var(--neon-emerald)" }}>
                  inspire and amaze
                </span>
                .
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="glass rounded-2xl p-5 cursor-hover"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div
                    className="text-2xl font-black gradient-text"
                    style={{ fontFamily: "Space Grotesk" }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{
                      color: "var(--text-secondary)",
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {[
                { label: "GitHub", icon: "⌥", color: "var(--text-secondary)" },
                { label: "LinkedIn", icon: "◈", color: "var(--neon-blue)" },
                { label: "Twitter", icon: "✕", color: "var(--neon-cyan)" },
              ].map((s) => (
                <motion.button
                  key={s.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass flex items-center gap-2 px-4 py-2 rounded-xl cursor-hover"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: s.color,
                    fontSize: "0.85rem",
                    fontFamily: "Space Grotesk",
                  }}
                >
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
