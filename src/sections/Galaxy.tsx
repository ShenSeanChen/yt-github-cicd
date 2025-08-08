"use client";

// Directory: src/sections
// Galaxy: Interactive 3D galaxy with clickable stars labeled by projects.

import React, { Suspense, useMemo, useCallback } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Html, Stars, Text, Billboard, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";
import { projects } from "@/lib/projects";

/**
 * StarPoint renders a clickable label + glowing point. On click it routes to the project page.
 */
function StarPoint({ position, label, color, href }: { position: [number, number, number]; label: string; color: string; href: string; }) {
  const router = useRouter();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    router.push(href);
  };

  const handleOver = useCallback(() => {
    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
  }, []);

  const handleOut = useCallback(() => {
    if (typeof document !== "undefined") document.body.style.cursor = "";
  }, []);

  return (
    <group position={position} onClick={handleClick} onPointerOver={handleOver} onPointerOut={handleOut}>
      <Billboard>
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <Text fontSize={0.22} color={"#ffffff"} anchorX="left" anchorY="middle" outlineWidth={0.005} outlineColor="#000">
          {label}
        </Text>
      </Billboard>
      <pointLight color={color} intensity={0.9} distance={2} />
    </group>
  );
}

/**
 * GalaxyScene provides stars background and arranges project star points in a spiral.
 */
function GalaxyScene() {
  const points = useMemo(() => {
    const arms = 3;
    const radius = 4.5;
    const spread = 0.5;
    return projects.map((p, i) => {
      const arm = i % arms;
      const angle = (i / projects.length) * Math.PI * 4 + arm * (Math.PI / arms);
      const r = radius - (i * radius) / projects.length;
      const x = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * 0.6;
      const z = Math.sin(angle) * r + (Math.random() - 0.5) * spread;
      return { position: [x, y, z] as [number, number, number], label: p.title, color: p.color, href: `/project/${p.slug}` };
    });
  }, []);

  useFrame((state) => {
    state.scene.rotation.y += 0.0008;
  });

  return (
    <>
      <Stars radius={120} depth={50} count={8000} factor={4} saturation={0} fade speed={0.4} />
      <Sparkles count={180} size={2} speed={0.2} opacity={0.6} color="#a78bfa" scale={[40, 6, 40]} />
      {points.map((p) => (
        <StarPoint key={p.href} position={p.position} label={p.label} color={p.color} href={p.href} />
      ))}
    </>
  );
}

/**
 * Galaxy section: responsive canvas with subtle orbit and click-to-navigate stars.
 */
export function Galaxy() {
  return (
    <section id="galaxy" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
      <Container>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Galaxy</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Click a star to explore a project solar system.
          </p>
        </div>
        <div className="relative h-[520px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Canvas dpr={[1, 2]}>
            <Suspense fallback={<Html center>Loading…</Html>}> 
              <PerspectiveCamera makeDefault position={[0, 2.5, 10]} fov={55} />
              <ambientLight intensity={0.3} />
              <GalaxyScene />
            </Suspense>
          </Canvas>
        </div>
      </Container>
    </section>
  );
}

export default Galaxy;