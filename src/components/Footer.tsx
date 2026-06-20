"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  const links = {
    Navigation: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    Services: [
      { label: "Web Development", href: "#" },
      { label: "AI Solutions", href: "#" },
      { label: "UI/UX Design", href: "#" },
      { label: "Automation", href: "#" },
    ],
  };

  return (
    <footer
      ref={ref}
      className="relative py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-darker) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Gradient line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--neon-blue), var(--neon-purple), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--neon-blue), var(--neon-purple))",
                    boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                    fontFamily: "Space Grotesk",
                  }}
                >
                  DC
                </div>
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "Space Grotesk", color: "var(--text-primary)" }}
                >
                  Dinesh<span style={{ color: "var(--neon-blue)" }}>.</span>
                </span>
              </div>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Building futuristic digital experiences at the intersection of design,
                technology, and artificial intelligence.
              </p>
              <div
                className="flex gap-3 mt-6"
                style={{ fontFamily: "JetBrains Mono", fontSize: "0.75rem" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>
                  &gt; status:{" "}
                </span>
                <span style={{ color: "var(--neon-emerald)" }}>
                  online & building
                </span>
                <span
                  className="w-2 h-2 rounded-full self-center"
                  style={{
                    background: "var(--neon-emerald)",
                    boxShadow: "0 0 6px var(--neon-emerald)",
                    animation: "pulseGlow 2s infinite",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items], ci) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + ci * 0.1, duration: 0.6 }}
            >
              <h4
                className="text-xs font-semibold mb-5 uppercase"
                style={{
                  color: "var(--neon-blue)",
                  fontFamily: "JetBrains Mono",
                  letterSpacing: "0.15em",
                }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="nav-link text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p
            className="text-xs"
            style={{ color: "var(--text-secondary)", fontFamily: "JetBrains Mono" }}
          >
            © 2025 Dinesh Coder. Crafted with{" "}
            <span style={{ color: "var(--neon-pink)" }}>♥</span> &amp; ☕
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--text-secondary)", fontFamily: "JetBrains Mono" }}
          >
            Built with{" "}
            <span style={{ color: "var(--neon-blue)" }}>Next.js</span> +{" "}
            <span style={{ color: "var(--neon-purple)" }}>Framer Motion</span> +{" "}
            <span style={{ color: "var(--neon-cyan)" }}>Three.js</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
