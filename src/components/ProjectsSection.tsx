"use client";

import { motion } from "framer-motion";
import { EASE, MaskText, Reveal } from "./Reveal";

type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  role: string;
};

const PROJECTS: Project[] = [
  {
    title: "Luxury Hotel Platform",
    description:
      "Booking engine with real-time availability, 3D room previews and an AI concierge that answers 80% of guest questions.",
    tags: ["Next.js", "Three.js", "AI", "Stripe"],
    year: "2025",
    role: "Design + Build",
  },
  {
    title: "AI Assistant Platform",
    description:
      "Multi-modal assistant with voice, document memory and custom knowledge bases for support teams.",
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    year: "2025",
    role: "Full-stack",
  },
  {
    title: "Restaurant Ordering Suite",
    description:
      "Online ordering, table reservations and a live menu dashboard the staff actually enjoy using.",
    tags: ["React", "Node.js", "MongoDB"],
    year: "2024",
    role: "Full-stack",
  },
  {
    title: "Business Website Suite",
    description:
      "Reusable marketing platform with CRM sync, analytics and a lead pipeline wired into the client's inbox.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2024",
    role: "Frontend lead",
  },
  {
    title: "Smart Automation Engine",
    description:
      "Workflow automation that cut roughly 80% of repetitive admin work across three departments.",
    tags: ["Python", "n8n", "Docker"],
    year: "2024",
    role: "Architecture",
  },
  {
    title: "Portfolio Templates",
    description:
      "A set of opinionated portfolio starters built on the same motion and typography system as this site.",
    tags: ["Next.js", "GSAP", "Framer Motion"],
    year: "2023",
    role: "Design + Build",
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="section"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow">Selected work</span>
            </Reveal>
            <h2 className="display h2 mt-6">
              <MaskText text="Built, shipped," delay={0.05} />
              <br />
              <MaskText text="still *running*." delay={0.18} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="lead">
              Six projects that show the range — booking platforms, AI products
              and the automation that keeps them quiet.
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          {PROJECTS.map((project, i) => (
            <motion.a
              key={project.title}
              href="#contact"
              className="row-item group block"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
            >
              <span
                className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                style={{ background: "var(--accent)" }}
              />

              <div className="grid items-center gap-x-10 gap-y-4 py-8 md:grid-cols-[54px_minmax(0,1.05fr)_minmax(0,1fr)_auto]">
                <span
                  className="mono"
                  style={{ fontSize: "0.68rem", color: "var(--muted-2)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="transition-transform duration-700 group-hover:translate-x-1.5">
                  <h3 className="display h3">{project.title}</h3>
                  <div
                    className="mono mt-2 flex items-center gap-3"
                    style={{
                      fontSize: "0.64rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--muted-2)",
                    }}
                  >
                    <span>{project.year}</span>
                    <span style={{ opacity: 0.4 }}>/</span>
                    <span>{project.role}</span>
                  </div>
                </div>

                <p
                  className="text-sm"
                  style={{ color: "var(--muted)", lineHeight: 1.7, maxWidth: "42ch" }}
                >
                  {project.description}
                </p>

                <div className="flex items-center gap-5">
                  <div className="hidden flex-wrap gap-2 lg:flex">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-500 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                    style={{ border: "1px solid var(--line-2)", fontSize: "0.85rem" }}
                  >
                    →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn--ghost"
            >
              <span>More on GitHub</span>
              <span className="arrow">↗</span>
            </a>
            <span
              className="mono"
              style={{ fontSize: "0.68rem", color: "var(--muted-2)" }}
            >
              case studies available on request
            </span>
          </div>
        </Reveal>

        </div>
      </div>
    </section>
  );
}
