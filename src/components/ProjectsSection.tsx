"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

const projects = [
  {
    title: "Luxury Hotel Website",
    description: "Premium hotel booking platform with real-time availability, 3D room previews, and AI concierge chatbot.",
    tags: ["Next.js", "Three.js", "AI", "Stripe"],
    color: "#f97316",
    icon: "🏨",
    gradient: "from-orange-500/10 to-orange-900/5",
  },
  {
    title: "AI Assistant Platform",
    description: "Intelligent conversational AI with multi-modal capabilities, voice recognition, and custom knowledge bases.",
    tags: ["Python", "OpenAI", "React", "FastAPI"],
    color: "#a855f7",
    icon: "🤖",
    gradient: "from-purple-500/10 to-purple-900/5",
  },
  {
    title: "Restaurant Website",
    description: "Modern restaurant platform with online ordering, table reservations, and dynamic menu management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "#10b981",
    icon: "🍽️",
    gradient: "from-emerald-500/10 to-emerald-900/5",
  },
  {
    title: "Portfolio Designs",
    description: "Collection of 10+ award-winning portfolio templates with futuristic animations and custom interactions.",
    tags: ["Next.js", "GSAP", "Framer Motion", "Three.js"],
    color: "#00d4ff",
    icon: "✦",
    gradient: "from-cyan-500/10 to-cyan-900/5",
  },
  {
    title: "Business Website Suite",
    description: "Full-service business web platform with CRM integration, analytics dashboard, and lead management.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    color: "#ec4899",
    icon: "💼",
    gradient: "from-pink-500/10 to-pink-900/5",
  },
  {
    title: "Smart Automation System",
    description: "AI-powered workflow automation system that reduces manual tasks by 80% using smart triggers and ML models.",
    tags: ["Python", "AI/ML", "FastAPI", "Docker"],
    color: "#06b6d4",
    icon: "⚡",
    gradient: "from-cyan-500/10 to-blue-900/5",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: mx, y: my });
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", mx + "%");
      cardRef.current.style.setProperty("--mouse-y", my + "%");
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 50, y: 50 });
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <motion.div
        ref={cardRef}
        className="project-card cursor-hover h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.y,
          rotateY: tilt.x,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ perspective: "1000px", height: "100%" }}
      >
        {/* Glow overlay */}
        <div className="glow-overlay" />

        {/* Top color bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.color}44)`,
          }}
        />

        <div className="p-7 flex flex-col gap-5 h-full">
          {/* Icon & title */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.icon}
            </div>
            <div>
              <h3
                className="font-bold text-lg"
                style={{ fontFamily: "Space Grotesk", color: "var(--text-primary)" }}
              >
                {project.title}
              </h3>
              <div
                className="text-xs mt-0.5"
                style={{ color: project.color, fontFamily: "JetBrains Mono" }}
              >
                Featured Project
              </div>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-grow"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                  fontFamily: "JetBrains Mono",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-hover"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.color}88)`,
                color: "white",
                border: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.target as HTMLButtonElement).style.boxShadow = `0 8px 25px ${project.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = "";
                (e.target as HTMLButtonElement).style.boxShadow = "";
              }}
            >
              Live Demo →
            </button>
            <button
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-hover"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = `${project.color}50`;
                (e.target as HTMLButtonElement).style.color = project.color;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.target as HTMLButtonElement).style.color = "var(--text-secondary)";
              }}
            >
              GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(5,0,15,1) 0%, var(--bg-dark) 100%)",
      }}
    >
      {/* Aurora */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
            <span>{"<"}</span> Projects <span>{"/ >"}</span>
          </span>
          <h2
            className="text-5xl md:text-6xl font-black mt-4 gradient-text"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Featured Work
          </h2>
          <p
            className="mt-4 text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            A curated selection of projects that showcase creativity, innovation, and technical excellence
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* View more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <button className="btn-secondary">
            View All Projects →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
