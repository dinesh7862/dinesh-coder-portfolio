"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import SmoothScroll from "@/components/SmoothScroll";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});
const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });

const SERVICES = [
  "Web development",
  "AI integrations",
  "UI / UX design",
  "Automation",
  "Performance",
  "Design systems",
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <>
      <SmoothScroll />
      <Cursor />
      <div className="grain" aria-hidden="true" />

      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onComplete={handleComplete} />}
      </AnimatePresence>

      <Navbar />

      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />

        {/* Services strip */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
            paddingBlock: 22,
          }}
        >
          <Marquee speed={46}>
            {SERVICES.map((service) => (
              <span key={service} className="flex items-center">
                <span
                  className="mono"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    paddingInline: 26,
                  }}
                >
                  {service}
                </span>
                <span style={{ color: "var(--accent)", opacity: 0.6, fontSize: "0.7rem" }}>
                  ✦
                </span>
              </span>
            ))}
          </Marquee>
        </div>

        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
