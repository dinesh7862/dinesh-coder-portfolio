"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.style.background = "rgba(2,0,8,0.85)";
        nav.style.backdropFilter = "blur(20px)";
        nav.style.borderBottomColor = "rgba(255,255,255,0.06)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.borderBottomColor = "transparent";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      ref={ref}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-3 cursor-hover"
          whileHover={{ scale: 1.05 }}
          style={{ textDecoration: "none" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
            style={{
              background: "linear-gradient(135deg, var(--neon-blue), var(--neon-purple))",
              fontFamily: "Space Grotesk",
              color: "white",
              boxShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
          >
            DC
          </div>
          <span
            className="text-lg font-bold hidden sm:block"
            style={{ fontFamily: "Space Grotesk", color: "var(--text-primary)" }}
          >
            Dinesh<span style={{ color: "var(--neon-blue)" }}>.</span>
          </span>
        </motion.a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact">
          <button className="btn-primary py-2 px-5 text-sm">
            <span>Let&apos;s Talk ✦</span>
          </button>
        </a>
      </div>
    </motion.nav>
  );
}
