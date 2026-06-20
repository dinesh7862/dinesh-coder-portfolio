"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle system
    const colors = ["#00d4ff", "#a855f7", "#06b6d4", "#ec4899", "#10b981", "#f97316"];
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; color: string; alpha: number; pulse: number;
    }[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Mouse reactive glow
      const grd = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 300
      );
      grd.addColorStop(0, "rgba(0,212,255,0.04)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(0,212,255,0.04)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw & connect particles
      particles.forEach((p, i) => {
        p.pulse += 0.02;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect nearby
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        });

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-dark)" }}
    >
      {/* Canvas BG */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      {/* Aurora blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="aurora-blob"
          style={{
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
            top: "-100px",
            left: "-100px",
            animationDelay: "0s",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
            bottom: "-100px",
            right: "-50px",
            animationDelay: "-4s",
          }}
        />
        <div
          className="aurora-blob"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
            top: "40%",
            left: "40%",
            animationDelay: "-8s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="section-label">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400 inline-block"
                style={{ boxShadow: "0 0 6px #10b981", animation: "pulseGlow 2s infinite" }}
              />
              Available for Work
            </span>
          </motion.div>

          {/* Main name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-black leading-none"
            style={{ fontFamily: "Space Grotesk", fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            <span className="gradient-text text-glow-blue">DINESH</span>
            <br />
            <span
              className="text-white"
              style={{
                textShadow: "0 0 30px rgba(255,255,255,0.1)",
              }}
            >
              CODER
            </span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {["Full Stack Dev", "AI Developer", "Web Designer", "Problem Solver"].map(
              (role, i) => (
                <span
                  key={role}
                  className="px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    background: `rgba(${
                      i === 0
                        ? "0,212,255"
                        : i === 1
                        ? "168,85,247"
                        : i === 2
                        ? "6,182,212"
                        : "236,72,153"
                    },0.12)`,
                    border: `1px solid rgba(${
                      i === 0
                        ? "0,212,255"
                        : i === 1
                        ? "168,85,247"
                        : i === 2
                        ? "6,182,212"
                        : "236,72,153"
                    },0.3)`,
                    color:
                      i === 0
                        ? "var(--neon-blue)"
                        : i === 1
                        ? "var(--neon-purple)"
                        : i === 2
                        ? "var(--neon-cyan)"
                        : "var(--neon-pink)",
                    fontFamily: "JetBrains Mono",
                  }}
                >
                  {role}
                </span>
              )
            )}
          </motion.div>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl font-medium"
            style={{ color: "var(--text-secondary)", fontFamily: "Space Grotesk" }}
          >
            <TypeAnimation
              sequence={[
                "Building Amazing Digital Experiences",
                2000,
                "Creating AI Solutions That Matter",
                2000,
                "Designing Modern & Futuristic Websites",
                2000,
                "Developing Smart Applications",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ display: "inline" }}
            />
            <span className="blink" style={{ color: "var(--neon-blue)" }}>
              _
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Link href="#contact">
              <button className="btn-primary">
                <span>Hire Me ✦</span>
              </button>
            </Link>
            <Link href="#projects">
              <button className="btn-secondary">View Projects →</button>
            </Link>
            <a
              href="#"
              className="btn-secondary"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Download Resume ↓
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex gap-8 pt-4"
          >
            {[
              { num: "50+", label: "Projects" },
              { num: "3+", label: "Years Exp" },
              { num: "30+", label: "Clients" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-3xl font-black gradient-text"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {s.num}
                </div>
                <div
                  className="text-xs"
                  style={{
                    color: "var(--text-secondary)",
                    fontFamily: "JetBrains Mono",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Hero Image — Luxury Round Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="flex justify-center items-center"
        >
          <div className="relative float" style={{ maxWidth: "400px", width: "100%" }}>

            {/* Deep glow behind photo */}
            <div className="absolute inset-0" style={{
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(0,212,255,0.15) 50%, transparent 75%)",
              filter: "blur(40px)",
              transform: "scale(1.3)",
            }} />

            {/* Animated gradient border ring */}
            <div className="absolute" style={{
              inset: "-4px",
              borderRadius: "50%",
              background: "conic-gradient(from 0deg, #00d4ff, #a855f7, #ec4899, #06b6d4, #00d4ff)",
              animation: "spinSlow 4s linear infinite",
              padding: "3px",
            }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-dark)" }} />
            </div>

            {/* Outer subtle ring */}
            <div className="absolute spin-slow-reverse" style={{
              inset: "-14px",
              borderRadius: "50%",
              border: "1px solid rgba(0,212,255,0.12)",
            }} />
            <div className="absolute spin-slow" style={{
              inset: "-26px",
              borderRadius: "50%",
              border: "1px dashed rgba(168,85,247,0.1)",
            }} />

            {/* Dot markers on ring */}
            {[0, 90, 180, 270].map((deg) => (
              <div key={deg} className="absolute" style={{
                width: "8px", height: "8px",
                borderRadius: "50%",
                background: "var(--neon-blue)",
                boxShadow: "0 0 12px var(--neon-blue), 0 0 24px rgba(0,212,255,0.4)",
                top: "50%", left: "50%",
                transform: `rotate(${deg}deg) translateX(${210}px) translate(-50%, -50%)`,
              }} />
            ))}

            {/* Photo */}
            <div style={{
              position: "relative",
              borderRadius: "50%",
              overflow: "hidden",
              aspectRatio: "1",
              boxShadow: "0 0 0 3px rgba(0,212,255,0.15), 0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(168,85,247,0.2)",
            }}>
              <Image
                src="/dinesh.png"
                alt="Dinesh Coder — Full Stack Developer & AI Engineer"
                width={400}
                height={400}
                className="object-cover object-top w-full h-full"
                priority
                style={{ filter: "brightness(1.02) contrast(1.05) saturate(1.1)" }}
              />
              {/* Inner vignette */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.35) 100%)",
                borderRadius: "50%",
              }} />
            </div>

            {/* Floating status badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute glass rounded-2xl px-4 py-2.5"
              style={{
                top: "8%", right: "-8%",
                border: "1px solid rgba(0,212,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-2">
                <div style={{ width:"7px",height:"7px",borderRadius:"50%",background:"#10b981",boxShadow:"0 0 8px #10b981",animation:"pulseGlow 2s infinite" }} />
                <span style={{ fontFamily: "JetBrains Mono", color: "var(--neon-blue)", fontSize:"0.72rem" }}>Available</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute glass rounded-2xl px-4 py-2.5"
              style={{
                bottom: "10%", left: "-8%",
                border: "1px solid rgba(168,85,247,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontFamily: "JetBrains Mono", color: "var(--neon-purple)", fontSize:"0.72rem" }}>
                ✦ AI Developer
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2"
        style={{ transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <div
            className="text-xs"
            style={{
              color: "var(--text-secondary)",
              fontFamily: "JetBrains Mono",
              letterSpacing: "0.2em",
            }}
          >
            SCROLL
          </div>
          <div
            className="w-px h-10"
            style={{
              background:
                "linear-gradient(180deg, var(--neon-blue), transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
