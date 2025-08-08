"use client";

// Directory: src/sections
// Anime3D: Interactive anime‑inspired 3D scene with sparkles, floating shapes, and subtle bloom.

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sparkles, Html, Environment, PresentationControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Container from "@/components/Container";

/**
 * Simple character placeholder using a GLTF model. Replace path with your own model when available.
 * This keeps the demo lightweight and visually appealing.
 */
function Character() {
  // Note: This uses a placeholder primitive shape to avoid bundling external assets.
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshStandardMaterial color="#FF69B4" metalness={0.2} roughness={0.2} />
      </mesh>
    </Float>
  );
}

/**
 * Decorative floating rings for anime-ish energy.
 */
function Rings() {
  return (
    <group>
      {[1.8, 2.2, 2.6].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.02 + 0.01 * i, 32, 128]} />
          <meshStandardMaterial color={i % 2 ? "#6EE7B7" : "#A78BFA"} emissiveIntensity={0.4} emissive="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Anime3D renders a responsive canvas with interactive controls and gentle postprocessing.
 */
export function Anime3D() {
  return (
    <section id="anime" className="border-b border-zinc-200 py-16 dark:border-zinc-800">
      <Container>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight">Anime 3D</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            An interactive 3D vignette—drag to orbit, scroll to zoom.
          </p>
        </div>
        <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
          <Canvas shadows camera={{ position: [3.5, 2.2, 4.5], fov: 45 }} dpr={[1, 2]}>
            <Suspense fallback={<Html center>Loading…</Html>}> 
              <color attach="background" args={["#0b0b12"]} />

              {/* Lighting */}
              <ambientLight intensity={0.35} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />

              {/* Content */}
              <PresentationControls global azimuth={[-Math.PI / 4, Math.PI / 4]} polar={[0, Math.PI / 3]} speed={1.5}>
                <group position={[0, 0.2, 0]}>
                  <Character />
                  <Rings />
                </group>
              </PresentationControls>

              {/* FX */}
              <Sparkles count={120} scale={[6, 3, 4]} size={3} speed={0.6} opacity={0.6} color="#a78bfa" />
              <EffectComposer>
                <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
              </EffectComposer>

              {/* Ground + Env */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#0d0d14" />
              </mesh>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>
      </Container>
    </section>
  );
}

export default Anime3D;