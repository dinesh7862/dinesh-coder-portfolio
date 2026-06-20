"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb({ position, color, speed = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.8}>
      <Sphere ref={meshRef} position={position} args={[0.8, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Sphere>
    </Float>
  );
}

function FloatingCube({ position, color }: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.6, 0.6, 0.6]} />
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.6}
        wireframe={false}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={2} />
        <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={1.5} />
        <pointLight position={[0, 5, -5]} color="#ec4899" intensity={1} />

        <Stars
          radius={30}
          depth={50}
          count={300}
          factor={2}
          saturation={1}
          fade
          speed={0.5}
        />

        <FloatingOrb position={[-4, 2, -3]} color="#00d4ff" speed={0.8} />
        <FloatingOrb position={[4, -2, -4]} color="#a855f7" speed={1.2} />
        <FloatingOrb position={[0, -3, -5]} color="#ec4899" speed={0.6} />

        <FloatingCube position={[-5, -1, -2]} color="#06b6d4" />
        <FloatingCube position={[5, 1, -3]} color="#10b981" />
        <FloatingCube position={[2, 3, -4]} color="#f97316" />
        <FloatingCube position={[-3, -3, -6]} color="#a855f7" />
      </Canvas>
    </div>
  );
}
