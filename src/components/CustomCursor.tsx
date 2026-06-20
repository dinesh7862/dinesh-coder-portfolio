"use client";
import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  const colors = ["#00d4ff", "#a855f7", "#06b6d4", "#ec4899", "#10b981"];

  useEffect(() => {
    let lastParticleTime = 0;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }

      const now = Date.now();
      if (now - lastParticleTime > 50) {
        lastParticleTime = now;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const id = particleIdRef.current++;
        setParticles((prev) => [
          ...prev.slice(-20),
          { id, x: e.clientX, y: e.clientY, color },
        ]);
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== id));
        }, 800);
      }
    };

    const animate = () => {
      ringPosRef.current.x +=
        (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y +=
        (posRef.current.y - ringPosRef.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + "px";
        ringRef.current.style.top = ringPosRef.current.y + "px";
      }
      animRef.current = requestAnimationFrame(animate);
    };

    const onHoverIn = () => ringRef.current?.classList.add("hovering");
    const onHoverOut = () => ringRef.current?.classList.remove("hovering");

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, .cursor-hover").forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    animRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      {particles.map((p) => (
        <div
          key={p.id}
          className="cursor-particle"
          style={{
            left: p.x,
            top: p.y,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </>
  );
}
