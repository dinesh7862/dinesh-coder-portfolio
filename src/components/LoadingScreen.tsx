"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Animate canvas particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      alpha: number;
    }[] = [];
    const colors = ["#00d4ff", "#a855f7", "#06b6d4", "#ec4899"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let animId: number;
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(drawParticles);
    };
    drawParticles();

    // Progress animation
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 12 + 3;
      if (val >= 100) {
        val = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 400);
        setTimeout(() => {
          cancelAnimationFrame(animId);
          onComplete();
        }, 1800);
      } else {
        setProgress(Math.floor(val));
      }
    }, 60);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="loading-screen overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Logo ring */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, #00d4ff, #a855f7, #ec4899, transparent, #00d4ff)",
                padding: "2px",
                borderRadius: "50%",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: "var(--bg-darker)" }}
              />
            </div>
            <div
              className="absolute inset-2 rounded-full spin-slow-reverse"
              style={{
                background:
                  "conic-gradient(from 180deg, transparent, #06b6d4, transparent)",
                padding: "1px",
                borderRadius: "50%",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: "var(--bg-darker)" }}
              />
            </div>
            <span
              className="text-2xl font-bold gradient-text relative z-10"
              style={{ fontFamily: "Space Grotesk" }}
            >
              DC
            </span>
          </div>

          {/* Name reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.15em" }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div
              className="text-4xl md:text-6xl font-black gradient-text"
              style={{
                fontFamily: "Space Grotesk",
                letterSpacing: "0.15em",
              }}
            >
              DINESH CODER
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-sm mt-2"
              style={{
                color: "var(--neon-blue)",
                fontFamily: "JetBrains Mono",
                letterSpacing: "0.3em",
              }}
            >
              INITIALIZING PORTFOLIO...
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "300px" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
          >
            <div
              className="w-full h-px mb-2"
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "2px",
              }}
            >
              <motion.div
                className="loading-bar h-full"
                style={{ width: `${progress}%`, transition: "width 0.15s ease" }}
              />
            </div>
            <div
              className="text-center text-xs"
              style={{
                color: "var(--text-secondary)",
                fontFamily: "JetBrains Mono",
              }}
            >
              {progress}%
            </div>
          </motion.div>

          {/* Status lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-1 items-center"
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: "0.7rem",
              color: "var(--text-secondary)",
            }}
          >
            {[
              "Loading AI modules...",
              "Initializing 3D engine...",
              "Connecting cyberpunk grid...",
            ].map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: progress > (i + 1) * 25 ? 0.6 : 0,
                  x: progress > (i + 1) * 25 ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span style={{ color: "var(--neon-emerald)" }}>✓</span> {text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
