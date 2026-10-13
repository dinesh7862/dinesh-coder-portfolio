"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Deterministic hash in [0, 1) — keeps render pure while still looking scattered. */
function hash(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Slow drifting dust — monochrome, no rainbow. */
function Dust({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (hash(i * 3 + 1) - 0.5) * 24;
      arr[i * 3 + 1] = (hash(i * 3 + 2) - 0.5) * 15;
      arr[i * 3 + 2] = (hash(i * 3 + 3) - 0.5) * 14 - 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8b7cff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** One calm, slowly breathing form that leans toward the pointer. */
function Orb() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.08;
    g.position.x = THREE.MathUtils.lerp(
      g.position.x,
      2.3 + pointer.current.x * 0.35,
      0.03
    );
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      0.1 - pointer.current.y * 0.3,
      0.03
    );
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      pointer.current.y * 0.2,
      0.04
    );
    const t = state.clock.elapsedTime;
    g.scale.setScalar(1 + Math.sin(t * 0.5) * 0.015);
  });

  return (
    <group ref={group} position={[2.3, 0.1, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.85, 6]} />
        <MeshDistortMaterial
          color="#8b7cff"
          distort={0.32}
          speed={1.1}
          roughness={0.35}
          metalness={0.5}
          transparent
          opacity={0.24}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[2.3, 1]} />
        <meshBasicMaterial
          color="#8b7cff"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <pointLight position={[-6, -3, -4]} color="#6ee7d7" intensity={12} />
        <Dust />
        <Orb />
      </Canvas>
    </div>
  );
}
