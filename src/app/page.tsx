"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Lazy load heavy components
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CustomCursor />

      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      {!loading && (
        <main className="relative">
          {/* Three.js background — rendered once for hero */}
          <div className="relative min-h-screen">
            <ThreeScene />
            <Navbar />
            <HeroSection />
          </div>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
          <BackToTop />
        </main>
      )}
    </>
  );
}
