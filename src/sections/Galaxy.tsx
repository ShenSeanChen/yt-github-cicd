"use client";

// Directory: src/sections
// Galaxy: Interactive 3D galaxy with clickable stars labeled by projects.

import React, { Suspense, useMemo, useCallback } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { Html, Stars, Text, Billboard, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshBasicMaterial color={color} />
        </mesh>
        <Text fontSize={0.34} color={"#ffffff"} anchorX="left" anchorY="middle" outlineWidth={0.008} outlineColor="#000">
          {label}
        </Text>
      </Billboard>
      <pointLight color={color} intensity={1.2} distance={3} />
    </group>
  );
}

/**
 * GalaxyScene provides stars background and arranges project star points in a spiral.
 */
function GalaxyScene() {
  const points = useMemo(() => {
    const arms = 3;
    const radius = 5.8;
    const spread = 0.8;
    return projects.map((p, i) => {
      const arm = i % arms;
      const angle = (i / projects.length) * Math.PI * 4 + arm * (Math.PI / arms);
      const r = radius - (i * radius) / projects.length;
      const x = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * 0.8;
      const z = Math.sin(angle) * r + (Math.random() - 0.5) * spread;
      return { position: [x, y, z] as [number, number, number], label: p.title, color: p.color, href: `/project/${p.slug}` };
    });
  }, []);

  useFrame((state) => {
    state.scene.rotation.y += 0.0006;
  });

  return (
    <>
      <Stars radius={160} depth={70} count={12000} factor={5} saturation={0} fade speed={0.35} />
      <Sparkles count={260} size={3} speed={0.25} opacity={0.7} color="#a78bfa" scale={[60, 10, 60]} />
      {points.map((p) => (
        <StarPoint key={p.href} position={p.position} label={p.label} color={p.color} href={p.href} />
      ))}
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.15} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  );
}

/**
 * Galaxy section: full-viewport canvas with click-to-navigate stars.
 */
export function Galaxy() {
  return (
    <section id="galaxy" className="border-b border-zinc-200 dark:border-zinc-800">
      <Container>
        <div className="mb-4 pt-6">
          <h2 className="text-2xl font-semibold tracking-tight">Galaxy</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            Click a star to explore a project solar system.
          </p>
        </div>
      </Container>
      <div className="relative h-[calc(100vh-56px)] w-full overflow-hidden">
        <Canvas dpr={[1, 2]}>
          <Suspense fallback={<Html center>Loading…</Html>}> 
            <PerspectiveCamera makeDefault position={[0, 2.5, 11.5]} fov={55} />
            <ambientLight intensity={0.3} />
            <GalaxyScene />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

export default Galaxy;