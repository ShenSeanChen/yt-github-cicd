"use client";

// Directory: src/components/solar
// SolarSystemClient: Client-only 3D scene that renders a project's solar system.

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Text, Stars } from "@react-three/drei";

export type SolarSystemClientProps = {
  color: string;
  topics: { title: string }[];
};

function Planet({ radius, label, color, angle }: { radius: number; label: string; color: string; angle: number }) {
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  return (
    <group position={[x, 0, z]}>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.4} />
      </mesh>
      <Text position={[0.6, 0.1, 0]} fontSize={0.18} color="#fff" outlineWidth={0.005} outlineColor="#000">
        {label}
      </Text>
    </group>
  );
}

function SolarSystem({ color, topics }: { color: string; topics: { title: string }[] }) {
  const planets = useMemo(() => {
    const base = 1.6;
    return topics.map((t, i) => ({ ...t, radius: base + i * 1.2, angle: i * (Math.PI / 3.2) }));
  }, [topics]);

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 0, 0]} intensity={1.4} color={color} />
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      {planets.map((p) => (
        <Planet key={p.title} radius={p.radius} angle={p.angle} label={p.title} color={"#93c5fd"} />
      ))}
    </>
  );
}

export default function SolarSystemClient({ color, topics }: SolarSystemClientProps) {
  return (
    <div className="relative mx-auto h-[560px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <Canvas camera={{ position: [0, 3, 8], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={<Html center>Loading…</Html>}>
          <Stars radius={80} depth={30} count={4000} factor={3} fade speed={0.4} />
          <SolarSystem color={color} topics={topics} />
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}